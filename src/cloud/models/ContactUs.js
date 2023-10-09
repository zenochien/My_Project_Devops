const ContactUsModel = {};
module.exports = ContactUsModel;

const { parseServerConfig } = require('../../config/parseServerConfig');
const { ParseServerLogger } = require('../../logger');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');

ContactUsModel.saveContactUsInformation = async (data) => {
  try {
    const contacUsInformation = new Parse.Object('ContactUs', { ...data });
    const result = await contacUsInformation.save();

    // Send email to customer and admin
    parseServerConfig.emailAdapter
      .sendMailByTemplate('contact-us-confirmation', { to: data.email }, data)
      .catch((error) => {
        ParseServerLogger.error(error);
      });
    parseServerConfig.emailAdapter
      .sendMailByTemplate('contact-us-admin', { to: process.env.CONTACT_US_ADMIN_EMAIL }, data)
      .catch((error) => {
        ParseServerLogger.error(error);
      });
    return Helper.convertParseObjectToJson(result, DefaultSelectFields.CONTACT_US);
  } catch (error) {
    ParseServerLogger.error(error);
  }
};
