const MenuModel = {};
module.exports = MenuModel;

const _ = require('lodash');

const { USER_ROLE, STATUS } = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const mongoDB = require('../../db/mongoDB');
const { ParseServerLogger } = require('../../logger');
const PostModel = require('./Post');

/** MENU STATUS:
 *
 * Status list: [PUBLISHED, UNPUBLISHED, DELETED]
 * Status rules:
 * - No role can see [DELETED]
 * - ADMIN and SALON can see [PUBLISHED, UNPUBLISHED]
 * - CUSTOMER can see [PUBLISHED]
 */
const checkExistingMenu = async ({ name, salonId, currentId = '' }) => {
  const existingMenuQuery = BaseQuery.getMenuQuery();
  existingMenuQuery.notEqualTo('status', STATUS.DELETED);
  existingMenuQuery.equalTo('name', name);
  existingMenuQuery.equalTo('salon', Helper.getPointerValue('Salon', salonId));
  const existingMenu = await existingMenuQuery.first({ useMasterKey: true });
  if (existingMenu && existingMenu.id !== currentId) {
    const { code, message } = Errors.DUPLICATE_VALUE;
    throw new Parse.Error(code, message);
  }
  return name;
};

const buildMenuItemInfo = (parseMenuItem) => {
  return Helper.convertParseObjectToJson(parseMenuItem, DefaultSelectFields.MENU);
};

const verifyStylists = async (stylistIds, salonParse) => {
  if (stylistIds.length > 0) {
    const stylistQuery = BaseQuery.getStylistQuery();
    stylistQuery.containedIn('objectId', stylistIds);
    stylistQuery.equalTo('salon', salonParse);
    const stylistParses = await stylistQuery.find({ useMasterKey: true });
    if (stylistParses.length !== stylistIds.length) {
      const { code } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, 'Some Stylists can not be found.');
    }
  }
};

// Verify CATEGORY of MENU: Must be PUBLISHED
const getPublishedCategory = async (categoryId) => {
  const categoryQuery = BaseQuery.getCategoryQuery();
  categoryQuery.select('name', 'status');
  categoryQuery.equalTo('objectId', categoryId);
  const categoryParse = await categoryQuery.first({ useMasterKey: true });
  if (!categoryParse || categoryParse.get('status') !== STATUS.PUBLISHED) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'This Category does not exist or has not been published.');
  }
  return categoryParse;
};

MenuModel.createMenuItem = async (params, requestUser) => {
  const { name, amount, description, categoryId, duration, assignedStylists: assignedStylistIds } = params;
  const requestedSalon = requestUser.get('salon');

  await checkExistingMenu({ name, salonId: requestedSalon.id });
  await verifyStylists(assignedStylistIds, requestedSalon);
  const categoryParse = await getPublishedCategory(categoryId);

  const newMenu = new Parse.Object('Menu', {
    name,
    amount,
    description,
    category: categoryParse,
    categoryName: categoryParse.get('name'),
    status: STATUS.PUBLISHED,
    salon: requestedSalon,
    assignedStylistIds,
    duration,
  });
  const newMenuParse = await newMenu.save(null, { useMasterKey: true });

  return buildMenuItemInfo(newMenuParse);
};

MenuModel.getRemoveStylist = (oldStylists, newStylists) => {
  const remove = [];
  oldStylists.forEach((stylist) => {
    if (!newStylists.includes(stylist)) {
      remove.push(stylist);
    }
  });
  return remove;
};

MenuModel.updateMenuItem = async (params, requestUser) => {
  const { menuId, name, categoryId, assignedStylists: assignedStylistIds } = params;
  const requestedSalon = requestUser.get('salon');
  const menuQuery = BaseQuery.getMenuQuery();
  menuQuery.notEqualTo('status', STATUS.DELETED);
  menuQuery.equalTo('salon', requestedSalon);
  menuQuery.select(DefaultSelectFields.MENU);
  const menuParse = await menuQuery.get(menuId, { useMasterKey: true });
  const oldStylistIds = menuParse.get('assignedStylistIds');

  if (name) {
    await checkExistingMenu({ name, salonId: requestedSalon.id, currentId: menuId });
    menuParse.set('name', name);
  }

  if (categoryId) {
    const categoryParse = await getPublishedCategory(categoryId);
    menuParse.set('category', categoryParse);
    menuParse.set('categoryName', categoryParse.get('name'));
  }

  Helper.updateDataToParseObj(menuParse, params, ['amount', 'description', 'status', 'duration']);

  if (assignedStylistIds) {
    await verifyStylists(assignedStylistIds, requestedSalon);
    menuParse.set('assignedStylistIds', assignedStylistIds);
  }

  const result = await menuParse.save(null, { useMasterKey: true });
  const newStylistIds = menuParse.get('assignedStylistIds');
  const remove = MenuModel.getRemoveStylist(oldStylistIds, newStylistIds);
  PostModel.unPublishedPostByMenuIdByStylists(menuId, remove, true);
  return buildMenuItemInfo(result);
};

MenuModel.changeMenuPublishStatus = async (params, requestUser) => {
  const { menuId } = params;

  const menuQuery = BaseQuery.getMenuQuery();
  menuQuery.select('status', 'category');
  menuQuery.containedIn('status', [STATUS.PUBLISHED, STATUS.UNPUBLISHED]);
  const menuParse = await menuQuery.get(menuId, { useMasterKey: true });

  const prevStatus = menuParse.get('status');
  if (prevStatus === STATUS.PUBLISHED) {
    menuParse.set('status', STATUS.UNPUBLISHED);
  } else if (prevStatus === STATUS.UNPUBLISHED) {
    await getPublishedCategory(_.get(menuParse.get('category'), 'id')); // Check category published
    menuParse.set('status', STATUS.PUBLISHED);
  }
  await menuParse.save(null, { useMasterKey: true });

  if (prevStatus === STATUS.PUBLISHED) {
    PostModel.unPublishedPostByMenuIds(undefined, [menuId], true);
  }

  return MenuModel.getMenuItemDetail({ menuId }, requestUser);
};

MenuModel.getMenuItemDetail = async (params, requestUser) => {
  const { menuId } = params;

  const menuQuery = BaseQuery.getMenuQuery();
  menuQuery.notEqualTo('status', STATUS.DELETED);
  menuQuery.select(DefaultSelectFields.MENU);

  let inPublishedPost = false;

  /**
   * SALON can only see their menu
   */
  if (!requestUser || requestUser.get('role') === USER_ROLE.CUSTOMER) {
    menuQuery.equalTo('status', STATUS.PUBLISHED);
  } else if (requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    menuQuery.equalTo('salon', requestUser.get('salon'));
  }
  const menuParse = await menuQuery.get(menuId, { useMasterKey: true });

  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    const posts = await PostModel.getPostIdByMenuIdsByStatus([menuId], STATUS.PUBLISHED);
    inPublishedPost = posts.length > 0;
  }
  return {
    ...buildMenuItemInfo(menuParse),
    inPublishedPost,
  };
};

MenuModel.getMenuItemList = async (params, requestUser) => {
  const { salonId, stylistId, status, ...pagingParams } = params;

  const menuQuery = BaseQuery.getMenuQuery();
  status && menuQuery.equalTo('status', status);
  menuQuery._andQuery([BaseQuery.getMenuQuery().notEqualTo('status', STATUS.DELETED)]);
  menuQuery.select(DefaultSelectFields.MENU);
  Helper.queryPagingHandler(menuQuery, pagingParams);

  /**
   * SALON can only see their menu
   */
  if (!requestUser || requestUser.get('role') === USER_ROLE.CUSTOMER) {
    menuQuery.equalTo('status', STATUS.PUBLISHED);
  }
  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    menuQuery.equalTo('salon', requestUser.get('salon'));
  } else if (salonId) {
    menuQuery.equalTo('salon', Helper.getPointerValue('Salon', salonId));
  }

  if (stylistId) {
    menuQuery.containsAll('assignedStylistIds', [stylistId]);
  }

  const [menus, total] = await Promise.all([menuQuery.find({ useMasterKey: true }), menuQuery.count()]);
  return {
    total,
    list: menus.map((menu) => buildMenuItemInfo(menu)),
  };
};

MenuModel.getPublishedMenusGroupedByCategory = async (params) => {
  const { stylistId, salonId } = params;

  const matchQuery = {
    status: { $eq: STATUS.PUBLISHED },
  };
  if (stylistId) {
    matchQuery['assignedStylistIds'] = { $all: [stylistId] };
  }
  if (salonId) {
    matchQuery['_p_salon'] = { $eq: `Salon$${salonId}` };
  }

  const db = await mongoDB.getMongoDB();
  const categoryGroups = await db
    .collection('Menu')
    .aggregate([
      {
        $match: matchQuery,
      },
      {
        $project: {
          _id: 1,
          _p_category: 1,
          categoryName: 1,
          name: 1,
          amount: 1,
          description: 1,
          duration: 1,
        },
      },
      {
        $group: {
          _id: '$_p_category',
          name: { $first: '$categoryName' },
          menus: {
            $push: {
              objectId: '$_id',
              name: '$name',
              amount: '$amount',
              description: '$description',
              duration: '$duration',
            },
          },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ])
    .toArray();

  return _.map(categoryGroups, (o) => {
    const categoryId = o._id.replace('Category$', '');
    return {
      ...o,
      objectId: categoryId,
      _id: undefined,
    };
  });
};

MenuModel.updateManyByQuery = async (query) => {
  const db = await mongoDB.getMongoDB();
  return db.collection('Menu').find(query).toArray();
};

MenuModel.addStylitToMenu = async (stylistId, menuIds, salonId, status) => {
  const db = await mongoDB.getMongoDB();
  const query = {
    _p_salon: `Salon$${salonId}`,

    _id: {
      $in: menuIds,
    },

    assignedStylistIds: {
      $nin: [stylistId],
    },
  };
  if (status) {
    query['status'] = {
      $in: status,
    };
  }
  return db
    .collection('Menu')
    .updateMany(query, { $push: { assignedStylistIds: stylistId } })
    .catch(ParseServerLogger.error);
};

MenuModel.removeStylitToMenu = async (stylistId, menuIds, salonId, status) => {
  const db = await mongoDB.getMongoDB();
  const query = {
    _p_salon: `Salon$${salonId}`,

    _id: {
      $in: menuIds,
    },
  };
  if (status) {
    query['status'] = {
      $in: status,
    };
  }
  return db
    .collection('Menu')
    .updateMany(query, { $pull: { assignedStylistIds: stylistId } })
    .catch(ParseServerLogger.error);
};

MenuModel.findByQuery = async (query) => {
  const db = await mongoDB.getMongoDB();
  return db.collection('Menu').find(query).toArray();
};

MenuModel.getCollection = async () => {
  const db = await mongoDB.getMongoDB();
  return db.collection('Menu');
};

MenuModel.getStylelistMenu = async (stylistId, salonId, status) => {
  const query = {
    _p_salon: `Salon$${salonId}`,

    assignedStylistIds: {
      $in: [stylistId],
    },
  };
  if (status) {
    query['status'] = {
      $in: status,
    };
  }
  return MenuModel.findByQuery(query);
};

MenuModel.removeMenu = async (payload, user) => {
  const { menuId, forceDelete = false } = payload;
  let postIds = [];
  if (!forceDelete) {
    postIds = await PostModel.getPostIdByMenuIdsByStatus([menuId], STATUS.PUBLISHED);
    if (postIds.length > 0) {
      const { code, message } = Errors.MENU_IN_PUBLISHED_POST;
      throw new Parse.Error(code, message);
    }
  }
  payload.status = STATUS.DELETED;
  await MenuModel.updateMenuItem(payload, user);
  PostModel.unPublishedPostByMenuIds(undefined, [menuId], true);
  return true;
};
MenuModel.changeStatusMenuByCategoryStatus = async (categoryId, status) => {
  const db = await mongoDB.getMongoDB();
  const menuNeedUnpublished = await db
    .collection('Menu')
    .find({
      _p_category: `Category$${categoryId}`,
      status: {
        $nin: [status],
      },
    })
    .project({
      _id: 1,
    })
    .toArray();
  const menuNeedUnpublishedIds = menuNeedUnpublished.map((value) => value._id);
  await db.collection('Menu').updateMany(
    {
      _id: {
        $in: menuNeedUnpublishedIds,
      },
    },
    {
      $set: {
        status,
      },
    },
  );

  return menuNeedUnpublishedIds;
};
