module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Salon',
      },
      {
        $set: {
          stationName: 'string',
          distanceNearestStation: 'number',
        },
      },
      { session },
    );
  },
};
