const mongoDB = require('../../db/mongoDB');
const { DEPOSIST_PAYMENT_STATUS } = require('../../const/Constants');
const moment = require('moment-timezone');

const depositPaymentModel = {};
module.exports = depositPaymentModel;

depositPaymentModel.getInProccessDepositPaymentInPast = async () => {
  const db = await mongoDB.getMongoDB();
  return await db
    .collection('DepositPayment')
    .find({
      status: DEPOSIST_PAYMENT_STATUS.IN_PROCCESS,
      _created_at: { $lte: moment().subtract(2, 'minutes').toDate() },
    })
    .toArray();
};
