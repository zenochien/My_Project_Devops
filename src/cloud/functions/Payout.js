const PayoutFunctions = {};
module.exports = PayoutFunctions;

const { USER_ROLE } = require('../../const/Constants');

const yup = require('yup');
const Validation = require('../../utils/validation');
const payoutService = require('../services/Payout');
const payoutTranferHistoryService = require('../services/PayoutTranferHistory');
const salonEarningService = require('../services/SalonEarning');
const { generalConfig } = require('../../config');

const { EARNINGS_PAYOUT_STATUS } = require('../../const/Constants');

Object.assign(PayoutFunctions, {
  getPayoutsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      startCycle: yup.string().trim().optional(),
      holdingCompanyIds: yup.array().of(yup.string().trim()).optional(),
      page: yup.number().integer().min(1).optional(),
      status: yup
        .array()
        .of(yup.string().trim().oneOf(Object.values(EARNINGS_PAYOUT_STATUS)))
        .optional(),
      limit: yup.number().integer().min(5).max(100).optional(),
      notBelongToCompany: yup.boolean().optional(),
    });
    return payoutService.getPayouts(payload);
  },

  getPayoutSummaryByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      startCycle: yup.string().trim().optional(),
      holdingCompanyIds: yup.array().of(yup.string().trim()).optional(),
      notBelongToCompany: yup.boolean().optional(),
    });
    return payoutService.getPayoutSummary(payload);
  },
  getPayoutDetailByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      payoutId: yup.string().trim().required(),
    });
    return payoutService.getPayoutDetailByAdmin(payload);
  },
  getPayoutDetailBookinsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      earningId: yup.string().trim().required(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(5).max(100).optional(),
    });
    return payoutService.getPayoutDetailBookinsByAdmin(payload);
  },
  completePayoutsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      payoutIds: yup.array().of(yup.string().trim().required()).required(),
    });
    return payoutService.completePayoutsByAdmin(payload);
  },
  changePayoutTransferFeeByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      payoutId: yup.string().trim().required(),
      transferFee: yup.number().integer().required(),
    });
    return payoutService.changePayoutTransferFeeByAdmin(payload);
  },

  processPayoutChangeTranferFeeNotDone: (request) => {
    console.log(generalConfig.emailSecretKey);
    if (request.params && request.params.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    return payoutService.processPayoutChangeTranferFeeNotDone();
  },
  completeCyclePayoutsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      startCycle: yup.string().trim().required(),
    });
    return payoutService.completeCyclePayoutsByAdmin(payload);
  },

  changeFormatCreatedAtUpdatedAt: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    await payoutTranferHistoryService.changeFormatCreatedAtUpdatedAt();
    return {
      sucess: true,
    };
  },

  migratePayoutIdChangeTranferFee: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    await salonEarningService.migratePayoutIdChangeTranferFee();
    return {
      sucess: true,
    };
  },

  getNumberPayoutsByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      startCycle: yup.string().trim().optional(),
      status: yup
        .array()
        .of(yup.string().trim().oneOf(Object.values(EARNINGS_PAYOUT_STATUS)))
        .optional(),
    });
    return payoutService.getNumbersPayout(payload);
  },
});
