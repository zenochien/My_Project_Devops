module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      { _id: 'Salon' },
      {
        $unset: {
          facebook: 1,
          twitter: 1,
          youtube: 1,
          tiktok: 1,
          instagram: 1,
        },
      },
      { session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Product' },
      {
        $unset: {
          showPrice: 1,
        },
      },
      { session },
    );

    await db.collection('Salon').updateMany(
      {
        $or: [
          { facebook: { $exists: 1 } },
          { twitter: { $exists: 1 } },
          { youtube: { $exists: 1 } },
          { tiktok: { $exists: 1 } },
          { instagram: { $exists: 1 } },
        ],
      },
      {
        $unset: {
          facebook: 1,
          twitter: 1,
          youtube: 1,
          tiktok: 1,
          instagram: 1,
        },
      },
      { session },
    );
  },
};
