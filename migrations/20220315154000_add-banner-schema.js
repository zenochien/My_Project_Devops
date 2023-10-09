module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Banner',
      },
      {
        $set: {
          imageId: 'string',
          status: 'string',
          sortOrder: 'number',
          image: 'object',
        },
      },
      { upsert: true, session },
    );
  },
};
