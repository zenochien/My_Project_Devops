const UserFunctions = {};
module.exports = UserFunctions;
const _ = require('lodash');
const yup = require('yup');

const { USER_STATUS, USER_ROLE, REGEX, ROLES, REASON_DELETE_ACCOUNT } = require('../../const/Constants');
const {
  INVALID_PARAMS,
  PERMISSION_ERROR,
  DUPLICATE_REGISTER_EMAIL,
  DUPLICATE_REGISTER_USERNAME,
  INVALID_SALON_NAME,
  ERROR_EMAIL_LOWERCASE,
} = require('../../const/Errors');
const { UserModel } = require('../models');
const BaseQuery = require('../BaseQuery');
const Validation = require('../../utils/validation');
const jwt = require('jsonwebtoken');
const { generalConfig } = require('../../config');
const Helper = require('./../../utils/helper');
const salonService = require('../services/Salon');

Object.assign(UserFunctions, {
  loginAdmin: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().email().trim().lowercase().required(),
      password: yup.string().trim().required(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    return UserModel.login({ ...payload, role: USER_ROLE.ADMIN });
  },

  loginSalon: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().trim().lowercase().email().optional(),
      password: yup.string().trim().required(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    const username = payload.email || payload.salonId;
    if (!username) {
      const { code, message } = INVALID_PARAMS;
      throw new Parse.Error(code, message);
    }

    return UserModel.login({ ...payload, role: USER_ROLE.SALON_OPERATOR });
  },

  loginCustomer: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().trim().lowercase().email().required(),
      password: yup.string().trim().required(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    return UserModel.login({ ...payload, role: USER_ROLE.CUSTOMER });
  },

  loginStylist: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().trim().lowercase().email().required(),
      password: yup.string().trim().required(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    return UserModel.login({ ...payload, role: USER_ROLE.STYLIST });
  },

  getCurrentUser: async (request) => {
    Validation.loginRequired(request);
    return UserModel.formatUserData(request.user);
  },

  getUserById: async (request) => {
    Validation.loginRequired(request);

    const payload = Validation.checkRequestParams(request, {
      userId: yup.string().required(),
    });

    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('objectId', payload.userId);

    const user = await userQuery.first({ useMasterKey: true });
    return UserModel.formatUserData(user);
  },

  createAdmin: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().email().trim().lowercase().required(),
      password: yup.string().trim().optional(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    await UserModel.checkEmailExists(payload.email);

    return UserModel.createAdmin(payload);
  },

  createSalonOperator: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);

    const { code } = INVALID_SALON_NAME;

    const payload = Validation.checkRequestParams(request, {
      email: yup
        .string()
        .email(ERROR_EMAIL_LOWERCASE.message)
        .trim()
        .lowercase(ERROR_EMAIL_LOWERCASE.message)
        .matches(REGEX.EMAIL, ERROR_EMAIL_LOWERCASE.message)
        .required(),
      salonName: yup.string().trim().max(50).matches(REGEX.SALON_NAME, `${code}`).required(),
      password: yup.string().trim().optional(),
      holdingCompanyId: yup.string().trim().optional(),
      installationId: yup.string().trim().lowercase().optional(),
    });

    await UserModel.checkEmailExists(payload.email);

    return salonService.createSalonOperator(payload);
  },

  createCustomer: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().email().trim().lowercase().required(),
      password: yup.string().trim().required(),
      installationId: yup.string().trim().lowercase().optional(),
    });
    await UserModel.checkEmailExists(payload.email);
    const platform = Helper.getPlatformInfo(request.headers);
    payload.platform = platform;
    return UserModel.createCustomer(payload);
  },

  changePassword: (request) => {
    Validation.loginRequired(request);

    const user = request.user;
    if (user.get('status') === USER_STATUS.INACTIVE) {
      const { code, message } = PERMISSION_ERROR;
      throw new Parse.Error(code, message);
    }

    const payload = Validation.checkRequestParams(request, {
      currentPassword: yup.string().trim().required(),
      newPassword: yup.string().trim().required(),
    });
    payload.currentUser = user;

    return UserModel.changePassword(payload);
  },

  forgotPassword: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().email().trim().lowercase().required(),
      role: yup.string().trim().oneOf(ROLES).optional(),
    });

    return UserModel.resetPassword(payload);
  },

  forgotSalonId: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      email: yup.string().email().trim().lowercase().required(),
    });

    return UserModel.sendForgotSalonId(payload.email);
  },

  renewSession: async (request) => {
    Validation.loginRequired(request);
    return UserModel.renewSession(request.user);
  },

  logout: async (request) => {
    Validation.loginRequired(request);
    return UserModel.logout(request.user);
  },

  verifyNewEmail: async (request) => {
    const { token } = Validation.checkRequestParams(request, {
      token: yup.string().trim().required(),
    });
    jwt.verify(token, generalConfig.jwtKey);
    const user = await UserModel.getUserFromTokenForVerifyNewEmail(token);
    if (!user || !user.get('newEmail')) {
      const { code, message } = INVALID_PARAMS;
      throw new Parse.Error(code, message);
    }
    const oldEmail = user.get('email');
    const newEmail = user.get('newEmail');
    await UserModel.checkEmailExists(user.get('newEmail'), user.id);
    const values = { user };
    if (user.get('role') === USER_ROLE.STYLIST) {
      const setNewPassword = Helper.checkIfStylistNeedSetNewPassword(user);
      if (setNewPassword) {
        Validation.checkRequestParams(request, {
          password: yup.string().trim().required(),
        });
        values.password = request.params.password;
      }
      await UserModel.setNewEmail({ ...values });
    } else {
      const { code, message } = PERMISSION_ERROR;
      throw new Parse.Error(code, message);
    }
    return { status: 'success', oldEmail, newEmail };
  },

  getDeletingAccountReason: async (request) => {
    const role = _.get(request.params, 'role') || 'STYLIST';
    return { reasons: _.filter(REASON_DELETE_ACCOUNT, { role }) };
  },
});
