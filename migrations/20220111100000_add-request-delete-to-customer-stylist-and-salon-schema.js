const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Customer',
      },
      {
        $set: {
          requestDeletingAccount: 'object',
          userStatus: 'string',
          deletedAt: 'date',
        },
      },
      { upsert: false, session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          requestDeletingAccount: 'object',
          updatedStaffInfoAfterDeleteStylist: 'object',
          deletedAt: 'date',
        },
      },
      { upsert: false, session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Post',
      },
      {
        $set: {
          requestDeleting: 'boolean',
        },
      },
      { upsert: false, session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Salon',
      },
      {
        $set: {
          status: 'string',
          deletedAt: 'date',
        },
      },
      { upsert: false, session },
    );
  },
};
