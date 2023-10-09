const EmailFunctions = {};
module.exports = EmailFunctions;

const _pick = require('lodash/pick');

const yup = require('yup');
const { generalConfig } = require('../../config');
const { EMAIL_TEMPLATES } = require('../../const/Constants');
const Errors = require('../../const/Errors');

const Validation = require('../../utils/validation');
const { EmailModel } = require('../models');

Object.assign(EmailFunctions, {
  sendEmailTemplate: async (request) => {
    request.params = _pick(request.params, ['secretKey', 'template', 'toEmail', 'mailData']);

    const payload = Validation.checkRequestParams(
      request,
      {
        secretKey: yup.string().trim().required(),
        template: yup.string().trim().oneOf(EMAIL_TEMPLATES).required(),
        toEmail: yup.string().trim().email().required(),
        mailData: yup.object().required(),
      },
      { stripUnknown: false },
    );

    if (payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }

    return EmailModel.sendEmailTemplate(payload);
  },
});
