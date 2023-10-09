const mongoDB = require('../../db/mongoDB');
const moment = require('moment-timezone');
const { DEPOSIST_PAYMENT_STATUS } = require('../../const/Constants');
const payoutListener = require('../../listeners/Payout');
const bookingService = {};
module.exports = bookingService;

bookingService.markBookigNeedMigartePayment = async ({ startDate, endDate }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('Payment')
    .aggregate([
      {
        $match: {
          status: 'SUCCEEDED',
          _updated_at: {
            $gte: moment(startDate).toDate(),
            $lte: moment(endDate).toDate(),
          },
        },
      },
      {
        $project: {
          _updated_at: 1,
          bookingId: 1,
        },
      },
      {
        $lookup: {
          from: 'Booking',
          localField: 'bookingId',
          foreignField: '_id',
          as: 'booking',
        },
      },
      {
        $project: {
          _updated_at: 1,
          bookingId: 1,
          booking: { $arrayElemAt: ['$booking', 0] },
        },
      },
      {
        $match: {
          'booking.payoutInfo.status': { $exists: false },
        },
      },
      {
        $project: {
          _updated_at: 1,
          bookingId: 1,
        },
      },
    ])
    .toArray();

  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    await db.collection('Booking').updateOne(
      { _id: item.bookingId },
      {
        $set: {
          payoutInfo: {
            status: DEPOSIST_PAYMENT_STATUS.PENDING,
          },
          paymentAt: moment(item._updated_at).toDate(),
        },
      },
    );
  }
  console.log('[bookingService][markBookigNeedMigartePayment]', result);
  return result;
};

bookingService.reDepositPayment = async () => {
  // get old booking which need redeposit payment
  const db = await mongoDB.getMongoDB();
  const selectFields = {
    _id: 0,
    bookingId: '$_id',
    salonId: { $replaceOne: { input: '$_p_salon', find: 'Salon$', replacement: '' } },
    stylistId: { $replaceOne: { input: '$_p_stylist', find: 'Stylist$', replacement: '' } },
    originalPrice: 1,
  };
  const result = await db
    .collection('Booking')
    .find({
      'payoutInfo.status': DEPOSIST_PAYMENT_STATUS.PENDING,
      paymentAt: { $lte: moment().subtract(2, 'minutes').toDate() },
    })
    .project(selectFields)
    .toArray();

  // redeposit payment
  for (let i = 0; i < result.length; i++) {
    await payoutListener.depositPayment(result[i]);
  }
  console.log('[bookingService][reDepositPayment]', result);
  return result;
};

bookingService.migrateBookingStatusExtend = async () => {
  const db = await mongoDB.getMongoDB();
  await db.collection('Booking').updateMany({}, [
    {
      $set: {
        bookingStatusExtend: {
          $function: {
            body: `function (bookingStatus, paymentStatus, actionLogs) {
                let lastBookingStatus = undefined;
                if (actionLogs.length > 0) {
                  const { bookingStatus } = actionLogs[actionLogs.length - 1];
                  lastBookingStatus = bookingStatus;
                }
                const BOOKING_STATUS = {
                  CANCELED_OPERATOR: 'CANCELED_OPERATOR',
                  CANCELED_CUSTOMER: 'CANCELED_CUSTOMER',
                  CANCELED_STYLIST: 'CANCELED_STYLIST',
                  CANCELED_WITH_FEE: 'CANCELED_WITH_FEE',
                };
                switch (bookingStatus) {
                  case BOOKING_STATUS.CANCELED_CUSTOMER:
                  case BOOKING_STATUS.CANCELED_STYLIST:
                  case BOOKING_STATUS.CANCELED_OPERATOR:
                    if (lastBookingStatus) {
                      return lastBookingStatus + '_' + bookingStatus;
                    }
                    return 'REQUESTED_' + bookingStatus;
                  default:
                    return bookingStatus;
                }
              }`,
            args: ['$bookingStatus', '$paymentStatus', '$actionLogs'],
            lang: 'js',
          },
        },
      },
    },
  ]);
  return {
    success: true,
  };
};
