const Helper = require('../src/utils/helper');
const _ = require('lodash');

module.exports = {
  up: async (db, session) => {
    const updateSalonArray = [];
    await db
      .collection('Salon')
      .find({ salonSNS: { $exists: true } })
      .project({ _id: 1, salonSNS: 1 })
      .forEach((salon) => {
        _.forEach(salon.salonSNS, (value, key) => {
          salon.salonSNS[key] = Helper.replaceSNSUrl(value);
        });
        updateSalonArray.push({
          updateOne: {
            filter: { _id: salon._id },
            update: { $set: salon },
            upsert: false,
          },
        });
      });

    if (updateSalonArray.length > 0) {
      console.log(
        '== Add salonSNS for salon ==',
        Helper.getMongoWriteOpResult(await db.collection('Salon').bulkWrite(updateSalonArray, { session })),
      );
    }

    const updateStylistArray = [];
    await db
      .collection('Stylist')
      .find({ stylistSNS: { $exists: true } })
      .project({ _id: 1, stylistSNS: 1 })
      .forEach((stylist) => {
        _.forEach(stylist.stylistSNS, (value, key) => {
          stylist.stylistSNS[key] = Helper.replaceSNSUrl(value);
        });
        updateStylistArray.push({
          updateOne: {
            filter: { _id: stylist._id },
            update: { $set: stylist },
            upsert: false,
          },
        });
      });

    if (updateStylistArray.length > 0) {
      console.log(
        '== Add stylistSNS for stylist ==',
        Helper.getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(updateStylistArray, { session })),
      );
    }
  },
};
