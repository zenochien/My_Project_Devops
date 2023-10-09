const HoldingCompanyFunctions = {};
module.exports = HoldingCompanyFunctions;

const yup = require('yup');

const { HoldingCompanyModel } = require('../models');
const Validation = require('../../utils/validation');
const { STATUS, USER_ROLE } = require('../../const/Constants');

Object.assign(HoldingCompanyFunctions, {
  getHoldingCompanyListByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      status: yup.array().of(yup.string().trim()).optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
      searchKey: yup.string().trim().optional(),
    });

    return HoldingCompanyModel.getHoldingCompanyList(payload);
  },
  createHoldingCompanyByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      name: yup.string().trim().max(30).required(),
      salonIds: yup.array(yup.string().trim().optional()),
    });
    return HoldingCompanyModel.createHoldingCompany(payload);
  },

  updateHoldingCompanyByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      id: yup.string().trim().required(),
      name: yup.string().trim().max(30).required(),
      salonIds: yup.array(yup.string().trim().optional()),
    });
    return HoldingCompanyModel.updateHoldingCompany(payload);
  },

  deleteHoldingCompanyByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      id: yup.string().trim().required(),
    });
    return HoldingCompanyModel.deleteHoldingCompany(payload);
  },
});
