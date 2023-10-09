const RecommendationService = require('../services/Recommendation');
const { USER_ROLE, RECOMMENDATION_FILLTER, STATUS } = require('../../const/Constants');
const { RECOMMENDATION_SAME_PERSON, RECOMMENDATION_DUPLICATE_PERSON } = require('../../const/Errors');
const { generalConfig } = require('../../config');
const Validation = require('../../utils/validation');
const yup = require('yup');

const RecommendationFunctions = {};
RecommendationFunctions.createRecommendation = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const { message } = RECOMMENDATION_SAME_PERSON;
  const payload = Validation.checkRequestParams(request, {
    contributorId: yup.string().trim().required(),
    receiverId: yup
      .string()
      .required()
      .test('same-person', message, function (value) {
        return this.parent.contributorId !== value;
      }),
    title: yup.string().trim().max(25).required(),
    content: yup.string().trim().max(200).required(),
  });

  return RecommendationService.create(payload);
};

RecommendationFunctions.updateRecommendation = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const { message } = RECOMMENDATION_SAME_PERSON;
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
    contributorId: yup.string().trim().required(),
    receiverId: yup
      .string()
      .required()
      .test('same-person', message, function (value) {
        return this.parent.contributorId !== value;
      }),
    title: yup.string().trim().max(25).required(),
    content: yup.string().trim().max(200).required(),
  });

  return RecommendationService.update(payload);
};

RecommendationFunctions.getRecommendationByAdmin = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    fillter: yup.string().trim().optional(),
    fillterBy: yup.string().trim().oneOf(RECOMMENDATION_FILLTER).optional(),
    orderBy: yup.string().trim().optional(),
    order: yup.string().trim().optional(),
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });

  return RecommendationService.getRecommendationByAdmin(payload);
};

RecommendationFunctions.deleteRecommendationByAdmin = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
  });

  return RecommendationService.deleteRecommendationByAdmin(payload);
};

RecommendationFunctions.getRecommendationByCustomer = async (request) => {
  const payload = Validation.checkRequestParams(request, {
    orderBy: yup.string().trim().optional(),
    order: yup.string().trim().optional(),
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });

  const customerId = request.user && request.user.get('customer') ? request.user.get('customer').id : undefined;

  return RecommendationService.getRecommendationByCustomer({
    ...payload,
    customerId,
  });
};

RecommendationFunctions.getRecommendationForAStylist = async (request) => {
  const payload = Validation.checkRequestParams(request, {
    stylistId: yup.string().trim().required(),
    orderBy: yup.string().trim().optional(),
    order: yup.string().trim().optional(),
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });

  return RecommendationService.getRecommendationForAStylist(payload);
};

RecommendationFunctions.setTopBannerForStylist = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
    stylistId: yup.string().trim().required(),
  });

  await RecommendationService.setTopBannerForStylist(payload);
  return { status: 'success' };
};

RecommendationFunctions.getStylistBannersByAdmin = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    orderBy: yup.string().trim().optional(),
    order: yup.string().trim().optional(),
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });

  return RecommendationService.getStylistBannersByAdmin(payload);
};

RecommendationFunctions.updateStatusTopBannerByAdmin = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
    status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).required(),
  });

  return RecommendationService.updateStatusTopBannerByAdmin(payload);
};

RecommendationFunctions.deleteTopBannerByAdmin = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
  });

  return RecommendationService.deleteTopBannerByAdmin(payload);
};

RecommendationFunctions.getTopBannerDetail = async (request) => {
  // Validation.requireRoles(request, [USER_ROLE.ADMIN]);
  const payload = Validation.checkRequestParams(request, {
    recommendationId: yup.string().trim().required(),
    stylistId: yup.string().trim().required(),
  });

  return await RecommendationService.getTopBannerDetail(payload);
};

RecommendationFunctions.getTopBannerStylistForHomePage = async () => {
  return await RecommendationService.getTopBannerStylistForHomePage();
};
RecommendationFunctions.migrateRecommendationForStylist = async (request) => {
  if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
    throw new Parse.Error(9502, 'Wrong secret key');
  }
  return await RecommendationService.migrateRecommendationForStylist();
};

RecommendationFunctions.migrateStylistDataForOldRecommendation = async (request) => {
  const payload = request.params;
  if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
    throw new Parse.Error(9502, 'Wrong secret key');
  }
  await RecommendationService.migrateStylistDataForOldRecommendation();
  return {
    sucess: true,
  };
};

RecommendationFunctions.migrateSalonDataForOldRecommendation = async (request) => {
  const payload = request.params;
  if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
    throw new Parse.Error(9502, 'Wrong secret key');
  }
  await RecommendationService.migrateSalonDataForOldRecommendation();
  return {
    sucess: true,
  };
};

module.exports = RecommendationFunctions;
