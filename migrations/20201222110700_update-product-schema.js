module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Product' },
      {
        $set: {
          url: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
