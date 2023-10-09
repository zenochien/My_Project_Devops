const mongoDB = require('../db/mongoDB');
const { getCouponService } = require('../services/CouponService');
module.exports = {
  cancelBooking: async ({ coupon, objectId }) => {
    if (coupon) {
      const couponService = getCouponService();
      const result = await couponService.cancelTransaction(coupon.transaction.id);
      console.log('result: ', result);
      const db = await mongoDB.getMongoDB();
      await db
        .collection('Booking')
        .updateOne({ _id: objectId }, { $set: { 'coupon.transaction.status': 'CANCELED' } });
    }
  },
};
