const { generalConfig } = require('../../config');
const closedSlotService = require('./../services/ClosedSlot');

module.exports = {
  migrateOldConfirmedBooking: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    const bookings = await closedSlotService.migrateOldConfirmedBooking();
    return { bookings };
  },

  clearOldClosedSlots: async (request) => {
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      throw new Parse.Error(9502, 'Wrong secret key');
    }
    const total = await closedSlotService.clearOldClosedSlots();
    return { total };
  },
};
