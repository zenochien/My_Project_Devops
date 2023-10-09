const salonModel = require('../cloud/models/Salon');

module.exports = {
  deleteSalon: async ({ objectId }) => {
    try {
      await salonModel.handleAfterDelete(objectId);
    } catch (error) {
      console.error('[Salon][deleteSalon]:error:', error);
    }
  },
};
