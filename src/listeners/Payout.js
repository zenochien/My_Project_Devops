const salonModel = require('../cloud/models/Salon');
const salonEarningService = require('../cloud/services/SalonEarning');
const depositPaymentService = require('../cloud/services/DepositPayment');
const stylistModel = require('../cloud/models/Stylist');
const helper = require('../utils/helper');
module.exports = {
  depositPayment: async ({ bookingId, originalPrice, stylistId, salonId }) => {
    try {
      const payoutAccount = await salonModel.getPayoutAccount(salonId);
      const currentCycle = helper.getCurrentCycle();
      const nextCycle = helper.getNextCycle();
      const commissionRate = await stylistModel.getCommissonRate({ startCycle: currentCycle.startCycle, stylistId });

      // make sure earning is created before
      await salonEarningService.makeCurrentAndNextEarning({
        salonId,
        startCycle: currentCycle.startCycle,
        endCycle: currentCycle.endCycle,
        payoutAccount,
        nextStartCycle: nextCycle.startCycle,
        nextEndCycle: nextCycle.endCycle,
      });

      // mark booking is in proccess deposit payment
      const depositPayment = await depositPaymentService.create({
        bookingId,
        originalPrice,
        commissionRate,
        payoutAccount,
        salonId,
      });

      await depositPaymentService.deposit({
        amount: depositPayment.amount,
        fee: depositPayment.fee,
        balanceId: payoutAccount.balanceId,
        currency: payoutAccount.currency,
        bookingId,
        commissionRate,
        depositPayment,
      });
    } catch (error) {
      console.log('[Listener][Payout][depositPayment]:error:', error);
    }
  },
};
