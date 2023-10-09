const HashtagFunctions = {};
module.exports = HashtagFunctions;

const yup = require('yup');

const HashtagModel = require('../models/Hashtag');
const Validation = require('../../utils/validation');
const { STATUS, USER_ROLE, PLATFORM } = require('../../const/Constants');

Object.assign(HashtagFunctions, {
  getHashtagList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      status: yup.string().trim().optional(),
      orderBy: yup.string().optional(),
      order: yup.string().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      platform: yup
        .array()
        .of(yup.string().trim().oneOf([PLATFORM.MOBILE, PLATFORM.WEB]).required())
        .min(1)
        .optional(),
    });
    return HashtagModel.getHashtagList(payload);
  },
  createHashtag: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      imageId: yup.string().trim().required(),
      status: yup.string().trim().optional(),
      name: yup.string().trim().optional(),
      sortOrder: yup.number().optional(),
      platform: yup
        .array()
        .of(yup.string().trim().oneOf([PLATFORM.MOBILE, PLATFORM.WEB]).required())
        .min(1)
        .optional(),
      totalPost: yup.number().optional(),
    });
    return HashtagModel.createHashtag(payload);
  },

  updateHashtag: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      id: yup.string().trim().required(),
      imageId: yup.string().trim().optional(),
      status: yup.string().trim().optional(),
      sortOrder: yup.number().optional(),
      platform: yup
        .array()
        .of(yup.string().trim().oneOf([PLATFORM.MOBILE, PLATFORM.WEB]).required())
        .min(1)
        .optional(),
      totalPost: yup.number().optional(),
    });
    return HashtagModel.updateHashtag(payload);
  },
});
