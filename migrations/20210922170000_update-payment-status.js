const { PAYMENT_STATUS, BOOKING_STATUS } = require('../src/const/Constants');
const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update paymentStatus duration ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('Booking').updateMany(
          { bookingStatus: { $in: [BOOKING_STATUS.CANCELED_OPERATOR, BOOKING_STATUS.CANCELED_AUTO] } },
          { $set: { paymentStatus: PAYMENT_STATUS.CANCELED } },
          {
            upsert: false,
            session,
          },
        ),
      ),
    );
  },
};
