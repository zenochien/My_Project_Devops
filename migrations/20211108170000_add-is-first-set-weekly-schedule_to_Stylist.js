const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Add isFirstSetWeeklySchedule field to Stylist SCHEMA==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          {
            _id: 'Stylist',
          },
          {
            $set: {
              isFirstSetWeeklySchedule: 'boolean',
            },
          },
          { upsert: true, session },
        ),
      ),
    );
  },
};
