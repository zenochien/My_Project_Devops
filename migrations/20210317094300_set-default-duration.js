module.exports = {
  up: async (db, session) => {
    await db.collection('Menu').updateMany(
      { duration: { $exists: 0 } },
      {
        $set: {
          duration: 1,
        },
      },
      {
        upsert: false,
        session,
      },
    );
  },
};
