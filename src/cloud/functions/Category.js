const CategoryFunctions = {};
module.exports = CategoryFunctions;

const yup = require('yup');

const { USER_ROLE, STATUS } = require('../../const/Constants');
const { CategoryModel } = require('../models');
const Validation = require('../../utils/validation');

const Errors = require('./../../const/Errors');
const { generalConfig } = require('../../config');

Object.assign(CategoryFunctions, {
  createCategory: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      name: yup.string().trim().max(50).required(),
    });

    return await CategoryModel.createCategory(payload);
  },

  updateCategory: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      categoryId: yup.string().trim().required(),
      name: yup.string().trim().max(50).required(),
    });

    return await CategoryModel.updateCategory(payload);
  },

  getCategoryList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().optional(),
      order: yup.string().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return await CategoryModel.getCategoryList({ ...payload, user: request.user });
  },

  changeCategoryPublishStatus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      categoryId: yup.string().trim().required(),
    });

    return CategoryModel.changeCategoryPublishStatus(payload, request.user);
  },

  migrateStatusMenuByCategoryPubslished: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return CategoryModel.migrateStatusMenuByCategoryPubslished();
  },
});
