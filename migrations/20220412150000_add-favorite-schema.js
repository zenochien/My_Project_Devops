const { PAYMENT_STATUS, BOOKING_STATUS } = require('../src/const/Constants');
const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'FavoritedStylist',
      },
      {
        $set: {
          _id: 'FavoritedStylist',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          stylist: 'object',
          customer: 'object',
          salon: 'object',
          customerId: 'string',
          stylistId: 'string',
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
          favoriteCustomers: 'array',
          favoriteTotal: 'number',
        },
      },
      { upsert: false, session },
    );
  },
};
