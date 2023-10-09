const MenuFunctions = {};
module.exports = MenuFunctions;

const yup = require('yup');

const { PressPostModel } = require('../models');
const PressPostService = require('./../services/PressPost');

const Validation = require('../../utils/validation');
const { generalConfig } = require('../../config');
const Errors = require('./../../const/Errors');
const { USER_ROLE, PRESS_TYPE } = require('../../const/Constants');

Object.assign(MenuFunctions, {
  getPressPostListByCustomer: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      types: yup
        .array()
        .of(yup.string().trim().oneOf(Object.keys(PRESS_TYPE)))
        .optional(),
    });

    return PressPostModel.getPressPostListByCustomer(payload, request.user);
  },

  getPressPostListByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      searchKey: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      types: yup
        .array()
        .of(yup.string().trim().oneOf(Object.keys(PRESS_TYPE)))
        .optional(),
    });

    return PressPostModel.getPressPostListByAdmin(payload, request.user);
  },

  getPressPostListByStylistId: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      stylistId: yup.string().trim().required(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });

    return PressPostModel.getPressPostListByStylistId(payload, request.user);
  },

  getPressPostDetailByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      pressPostId: yup.number().required(),
    });

    return PressPostModel.getPressPostDetailByAdmin(payload, request.user);
  },

  getPressPosts: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return PressPostService.getPressPosts();
  },

  assignedStylistsPressPostsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      pressPostId: yup.number().required(),
      assignedStylistIds: yup.array().optional(),
    });

    return PressPostModel.assignedStylistsPressPosts(payload, request.user);
  },

  migratedPressPostForStylist: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return PressPostModel.migratedPressPostForStylist();
  },
});
