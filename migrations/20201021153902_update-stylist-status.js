const { STATUS } = require('../src/const/Constants');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Stylist' },
      {
        $set: {
          status: 'string',
        },
      },
      { session },
    );

    await db.collection('Stylist').updateMany(
      {
        status: undefined,
      },
      {
        $set: {
          status: STATUS.PUBLISHED,
        },
      },
      { session },
    );
  },
};
