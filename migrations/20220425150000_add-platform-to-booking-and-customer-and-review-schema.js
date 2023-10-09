module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Booking',
      },
      {
        $set: {
          platform: 'string',
        },
      },
      { session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Review',
      },
      {
        $set: {
          platform: 'string',
        },
      },
      { session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Customer',
      },
      {
        $set: {
          platform: 'string',
        },
      },
      { session },
    );
  },
};
