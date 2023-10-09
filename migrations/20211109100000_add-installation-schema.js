const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: '_Installation' },
      {
        $set: {
          _id: '_Installation',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          createdAt: 'date',
          objectId: 'string',
          updatedAt: 'date',
          installationId: 'string',
          user: '*_User',
          appIdentifier: 'string',
          badge: 'number',
          deviceToken: 'string',
          deviceType: 'string',
          timeZone: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
