const ControllerBoardModel = require('../src/cloud/models/ControllerBoard');
const _get = require('lodash/get');

const addAndSyncCBSalonInfo = async (salon) => {
  let cbSalonId;
  try {
    const data = await ControllerBoardModel.addSalon({
      email: salon.salonEmail,
      salonName: salon.salonName,
    });
    cbSalonId = _get(data, 'id');
  } catch (error) {
    console.log('Error when addSalon', salon.salonEmail, error);
  }

  await syncCBSalonInfo(salon, cbSalonId);
};

const syncCBSalonInfo = async (salon, cbSalonId) => {
  if (cbSalonId && salon.salonSchedules) {
    await ControllerBoardModel.updateSalonSchedule({
      cbSalonId,
      schedules: salon.salonSchedules,
    }).catch((error) => console.log('Error when updateSalonSchedule', salon.salonEmail, error));
  }
  if (cbSalonId && salon.postalCode) {
    await ControllerBoardModel.updateSalonInfo({
      cbSalonId,
      ...salon,
    }).catch((error) => console.log('Error when updateSalonInfo', salon.salonEmail, error));
  }
};

module.exports = {
  up: async (db, session) => {
    const salonArray1 = await db
      .collection('Salon')
      .find({ cbSalonId: { $exists: 0 } })
      .project({
        _id: 1,
        salonEmail: 1,
        salonName: 1,
        salonSchedules: 1,
        postalCode: 1,
        salonAddress1: 1,
        salonAddress2: 1,
        salonAddress3: 1,
        salonAddress4: 1,
      })
      .toArray();

    await salonArray1.reduce(async (previousPromise, nextSalon) => {
      await previousPromise;
      return addAndSyncCBSalonInfo(nextSalon);
    }, Promise.resolve());

    const salonArray2 = await db
      .collection('Salon')
      .find({ cbSalonId: { $exists: 1 } })
      .project({
        _id: 1,
        salonEmail: 1,
        salonName: 1,
        salonSchedules: 1,
        postalCode: 1,
        salonAddress1: 1,
        salonAddress2: 1,
        salonAddress3: 1,
        salonAddress4: 1,
        cbSalonId: 1,
      })
      .toArray();

    await salonArray2.reduce(async (previousPromise, nextSalon) => {
      await previousPromise;
      return syncCBSalonInfo(nextSalon, nextSalon.cbSalonId);
    }, Promise.resolve());
  },
};
