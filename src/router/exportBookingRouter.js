const express = require('express');
const yup = require('yup');
const converter = require('json-2-csv');
const fs = require('fs');
var cors = require('cors');

const { REGEX, USER_ROLE, CSV_BOOKING_HEADER } = require('../const/Constants');
const Validation = require('../utils/validation');
const BookingModel = require('../cloud/models/Booking');
const { ParseServerLogger } = require('../logger');
const Helper = require('../utils/helper');
const { INTERNAL, INVALID_SESSION_TOKEN } = require('../const/Errors');

module.exports.default = function () {
  const router = express.Router();
  router.use(express.json());

  router.post('/api/export/booking', cors(), async function (req, res) {
    try {
      Validation.requireRoles(req.auth, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);
    } catch (error) {
      ParseServerLogger.error('Router /api/export/booking error', error);
      res.json(INVALID_SESSION_TOKEN);
      res.end();
      return;
    }

    const filename = 'booking' + '-' + Helper.randomString() + '.csv';
    try {
      ParseServerLogger.info('Router /api/export/booking of user', req.auth.user.id, 'input:', req.body);
      const payload = Validation.checkRequestParams(req, {
        orderBy: yup.string().trim().optional(),
        order: yup.string().trim().optional(),
        fromCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
        toCreatedDate: yup.string().trim().matches(REGEX.DATE).optional(),
      });

      const writeStream = fs.createWriteStream(filename);
      const limit = 10;
      let page = 1;
      let pageResult;
      writeStream.write(Object.values(CSV_BOOKING_HEADER).join(',') + '\r\n');
      do {
        pageResult = await BookingModel.getBookingCSV({ ...payload, limit, page: page++ }, req.auth.user);
        if (pageResult.length > 0) {
          const csvStr = await converter.json2csvAsync(pageResult, {
            prependHeader: false,
          });
          writeStream.write(csvStr + '\r\n');
        }
      } while (pageResult.length === limit);
      writeStream.end();
    } catch (error) {
      ParseServerLogger.error('Router /api/export/booking error', error);
      const { code } = INTERNAL;
      const message = 'Write file error';
      res.json({ code, message });
      res.end();
      fs.unlinkSync(filename);
    }

    try {
      const readStream = fs
        .createReadStream(filename)
        .on('open', function () {
          res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          res.setHeader('Content-Disposition', 'attachment; filename="booking.csv"');
          readStream.pipe(res);
        })
        .on('error', function (err) {
          ParseServerLogger.error('Router /api/export/booking error', err);
          const { code } = INTERNAL;
          const message = 'Read file error';
          res.json({ code, message });
          res.end();
          fs.unlinkSync(filename);
        })
        .on('close', function () {
          fs.unlinkSync(filename);
          ParseServerLogger.info('Router /api/export/booking of user', req.auth.user.id, 'done');
        });
    } catch (error) {
      ParseServerLogger.error('Router /api/export/booking error', error);
      const { code } = INTERNAL;
      const message = 'Read file error';
      res.json({ code, message });
      res.end();
      fs.unlinkSync(filename);
    }
  });

  return router;
};
