// run query below after migration
// db.Stylist.updateMany({maxConfirmedBookingCount: {$exists: false}}, {$set: { maxConfirmedBookingCount: 1}})

module.exports = {
  up: async (db, session) => {
    await db.collection('ClosedSlots').createIndex({ stylistId: 1, slot: 1 }, { unique: true, name: 'stylistId_slot' });
  },
};
