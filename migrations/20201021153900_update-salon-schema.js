module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Salon' },
      {
        $set: {
          salonAddress4: 'string',
          postalCode: 'string',
        },
      },
      { session },
    );
  },
};
