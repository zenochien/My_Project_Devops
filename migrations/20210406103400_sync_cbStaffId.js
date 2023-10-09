const _forEach = require('lodash/forEach');
const _get = require('lodash/get');

const ControllerBoardModel = require('../src/cloud/models/ControllerBoard');
const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Update SCHEMA Stylist: add cbStaffId ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          { _id: 'Stylist' },
          {
            $set: {
              cbStaffId: 'string',
            },
          },
          { upsert: false, session },
        ),
      ),
    );

    let staffList = [];
    let salonList = [];
    let salonPage = 1;
    let stylistPage = 1;
    const limit = 200;
    const bulkWriteLimit = 500;
    let updateArray = [];
    do {
      const salonResponse = await ControllerBoardModel.getListSalon({ salonPage, limit });
      salonList = salonResponse.data;

      for (const salon of salonList) {
        stylistPage = 1;
        do {
          const response = await ControllerBoardModel.getListStaff({
            stylistPage,
            limit,
            cbSalonId: salon.id,
          }).catch((err) => console.log('Error getListStaff cbSalonId', salon.id, err));
          staffList = response.data;
          _forEach(staffList, async (staff) => {
            const sourceId = _get(staff, 'connections.0.sourceId');
            updateArray.push({
              updateOne: {
                filter: { _id: sourceId },
                update: { $set: { cbStaffId: staff.id } },
                upsert: false,
              },
            });
            if (updateArray.length === bulkWriteLimit) {
              console.log(
                Helper.getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(updateArray, { session })),
              );
              updateArray = [];
            }
          });
          stylistPage++;
        } while (staffList.length === limit);
      }

      salonPage++;
    } while (salonList.length === limit);

    updateArray.length > 0 &&
      console.log(Helper.getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(updateArray, { session })));
  },
};
