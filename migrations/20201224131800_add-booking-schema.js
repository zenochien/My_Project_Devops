module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Booking' },
      {
        $set: {
          objectId: 'string',
          totalPrice: 'number',
          totalDuration: 'number',
          bookingStatus: 'string',
          paymentStatus: 'string',
          customer: '*Customer',
          updatedAt: 'date',
          createdAt: 'date',
          serviceDateTime: 'date',
          stylist: '*Stylist',
          salon: '*Salon',
          menus: 'array',
          timezone: 'string',
          actionLogs: 'array',
          paymentNote: 'string',
          cancelNote: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: '_User' },
      {
        $set: {
          customer: '*Customer',
        },
      },
      { upsert: true, session },
    );
  },
};
