const _forEach = require('lodash/forEach');
const ControllerBoardModel = require('../src/cloud/models/ControllerBoard');
const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update SCHEMA Salon: add cbSalonId ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          { _id: 'Salon' },
          {
            $set: {
              cbSalonId: 'string',
            },
          },
          { upsert: false, session },
        ),
      ),
    );

    let salonList = [];
    let page = 1;
    const limit = 200;
    do {
      const response = await ControllerBoardModel.getListSalon({ page, limit });
      salonList = response.data;
      const updateArray = [];
      _forEach(salonList, (salon) => {
        updateArray.push({
          updateOne: {
            filter: { salonEmail: salon.operatorEmail },
            update: { $set: { cbSalonId: salon.id } },
            upsert: false,
          },
        });
      });
      updateArray.length > 0 &&
        console.log(Helper.getMongoWriteOpResult(await db.collection('Salon').bulkWrite(updateArray, { session })));
      page++;
    } while (salonList.length == limit);
  },
};
