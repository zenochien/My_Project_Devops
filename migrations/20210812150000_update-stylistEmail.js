const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Stylist' },
      {
        $set: {
          stylistEmail: 'string',
        },
      },
      { session },
    );

    const updateArray = await db
      .collection('_User')
      .find({ _p_stylist: { $exists: true } })
      .project({ email: 1, _p_stylist: 1 })
      .map((user) => {
        return {
          updateOne: {
            filter: { _id: user._p_stylist.replace('Stylist$', '') },
            update: { $set: { stylistEmail: user.email } },
            upsert: false,
          },
        };
      })
      .toArray();

    if (updateArray.length > 0) {
      console.log(
        '== Update stylistEmail for stylist ==',
        Helper.getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(updateArray, { session })),
      );
    }
  },
};
