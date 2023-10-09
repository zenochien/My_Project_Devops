const PostModel = {};
module.exports = PostModel;

const _get = require('lodash/get');
const _map = require('lodash/map');
const _reduce = require('lodash/reduce');
const _includes = require('lodash/includes');
const _find = require('lodash/find');
const moment = require('moment-timezone');
const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const { STATUS, USER_ROLE, PRODUCT_TYPE, USER_STATUS, FACE_SHAPES } = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const ImageModel = require('./Image');
const { ParseServerLogger } = require('../../logger');
const eventManager = require('../../utils/Event');
const { NOTIFICATION_TEMPLATES, EVENTS } = require('../../const/Constants');

const yup = require('yup');
const Validation = require('../../utils/validation');

const mongoDB = require('./../../db/mongoDB');
const {
  processOrderAndPaginationMongo,
  getStylistUser,
  convertSpecialCharacterForMongo,
} = require('../../utils/helper');

let notificationService;
PostModel.init = (_notificationService) => {
  notificationService = _notificationService;
};

/** POST STATUS:
 *
 * Status list: [PUBLISHED, UNPUBLISHED, DELETED]
 * Status rules:
 * - No role can see [DELETED]
 * - ADMIN and SALON can see [PUBLISHED, UNPUBLISHED]
 * - CUSTOMER can see [PUBLISHED]
 */

const processFavoriteCustomer = (postInfo, customerId) => {
  postInfo.isFavorite = false;
  if (postInfo.favoriteCustomers && postInfo.favoriteCustomers.length > 0 && customerId) {
    _find(postInfo.favoriteCustomers, (customer) => {
      if (customer.customerId === customerId) {
        postInfo.isFavorite = true;
        return true;
      }
    });
  }
  if (postInfo.favoriteCustomers) delete postInfo.favoriteCustomers;
};

const buildPostInfo = (postParse, role, selectField = DefaultSelectFields.POST, customerId) => {
  const postInfo = Helper.convertParseObjectToJson(postParse, selectField);
  let totalPrice = 0;
  postInfo.menus =
    postInfo.menus &&
    _map(
      postInfo.menus.filter((menu) => {
        const isAssigned = _includes(_get(menu, 'assignedStylistIds'), _get(postInfo, 'stylist.objectId'));
        const status = _get(menu, 'status');
        return role !== USER_ROLE.CUSTOMER || (status === STATUS.PUBLISHED && isAssigned);
      }),
      (menu) => {
        const status = _get(menu, 'status');
        const isAssigned = _includes(_get(menu, 'assignedStylistIds'), _get(postInfo, 'stylist.objectId'));
        const amount = _get(menu, 'amount');
        if (isAssigned && status === STATUS.PUBLISHED) {
          totalPrice += amount;
        }
        return {
          objectId: menu.objectId,
          name: _get(menu, 'name'),
          description: _get(menu, 'description'),
          amount,
          duration: _get(menu, 'duration'),
          status,
          isAssigned,
        };
      },
    );
  postInfo.totalPrice = totalPrice;
  postInfo.products =
    postInfo.products &&
    _map(postInfo.products, (product) => ({
      objectId: product.objectId,
      name: _get(product, 'name'),
      price: _get(product, 'type') === PRODUCT_TYPE.USER ? _get(product, 'price') : undefined,
      images: _get(product, 'images'),
      description: _get(product, 'description'),
      url: _get(product, 'url'),
      status: _get(product, 'status'),
    }));

  processFavoriteCustomer(postInfo, customerId);

  return postInfo;
};

const getPostTotalPrice = (menuParses) => {
  return _reduce(
    menuParses,
    (price, menuParse) => {
      const menuPrice = menuParse.get('amount') || 0;
      price += menuPrice;
      return price;
    },
    0,
  );
};

const getStylist = async (stylistId, salonParse) => {
  if (!stylistId) {
    return undefined;
  }
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.equalTo('salon', salonParse);
  stylistQuery.equalTo('objectId', stylistId);
  const stylistParse = await stylistQuery.first({ useMasterKey: true });
  if (!stylistParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Stylist does not exist.');
  }
  return stylistParse;
};

// Verify MENU: Must be PUBLISHED
const getPublishedMenus = async (menuIds, salonParse, stylistParse) => {
  if (menuIds.length < 1) {
    return undefined;
  }
  const menuQuery = BaseQuery.getMenuQuery();
  menuQuery.select('amount');
  menuQuery.equalTo('status', STATUS.PUBLISHED);
  salonParse && menuQuery.equalTo('salon', salonParse);
  stylistParse && menuQuery.containsAll('assignedStylistIds', [stylistParse.id]);
  menuQuery.containedIn('objectId', menuIds);
  const menuParses = await menuQuery.find({ useMasterKey: true });

  if (menuParses.length !== menuIds.length) {
    const { code, message } = Errors.INVALID_MENU_IN_POST;
    throw new Parse.Error(code, message);
  }
  return menuParses;
};

// Verify PRODUCT: Must be PUBLISHED
const getPublishedProducts = async (productIds, salonParse) => {
  if (productIds.length < 1) {
    return undefined;
  }
  const productQuery = BaseQuery.getProductQuery();
  productQuery.equalTo('status', STATUS.PUBLISHED);
  salonParse && productQuery.equalTo('salon', salonParse);
  productQuery.containedIn('objectId', productIds);
  const productParses = await productQuery.find({ useMasterKey: true });

  if (productParses.length !== productIds.length) {
    const { code, message } = Errors.PRODUCT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return productParses;
};

PostModel.createPost = async (params, requestUser) => {
  const {
    stylistId,
    images: imageIds = [],
    description,
    tags,
    faceShapes,
    menus: menuIds = [],
    products: productIds = [],
    status,
  } = params;
  const requestStylist = requestUser.get('stylist') && (await requestUser.get('stylist').fetch({ useMasterKey: true }));
  const requestSalon = requestStylist ? requestStylist.get('salon') : requestUser.get('salon');

  const [stylistParse, menuParses, productParses] = await Promise.all([
    requestStylist ? Promise.resolve(requestStylist) : getStylist(stylistId, requestSalon),
    getPublishedMenus(menuIds, requestSalon),
    getPublishedProducts(productIds, requestSalon),
  ]);

  if (stylistParse.has('requestDeletingAccount') || stylistParse.get('userStatus') === USER_STATUS.DELETED) {
    throw new Parse.Error(Errors.DELETED_STYLIST.code, Errors.DELETED_STYLIST.message);
  }
  const imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);

  const postParse = new Parse.Object('Post');
  postParse.set('status', status);
  postParse.set('salon', requestSalon);
  postParse.set('stylist', stylistParse);
  postParse.set('stylistObject', {
    status: stylistParse.get('status'),
  });
  postParse.set('description', description);
  postParse.set('tags', tags);
  postParse.set('faceShapes', faceShapes);
  postParse.set('images', imageObjects);
  postParse.set('imageIds', imageIds);
  postParse.set('products', productParses);
  postParse.set('menus', menuParses);
  postParse.set('totalPrice', getPostTotalPrice(menuParses));

  const newPost = await postParse.save(null, { useMasterKey: true });

  // trigger event create post
  eventManager.emit(EVENTS.CREATE_POST, newPost.toJSON());

  return PostModel.getPostDetail({ postId: newPost.id }, requestUser);
};

PostModel.checkRequiredFieldForPublishPost = (postParse) => {
  const validation = {
    images: postParse.attributes.images ? postParse.attributes.images.map((value) => value.objectId) : [],
    menus: postParse.attributes.menus ? postParse.attributes.menus.map((value) => value.id) : [],
    tags: postParse.attributes.tags || [],
  };
  try {
    Validation.checkRequestParams(
      { params: validation },
      {
        images: yup.array().of(yup.string().trim()).min(1).max(3).required(),
        menus: yup.array().of(yup.string().trim()).min(1).max(10).required(),
        tags: yup.array().of(yup.string().trim().max(15)).max(10).required(),
      },
    );
  } catch (error) {
    console.log('[PostModel][checkRequiredFieldForPublishPost]', error);
    const { code, message } = Errors.PUBLISH_POST_ERROR;
    throw new Parse.Error(code, message);
  }
};

PostModel.updatePost = async (params, requestUser) => {
  const {
    postId,
    tags,
    status,
    faceShapes,
    description,
    menus: menuIds,
    images: imageIds,
    products: productIds,
  } = params;
  const requestSalon = requestUser && requestUser.get('salon');
  const requestStylist = requestUser && requestUser.get('stylist');

  const postQuery = BaseQuery.getPostQuery();
  postQuery.notEqualTo('status', STATUS.DELETED);

  const userRole = requestUser.get('role');
  if (userRole === USER_ROLE.STYLIST) {
    postQuery.equalTo('stylist', requestUser.get('stylist'));
  } else if (userRole === USER_ROLE.SALON_OPERATOR) {
    postQuery.equalTo('salon', requestUser.get('salon'));
  }
  const postParse = await postQuery.get(postId, { useMasterKey: true });

  if ((requestSalon || requestStylist) && menuIds) {
    const menuParses = await getPublishedMenus(menuIds, requestSalon, requestStylist);
    postParse.set('menus', menuParses || []);
    postParse.set('totalPrice', getPostTotalPrice(menuParses));
  }

  if ((requestSalon || requestStylist) && productIds) {
    let salonParse = requestSalon;
    if (!salonParse) {
      const stylistQuery = BaseQuery.getStylistQuery();
      stylistQuery.select('salon');
      const stylistParse = await stylistQuery.get(requestStylist.id, { useMasterKey: true });
      salonParse = stylistParse.get('salon');
    }
    let productParses = [];
    if (productIds.length > 0) {
      productParses = await getPublishedProducts(productIds, salonParse);
    }
    postParse.set('products', productParses);
  }

  const prevImageIds = postParse.get('imageIds');
  if (imageIds) {
    const imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);
    postParse.set('images', imageObjects);
    postParse.set('imageIds', imageIds);
  }

  tags && postParse.set('tags', tags);
  status && postParse.set('status', status);
  faceShapes && postParse.set('faceShapes', faceShapes);
  if (description || description === '') {
    postParse.set('description', description);
  }

  if (postParse.get('status') === STATUS.PUBLISHED) {
    PostModel.checkRequiredFieldForPublishPost(postParse);
    await PostModel.checkInvalidMenu(postParse);
  }

  const dirtyKeys = postParse.dirtyKeys();
  await postParse.save(null, { useMasterKey: true });

  // trigger event change post info
  eventManager.emit(EVENTS.CHANGE_POST_INFO, { postIds: [postParse.id], dirtyKeys: [...dirtyKeys, 'updatedAt'] });

  if (imageIds) {
    const deletedImageParses = _reduce(
      prevImageIds,
      (array, imageId) => {
        if (imageIds.includes(imageId)) {
          return array;
        }
        const deletedImageParse = Helper.getPointerValue('Image', imageId);
        deletedImageParse.set('status', STATUS.DELETED);
        array.push(deletedImageParse);
        return array;
      },
      [],
    );

    Parse.Object.saveAll(deletedImageParses, { useMasterKey: true }).catch((error) => ParseServerLogger.error(error));
  }

  return true;
};

PostModel.changePostPublishStatus = async (params, requestUser) => {
  const { postId } = params;
  const role = requestUser.get('role');
  const postQuery = BaseQuery.getPostQuery();
  switch (role) {
    case USER_ROLE.SALON_OPERATOR:
      postQuery.equalTo('salon', requestUser.get('salon'));
      break;
    case USER_ROLE.STYLIST:
      postQuery.equalTo('stylist', requestUser.get('stylist'));
      break;
    default:
      break;
  }
  postQuery.containedIn('status', [STATUS.PUBLISHED, STATUS.UNPUBLISHED]);
  const postParse = await postQuery.get(postId, { useMasterKey: true });

  const prevStatus = postParse.get('status');
  if (prevStatus === STATUS.PUBLISHED) {
    postParse.set('status', STATUS.UNPUBLISHED);
  } else if (prevStatus === STATUS.UNPUBLISHED) {
    PostModel.checkRequiredFieldForPublishPost(postParse);
    await PostModel.checkInvalidMenu(postParse);
    postParse.set('status', STATUS.PUBLISHED);
  }
  const dirtyKeys = postParse.dirtyKeys();
  await postParse.save(null, { useMasterKey: true });

  // trigger event change post info
  eventManager.emit(EVENTS.CHANGE_POST_INFO, { postIds: [postParse.id], dirtyKeys: [...dirtyKeys, 'updatedAt'] });

  return PostModel.getPostDetail({ postId }, requestUser);
};

PostModel.getPostDetail = async (params, requestUser) => {
  const { postId } = params;
  let customerId = undefined;
  const postQuery = BaseQuery.getPostQuery();
  postQuery.notEqualTo('status', STATUS.DELETED);
  postQuery.include('menus', 'products');
  postQuery.select(DefaultSelectFields.POST);

  const role = !requestUser ? USER_ROLE.CUSTOMER : requestUser.get('role');
  /**
   * Salon can only see their post
   */
  if (role === USER_ROLE.CUSTOMER) {
    postQuery.equalTo('status', STATUS.PUBLISHED);
    customerId = requestUser && requestUser.get('customer') ? requestUser.get('customer').id : undefined;
  } else if (role === USER_ROLE.SALON_OPERATOR) {
    postQuery.equalTo('salon', requestUser.get('salon'));
  }

  // remove request deleted post for customer, stylist and guest
  if (
    !requestUser ||
    (requestUser && [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST].indexOf(requestUser.get('role')) !== -1)
  ) {
    postQuery.doesNotExist('requestDeleting');
  }

  const postParse = await postQuery.get(postId, { useMasterKey: true });
  return buildPostInfo(postParse, role, undefined, customerId);
};

PostModel.getPostList = async (params, requestUser, opts = {}) => {
  const { stylistId, status = [STATUS.PUBLISHED, STATUS.UNPUBLISHED], excludePostId, ...pagingParams } = params;
  const { selectFields = DefaultSelectFields.POST } = opts;
  const postQuery = BaseQuery.getPostQuery();
  let customerId = undefined;
  postQuery.notEqualTo('status', STATUS.DELETED);
  postQuery.containedIn('status', status);
  postQuery.include('menus', 'products');
  postQuery.select(selectFields);
  Helper.queryPagingHandler(postQuery, pagingParams);
  if (stylistId) {
    postQuery.equalTo('stylist', Helper.getPointerValue('Stylist', stylistId));
  }

  if (excludePostId) {
    postQuery.notEqualTo('objectId', excludePostId);
  }

  const role = !requestUser ? USER_ROLE.CUSTOMER : requestUser.get('role');
  /**
   * Salon can only see their post
   */
  if (role === USER_ROLE.CUSTOMER) {
    customerId = requestUser && requestUser.get('customer') ? requestUser.get('customer').id : undefined;
    postQuery.equalTo('status', STATUS.PUBLISHED);
  } else if (role === USER_ROLE.SALON_OPERATOR) {
    postQuery.equalTo('salon', requestUser.get('salon'));
  } else if (role === USER_ROLE.STYLIST) {
    postQuery.equalTo('stylist', requestUser.get('stylist'));
  }
  // remove request deleted post for customer, stylist and guest
  if (
    !requestUser ||
    (requestUser && [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST].indexOf(requestUser.get('role')) !== -1)
  ) {
    postQuery.doesNotExist('requestDeleting');
  }

  // remove post if stylist unpublished
  if (!requestUser || (requestUser && requestUser.get('role') === USER_ROLE.CUSTOMER)) {
    postQuery.equalTo('stylistObject.status', STATUS.PUBLISHED);
  }

  const [postParses, total] = await Promise.all([postQuery.find({ useMasterKey: true }), postQuery.count()]);
  return {
    total,
    list: postParses.map((postParse) => buildPostInfo(postParse, role, selectFields, customerId)),
  };
};

PostModel.getFavoritePostByCustomer = async (params) => {
  const { customerId, status = STATUS.PUBLISHED, ...pagingParams } = params;
  const selectFields = DefaultSelectFields.FAVORITE_POST;

  const { order, orderBy, limit, skip } = processOrderAndPaginationMongo(pagingParams);
  const processTotalPrice = {
    from: 'Menu',
    let: { post_menus: '$menuIds', post_stylit_id: '$stylist.objectId' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $in: ['$_id', '$$post_menus'] },
              { $eq: ['$status', status] },
              { $in: ['$$post_stylit_id', '$assignedStylistIds'] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
        },
      },
    ],
    as: 'post_menus',
  };

  const addFavoriteField = {
    _created_at: {
      $function: {
        body: `function (favoriteCustomers, cusId){
          let createdDate = ''
          favoriteCustomers.map((customer) => {
            if (customer.customerId === cusId) {
              createdDate = customer.createdDate;
              return true;
            }
          })
          return createdDate;
        }`,
        args: ['$favoriteCustomers', customerId],
        lang: 'js',
      },
    },
    isFavorite: true,
  };

  const addNewField = {
    'stylist.objectId': {
      $function: {
        body: `function (stylistId){
        return stylistId.split('$')[1];
      }`,
        args: ['$_p_stylist'],
        lang: 'js',
      },
    },
    menuIds: {
      $function: {
        body: `function (menus){
        return menus.map((value) => value.objectId );
      }`,
        args: ['$menus'],
        lang: 'js',
      },
    },
  };

  const query = {
    _p_stylist: {
      $exists: true,
    },
    'favoriteCustomers.customerId': customerId,
    status,
  };

  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('Post')
    .aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          list: [
            {
              $addFields: addFavoriteField,
            },
            { $sort: { [orderBy]: order } },
            { $skip: skip },
            { $limit: limit },
            {
              $addFields: addNewField,
            },
            {
              $lookup: processTotalPrice,
            },
            {
              $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', { $first: '$post_menus' }] } },
            },
            { $project: selectFields },
          ],
          count: [
            {
              $count: 'total',
            },
          ],
        },
      },
    ])
    .toArray();
  return {
    total: result.length > 0 && result[0].count[0] ? result[0].count[0].total : 0,
    list: result.length > 0 ? result[0].list : [],
  };
};

PostModel.getPostIdByMenuIdsByStatus = async (menuIds = [], status) => {
  if (menuIds === []) return [];
  const db = await mongoDB.getMongoDB();
  return db
    .collection('Post')
    .find({
      status,
      'menus.objectId': {
        $in: menuIds,
      },
    })
    .project({
      _id: 1,
    })
    .toArray();
};

PostModel.checkInvalidMenu = async (postParse) => {
  const menuIds = postParse.attributes.menus.map((menu) => {
    return menu.id;
  });
  const stylistId =
    postParse.attributes && postParse.attributes.stylist && postParse.attributes.stylist.id
      ? postParse.attributes.stylist.id
      : '';
  const db = await mongoDB.getMongoDB();
  const numberValidMenus = await db
    .collection('Menu')
    .find({
      _id: {
        $in: menuIds,
      },
      status: STATUS.PUBLISHED,
      assignedStylistIds: stylistId,
    })
    .count();

  if (numberValidMenus === menuIds.length) return true;
  const { code, message } = Errors.PUBLISHED_POST_WITH_INVALID_MENU;
  throw new Parse.Error(code, message);
};

PostModel.unPublishedPostByMenuIds = async (stylistId, menuIds, isSendNotification) => {
  const db = await mongoDB.getMongoDB();
  let posts = [];
  const _p_stylist = stylistId ? `Stylist$${stylistId}` : undefined;

  const query = {
    status: STATUS.PUBLISHED,
    'menus.objectId': {
      $in: menuIds,
    },
  };

  if (stylistId) {
    query['_p_stylist'] = _p_stylist;
  }

  posts = await db.collection('Post').find(query).toArray();
  const postIds = posts.map((item) => item._id);
  const postsUpdate = await db
    .collection('Post')
    .updateMany(query, { $set: { status: STATUS.UNPUBLISHED, _updated_at: moment().toDate() } });

  // trigger event change post info
  eventManager.emit(EVENTS.CHANGE_POST_INFO, { postIds, dirtyKeys: ['updatedAt', 'status'] });

  if (isSendNotification && postsUpdate.result.nModified === posts.length) {
    posts.map((post) => {
      const stylistId = post && post._p_stylist ? post._p_stylist.split('$')[1] : undefined;
      PostModel.sendNotificationToStylist(stylistId);
    });
  }
};

PostModel.unPublishedPostByMenuIdByStylists = async (menuId, stylistIds, isSendNotification) => {
  const db = await mongoDB.getMongoDB();
  let posts = [];
  const stylistPoints = stylistIds.map((id) => `Stylist$${id}`);
  const query = {
    status: STATUS.PUBLISHED,
    _p_stylist: {
      $in: stylistPoints,
    },
    'menus.objectId': menuId,
  };
  if (isSendNotification) {
    posts = await db.collection('Post').find(query).toArray();
  }
  const postsUpdate = await db.collection('Post').updateMany(query, { $set: { status: STATUS.UNPUBLISHED } });

  if (isSendNotification && postsUpdate.result.nModified === posts.length) {
    posts.map((post) => {
      const stylistId = post && post._p_stylist ? post._p_stylist.split('$')[1] : undefined;
      PostModel.sendNotificationToStylist(stylistId);
    });
  }
};

PostModel.sendNotificationToStylist = async (stylistId) => {
  if (notificationService) {
    const requestUser = await getStylistUser(stylistId);
    const stylistReceiver = { id: requestUser.id, role: USER_ROLE.STYLIST };
    const stylistTemplateName = NOTIFICATION_TEMPLATES.POST_CHANGE_TO_UNPUBLISHED_BY_CHANGE_MENU;

    notificationService.saveAndSendNotificationWithTemplate(
      Helper.createContextFromRequestUser(requestUser),
      [stylistReceiver],
      stylistTemplateName,
      {},
      { isPush: false, isSave: true },
    );
  }
};

PostModel.migratePostHasInvalidMenu = async () => {
  const checkInvalidMenu = async (stylistId, menuIds, db) => {
    const numberValidMenus = await db
      .collection('Menu')
      .find({
        _id: {
          $in: menuIds,
        },
        status: 'PUBLISHED',
        assignedStylistIds: stylistId,
      })
      .count();
    if (numberValidMenus === menuIds.length) return true;
    return false;
  };
  const processPost = async (post, db) => {
    const postTestIds = post.menus.map((menu) => menu.objectId);
    const stylistId = post._p_stylist.split('$')[1];
    const isPostHasInvalidMenu = await checkInvalidMenu(stylistId, postTestIds, db);
    if (!isPostHasInvalidMenu) {
      return post._id;
    }
    return '';
  };

  const db = await mongoDB.getMongoDB();
  const total = await db
    .collection('Post')
    .find({
      status: 'PUBLISHED',
    })
    .count();
  console.log('total published post', total);

  const menuUnpublished = await db
    .collection('Menu')
    .find({
      status: {
        $in: ['UNPUBLISHED', 'DELETED'],
      },
    })
    .project({
      _id: 1,
    })
    .toArray();
  const menuUnpublishedIDs = menuUnpublished.map((menu) => menu._id);

  const postHasUnpublishedMenu = await db
    .collection('Post')
    .find({
      status: 'PUBLISHED',
      'menus.objectId': {
        $in: menuUnpublishedIDs,
      },
    })
    .project({
      _id: 1,
    })
    .toArray();
  const postHasUnpublishedMenuIds = postHasUnpublishedMenu.map((post) => post._id);

  console.log('post has menu unpublished', postHasUnpublishedMenuIds.length);

  const postDataHasMenuUnassign = await db
    .collection('Post')
    .find({
      _id: {
        $nin: postHasUnpublishedMenuIds,
      },
      status: 'PUBLISHED',
    })
    .toArray();
  const postDataHasMenuUnassignPromise = [];
  for (let i = 0; i < postDataHasMenuUnassign.length; i++) {
    postDataHasMenuUnassignPromise.push(processPost(postDataHasMenuUnassign[i], db));
  }
  const result = await Promise.all(postDataHasMenuUnassignPromise);
  const postHasMenuUnassign = result.filter((value) => value !== '');
  console.log('post has menu stylist unassign', postHasMenuUnassign.length);

  const totalPostNeedUnpublished = postHasMenuUnassign.concat(postHasUnpublishedMenuIds);

  console.log('totalPostNeedUnpublished', totalPostNeedUnpublished);

  await db.collection('Post').updateMany(
    {
      _id: {
        $in: totalPostNeedUnpublished,
      },
    },
    {
      $set: {
        status: 'UNPUBLISHED',
      },
    },
  );
  return {
    total,
    postHasMenuUnassign,
    postHasUnpublishedMenuIds,
    totalPostNeedUnpublished,
  };
};

PostModel.getPostInfoByIds = async ({ postIds }) => {
  const query = BaseQuery.getPostQuery();
  query.containedIn('objectId', postIds);
  return query.find({ useMasterKey: true });
};

PostModel.getLastPosts = async ({ stylistId }) => {
  const query = BaseQuery.getPostQuery();
  query.select(['images', 'totalPrice', 'updatedAt']);
  query.equalTo('status', STATUS.PUBLISHED);
  query.equalTo('stylist', Helper.getPointerValue('Stylist', stylistId));
  query.descending('updatedAt');
  query.limit(4);
  return query.find({ useMasterKey: true });
};

PostModel.getStylistIdsHasAvailablePost = async () => {
  const db = await mongoDB.getMongoDB();
  return db
    .collection('Post')
    .aggregate([
      {
        $match: {
          status: STATUS.PUBLISHED,
        },
      },
      {
        $group: {
          _id: '$_p_stylist',
        },
      },
      {
        $project: {
          _id: { $substr: ['$_id', 'Stylist$'.length, -1] },
        },
      },
    ])
    .toArray();
};

PostModel.getHashtagsByCustomer = async ({ searchKey = '' }) => {
  const db = await mongoDB.getMongoDB();
  const list = await db
    .collection('Post')
    .aggregate([
      {
        $match: {
          status: STATUS.PUBLISHED,
          'stylistObject.status': STATUS.PUBLISHED,
          requestDeleting: {
            $exists: false,
          },
        },
      },
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      {
        $match: {
          tags: { $regex: convertSpecialCharacterForMongo(searchKey) },
        },
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, count: 1, tag: '$_id' } },
      {
        $addFields: {
          indexSort: { $indexOfCP: ['$tag', searchKey] },
          tagSort: { $toLower: '$tag' },
        },
      },
      {
        $sort: {
          indexSort: 1,
          tagSort: 1,
        },
      },
      { $project: { count: 1, tag: 1 } },
    ])
    .toArray();
  return {
    total: list.length,
    list,
  };
};

PostModel.getPostsByHashtag = async (params, requestUser, opts = {}) => {
  const { tags, status = [STATUS.PUBLISHED], ...pagingParams } = params;
  const { selectFields = DefaultSelectFields.POST } = opts;
  const postQuery = BaseQuery.getPostQuery();
  postQuery.containedIn('status', status);
  postQuery.equalTo('stylistObject.status', STATUS.PUBLISHED);
  postQuery.doesNotExist('requestDeleting');
  postQuery.containsAll('tags', tags);
  postQuery.include('menus', 'products');
  postQuery.select(selectFields);
  Helper.queryPagingHandler(postQuery, pagingParams);

  const role = !requestUser ? USER_ROLE.CUSTOMER : requestUser.get('role');
  const customerId = requestUser && requestUser.get('customer') ? requestUser.get('customer').id : undefined;

  const [postParses, total] = await Promise.all([postQuery.find({ useMasterKey: true }), postQuery.count()]);
  return {
    total,
    list: postParses.map((postParse) => buildPostInfo(postParse, role, selectFields, customerId)),
  };
};
