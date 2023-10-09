module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Menu' },
      {
        $set: {
          duration: 'number',
        },
      },
      { upsert: true, session },
    );
  },
};
