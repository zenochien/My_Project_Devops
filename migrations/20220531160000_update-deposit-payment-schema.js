module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'DepositPayment',
      },
      {
        $set: {
          earningId: 'string',
        },
      },
      { session },
    );
  },
};
