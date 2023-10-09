module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Customer' },
      {
        $set: {
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          email: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          profileImages: 'array',
          profileImageIds: 'array',
          firstName: 'string',
          lastName: 'string',
          phoneticLastName: 'string',
          nickName: 'string',
          phoneticFirstName: 'string',
          phone: 'string',
          paymentMethod: 'string',
          gender: 'string',
          birthDate: 'string',
          fullName: 'string',
          phoneticFullName: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('Customer').createIndex(
      {
        email: 1,
      },
      {
        unique: true,
        name: 'email_1',
        background: true,
        sparse: true,
      },
    );
  },
};
