const BankFunctions = {};
module.exports = BankFunctions;

const yup = require('yup');

const { BankModel } = require('../models');
const Validation = require('../../utils/validation');

Object.assign(BankFunctions, {
  getBankList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      keyword: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });
    return BankModel.getBankList(payload);
  },
  getBranchList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      bankId: yup.string().trim().required(),
      keyword: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });
    return BankModel.getBranchList(payload);
  },
});
