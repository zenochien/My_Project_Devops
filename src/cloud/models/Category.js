const CategoryModel = {};
module.exports = CategoryModel;

const _forEach = require('lodash/forEach');
const { STATUS, USER_ROLE } = require('../../const/Constants');
const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const mongoDB = require('../../db/mongoDB');
const MenuModel = require('../models/Menu');
const PostModel = require('./Post');

const DefaultSelectFields = require('../../const/DefaultSelectFields');

/** CATEGORY STATUS:
 *
 * Status list: [PUBLISHED, UNPUBLISHED]
 * Status rules:
 * - ADMIN can see [PUBLISHED, UNPUBLISHED]
 * - SALON and CUSTOMER can see [PUBLISHED]
 */

const checkExistingCategory = async (name, currentId = '') => {
  const existingCategoryQuery = BaseQuery.getCategoryQuery();
  existingCategoryQuery.equalTo('name', name);
  const existingCategory = await existingCategoryQuery.first({ useMasterKey: true });
  if (existingCategory && existingCategory.id !== currentId) {
    const { code, message } = Errors.DUPLICATE_VALUE;
    throw new Parse.Error(code, message);
  }
  return name;
};

const buildCategoryInfo = (categoryParse) => {
  return Helper.convertParseObjectToJson(categoryParse);
};

CategoryModel.createCategory = async (params) => {
  const { name } = params;

  await checkExistingCategory(name);

  const newCategory = new Parse.Object('Category', { name, status: STATUS.PUBLISHED });
  const result = await newCategory.save(null, { useMasterKey: true });
  return buildCategoryInfo(result);
};

/**
 * Update category fields except status
 */
CategoryModel.updateCategory = async (params) => {
  const { categoryId, ...updatedInfos } = params;

  if (updatedInfos.name) {
    await checkExistingCategory(updatedInfos.name, categoryId);
  }

  const categoryQuery = BaseQuery.getCategoryQuery();
  categoryQuery.select(DefaultSelectFields.CATEGORY);
  const categoryObject = await categoryQuery.get(categoryId);

  _forEach(updatedInfos, (value, key) => {
    if (key !== 'status') {
      categoryObject.set(key, value);
    }
  });

  const result = await categoryObject.save(null, { useMasterKey: true });
  return buildCategoryInfo(result);
};

CategoryModel.getCategoryList = async ({ user, ...pagingParams }) => {
  const categoryQuery = BaseQuery.getCategoryQuery();
  categoryQuery.select('status', 'name');
  if (!user || user.get('role') !== USER_ROLE.ADMIN) {
    categoryQuery.equalTo('status', STATUS.PUBLISHED);
  }
  Helper.queryPagingHandler(categoryQuery, pagingParams);
  const [categories, total] = await Promise.all([categoryQuery.find({ useMasterKey: true }), categoryQuery.count()]);
  return {
    total,
    list: categories.map((category) => buildCategoryInfo(category)),
  };
};

CategoryModel.changeCategoryPublishStatus = async (params, requestUser) => {
  const { categoryId } = params;
  const categoryQuery = BaseQuery.getCategoryQuery();
  categoryQuery.select('status');
  categoryQuery.containedIn('status', [STATUS.PUBLISHED, STATUS.UNPUBLISHED]);
  const categoryParse = await categoryQuery.get(categoryId, { useMasterKey: true });

  const prevStatus = categoryParse.get('status');
  if (prevStatus === STATUS.PUBLISHED) {
    categoryParse.set('status', STATUS.UNPUBLISHED);
  } else if (prevStatus === STATUS.UNPUBLISHED) {
    categoryParse.set('status', STATUS.PUBLISHED);
  }

  await categoryParse.save(null, { useMasterKey: true });

  const newStatus = categoryParse.get('status');

  const menuNeedUnpublishedIds = await MenuModel.changeStatusMenuByCategoryStatus(categoryId, newStatus);

  if (newStatus === STATUS.UNPUBLISHED) {
    await PostModel.unPublishedPostByMenuIds(undefined, menuNeedUnpublishedIds, true);
  }

  return CategoryModel.getCategoryDetail({ categoryId });
};

CategoryModel.getCategoryDetail = async (params) => {
  const { categoryId } = params;

  const categoryQuery = BaseQuery.getCategoryQuery();
  categoryQuery.notEqualTo('status', STATUS.DELETED);
  categoryQuery.select(DefaultSelectFields.CATEGORY);

  const categoryParse = await categoryQuery.get(categoryId, { useMasterKey: true });
  return buildCategoryInfo(categoryParse);
};

CategoryModel.migrateStatusMenuByCategoryPubslished = async () => {
  const db = await mongoDB.getMongoDB();

  const categorys = await db
    .collection('Category')
    .find({
      status: STATUS.PUBLISHED,
    })
    .project({
      _id: 1,
    })
    .toArray();

  const categoryIds = categorys.map((value) => `Category$${value._id}`);

  const menuNeedPublished = await db
    .collection('Menu')
    .find({
      _p_category: {
        $in: categoryIds,
      },
      status: STATUS.UNPUBLISHED,
    })
    .project({
      _id: 1,
    })
    .toArray();
  const menuNeedPublishedIds = menuNeedPublished.map((value) => value._id);

  await db.collection('Menu').updateMany(
    {
      _id: {
        $in: menuNeedPublishedIds,
      },
    },
    {
      $set: {
        status: STATUS.PUBLISHED,
      },
    },
  );

  console.log('List menuIds need publish', menuNeedPublishedIds);

  return { menuNeedPublishedIds, categoryIds };
};
