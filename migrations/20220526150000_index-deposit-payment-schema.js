module.exports = {
  up: async (db) => {
    await db
      .collection('DepositPayment')
      .createIndex({ bookingId: 1 }, { unique: true, name: 'DepositPayment_bookingId' });
  },
};
