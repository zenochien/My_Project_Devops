const { parseServerConfig } = require('./../config/index');
const customerModel = require('./../cloud/models/Customer');
module.exports = {
  sendEmailVerificationSuccessfully: ({ email }) => {
    parseServerConfig.emailAdapter.sendMailByTemplate('customer-verify-email-successfully', { to: email }, {});
  },
  deleteCustomer: async ({ objectId }) => {
    try {
      await customerModel.handleAfterDelete(objectId);
    } catch (error) {
      console.error('[Customer][deleteCustomer]:error:', error);
    }
  },
};
