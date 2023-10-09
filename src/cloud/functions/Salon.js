const SalonFunctions = {};
module.exports = SalonFunctions;

const yup = require('yup');

const { USER_ROLE, REGEX, STATUS, TYPE_BANK_ACCOUNT } = require('../../const/Constants');
const { SalonModel, MenuModel, StylistModel, HoldingCompanyModel } = require('../models');
const Validation = require('../../utils/validation');
const { INVALID_SALON_NAME, SCHEDULE_ATLEAST_ERROR } = require('../../const/Errors');
const salonService = require('../services/Salon');
const stylistService = require('../services/Stylist');
const depositPaymentService = require('../services/DepositPayment');
const { generalConfig } = require('../../config');

Object.assign(SalonFunctions, {
  getSalonDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      objectId: yup.string().required(),
    });

    return await SalonModel.getSalonDetail(payload);
  },

  getSalonList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      objectIds: yup.array().of(yup.string().trim()).optional(),
      searchKey: yup.string().optional(),
      orderBy: yup.string().optional(),
      order: yup.string().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return await SalonModel.getSalonList(payload);
  },

  adminUpdateSalonInfo: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      objectId: yup.string().required(),
      salonName: yup.string().trim().max(50).required(),
      holdingCompanyId: yup.string().trim().optional(),
    });

    return await SalonModel.updateSalonInfo({ ...payload, user: request.user });
  },

  updateSalonInfo: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const { code: salonNameErrorCode } = INVALID_SALON_NAME;
    const { code: scheduleErrorcode } = SCHEDULE_ATLEAST_ERROR;

    const schemaDailySchedule = yup
      .object()
      .shape({
        startTime: yup.string().matches(REGEX.HOUR_MINUTE).optional(),
        endTime: yup.string().matches(REGEX.HOUR_MINUTE).optional(),
      })
      .optional();

    const payload = Validation.checkRequestParams(request, {
      objectId: yup.string().required(),
      salonName: yup.string().trim().max(50).matches(REGEX.SALON_NAME, `${salonNameErrorCode}`).required(),
      salonNameKatakana: yup.string().trim().max(50).matches(REGEX.SALON_NAME, `${salonNameErrorCode}`).required(),
      salonImage: yup.string().required(),
      salonCatchphrase: yup.string().max(100).optional(),
      phone: yup.string().max(13).required(),
      postalCode: yup.string().matches(REGEX.POSTALCODE).required(),
      salonAddress1: yup.string().required(),
      salonAddress2: yup.string().max(30).required(),
      salonAddress3: yup.string().max(30).required(),
      salonAddress4: yup.string().max(30).optional(),
      salonDirection: yup.string().max(300).optional(),
      salonNote: yup.string().max(200).optional(),
      salonStaffsNumber: yup.number().integer().min(0).nullable().optional(),
      salonSchedules: yup
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
      salonHolidays: yup
        .object()
        .shape({
          //use moment format for day of week https://momentjs.com/docs/#/get-set/weekday/
          weekdays: yup.array().of(yup.number().integer().min(0).max(6)).ensure().max(6),
          holidays: yup.array().of(yup.string().matches(REGEX.MONTHDATE)).ensure(),
          texts: yup.string().max(50).trim(),
        })
        .optional(),
      salonSeatsNumber: yup.number().integer().min(0).nullable().optional(),
      salonOtherNote: yup.string().max(1000).optional(),
      salonPayments: yup.string().max(50).optional(),
      salonSNS: yup
        .object()
        .shape({
          facebook: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          instagram: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          tiktok: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          twitter: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
          youtube: yup.string().matches(REGEX.NOT_WHITESPACE).optional(),
        })
        .optional(),
      stationName: yup.string().max(10).optional(),
      distanceNearestStation: yup.number().integer().min(1).max(30).optional(),
    });

    return await SalonModel.updateSalonInfo({ ...payload, user: request.user });
  },

  customerGetSalonDetailPage: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().required(),
      limit: yup.number().integer().min(1).optional(),
    });

    const { salonId, limit = 1000 } = payload;

    const salonDetail = await SalonModel.getSalonDetail({ objectId: salonId });

    const paramsWithPaging = { ...payload, status: STATUS.PUBLISHED, page: 1, limit };

    const stylistList = await StylistModel.getStylistList(paramsWithPaging, request.user, {
      selectFields: [
        'salon',
        'salon.salonName',
        'salon.slug',
        'fullName',
        'nickName',
        'slug',
        'profileImages',
        'generalScore',
        'styleScore',
        'serviceScore',
        'reviewCount',
        'isOfficial',
      ],
    });

    const categories = await MenuModel.getPublishedMenusGroupedByCategory(payload);

    return {
      salon: salonDetail,
      categories,
      stylists: stylistList.list,
    };
  },

  getStaffsScheduleOfSalonDayView: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().required(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      sort: yup.string().trim().optional(),
      date: yup.string().trim().matches(REGEX.DATE).required(),
    });

    return SalonModel.getStaffsScheduleOfSalonDayView(payload, request.user);
  },

  getStaffsScheduleOfSalonWeekView: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().required(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      sort: yup.string().trim().optional(),
      from: yup.string().trim().matches(REGEX.DATE).required(),
      to: yup.string().trim().matches(REGEX.DATE).required(),
    });

    return SalonModel.getStaffsScheduleOfSalonWeekView(payload, request.user);
  },
  assignMenusToStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      menuIds: yup.array().of(yup.string().trim()).optional(),
    });
    return salonService.assignMenusToStylist(payload);
  },
  salonSetMaxConfirmedBookingCount: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      max: yup.number().integer().min(1).max(10).required(),
    });
    await stylistService.setMaxConfirmedBookingCount(payload);
    return { status: 'success' };
  },

  salonUpdateBankInfo: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const payload = Validation.checkRequestParams(request, {
      bankId: yup.string().trim().required(),
      branchId: yup.string().trim().required(),
      type: yup
        .string()
        .trim()
        .oneOf([TYPE_BANK_ACCOUNT.CHECKING_ACCOUNT, TYPE_BANK_ACCOUNT.SAVING_ACCOUNT])
        .required(),
      accountName: yup.string().trim().max(20).required(),
      accountNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'AccountNumber must be only digits')
        .length(7)
        .required(),
    });
    payload.salonId = request.user.get('salon').id;
    const bankInfo = await salonService.updateBankInfo(payload);
    return { bankInfo };
  },

  syncAllSalonToPayoutService: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return await salonService.syncAllSalonToPayoutService();
  },

  generatePayout: async (request) => {
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    const payload = Validation.checkRequestParams(request, {
      startDate: yup.string().trim().matches(REGEX.DATE_ISO).required(),
      salonId: yup.string().trim().optional(),
    });
    return await salonService.generatePayout(payload);
  },

  retryDepositPayment: async (request) => {
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return await depositPaymentService.retryDepositPayment();
  },

  getSalonsByHoldingCompanyByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      holdingCompanyId: yup.string().trim().optional(),
      searchKey: yup.string().optional(),
      orderBy: yup.string().optional(),
      order: yup.string().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });
    if (payload.holdingCompanyId) {
      await HoldingCompanyModel.getHoldingCompanyById(payload.holdingCompanyId);
    }
    return await SalonModel.getSalonsByHoldingCompanyByAdmin(payload);
  },

  migratedSalonForSalonEarning: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    await salonService.migratedSalonForSalonEarning();
    return {
      sucess: true,
    };
  },
});
