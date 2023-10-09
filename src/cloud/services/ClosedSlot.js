const { DEFAULT_TIMEZONE } = require('./../../const/Constants');
const moment = require('moment-timezone');
const closedSlotModel = require('../models/ClosedSlots');

const closedSlot = {
  migrateOldConfirmedBooking: async () => {
    const startDate = moment().tz(DEFAULT_TIMEZONE).startOf('day');
    const total = (await closedSlotModel.getTotalConfirmedBookingForMigration({ startDate })) + 30;
    let updatedItemsTotal = 0;
    const limit = 50;
    const bookings = [];
    do {
      const rows = await closedSlotModel.getConfirmedBookingForMigration({ limit, startDate });
      for (let i = 0; i < rows.length; i++) {
        const { serviceDateTime, totalDuration, _id: bookingId, _p_stylist } = rows[i];
        const stylistId = _p_stylist.replace('Stylist$', '');
        bookings.push(bookingId);
        await closedSlotModel.updateClosedSlotByBookingForMigration({
          serviceDateTime,
          totalDuration,
          bookingId,
          stylistId,
        });
      }
      updatedItemsTotal = updatedItemsTotal + limit;
    } while (updatedItemsTotal < total);
    return bookings;
  },
  clearOldClosedSlots: async () => {
    const endDate = moment().tz(DEFAULT_TIMEZONE).endOf('days').subtract(1, 'days');
    return await closedSlotModel.clearOldClosedSlotsByDate({ endDate });
  },
};

module.exports = closedSlot;
