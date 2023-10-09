module.exports = {
  up: async (db, session) => {
    db.collection('_SCHEMA').updateOne(
      { _id: 'ContactUs' },
      {
        $set: {
          objectId: 'string',
          name: 'string',
          email: 'string',
          phoneNumber: 'string',
          contents: 'string',
          extraInfo: 'object',
          updatedAt: 'date',
          createdAt: 'date',
        },
      },
      { upsert: true, session },
    );
  },
};
