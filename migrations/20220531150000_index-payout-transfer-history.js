module.exports = {
  up: async (db) => {
    await db
      .collection('PayoutTranferHistory')
      .createIndex({ payoutId: 1 }, { unique: true, name: 'PayoutTranferHistory_payoutId' });
  },
};
