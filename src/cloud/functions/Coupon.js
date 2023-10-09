const { getCouponService } = require('../../services/CouponService');
const Validation = require('../../utils/validation');
const yup = require('yup');
const { USER_ROLE, REGEX, DEFAULT_TIMEZONE } = require('../../const/Constants');
const { LARGE_AMOUNT_COUPON } = require('./../../const/Errors');
const Coupon = {};
const moment = require('moment-timezone');
const { BookingModel, StylistModel } = require('../models');

Coupon.getAnnouncements = async (request) => {
  const couponService = getCouponService();
  const payload = Validation.checkRequestParams(request, {
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });
  payload.status = 'ACTIVE';
  payload.sort = 'createdAt DESC';
  return couponService.getAnnouncementList(payload);
};

Coupon.getCoupons = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
  const couponService = getCouponService();
  const payload = Validation.checkRequestParams(request, {
    page: yup.number().integer().min(1).optional(),
    limit: yup.number().integer().min(1).optional(),
  });
  const defaultValues = {
    status: 'ACTIVE',
    customerId: request.user.get('customer').id,
    includeNullForStartStartIssue: true,
    includeNullForEndEndIssued: true,
    start: moment().tz(DEFAULT_TIMEZONE).startOf('day').toISOString(),
    end: moment().tz(DEFAULT_TIMEZONE).endOf('day').toISOString(),
  };
  return couponService.getCoupons({ ...payload, ...defaultValues });
};

Coupon.getCouponDetail = async (request) => {
  const couponService = getCouponService();
  const payload = Validation.checkRequestParams(request, {
    couponId: yup.number().integer().required(),
  });
  return couponService.getCouponDetail({ id: payload.couponId });
};

Coupon.checkCoupon = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
  const couponService = getCouponService();
  const payload = Validation.checkRequestParams(request, {
    code: yup.string().trim().required(),
    totalPrice: yup.number().required(),
    bookingDatetime: yup.string().trim().matches(REGEX.DATE_TIME).required(),
    stylistId: yup.string().trim().required(),
  });
  payload.customerId = request.user.get('customer').id;
  const stylistObject = await StylistModel.getStylistById({ stylistId: payload.stylistId });
  payload.servicerId = stylistObject.get('salon').id;
  const serviceUsageCount = await BookingModel.countActiveBooking({ customerId: request.user.get('customer').id });
  payload.serviceUsageCount = serviceUsageCount;
  const result = await couponService.checkCoupon(payload);
  if (result.amount >= payload.totalPrice) {
    throw new Parse.Error(LARGE_AMOUNT_COUPON.code, LARGE_AMOUNT_COUPON.message);
  }
  return result;
};

module.exports = Coupon;
