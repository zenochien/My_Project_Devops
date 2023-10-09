module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'PayoutTranferHistory',
      },
      {
        $set: {
          _id: 'PayoutTranferHistory',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          payoutId: 'string',
          payout: 'object',
          newTranferFee: 'number',
          status: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
