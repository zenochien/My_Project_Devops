module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').deleteOne({ _id: 'SalonSchedule' }, { session });
    await db.collection('SalonSchedule').drop();
  },
};
