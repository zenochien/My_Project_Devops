const BannerFunctions = {};
module.exports = BannerFunctions;

const yup = require('yup');

const { BannerModel } = require('../models');
const Validation = require('../../utils/validation');
const { STATUS, USER_ROLE } = require('../../const/Constants');

Object.assign(BannerFunctions, {
  getBannerList: async () => {
    const params = {
      status: [STATUS.PUBLISHED],
    };
    return BannerModel.getBannerList(params);
  },
  createBanner: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      imageId: yup.string().trim().required(),
      status: yup.string().trim().optional(),
      sortOrder: yup.number().optional(),
    });
    return BannerModel.createBanner(payload);
  },

  updateBanner: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      id: yup.string().trim().required(),
      imageId: yup.string().trim().optional(),
      status: yup.string().trim().optional(),
      sortOrder: yup.number().optional(),
    });
    return BannerModel.updateBanner(payload);
  },
});
