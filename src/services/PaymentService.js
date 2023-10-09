const PaymentService = {};
module.exports = PaymentService;

const { PaymentVeritrans4gService } = require('payment-veritrans4g');

const APP_NAME = 'hairlie';
const PREFIX_ACCOUNT_ID = `${APP_NAME}_cus_`;

let veriTrans4GService;

function getVeriTransService() {
  if (!veriTrans4GService) {
    veriTrans4GService = new PaymentVeritrans4gService();
  }

  return veriTrans4GService;
}

Object.assign(PaymentService, {
  getVeriTransService,

  getAccountId: ({ userId }) => {
    return PREFIX_ACCOUNT_ID + userId;
  },

  getTransactionNo: (salonId, bookingId) => `${salonId}-${bookingId}-${new Date().getTime()}`,

  getChargeFailId: (bookingId) => `Charge fail ${bookingId} at ${new Date().getTime()}`,
});
