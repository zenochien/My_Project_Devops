module.exports = {
  up: async (db, session) => {
    await db.collection('Booking').updateMany(
      { cardId: { $exists: 1 } },
      {
        $unset: {
          cardId: 1,
        },
      },
      { session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Booking' },
      {
        $set: {
          cardInfo: 'object',
        },
        $unset: {
          cardId: 1,
        },
      },
      { upsert: true, session },
    );
  },
};
