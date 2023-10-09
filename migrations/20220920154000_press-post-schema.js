module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'PressPost',
      },
      {
        $set: {
          title: 'string',
          image: 'object',
          description: 'string',
          detailURL: 'string',
          rank: 'number',
          order: 'number',
          stylists: 'array',
          updatedAt: 'date',
          createdAt: 'date',
        },
      },
      { upsert: true, session },
    );
  },
};
