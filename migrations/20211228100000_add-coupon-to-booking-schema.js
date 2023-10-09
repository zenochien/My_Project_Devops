const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Booking',
      },
      {
        $set: {
          coupon: 'object',
          originalPrice: 'number',
          appTransactionId: 'string',
        },
      },
      { upsert: false, session },
    );
  },
};
