module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Payment' },
      {
        $set: {
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          bookingId: 'string',
          transactionNo: 'string',
          request: 'object',
          status: 'string',
          chargeId: 'string',
          error: 'object',
          response: 'object',
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
    await db.collection('Payment').createIndex({ chargeId: 1 }, { name: 'chargeId_1', unique: true, sparse: true });

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Booking' },
      {
        $set: {
          payment: '*Payment',
          paymentDate: 'date',
          transactionNo: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
