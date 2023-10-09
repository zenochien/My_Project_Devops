const ControllerBoardModel = require('../src/cloud/models/ControllerBoard');
const _get = require('lodash/get');
const { EMPTY_WEEKLY_SCHEDULE } = require('../src/const/Constants');

const addCBStylist = async (stylist, cbSalonId) => {
  let cbStaffId;
  try {
    const data = await ControllerBoardModel.addStaff({
      cbSalonId,
      sourceId: stylist._id,
      email: stylist.email,
      name: `${stylist.nickName}`,
    });
    cbStaffId = _get(data, 'id');
  } catch (error) {
    console.log('Error when addStaff', stylist._id, error);
  }

  await ControllerBoardModel.updateStaffWeeklySchedule({
    cbStaffId,
    schedules: EMPTY_WEEKLY_SCHEDULE,
  }).catch((error) => console.log('Error when addCBStylist updateStaffWeeklySchedule', error));
};

const syncCBStylistInfo = async (stylist, cbStaffId) => {
  if (cbStaffId) {
    await ControllerBoardModel.updateStaffInfo({
      cbStaffId,
      name: stylist.nickName,
      sourceId: stylist._id,
    }).catch((error) => console.log('Error when updateSalonInfo', stylist._id, error));
  }
  return Promise.resolve();
};

module.exports = {
  up: async (db, session) => {
    const stylistArray1 = await db
      .collection('Stylist')
      .find({ cbStaffId: { $exists: 0 } })
      .project({
        _id: 1,
        _p_salon: 1,
        nickName: 1,
        email: 1,
      })
      .toArray();

    await stylistArray1.reduce(async (previousPromise, nextStylist) => {
      await previousPromise;

      const salon = await db
        .collection('Salon')
        .findOne({ _id: nextStylist._p_salon.replace('Salon$', '') }, { projection: { cbSalonId: 1 } });
      return addCBStylist(nextStylist, salon.cbSalonId);
    }, Promise.resolve());

    const stylistArray2 = await db
      .collection('Stylist')
      .find({ cbStaffId: { $exists: 1 } })
      .project({
        _id: 1,
        nickName: 1,
        cbStaffId: 1,
      })
      .toArray();

    await stylistArray2.reduce(async (previousPromise, nextStylist) => {
      await previousPromise;
      return syncCBStylistInfo(nextStylist, nextStylist.cbStaffId);
    }, Promise.resolve());
  },
};
