module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Bank',
      },
      {
        $set: {
          _id: 'Bank',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          bankNameCode: 'string',
          bankName: 'string',
          bankCode: 'string',
          bankNameHiragana: 'string',
          addedFirstSearchChar: 'boolean',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'BankBranch',
      },
      {
        $set: {
          _id: 'BankBranch',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          branchCode: 'string',
          bank: '*Bank',
          branchNameCode: 'string',
          branchName: 'string',
          telephone: 'string',
          address: 'string',
          postalCode: 'string',
          branchNameHiragana: 'string',
          noMean: 'number',
          noMean2: 'number',
          noMean3: 'number',
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
          bankInfo: 'object',
        },
      },
      { session },
    );
  },
};
