module.exports = {
  up: async (db) => {
    await db
      .collection('SalonEarning')
      .createIndex({ cycleId: 1, salonId: 1 }, { unique: true, name: 'SalonEarning_cycle_salonId' });
  },
};
