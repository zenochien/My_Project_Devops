const { PRODUCT_TYPE } = require('../src/const/Constants');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Product' },

      {
        $set: {
          type: 'string',
        },
      },

      { session },
    );

    await db.collection('Product').updateMany(
      {
        type: undefined,
      },

      {
        $set: {
          type: PRODUCT_TYPE.USER,
        },
      },

      { session },
    );
  },
};
