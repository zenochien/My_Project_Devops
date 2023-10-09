const BookingFunctions = {};
module.exports = BookingFunctions;

const yup = require('yup');
const { generalConfig } = require('../../config');
const {
  USER_ROLE,
  REGEX,
  PAYMENT_STATUSES,
  BOOKING_STATUSES,
  EVENTS,
  BOOKING_STATUS_EXTEND,
} = require('../../const/Constants');
const Errors = require('../../const/Errors');
const Helper = require('./../../utils/helper');
const Validation = require('../../utils/validation');
const { BookingModel } = require('../models');
// const eventManagement = require('../../utils/Event');
const bookingService = require('../services/Booking');

Object.assign(BookingFunctions, {
  createBooking: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().required(),
      menus: yup.array().of(yup.string().trim()).min(1).required(),
      serviceDateTime: yup.string().trim().matches(REGEX.DATE_TIME).required(),
      cardId: yup.string().trim().required(),
      couponCode: yup.string().trim().optional(),
      visitedSalon: yup.boolean().optional(),
      customerPhoneNumber: yup.string().trim().optional(),
      customerNote: yup.string().trim().max(200).optional(),
    });
    const platform = Helper.getPlatformInfo(request.headers);
    payload.platform = platform;
    return BookingModel.createBooking(payload, request.user);
  },

  confirmBooking: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      stylistId: yup.string().trim().optional(),
    });
    if (request.user.get('role') === USER_ROLE.STYLIST) {
      payload.stylistId = undefined;
    }

    return BookingModel.confirmBooking(payload, request.user);
  },

  cancelBookingByCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      cancelNote: yup.string().trim().optional(),
    });

    return BookingModel.cancelBookingByCustomer(payload, request.user);
  },

  cancelBookingByOperator: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      cancelNote: yup.string().trim().optional(),
    });

    return BookingModel.cancelBooking(payload, request.user);
  },

  cancelBookingByStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      cancelNote: yup.string().trim().optional(),
    });

    return BookingModel.cancelBooking(payload, request.user);
  },

  cancelBookingByJob: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      secretKey: yup.string().trim().optional(),
      bookingId: yup.string().trim().required(),
      cancelNote: yup.string().trim().optional(),
    });

    if (payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }

    return BookingModel.cancelBooking(payload, request.user);
  },

  rechargeBooking: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });

    return BookingModel.rechargeBooking(payload, request.user);
  },

  updateBookingCard: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      cardId: yup.string().trim().required(),
    });

    return BookingModel.updateBookingCard(payload, request.user);
  },

  completeBooking: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
      isArrived: yup.boolean().optional(),
      isWithPayment: yup.boolean().optional(),
      paymentNote: yup.string().trim().when('isWithPayment', {
        is: false,
        then: yup.string().required(),
        otherwise: yup.string().optional(),
      }),
      menus: yup.array().of(yup.string().trim()).min(1).optional(),
      newMenus: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().required(),
            isNew: yup.boolean().required(),
            newPrice: yup.number().integer().min(1).optional(),
            memo: yup.string().optional(),
          }),
        )
        .min(1)
        .optional(),
    });

    return BookingModel.completeBooking(payload, request.user);
  },

  getBookingDetail: async (request) => {
    Validation.requireRoles(request, [
      USER_ROLE.CUSTOMER,
      USER_ROLE.SALON_OPERATOR,
      USER_ROLE.STYLIST,
      USER_ROLE.ADMIN,
    ]);

    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });

    return BookingModel.getBookingDetail(payload, request.user);
  },

  getBookingList: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      bookingStatuses: yup.array().of(yup.string().trim().oneOf(BOOKING_STATUSES)).min(1).optional(),
      paymentStatuses: yup.array().of(yup.string().trim().oneOf(PAYMENT_STATUSES)).min(1).optional(),
      searchKey: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
      fromCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
      toCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
    });

    return BookingModel.getBookingList(payload, request.user);
  },

  getBookingStats: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    return BookingModel.getBookingStats(request.user);
  },

  getIncompleteBooking: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST]);
    const params = {};
    if (request.user.get('role') === USER_ROLE.CUSTOMER) {
      params.customerId = request.user.get('customer').id;
    }
    if (request.user.get('role') === USER_ROLE.STYLIST) {
      params.stylistId = request.user.get('stylist').id;
    }
    const totalIncompleteBooking = await BookingModel.countInCompletedBooking(params);
    return {
      incompleteBooking: totalIncompleteBooking,
    };
  },

  stylistRemoveCoupon: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });
    await BookingModel.removeCoupon({ stylistId: request.user.get('stylist').id, bookingId: payload.bookingId });
    return { status: 'success' };
  },

  operatorRemoveCoupon: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);
    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });
    await BookingModel.removeCoupon({ salonId: request.user.get('salon').id, bookingId: payload.bookingId });
    return { status: 'success' };
  },

  remindConfirmingBooking: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      secretKey: yup.string().trim().optional(),
    });

    if (payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }

    return BookingModel.remindConfirmingBooking();
  },

  /*testPayout: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      bookingId: yup.string().trim().required(),
    });
    const bookingDetail = await BookingModel.getBookingDetail(payload, request.user);
    const eventData = {
      bookingId: bookingDetail.objectId,
      originalPrice: bookingDetail.originalPrice,
      stylistId: bookingDetail.stylist.objectId,
      salonId: bookingDetail.salon.objectId,
    };
    console.log('---------->', eventData);
    eventManagement.emit(EVENTS.PAYMENT_SUCCESS, eventData);
    return bookingDetail;
  },*/

  markBookingNeedMigratePayment: async (request) => {
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    const payload = Validation.checkRequestParams(request, {
      startDate: yup.string().trim().matches(REGEX.DATE_ISO).required(),
      endDate: yup.string().trim().matches(REGEX.DATE_ISO).required(),
    });
    return await bookingService.markBookigNeedMigartePayment(payload);
  },

  reDepositPaymentForOldBooking: async (request) => {
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return await bookingService.reDepositPayment();
  },

  migrateBookingStatusExtend: async (request) => {
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return await bookingService.migrateBookingStatusExtend();
  },

  getBookingListByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      searchKey: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      fromCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
      toCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
      fromServiceDateTime: yup.string().trim().matches(REGEX.DATE).optional(),
      toServiceDateTime: yup.string().trim().matches(REGEX.DATE).optional(),
      bookingStatuses: yup.array().of(yup.string().trim().oneOf(BOOKING_STATUSES)).min(1).optional(),
      bookingStatusExtends: yup
        .array()
        .of(yup.string().trim().oneOf(Object.keys(BOOKING_STATUS_EXTEND)))
        .min(1)
        .optional(),
    });

    return BookingModel.getBookingListByAdmin(payload, request.user);
  },
});
