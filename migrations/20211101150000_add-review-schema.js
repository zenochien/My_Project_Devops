const { PAYMENT_STATUS, BOOKING_STATUS } = require('../src/const/Constants');
const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Review',
      },
      {
        $set: {
          _id: 'Review',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          stylist: '*Stylist',
          stylistId: 'string',
          customer: '*Customer',
          customerId: 'string',
          booking: '*Booking',
          bookingId: 'string',
          generalScore: 'number',
          styleScore: 'number',
          serviceScore: 'number',
          comment: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          generalScore: 'number',
          styleScore: 'number',
          serviceScore: 'number',
          reviewCount: 'number',
        },
      },
      { upsert: false, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Booking',
      },
      {
        $set: {
          isReviewed: 'boolean',
          review: '*Review',
          reviewId: 'string',
        },
      },
      { upsert: false, session },
    );

    await db.collection('Stylist').updateMany(
      {},
      {
        $set: {
          generalScore: 0,
          styleScore: 0,
          serviceScore: 0,
          reviewCount: 0,
        },
      },
      { upsert: false, session },
    );
  },
};
