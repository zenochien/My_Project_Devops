const MenuFunctions = {};
module.exports = MenuFunctions;

const yup = require('yup');

const { MenuModel } = require('../models');
const { USER_ROLE, STATUS } = require('../../const/Constants');
const Validation = require('../../utils/validation');
const { generalConfig } = require('../../config');
const ParseConfig = require('../ParseConfig');

Object.assign(MenuFunctions, {
  createMenuItem: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      name: yup.string().trim().max(30).required(),
      amount: yup.number().integer().min(1).max(9999999).required(),
      duration: yup
        .number()
        .integer()
        .multipleOf(ParseConfig.get('menuDurationMin'))
        .min(ParseConfig.get('menuDurationMin'))
        .max(ParseConfig.get('menuDurationMax'))
        .required(),
      description: yup.string().trim().max(300).optional(),
      categoryId: yup.string().trim().required(),
      assignedStylists: yup.array().of(yup.string().trim()).optional(),
    });

    return MenuModel.createMenuItem(payload, request.user);
  },

  updateMenuItem: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      menuId: yup.string().trim().required(),
      name: yup.string().trim().max(30).optional(),
      amount: yup.number().integer().min(1).max(9999999).optional(),
      duration: yup
        .number()
        .integer()
        .multipleOf(ParseConfig.get('menuDurationMin'))
        .min(ParseConfig.get('menuDurationMin'))
        .max(ParseConfig.get('menuDurationMax'))
        .optional(),
      description: yup.string().trim().max(300).optional(),
      categoryId: yup.string().trim().optional(),
      assignedStylists: yup.array().of(yup.string().trim()).optional(),
    });

    return MenuModel.updateMenuItem(payload, request.user);
  },

  removeMenu: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      menuId: yup.string().trim().required(),
      forceDelete: yup.boolean().optional(),
    });
    return MenuModel.removeMenu(payload, request.user);
  },

  changeMenuPublishStatus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      menuId: yup.string().trim().required(),
    });

    return MenuModel.changeMenuPublishStatus(payload, request.user);
  },

  getMenuItemDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      menuId: yup.string().trim().required(),
    });

    return MenuModel.getMenuItemDetail(payload, request.user);
  },

  getMenuItemList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().optional(),
      stylistId: yup.string().trim().optional(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return MenuModel.getMenuItemList(payload, request.user);
  },
});
