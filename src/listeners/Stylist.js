const { parseServerConfig } = require('./../config/index');
const stylistModel = require('./../cloud/models/Stylist');
const stylistService = require('./../cloud/services/Stylist');

module.exports = {
  sendEmailWhenSettingFirstPassword: ({ email }) => {
    parseServerConfig.emailAdapter.sendMailByTemplate('stylist-set-first-password-successfully', { to: email }, {});
  },
  deleteStylist: async ({ objectId }) => {
    try {
      await stylistModel.handleAfterDelete(objectId);
    } catch (error) {
      console.error('[Stylist][deleteStylist]:error:', error);
    }
  },
  updateLastPost: async ({ objectData }) => {
    try {
      await stylistService.updateLastPosts({ stylistId: objectData.stylist.objectId });
    } catch (error) {
      console.error('[Stylist][updateLastPost]:error:', error);
    }
  },
  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    const requireFields = ['salonName'];
    await stylistService.salonChangeProfile({ dirtyKeys, objectData, requireFields });
  },
};
