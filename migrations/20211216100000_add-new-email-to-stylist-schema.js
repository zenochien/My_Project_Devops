const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          newEmail: 'string',
          userStatus: 'string',
        },
      },
      { upsert: false, session },
    );
    await db.collection('_SCHEMA').updateOne(
      {
        _id: '_User',
      },
      {
        $set: {
          newEmail: 'string',
          tokenForVerifyNewEmail: 'string',
          syncUserStatus: 'boolean',
        },
      },
      { upsert: false, session },
    );
  },
};
