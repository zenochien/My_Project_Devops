const Helper = require('../src/utils/helper');
module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update SCHEMA Salon: add slug ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          { _id: 'Salon' },
          {
            $set: {
              slug: 'string',
            },
          },
          { upsert: false, session },
        ),
      ),
    );

    console.log(
      '== Update SCHEMA Stylist: add slug ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          { _id: 'Stylist' },
          {
            $set: {
              slug: 'string',
            },
          },
          { upsert: false, session },
        ),
      ),
    );

    const updateStylistArray1 = [];
    await db
      .collection('Salon')
      .find({ slug: { $exists: 0 } })
      .project({ _id: 1, salonName: 1 })
      .forEach((salon) => {
        updateStylistArray1.push({
          updateOne: {
            filter: { _id: salon._id },
            update: { $set: { slug: Helper.slugify(salon.salonName) } },
            upsert: false,
          },
        });
      });
    if (updateStylistArray1.length > 0) {
      console.log(
        '== Add slug for salon ==',
        Helper.getMongoWriteOpResult(await db.collection('Salon').bulkWrite(updateStylistArray1, { session })),
      );
    }

    const updateStylistArray2 = [];
    await db
      .collection('Stylist')
      .find({ slug: { $exists: 0 } })
      .project({ _id: 1, nickName: 1 })
      .forEach((stylist) => {
        updateStylistArray2.push({
          updateOne: {
            filter: { _id: stylist._id },
            update: { $set: { slug: Helper.slugify(stylist.nickName) } },
            upsert: false,
          },
        });
      });
    if (updateStylistArray2.length > 0) {
      console.log(
        '== Add slug for stylist ==',
        Helper.getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(updateStylistArray2, { session })),
      );
    }
  },
};
