const ReviewFunctions = {};
module.exports = ReviewFunctions;

const yup = require('yup');
const { generalConfig } = require('../../config');
const { USER_ROLE } = require('../../const/Constants');
const Validation = require('../../utils/validation');
const { ReviewModel } = require('../models');
const reviewService = require('./../services/Review');
const Helper = require('../../utils/helper');

Object.assign(ReviewFunctions, {
  createReview: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      generalScore: yup.number().integer().min(1).required(),
      styleScore: yup.number().integer().min(1).required(),
      serviceScore: yup.number().integer().min(1).required(),
      comment: yup.string().trim().optional(),
    });
    const platform = Helper.getPlatformInfo(request.headers);
    payload.platform = platform;
    return ReviewModel.createReview(payload, request);
  },

  getReviewListByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
      searchKey: yup.string().trim().optional(),
    });

    return ReviewModel.getReviewListByAdmin(payload);
  },

  getReviewList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return ReviewModel.getReviewList(payload);
  },

  getReviewDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      reviewId: yup.string().trim().required(),
    });

    return ReviewModel.getReviewDetail(payload);
  },

  checkIsReviewedBooking: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });
    return ReviewModel.checkIsReviewedBooking(payload.bookingId);
  },

  migrateOldReview: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return await reviewService.migrateOldReview();
  },
  deleteReview: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      reviewId: yup.string().trim().required(),
    });
    return ReviewModel.deleteReview(payload);
  },
});
