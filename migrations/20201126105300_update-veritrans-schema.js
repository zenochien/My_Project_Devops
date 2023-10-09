module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Customer' },
      {
        $set: {
          veriTransInformation: '*VeriTransInformation',
        },
      },
      { session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'VeriTransInformation' },
      {
        $set: {
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          client: '*Customer',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          veriTransAccountId: 'string',
          cardHolderNamesMap: 'object',
        },
      },
      { upsert: true, session },
    );
  },
};
