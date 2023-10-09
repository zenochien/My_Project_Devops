const salonEarning = require('../cloud/services/SalonEarning');

module.exports = {
  // LISTENER SALON_CHANGE_PROFILE
  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    const requireFields = [
      'salonName',
      'salonNameKatakana',
      'holdingCompany',
      'holdingCompany.name',
      'holdingCompany.status',
    ];
    await salonEarning.salonChangeProfile({ dirtyKeys, objectData, requireFields });
  },
};
