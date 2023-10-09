module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Post',
      },
      {
        $set: {
          favoriteCustomers: 'array',
        },
      },
      { session },
    );
  },
};
