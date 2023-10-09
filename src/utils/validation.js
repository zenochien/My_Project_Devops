const _ = require('lodash');
const yup = require('yup');

const BaseQuery = require('../cloud/BaseQuery');
const { MESSAGE, USER_STATUS } = require('../const/Constants');
const Errors = require('../const/Errors');
const Helper = require('./helper');

/**
 * Custom yup
 */
yup.addMethod(yup.object, 'atLeastOneOf', function (params) {
  const { message, list } = params;
  return this.test({
    name: 'atLeastOneOf',
    message: message || '${path} must have at least one of these keys: ${keys}',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: (value) => _.isNil(value) || !!list.find((f) => !_.isNil(value[f])),
  });
});

yup.addMethod(yup.number, 'multipleOf', function (multiplier) {
  return this.test({
    name: 'multipleOf',
    message: '${path} must be a multiple of ${multiplier}',
    params: { multiplier },
    test: (value) => _.isNil(value) || value % multiplier === 0,
  });
});

// do not support object
yup.addMethod(yup.array, 'uniqueValue', function (message, mapper = (a) => a) {
  return this.test('uniqueValue', message, function (list) {
    if (!list) {
      return true;
    }
    return list.length === new Set(list.map(mapper)).size;
  });
});

const Validation = {};
module.exports = Validation;

Object.assign(Validation, {
  /**
   * Check login required
   * @param {Parse.Cloud.FunctionRequest} request
   */
  loginRequired: (request) => {
    const { user } = request;
    if (!user) {
      const { code, message } = Errors.LOGIN_REQUIRED;
      throw new Parse.Error(code, message);
    }
  },

  /**
   * Check user role in list roles
   * @param {Parse.Cloud.FunctionRequest} request
   * @param {string[]} roles
   * @returns {*}
   */
  requireRoles: (request, roles = []) => {
    Validation.loginRequired(request);

    const userRole = request.user.get('role');
    if (!roles.includes(userRole)) {
      const { code, message } = Errors.PERMISSION_ERROR;
      throw new Parse.Error(code, message);
    }
  },

  /**
   * Check valid email / username and role
   * @param {Object} params  Must have 1 in 2: email or username
   * @param {string} [params.email]  Email
   * @param {string} [params.username]  Username
   * @param {string} params.role  Role
   * @returns {Promise<*>}
   */
  checkValidAccount: async ({ email, username, role }) => {
    const query = BaseQuery.getUserQuery().select('status');
    email && query.equalTo('email', email);
    username && query.equalTo('username', username);
    query.equalTo('role', role);

    const user = await query.first({ useMasterKey: true });
    if (!user) {
      Helper.throwInvalidUserPass(role);
    }

    if (user.get('status') !== USER_STATUS.ACTIVE) {
      const { code, message } = Errors.INVALID_USER;
      throw new Parse.Error(code, message);
    }
  },

  /**
   * Check quest params follow by schema
   * @param {Parse.Cloud.FunctionRequest} request
   * @param {Object} paramRules
   * @param {Object} validationOpts
   * @returns {*}
   */
  checkRequestParams: (request, paramRules = {}, validationOpts) => {
    const schema = yup.object(paramRules);

    const strictedParams = schema.validateSync(request.body ? request.body : request.params, { strict: true });
    return schema.validateSync(strictedParams, { stripUnknown: true, ...validationOpts });
  },

  /**
   * Check require fields
   * @param {String[]} requiredFields
   * @param {Parse.Object} parseObj
   * @return undefined
   */
  checkRequireFields: (requiredFields, parseObj) => {
    // check required fields constraint
    const notValidField = _.find(requiredFields, (field) => _.isNil(Helper.getParseProp(parseObj, field)));
    if (notValidField) {
      throw new Error(`Field ${notValidField} is required!`);
    }
  },
});
