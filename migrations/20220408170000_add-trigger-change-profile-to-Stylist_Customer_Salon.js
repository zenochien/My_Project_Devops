const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Add triggerChangeProfile field to Stylist, Customer and Salon SCHEMA==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateMany(
          {
            _id: { $in: ['Stylist', 'Customer', 'Salon'] },
          },
          {
            $set: {
              triggerChangeProfile: 'object',
            },
          },
          { session },
        ),
      ),
    );
  },
};
