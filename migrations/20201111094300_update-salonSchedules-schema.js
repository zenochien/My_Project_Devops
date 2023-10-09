module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Salon' },
      {
        $set: {
          salonSchedules: 'object',
        },
        $unset: {
          salonOpeningHour: 1,
        },
      },
      { session },
    );

    await db.collection('Salon').updateMany(
      {
        salonOpeningHour: { $exists: 1 },
      },
      {
        $unset: {
          salonOpeningHour: 1,
        },
      },
      { session },
    );
  },
};
