module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          totalPressPost: 'number',
        },
      },
      { session },
    );
  },
};
