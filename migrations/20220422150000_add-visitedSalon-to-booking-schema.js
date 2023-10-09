module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Booking',
      },
      {
        $set: {
          visitedSalon: 'boolean',
        },
      },
      { session },
    );
  },
};
