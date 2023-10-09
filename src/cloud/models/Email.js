const EmailModel = {};
module.exports = EmailModel;

const { parseServerConfig } = require('../../config/parseServerConfig');

EmailModel.sendEmailTemplate = (params) => {
  const { mailData, toEmail, template } = params;
  parseServerConfig.emailAdapter.sendMailByTemplate(template, { to: toEmail }, mailData);

  return true;
};
