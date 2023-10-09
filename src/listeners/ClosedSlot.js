const ClosedSlotsModel = require('../cloud/models/ClosedSlots');
const moment = require('moment-timezone');
const { BOOKING_STATUS, DEFAULT_TIMEZONE } = require('./../const/Constants');

module.exports = {
  handleFinishBooking: async ({ totalDuration, serviceDateTime, stylistId, bookingId }) => {
    if (moment.tz(serviceDateTime, DEFAULT_TIMEZONE) >= moment().tz(DEFAULT_TIMEZONE).startOf('day')) {
      await ClosedSlotsModel.updateClosedSlotWhenFinishBooking({
        serviceDateTime: serviceDateTime,
        totalDuration,
        stylistId,
        bookingId,
      });
    }
  },
  cancelBooking: async ({
    objectId: bookingId,
    serviceDateTime,
    stylist,
    totalDuration,
    originalBooking: { bookingStatus },
  }) => {
    const today = moment().tz(DEFAULT_TIMEZONE).startOf('days');
    const startDate = moment(serviceDateTime.iso);
    if (startDate.isSameOrAfter(today) && bookingStatus === BOOKING_STATUS.CONFIRMED) {
      await ClosedSlotsModel.updateClosedSlotWhenCancelBooking({
        serviceDateTime: serviceDateTime.iso,
        totalDuration,
        stylistId: stylist.objectId,
        bookingId,
      });
    }
  },
};
