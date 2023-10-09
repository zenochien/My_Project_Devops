// run query below after migration
// db.Stylist.updateMany({maxConfirmedBookingCount: {$exists: false}}, {$set: { maxConfirmedBookingCount: 1}})

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          maxConfirmedBookingCount: 'number',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'ClosedSlots',
      },
      {
        $set: {
          stylistId: 'string',
          date: 'date',
          slot: 'date',
          count: 'number',
          confirmedBookings: 'array',
          canceledBookings: 'array',
          updatedAt: 'date',
          createdAt: 'date',
        },
      },
      { upsert: true, session },
    );
  },
};
