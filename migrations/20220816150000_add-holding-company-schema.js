module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'HoldingCompany',
      },
      {
        $set: {
          _id: 'HoldingCompany',
          objectId: 'string',
          status: 'string',
          name: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Salon',
      },
      {
        $set: {
          holdingCompany: 'object',
        },
      },
      { session },
    );
  },
};
