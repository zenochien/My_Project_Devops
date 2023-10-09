module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'ClosingDate' },
      {
        $set: {
          startDate: 'string',
          endDate: 'string',
          note: 'string',
          salonId: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
        },
      },
      { upsert: true, session },
    );
  },
};
