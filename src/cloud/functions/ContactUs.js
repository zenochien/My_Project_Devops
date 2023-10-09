const ContactUsFunctions = {};
module.exports = ContactUsFunctions;

const yup = require('yup');

const Validation = require('../../utils/validation');
const { ContactUsModel } = require('../models');
const Constants = require('../../const/Constants');

Object.assign(ContactUsFunctions, {
  saveContactUsInformation: (request) => {
    const payload = Validation.checkRequestParams(request, {
      name: yup.string().trim().required(),
      email: yup.string().trim().email().required(),
      phoneNumber: yup
        .string()
        .trim()
        .required()
        .max(13)
        .matches(Constants.REGEX.PHONE, Constants.MESSAGE.INVALID_PHONE),
      contents: yup.string().trim().required(),
      extraInfo: yup.object().nullable().optional(),
    });
    return ContactUsModel.saveContactUsInformation(payload);
  },
});
