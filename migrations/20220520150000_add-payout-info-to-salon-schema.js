module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Salon',
      },
      {
        $set: {
          payoutAccount: 'object',
        },
      },
      { session },
    );
  },
};
