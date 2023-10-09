const StylistFunctions = {};
module.exports = StylistFunctions;

const yup = require('yup');

const Helper = require('./../../utils/helper');
const _ = require('lodash');
const { USER_ROLE, STATUS, REGEX, GENDER } = require('../../const/Constants');
const { SCHEDULE_ATLEAST_ERROR, INVALID_PARAMS } = require('../../const/Errors');
const Errors = require('../../const/Errors');
const Validation = require('../../utils/validation');
const { StylistModel, PostModel, MenuModel, UserModel, BookingModel } = require('../models');
const ParseConfig = require('../ParseConfig');
const StylistService = require('../services/Stylist');
const { generalConfig } = require('../../config');
const DefaultSelectFields = require('./../../const/DefaultSelectFields');
const stylistService = require('../services/Stylist');
const RecommendationService = require('../services/Recommendation');

const validationForProfile = {
  profileImages: yup.array().of(yup.string().trim()).min(0).max(4).optional(),
  firstName: yup.string().trim().max(10).required(),
  lastName: yup.string().trim().max(10).required(),
  nickName: yup.string().trim().max(10).required(),
  profileText: yup.string().trim().min(1).max(300).optional(),
  status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
  profile: yup.object().shape({
    jobTitle: yup.string().trim().max(30).optional(),
    experience: yup.number().integer().min(0).optional(),
    strongAssetOfSkill: yup.string().trim().max(200).optional(),
    strongAssetOfHairstyle: yup.string().trim().max(200).optional(),
    characterOfStylist: yup.string().trim().max(200).optional(),
    workDay: yup.string().trim().max(200).optional(),
    description: yup.string().trim().max(200).optional(),
    catchPhrase: yup.string().trim().max(25).required(),
  }),
  gender: yup.string().trim().oneOf(GENDER).optional(),
  stylistSNS: yup
    .object()
    .shape({
      facebook: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
      instagram: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
      tiktok: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
      twitter: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
      youtube: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
    })
    .optional(),
};
Object.assign(StylistFunctions, {
  assignMenus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      menuIds: yup.array().of(yup.string().trim().optional()).uniqueValue('Menu id must be unique'),
      isForceUpdate: yup.boolean().optional(),
    });

    const stylist = await request.user.get('stylist').fetch({ useMasterKey: true });
    return stylistService.assignMenusToStylist(payload, stylist);
  },

  createStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR]);

    const paramRules = {
      ...validationForProfile,
      salonId: yup.string().trim().optional(),
      email: yup.string().email().trim().lowercase().required(),
    };

    const userRole = request.user.get('role');
    if (userRole === USER_ROLE.ADMIN) {
      paramRules.isOfficial = yup.boolean().optional();
    }

    const payload = Validation.checkRequestParams(request, paramRules);

    await UserModel.checkEmailExists(payload.email);

    if (userRole === USER_ROLE.ADMIN && !payload.salonId) {
      const { code, message } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, message);
    }
    if (userRole === USER_ROLE.SALON_OPERATOR) {
      payload.salonId = request.user.get('salon').id;
    }

    return StylistModel.createStylist(payload, request.user);
  },

  updateStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const paramRules = {
      stylistEmail: yup.string().email().trim().lowercase().optional(),
      gender: yup.string().trim().oneOf(GENDER).optional(),
      firstName: yup.string().trim().min(1).max(10).optional(),
      lastName: yup.string().trim().min(1).max(10).optional(),
      nickName: yup.string().trim().min(1).max(10).optional(),
      profileImages: yup.array().of(yup.string().trim()).min(0).max(4).optional(),
      profileText: yup.string().trim().min(1).max(300).optional(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
      stylistSNS: yup
        .object()
        .shape({
          facebook: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          instagram: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          tiktok: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          twitter: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          youtube: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
        })
        .optional(),
    };

    paramRules.profile = yup.object().shape({
      catchPhrase: yup.string().trim().max(25).optional(),
    });

    if (request.user.get('role') !== USER_ROLE.STYLIST) {
      paramRules.stylistId = yup.string().trim().required();
    }
    const payload = Validation.checkRequestParams(request, paramRules);
    if (request.user.get('role') === USER_ROLE.STYLIST) {
      payload.stylistId = request.user.get('stylist').id;
    }

    const stylistUserParse = await UserModel.getUserFromStylistId(payload.stylistId);
    if (payload.stylistEmail) {
      if (payload.stylistEmail !== stylistUserParse.get('email')) {
        await UserModel.checkEmailExists(payload.stylistEmail, stylistUserParse.id);
      } else {
        delete payload.stylistEmail;
      }
    }
    return StylistModel.updateStylist(payload, request.user, stylistUserParse);
  },

  operatorUpdateStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const paramRules = {
      ...validationForProfile,
      stylistId: yup.string().trim().required(),
      stylistEmail: yup.string().email().trim().lowercase().optional(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    const stylistUserParse = await UserModel.getUserFromStylistId(payload.stylistId);
    if (payload.stylistEmail) {
      if (payload.stylistEmail !== stylistUserParse.get('email')) {
        await UserModel.checkEmailExists(payload.stylistEmail, stylistUserParse.id);
      } else {
        delete payload.stylistEmail;
      }
    }
    return StylistModel.updateStylist(payload, request.user, stylistUserParse);
  },

  adminUpdateStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const paramRules = {
      ...validationForProfile,
      stylistId: yup.string().trim().required(),
      isOfficial: yup.boolean().optional(),
      stylistEmail: yup.string().email().trim().lowercase().optional(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    const stylistUserParse = await UserModel.getUserFromStylistId(payload.stylistId);
    if (payload.stylistEmail) {
      if (payload.stylistEmail !== stylistUserParse.get('email')) {
        await UserModel.checkEmailExists(payload.stylistEmail, stylistUserParse.id);
      } else {
        delete payload.stylistEmail;
      }
    }
    return StylistModel.updateStylist(payload, request.user, stylistUserParse);
  },

  stylistUpdateProfile: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const paramRules = {
      ...validationForProfile,
      profile: yup.object().shape({
        jobTitle: yup.string().trim().max(30).optional(),
        experience: yup.number().integer().min(0).optional(),
        strongAssetOfSkill: yup.string().trim().max(200).optional(),
        strongAssetOfHairstyle: yup.string().trim().max(200).optional(),
        characterOfStylist: yup.string().trim().max(200).optional(),
        workDay: yup.string().trim().max(200).optional(),
        description: yup.string().trim().max(200).optional(),
        catchPhrase: yup.string().trim().max(25).optional(),
      }),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    payload.stylistId = request.user.get('stylist').id;
    const stylistUserParse = await UserModel.getUserFromStylistId(payload.stylistId);
    return StylistModel.updateStylist(payload, request.user, stylistUserParse);
  },

  updateStylistWeeklySchedule: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const { code: scheduleErrorcode } = SCHEDULE_ATLEAST_ERROR;

    const schemaDailySchedule = yup
      .array()
      .of(
        yup.object().shape({
          startTime: yup.string().trim().matches(REGEX.HOUR_MINUTE).optional(),
          endTime: yup.string().trim().matches(REGEX.HOUR_MINUTE).optional(),
        }),
      )
      .optional();

    const paramRules = {
      stylistSchedules: yup
        .object()
        .shape({
          0: schemaDailySchedule,
          1: schemaDailySchedule,
          2: schemaDailySchedule,
          3: schemaDailySchedule,
          4: schemaDailySchedule,
          5: schemaDailySchedule,
          6: schemaDailySchedule,
        })
        .required()
        .atLeastOneOf({ message: scheduleErrorcode, list: ['0', '1', '2', '3', '4', '5', '6'] }),
    };

    if (request.user.get('role') !== USER_ROLE.STYLIST) {
      paramRules.stylistId = yup.string().trim().required();
    }
    const payload = Validation.checkRequestParams(request, paramRules);

    if (request.user.get('role') === USER_ROLE.STYLIST) {
      payload.stylistId = request.user.get('stylist').id;
    }

    return StylistModel.updateStylistWeeklySchedule(payload, request.user);
  },

  updateStylistDailySchedule: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const paramRules = {
      stylistDailySchedules: yup
        .array()
        .of(
          yup.object().shape({
            dayOfWeek: yup.number().integer().min(0).max(6).required(),
            startAt: yup.string().trim().matches(REGEX.DATE_TIME).required(),
            endAt: yup.string().trim().matches(REGEX.DATE_TIME).required(),
          }),
        )
        .required(),
    };

    if (request.user.get('role') !== USER_ROLE.STYLIST) {
      paramRules.stylistId = yup.string().trim().required();
    }
    const payload = Validation.checkRequestParams(request, paramRules);

    if (request.user.get('role') === USER_ROLE.STYLIST) {
      payload.stylistId = request.user.get('stylist').id;
    }

    return StylistModel.updateStylistDailySchedule(payload, request.user);
  },

  getStylistDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      objectId: yup.string().required(),
    });

    return StylistModel.getStylistDetail(payload, request.user);
  },

  getStylistList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().optional(),
      searchKey: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
      from: yup.string().trim().matches(REGEX.DATE).optional(),
      to: yup.string().trim().matches(REGEX.DATE).optional(),
    });
    const selectFields = [
      ...DefaultSelectFields.STYLIST,
      'salon.salonAddress1',
      'salon.salonAddress2',
      'salon.stationName',
      'salon.distanceNearestStation',
      'lastPosts',
      'recommendationNumber',
      'lastContributor',
      'lastContributor.profileImages',
    ];
    return StylistModel.getStylistList(payload, request.user, { selectFields });
  },

  getStylistListByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      searchKey: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      status: yup
        .array()
        .of(yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]))
        .optional(),
    });
    return StylistModel.getStylistListByAdmin(payload, request.user);
  },

  customerGetStylistDetailPage: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      limit: yup.number().integer().min(1).optional(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
    });
    return stylistService.customerGetStylistDetailPage(payload, request.user);
  },

  getStylistAvailableSlots: async (request) => {
    // Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      dateTime: yup.string().trim().matches(REGEX.DATE_TIME).required(),
      totalDuration: yup
        .number()
        .integer()
        .multipleOf(ParseConfig.get('menuDurationMin'))
        .min(ParseConfig.get('menuDurationMin'))
        .required(),
    });

    return StylistModel.getStylistAvailableSlots(payload, undefined, true);
  },

  getStylistUnavailableDaysOfMonth: async (request) => {
    // Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      dateTime: yup.string().trim().matches(REGEX.DATE_TIME).required(),
    });

    return StylistModel.getStylistUnavailableDaysOfMonth(payload, request.user);
  },

  getAvailableStylists: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });

    return StylistModel.getAvailableStylists(payload, request.user);
  },

  getStylistScheduleMonthView: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      date: yup.string().trim().matches(REGEX.DATE).required(),
      isGetFieldIsFirstSetWeeklySchedule: yup.boolean().optional(),
    });

    return StylistModel.getStylistScheduleMonthView(payload, request.user);
  },

  getSalonScheduleAndStylistWeeklySchedule: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    return await StylistModel.getSalonScheduleAndStylistWeeklySchedule(request.user);
  },

  resendVerifyingNewEmailForStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const { stylistId } = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
    });
    const stylistUserParse = await UserModel.getUserFromStylistId(stylistId);
    if (!stylistUserParse || !stylistUserParse.get('newEmail')) {
      const { code, message } = INVALID_PARAMS;
      throw new Parse.Error(code, message);
    }
    await StylistModel.sendEmailForVerifyNewEmail({ newEmail: stylistUserParse.get('newEmail'), stylistUserParse });
    return { status: 'success' };
  },

  requestDeleteStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      password: yup.string().trim().required(),
      reasons: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().required(),
            extraInput: yup.string().optional(),
          }),
        )
        .optional(),
    });
    await Parse.User.verifyPassword(request.user.get('username'), payload.password);
    const userId = request.user.id;
    const stylistId = request.user.get('stylist').id;
    await StylistService.requestDeleteStylist({
      userId,
      stylistId,
      reasons: Helper.getDeletingAccountReasons(payload.reasons),
      email: request.user.get('email'),
    });
    return {
      status: 'success',
    };
  },

  jobDeleteStylist: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    const stylists = await StylistModel.getExpiredDeletingAccount();
    for (let i = 0; i < stylists.length; i++) {
      const stylist = stylists[i];
      const userParse = await UserModel.getUserFromStylistId(stylist.id);
      await StylistService.deleteStylist({
        userId: userParse.id,
        stylistId: stylist.id,
        email: stylist.get('stylistEmail'),
        cbStaffId: stylist.get('cbStaffId'),
      });
    }
    return { status: 'success' };
  },

  revokeDeleteStylistAccountRequest: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      password: yup.string().trim().required(),
    });
    await Parse.User.verifyPassword(request.user.get('username'), payload.password);
    const stylist = await request.user.get('stylist').fetch({ useMasterKey: true });
    await StylistService.revokeDeleteAccountRequest({ stylist });
    return { status: 'success' };
  },

  adminDeleteStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
    });
    const [stylist, userParse, incompletedBooking] = await Promise.all([
      StylistModel.getStylistById({ stylistId: payload.stylistId }),
      UserModel.getUserFromStylistId(payload.stylistId),
      BookingModel.countInCompletedBooking({ stylistId: payload.stylistId }),
    ]);
    if (incompletedBooking) {
      throw new Parse.Error(Errors.HAS_IMCOMPLETE_BOOKING.code, Errors.HAS_IMCOMPLETE_BOOKING.message);
    }
    if (stylist.get('userStatus') !== 'DELETED') {
      await StylistService.deleteStylist({
        userId: userParse.id,
        stylistId: stylist.id,
        email: stylist.get('stylistEmail'),
        cbStaffId: stylist.get('cbStaffId'),
      });
    } else {
      throw new Parse.Error(Errors.INVALID_ACTION.code, Errors.INVALID_ACTION.message);
    }
    return { status: 'success' };
  },

  jobUpdateStaffInfoAfterDeleteStylist: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return await StylistService.updateStaffInfoAfterDeleteStylist();
  },

  migrateLastPost: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return await StylistService.migrateLastPost();
  },

  getMyProfileStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    return await StylistModel.getStylistProfile({ stylistId: request.user.get('stylist').id });
  },

  adminDeleteSalon: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().required(),
    });
    await StylistService.adminDeleteSalon({ salonId: payload.salonId });
    return { status: 'success' };
  },

  stylistSetMaxConfirmedBookingCount: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      max: yup.number().integer().min(1).max(10).required(),
    });
    await StylistService.setMaxConfirmedBookingCount({ stylistId: request.user.get('stylist').id, max: payload.max });
    return { status: 'success' };
  },

  updateStylistCommissonRateByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const paramRules = {
      stylistId: yup.string().trim().required(),
      commissonRate: yup.number().min(0).max(99).optional(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    return StylistModel.updateStylistCommissonRateByAdmin(payload, request.user);
  },

  updateStylistStatusByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const paramRules = {
      stylistId: yup.string().trim().required(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).required(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    return StylistModel.updateStylistStatus(payload, request.user);
  },

  updateStylistStatusBySalon: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const paramRules = {
      stylistId: yup.string().trim().required(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).required(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    return StylistModel.updateStylistStatus(payload, request.user);
  },

  addTopStylistByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const paramRules = {
      stylistIds: yup.array().of(yup.string().trim().required()).required(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    return StylistModel.addTopStylistByAdmin(payload);
  },

  getTopStylistByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    return StylistModel.getTopStylistByAdmin();
  },

  deleteTopStylistByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const paramRules = {
      stylistIds: yup.array().of(yup.string().trim().required()).required(),
    };
    const payload = Validation.checkRequestParams(request, paramRules);
    return StylistModel.deleteTopStylistByAdmin(payload);
  },
  sortTopStylistByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      stylists: yup
        .array()
        .max(10)
        .of(
          yup.object().shape({
            objectId: yup.string().required(),
            sortOrder: yup.number().required(),
          }),
        )
        .required(),
    });
    return StylistModel.sortTopStylistByAdmin(payload);
  },
  getTopStylistByCustomer: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
    });
    const selectFields = [
      ...DefaultSelectFields.STYLIST,
      'salon.salonAddress1',
      'salon.salonAddress2',
      'salon.stationName',
      'salon.distanceNearestStation',
      'lastPosts',
      'recommendationNumber',
      'lastContributor',
      'lastContributor.profileImages',
    ];
    return StylistModel.getTopStylistByCustomer(payload, { selectFields });
  },
  getStylistScheduleForNext7Days: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
    });
    return RecommendationService.getStylistScheduleForNext7Days(payload);
  },

  migrateSalonDataForOldStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return await StylistService.migrateSalonDataForOldStylist();
  },

  getStylistListForPressPost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      searchKey: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });
    return StylistModel.getStylistListForPressPost(payload, request.user);
  },
});
