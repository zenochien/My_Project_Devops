const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Notification' },
      {
        $set: {
          title: 'string',
          inAppTitle: 'string',
          body: 'string',
          receiver: '*_User',
          isNew: 'boolean',
        },
      },
      { session },
    );
  },
};
