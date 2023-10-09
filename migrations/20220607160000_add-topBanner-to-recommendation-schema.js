module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Recommendation',
      },
      {
        $set: {
          topBanner: 'object',
        },
      },
      { session },
    );
  },
};
