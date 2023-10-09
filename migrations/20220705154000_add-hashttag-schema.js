module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Hashtag',
      },
      {
        $set: {
          imageId: 'string',
          status: 'string',
          name: 'string',
          totalPost: 'number',
          image: 'object',
          platform: 'array',
          sortOrder: 'number',
        },
      },
      { upsert: true, session },
    );
  },
};
