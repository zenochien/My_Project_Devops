module.exports = {
  up: async (db) => {
    await db.collection('Stylist').createIndex({ 'topStylist.top': 1 }, { name: 'top_stylist' });
  },
};
