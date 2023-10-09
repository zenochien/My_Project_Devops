const mongoDB = require('../../db/mongoDB');
const helper = require('../../utils/helper');
const salonEarningModel = require('../models/SalonEarning');
const depositPaymentModel = require('../models/DepositPayment');
const { DEPOSIST_PAYMENT_STATUS } = require('../../const/Constants');
const moment = require('moment-timezone');
const { getPayoutService } = require('../../services/PayoutService');
const Errors = require('../../const/Errors');
const depositPaymentService = {};
module.exports = depositPaymentService;

depositPaymentService.create = async ({ bookingId, salonId, payoutAccount, originalPrice, commissionRate }) => {
  const today = moment().toDate();
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();
  const depositPaymentId = await helper.getAnNanoId();
  const amount = originalPrice;
  const fee = Math.floor((originalPrice * commissionRate) / 100);
  const net = originalPrice - fee;
  const depositPaymentData = {
    _id: depositPaymentId,
    bookingId,
    status: DEPOSIST_PAYMENT_STATUS.IN_PROCCESS,
    salonId,
    payoutAccount,
    amount,
    fee,
    net,
    commissionRate,
    _created_at: today,
    _updated_at: today,
  };

  // mark booking in proccess depositing payment
  await helper.executeInTransaction(async (session) => {
    await Promise.all([
      db
        .collection('Booking')
        .updateOne(
          { _id: bookingId },
          { $set: { 'payoutInfo.status': DEPOSIST_PAYMENT_STATUS.IN_PROCCESS } },
          { session },
        ),
      db.collection('DepositPayment').insertOne(depositPaymentData),
    ]);
  }, mongodbClient);
  return depositPaymentData;
};

depositPaymentService.deposit = async ({
  balanceId,
  amount,
  fee,
  currency,
  bookingId,
  commissionRate,
  depositPayment,
}) => {
  // check status before handle
  if (depositPayment.status !== DEPOSIST_PAYMENT_STATUS.IN_PROCCESS) {
    throw new Parse.Error(Errors.INVALID_DEPOSIT_PAYMENT_STATUS.code, Errors.INVALID_DEPOSIT_PAYMENT_STATUS.message);
  }

  // deposit payment to payout service
  const payment = await depositPaymentService.getPaymentFromPayoutService({
    bookingId,
    balanceId,
    amount,
    fee,
    currency,
    commissionRate,
  });
  const earning = await salonEarningModel.getEarningBySalonAndDate({
    salonId: depositPayment.salonId,
    date: moment(payment.createdAt).toDate(),
  });
  // update local data
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();
  const today = moment().toDate();
  await helper.executeInTransaction(async (session) => {
    await Promise.all([
      db.collection('Booking').updateOne(
        { _id: bookingId },
        {
          $set: {
            payoutInfo: {
              status: DEPOSIST_PAYMENT_STATUS.COMPLETED,
              gross: payment.amount,
              net: payment.net,
              fee: payment.fee,
              earningId: earning.get('payoutEarningId'),
              commissionRate: payment.metadata.commissionRate,
              syncDate: today,
            },
          },
        },
        { session },
      ),
      db.collection('DepositPayment').updateOne(
        { _id: depositPayment._id },
        {
          $set: {
            status: DEPOSIST_PAYMENT_STATUS.COMPLETED,
            _updated_at: today,
            earningId: earning.get('payoutEarningId'),
          },
        },
        { session },
      ),
    ]);
  }, mongodbClient);
};

depositPaymentService.getPaymentFromPayoutService = async ({
  bookingId,
  balanceId,
  amount,
  fee,
  currency,
  commissionRate,
}) => {
  const payoutService = getPayoutService();
  let payment;
  const result = await payoutService.getPayments({ metaKeywords: `"bookingId":"${bookingId}"`, page: 1, limit: 10 });
  if (result.total) {
    payment = result.data[0];
  }
  if (!payment) {
    payment = await payoutService.depositPayment({
      balanceId,
      amount,
      fee,
      feeDetails: {
        type: 'commission',
      },
      currency,
      description: `bookingId:${bookingId}`,
      earningCategory: 'fulfilled',
      reportingCategory: ['deposit'],
      metadata: {
        bookingId,
        commissionRate,
      },
    });
  }
  return payment;
};

depositPaymentService.retryDepositPayment = async () => {
  const result = [];
  const items = await depositPaymentModel.getInProccessDepositPaymentInPast();
  for (let i = 0; i < items.length; i++) {
    const depositPayment = items[i];
    await depositPaymentService.deposit({
      balanceId: depositPayment.payoutAccount.balanceId,
      amount: depositPayment.amount,
      fee: depositPayment.fee,
      currency: depositPayment.payoutAccount.currency,
      bookingId: depositPayment.bookingId,
      commissionRate: depositPayment.commissionRate,
      depositPayment,
    });
    result.push(depositPayment._id);
  }
  console.log('[depositPaymentService][retryDepositPayment]', result);
  return result;
};
