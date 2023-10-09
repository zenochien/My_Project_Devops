module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'SalonEarning',
      },
      {
        $set: {
          _id: 'SalonEarning',
          cycleId: 'string',
          salonId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          startCycle: 'date',
          endCycle: 'date',
          payoutEarningId: 'string',
          isGeneratePayout: 'boolean',
          payoutId: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'DepositPayment',
      },
      {
        $set: {
          _id: 'DepositPayment',
          bookingId: 'string',
          status: 'string',
          salonId: 'string',
          payoutAccount: 'object',
          amount: 'number',
          fee: 'number',
          net: 'number',
          commissionRate: 'number',
          updatedAt: 'date',
          createdAt: 'date',
        },
      },
      { upsert: true, session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Booking',
      },
      {
        $set: {
          payoutInfo: 'object',
          paymentAt: 'date',
        },
      },
      { session },
    );
  },
};
