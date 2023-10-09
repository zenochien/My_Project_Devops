const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    const updateArray = [];
    const promises = await db
      .collection('Salon')
      .find()
      .project({ _id: 1, salonName: 1 })
      .map(async (salon) => {
        const user = await db
          .collection('_User')
          .findOne({ _p_salon: `Salon$${salon._id}` }, { projection: { _id: 1 } });
        if (user) {
          user.salonName = salon.salonName;
          updateArray.push({
            updateOne: {
              filter: { _id: user._id },
              update: { $set: user },
              upsert: false,
            },
          });
        }
      })
      .toArray();

    // salon -> Promise (fetch data + add into updateArray)
    await Promise.all(promises);
    if (updateArray.length > 0) {
      console.log(
        '== Add salonName for user ==',
        Helper.getMongoWriteOpResult(await db.collection('_User').bulkWrite(updateArray, { session })),
      );
    }
  },
};
