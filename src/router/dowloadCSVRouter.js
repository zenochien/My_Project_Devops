const express = require('express');
const yup = require('yup');
const converter = require('json-2-csv');
var cors = require('cors');
const _ = require('lodash');
const moment = require('moment-timezone');

const {
  USER_ROLE,
  CSV_SALON_HEADER,
  CSV_CUSTOMER_HEADER,
  REGEX,
  CSV_PAYOUT_HEADER,
  CSV_PAYOUT_DETAIL_HEADER,
  CSV_BOOKING_HEADER_ADMIN,
  DEFAULT_TIMEZONE,
  BOOKING_STATUS_EXTEND_JP,
  PAYMENT_STATUS_JP,
  BOOKING_STATUSES,
  BOOKING_STATUS_EXTEND,
} = require('../const/Constants');
const Validation = require('../utils/validation');
const SalonModel = require('../cloud/models/Salon');
const BookingModel = require('../cloud/models/Booking');
const CustomerModel = require('../cloud/models/Customer');
const payoutService = require('../cloud/services/Payout');
const { ParseServerLogger } = require('../logger');
const { INVALID_SESSION_TOKEN, DOWLOAD_CSV_ERROR } = require('../const/Errors');

const getStatusText = (status) => {
  if (status === 'unpaid') {
    return '未払';
  }
  return '既払';
};
module.exports.default = () => {
  const router = express.Router();
  router.use(express.json());

  const processDowloadCSV = async (model, res, payload, CSV_HEADER) => {
    try {
      const csvHeaderValue = Object.values(CSV_HEADER);
      const csvHeaderKey = Object.keys(CSV_HEADER);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="salons.csv"');
      res.write('\uFEFF');
      res.write(csvHeaderValue.join(',') + '\r\n');
      const limit = 2000;
      let page = 1;
      let pageResult;
      do {
        pageResult = await model.getDataForCSV({ ...payload, limit, page: page++ });
        if (pageResult.length > 0) {
          const csvStr = await converter.json2csvAsync(pageResult, {
            prependHeader: false,
            keys: csvHeaderKey,
          });
          res.write(csvStr + '\r\n');
        }
      } while (pageResult.length === limit);
      res.end();
    } catch (error) {
      const { code, message } = DOWLOAD_CSV_ERROR;
      throw new Parse.Error(code, message);
    }
  };

  const checkPermisson = (req, res, permission, routerName) => {
    try {
      Validation.requireRoles(req.auth, permission);
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = INVALID_SESSION_TOKEN;
      throw new Parse.Error(code, message);
    }
  };

  const processCoupon = (coupon) => {
    if (!coupon) {
      return '無ー';
    }
    return `${coupon.transaction.couponAmount}円(${coupon.couponCode})`;
  };

  router.post('/api/dowload/salons', cors(), async function (req, res) {
    const routerName = 'Router api/dowload/salons';
    try {
      checkPermisson(req, res, [USER_ROLE.ADMIN], routerName);
      ParseServerLogger.info(`${routerName} of user`, req.auth.user.id, 'input:', req.body);
      const payload = Validation.checkRequestParams(req, {
        orderBy: yup.string().trim().optional(),
        order: yup.string().trim().optional(),
      });
      await processDowloadCSV(SalonModel, res, payload, CSV_SALON_HEADER);
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = error;
      res.json({ code, message });
      res.end();
    }
  });
  router.post('/api/dowload/customers', cors(), async function (req, res) {
    const routerName = 'Router api/dowload/customers';
    try {
      checkPermisson(req, res, [USER_ROLE.ADMIN], routerName);
      ParseServerLogger.info(`${routerName} of user`, req.auth.user.id, 'input:', req.body);
      const payload = Validation.checkRequestParams(req, {
        orderBy: yup.string().trim().optional(),
        order: yup.string().trim().optional(),
      });
      await processDowloadCSV(CustomerModel, res, payload, CSV_CUSTOMER_HEADER);
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = error;
      res.json({ code, message });
      res.end();
    }
  });

  router.post('/api/dowload/payouts', cors(), async function (req, res) {
    const routerName = 'Router api/dowload/payouts';
    try {
      checkPermisson(req, res, [USER_ROLE.ADMIN], routerName);
      const payload = Validation.checkRequestParams(req, {
        notBelongToCompany: yup.boolean().optional(),
        startCycle: yup.string().trim().matches(REGEX.DATE_ISO).required(),
        holdingCompanyIds: yup.array().of(yup.string().trim()).optional(),
      });
      const csvHeaderValue = Object.values(CSV_PAYOUT_HEADER);
      const csvHeaderKey = Object.keys(CSV_PAYOUT_HEADER);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="payout.csv"');
      res.write('\uFEFF');
      res.write(csvHeaderValue.join(',') + '\r\n');
      const limit = 50;
      let page = 1;
      let viewedItems = 0;
      let totalItems = 0;
      do {
        const { total, list } = await payoutService.getPayouts({
          startCycle: payload.startCycle,
          holdingCompanyIds: payload.holdingCompanyIds,
          notBelongToCompany: payload.notBelongToCompany || false,
          page,
          limit,
        });
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          const csvStr = await converter.json2csvAsync(
            [
              {
                objectId: _.get(item, 'payoutId'),
                holdingCompanyName: _.get(item, 'salonInfo.holdingCompany.name') || '',
                salonName: _.get(item, 'salonInfo.salonName'),
                email: _.get(item, 'salonInfo.salonEmail'),
                totalSales: _.get(item, 'totalSales'),
                commission: _.get(item, 'commission'),
                subtotal: _.get(item, 'subtotal'),
                transferFee: _.get(item, 'transferFee'),
                transferAmount: _.get(item, 'transferAmount'),
                status: getStatusText(_.get(item, 'status')),
              },
            ],
            {
              prependHeader: false,
              keys: csvHeaderKey,
            },
          );
          res.write(csvStr + '\r\n');
        }
        // get next page
        ++page;
        totalItems = total;
        viewedItems = viewedItems + limit;
      } while (viewedItems <= totalItems);
      res.end();
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = error;
      res.setHeader('Content-Type', 'application/json');
      res.json({ code, message });
      res.end();
    }
  });

  router.post('/api/dowload/payoutDetail', cors(), async function (req, res) {
    const routerName = 'Router api/dowload/payoutDetail';
    try {
      checkPermisson(req, res, [USER_ROLE.ADMIN], routerName);
      const payload = Validation.checkRequestParams(req, {
        earningId: yup.string().trim().required(),
      });
      const csvHeaderValue = Object.values(CSV_PAYOUT_DETAIL_HEADER);
      const csvHeaderKey = Object.keys(CSV_PAYOUT_DETAIL_HEADER);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="bookings.csv"');
      res.write('\uFEFF');
      res.write(csvHeaderValue.join(',') + '\r\n');
      const limit = 50;
      let page = 1;
      let viewedItems = 0;
      let totalItems = 0;
      do {
        const { total, list } = await payoutService.getPayoutDetailBookinsByAdmin({
          earningId: payload.earningId,
          page,
          limit,
        });
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          const paymentDate = _.get(item, 'paymentDate');
          const serviceDateTime = _.get(item, 'serviceDateTime');
          const bookingStatusExtend = _.get(item, 'bookingStatusExtend');
          const csvStr = await converter.json2csvAsync(
            [
              {
                objectId: _.get(item, 'objectId'),
                stylistName: _.get(item, 'stylist.fullName'),
                email: _.get(item, 'stylist.email'),
                totalPrice: _.get(item, 'payoutInfo.totalPrice'),
                commission: _.get(item, 'payoutInfo.commission'),
                subtotal: _.get(item, 'payoutInfo.subtotal'),
                paymentDate: paymentDate ? moment(paymentDate).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm') : '',
                serviceDateTime: serviceDateTime
                  ? moment(serviceDateTime).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD')
                  : '',
                bookingStatusExtend: bookingStatusExtend ? BOOKING_STATUS_EXTEND_JP[bookingStatusExtend] : '',
              },
            ],
            {
              prependHeader: false,
              keys: csvHeaderKey,
            },
          );
          res.write(csvStr + '\r\n');
        }
        // get next page
        ++page;
        totalItems = total;
        viewedItems = viewedItems + limit;
      } while (viewedItems <= totalItems);
      res.end();
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = error;
      res.setHeader('Content-Type', 'application/json');
      res.json({ code, message });
      res.end();
    }
  });

  router.post('/api/dowload/booking', cors(), async function (req, res) {
    const routerName = 'Router /api/dowload/booking';
    try {
      checkPermisson(req, res, [USER_ROLE.ADMIN], routerName);
      const payload = Validation.checkRequestParams(req, {
        orderBy: yup.string().trim().optional(),
        order: yup.string().trim().optional(),
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
      const csvHeaderValue = Object.values(CSV_BOOKING_HEADER_ADMIN);
      const csvHeaderKey = Object.keys(CSV_BOOKING_HEADER_ADMIN);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="bookings.csv"');
      res.write('\uFEFF');
      res.write(csvHeaderValue.join(',') + '\r\n');
      const limit = 50;
      let page = 1;
      let viewedItems = 0;
      let totalItems = 0;
      do {
        const { total, list } = await BookingModel.getBookingWithStatusExtendsForCSV(
          {
            ...payload,
            limit,
            page,
          },
          req.auth.user,
        );
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          const csvStr = await converter.json2csvAsync(
            [
              {
                ...item,
                createdAt: moment(item.createdAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm'),
                serviceDateTime: moment(item.serviceDateTime.iso).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD HH:mm'),
                coupon: processCoupon(item.coupon),
                originalPrice: `${item.originalPrice ? item.originalPrice : 0}円`,
                paymentStatus: PAYMENT_STATUS_JP[item.paymentStatus],
                bookingStatusExtend: BOOKING_STATUS_EXTEND_JP[item.bookingStatusExtend],
              },
            ],
            {
              prependHeader: false,
              keys: csvHeaderKey,
            },
          );
          res.write(csvStr + '\r\n');
        }
        // get next page
        ++page;
        totalItems = total;
        viewedItems = viewedItems + limit;
      } while (viewedItems <= totalItems);
      res.end();
    } catch (error) {
      ParseServerLogger.error(routerName, error);
      const { code, message } = error;
      res.setHeader('Content-Type', 'application/json');
      res.json({ code, message });
      res.end();
    }
  });

  return router;
};
