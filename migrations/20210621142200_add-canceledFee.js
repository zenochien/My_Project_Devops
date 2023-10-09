const { BOOKING_STATUS } = require('../src/const/Constants');
const Helper = require('../src/utils/helper');
module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update SCHEMA Booking: add canceledFee ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          { _id: 'Booking' },
          {
            $set: {
              canceledFee: 'number',
            },
          },
          { upsert: false, session },
        ),
      ),
    );

    const updateBookingArray = [];
    await db
      .collection('Booking')
      .find({ canceledFee: { $exists: 0 } })
      .project({ _id: 1, totalPrice: 1, bookingStatus: 1 })
      .forEach((booking) => {
        updateBookingArray.push({
          updateOne: {
            filter: { _id: booking._id },
            update: {
              $set: {
                canceledFee:
                  booking.bookingStatus === BOOKING_STATUS.CANCELED_WITH_FEE ||
                  booking.bookingStatus === BOOKING_STATUS.NOT_ARRIVED
                    ? booking.totalPrice
                    : 0,
              },
            },
            upsert: false,
          },
        });
      });
    if (updateBookingArray.length > 0) {
      console.log(
        '== Add canceledFee for booking ==',
        Helper.getMongoWriteOpResult(await db.collection('Booking').bulkWrite(updateBookingArray, { session })),
      );
    }
  },
};
