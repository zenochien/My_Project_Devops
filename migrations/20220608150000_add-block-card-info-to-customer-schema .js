module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Customer',
      },
      {
        $set: {
          blockCardInfo: 'object',
        },
      },
      { session },
    );
  },
};
