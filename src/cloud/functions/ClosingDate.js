const ClosingDateFunctions = {};
module.exports = ClosingDateFunctions;

const yup = require('yup');
const moment = require('moment');

const Validation = require('../../utils/validation');
const { USER_ROLE, REGEX, DEFAULT_TIMEZONE } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const { ClosingDateModel } = require('../models');

Object.assign(ClosingDateFunctions, {
  addClosingDates: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      startDate: yup.string().trim().matches(REGEX.DATE).required(),
      endDate: yup.string().trim().matches(REGEX.DATE).required(),
      note: yup.string().trim().required().max(150),
    });

    const minClosingDate = moment().tz(DEFAULT_TIMEZONE).add(1, 'day').startOf('day').format('YYYY-MM-DD');
    if (payload.startDate < minClosingDate || payload.endDate < minClosingDate || payload.startDate > payload.endDate) {
      const { code, message } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, message);
    }

    return ClosingDateModel.addClosingDates(payload, request.user);
  },

  deleteClosingDates: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      objectId: yup.string().trim().required(),
    });

    return ClosingDateModel.deleteClosingDates(payload, request.user);
  },

  getClosingDates: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return ClosingDateModel.getClosingDates(payload, request.user.get('salon').id);
  },
});
