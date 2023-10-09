const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update Menu duration ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('Menu').updateMany(
          {},
          { $mul: { duration: 60 } },
          {
            upsert: false,
            session,
          },
        ),
      ),
    );

    console.log(
      '== Update Booking totalDuration ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('Booking').updateMany(
          {},
          { $mul: { totalDuration: 60 } },
          {
            upsert: false,
            session,
          },
        ),
      ),
    );

    console.log(
      '== Update _GlobalConfig ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_GlobalConfig').updateOne(
          { _id: 1 },
          {
            $set: {
              'masterKeyOnly.menuDurationMin': false,
              'masterKeyOnly.menuDurationMax': false,
              'params.menuDurationMin': 30,
              'params.menuDurationMax': 720,
            },
          },
          { upsert: false, session },
        ),
      ),
    );
  },
};
