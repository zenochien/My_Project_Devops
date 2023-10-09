const StylistFunctions = {};
module.exports = StylistFunctions;

const yup = require('yup');

const { USER_ROLE, STATUS, PRODUCT_TYPE } = require('../../const/Constants');
const Validation = require('../../utils/validation');
const { ProductModel } = require('../models');

Object.assign(StylistFunctions, {
  createProduct: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      images: yup.array().of(yup.string().trim()).max(3).optional(),
      name: yup.string().trim().min(1).max(30).required(),
      price: yup.number().integer().min(1).max(9999999).when('type', {
        is: PRODUCT_TYPE.USER,
        then: yup.number().required(),
        otherwise: yup.number().optional(),
      }),
      type: yup.string().trim().oneOf([PRODUCT_TYPE.USER, PRODUCT_TYPE.SALON]).required(),
      description: yup.string().trim().max(300).optional(),
      url: yup.string().trim().url().optional(),
    });

    return ProductModel.createProduct(payload, request.user);
  },

  updateProduct: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      productId: yup.string().trim().required(),
      images: yup.array().of(yup.string().trim()).max(3).optional(),
      name: yup.string().trim().min(1).max(30).optional(),
      price: yup.number().integer().min(1).max(9999999).when('type', {
        is: PRODUCT_TYPE.USER,
        then: yup.number().required(),
        otherwise: yup.number().optional(),
      }),
      type: yup.string().trim().oneOf([PRODUCT_TYPE.USER, PRODUCT_TYPE.SALON]).required(),
      description: yup.string().trim().max(300).optional(),
      url: yup.string().trim().url().optional(),
    });

    await ProductModel.updateProduct(payload, request.user);
    return ProductModel.getProductDetail({ productId: payload.productId }, request.user);
  },

  removeProduct: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR]);

    const payload = Validation.checkRequestParams(request, {
      productId: yup.string().trim().required(),
    });

    payload.status = STATUS.DELETED;

    await ProductModel.updateProduct(payload, request.user);
    return true;
  },

  changeProductPublishStatus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      productId: yup.string().trim().required(),
    });

    return ProductModel.changeProductPublishStatus(payload, request.user);
  },

  getProductDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      productId: yup.string().trim().required(),
    });

    return ProductModel.getProductDetail(payload, request.user);
  },

  getProductList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      salonId: yup.string().trim().optional(),
      searchKey: yup.string().trim().optional(),
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return ProductModel.getProductList(payload, request.user);
  },
});
