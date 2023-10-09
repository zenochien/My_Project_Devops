module.exports = {
  up: async (db) => {
    await db
      .collection('FavoritedStylist')
      .createIndex({ stylistId: 1, customerId: 1 }, { unique: true, name: 'favorited_stylist_customerId_stylistId' });
  },
};
