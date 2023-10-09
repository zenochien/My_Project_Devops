const CustomerFunctions = {};
module.exports = CustomerFunctions;

const yup = require('yup');
const { USER_ROLE, REGEX, GENDER, PAYMENT_METHOD } = require('../../const/Constants');
const Validation = require('../../utils/validation');
const { CustomerModel, VeriTransPaymentModel, UserModel, BookingModel } = require('../models');
const Helper = require('./../../utils/helper');
const CustomerService = require('../services/Customer');
const { generalConfig } = require('../../config');
const Errors = require('../../const/Errors');

Object.assign(CustomerFunctions, {
  getCustomerDetail: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN]);

    let payload = {};
    let isGetCardDetail = false;
    if (request.user.get('role') === USER_ROLE.ADMIN) {
      payload = Validation.checkRequestParams(request, {
        email: yup.string().trim().lowercase().email().required(),
      });
      isGetCardDetail = true;
    }

    return await CustomerModel.getCustomerDetail({ ...payload, user: request.user }, { isGetCardDetail });
  },

  getCustomerDetailByAdmin: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    let payload = {};
    let isGetCardDetail = false;
    payload = Validation.checkRequestParams(request, {
      customerId: yup.string().trim().required(),
    });
    isGetCardDetail = true;

    return await CustomerModel.getCustomerDetailByAdmin(payload, { isGetCardDetail });
  },

  getCustomerList: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const payload = Validation.checkRequestParams(request, {
      searchKey: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return CustomerModel.getCustomerList(payload, request.user);
  },

  updateCustomerInfo: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN]);

    const baseRules = {
      firstName: yup.string().trim().max(10).required(),
      lastName: yup.string().trim().max(10).required(),
      phoneticFirstName: yup.string().trim().max(10).required(),
      phoneticLastName: yup.string().trim().max(10).required(),
      nickName: yup.string().trim().max(10).optional(),
      gender: yup.string().trim().oneOf(GENDER).required(),
      birthDate: yup.string().trim().matches(REGEX.YEAR_MONTH_DAY).required(),
      profileImages: yup.array().of(yup.string().trim()).min(0).max(4).optional(),
      phone: yup.string().trim().max(13).required(),
      paymentMethod: yup.string().trim().oneOf(PAYMENT_METHOD).required(),
    };

    const user = request.user;
    if (user.get('role') === USER_ROLE.ADMIN) {
      baseRules.email = yup.string().email().trim().lowercase().required();
    }

    const payload = Validation.checkRequestParams(request, baseRules);

    return await CustomerModel.updateCustomerInfo({ ...payload, user });
  },

  addCard: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      cardToken: yup.string().trim().required(),
      cardHolderName: yup.string().trim().optional(),
    });

    if (!payload.cardHolderName) {
      payload.cardHolderName = '';
    }

    const result = await CustomerService.getCardBlockedStatus(request.user);
    if (result && result.isBlocked) {
      const { code, message } = Errors.CUSTOMER_ADD_CARD_BLOCKED;
      throw new Parse.Error(code, message);
    }
    const email = request.user.get('email');
    await VeriTransPaymentModel.addCard({ ...payload, email });
    return VeriTransPaymentModel.getCardList(email);
  },

  getCardList: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN]);

    let email;
    if (request.user.get('role') === USER_ROLE.ADMIN) {
      const payload = Validation.checkRequestParams(request, {
        email: yup.string().trim().lowercase().email().required(),
      });
      email = payload.email;
    } else {
      email = request.user.get('email');
    }
    return VeriTransPaymentModel.getCardList(email);
  },

  deleteCard: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      cardId: yup.string().trim().required(),
    });

    return CustomerModel.deleteCard(request.user, payload.cardId);
  },

  setDefaultCard: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);

    const payload = Validation.checkRequestParams(request, {
      cardId: yup.string().trim().required(),
    });

    const email = request.user.get('email');
    return await VeriTransPaymentModel.setDefaultCard({ ...payload, email });
  },

  requestDeleteCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      password: yup.string().trim().required(),
      reasons: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().required(),
            extraInput: yup.string().optional(),
          }),
        )
        .optional(),
    });
    await Parse.User.verifyPassword(request.user.get('username'), payload.password);
    const userId = request.user.id;
    const customerId = request.user.get('customer').id;
    await CustomerService.requestDeleteCustomer({
      userId,
      customerId,
      reasons: Helper.getDeletingAccountReasons(payload.reasons),
      email: request.user.get('email'),
    });
    return {
      status: 'success',
    };
  },

  jobDeleteCustomer: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    const customers = await CustomerModel.getExpiredDeletingAccount();
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      const userParse = await UserModel.getUserFromCustomerId(customer.id);
      await CustomerService.deleteCustomer({
        userId: userParse.id,
        customerId: customer.id,
        email: customer.get('email'),
      });
    }
    return { status: 'success' };
  },

  deleteCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      password: yup.string().trim().required(),
    });
    await Parse.User.verifyPassword(request.user.get('username'), payload.password);
    const customer = await CustomerModel.getCustomerById({ customerId: request.user.get('customer').id });
    if (customer.get('requestDeletingAccount') && customer.get('userStatus') !== 'DELETED') {
      await CustomerService.deleteCustomer({
        userId: request.user.id,
        customerId: customer.id,
        email: request.user.get('email'),
      });
    } else {
      throw new Parse.Error(Errors.INVALID_ACTION.code, Errors.INVALID_ACTION.message);
    }
    return { status: 'success' };
  },

  revokeDeleteCustomerAccountRequest: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      password: yup.string().trim().required(),
    });
    await Parse.User.verifyPassword(request.user.get('username'), payload.password);
    const customer = await request.user.get('customer').fetch({ useMasterKey: true });
    await CustomerService.revokeDeleteAccountRequest({ customer });
    return { status: 'success' };
  },

  adminDeleteCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = Validation.checkRequestParams(request, {
      customerId: yup.string().trim().required(),
    });
    const [customer, userParse, incompletedBooking] = await Promise.all([
      CustomerModel.getCustomerById({ customerId: payload.customerId }),
      UserModel.getUserFromCustomerId(payload.customerId),
      BookingModel.countInCompletedBooking({ customerId: payload.customerId }),
    ]);
    if (incompletedBooking) {
      throw new Parse.Error(Errors.HAS_IMCOMPLETE_BOOKING.code, Errors.HAS_IMCOMPLETE_BOOKING.message);
    }
    if (customer.get('userStatus') !== 'DELETED') {
      await CustomerService.deleteCustomer({
        userId: userParse.id,
        customerId: customer.id,
        email: customer.get('email'),
      });
    } else {
      throw new Parse.Error(Errors.INVALID_ACTION.code, Errors.INVALID_ACTION.message);
    }
    return { status: 'success' };
  },

  getCardBlockedStatus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    return CustomerService.getCardBlockedStatus(request.user);
  },

  updateCardBlockedInfo: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    return CustomerService.updateCardBlockedInfo(request.user);
  },
});
