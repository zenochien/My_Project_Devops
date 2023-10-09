const VeriTransPaymentModel = {};
module.exports = VeriTransPaymentModel;

const _get = require('lodash/get');
const _isEmpty = require('lodash/isEmpty');
const _isNil = require('lodash/isNil');
const _pick = require('lodash/pick');
const moment = require('moment-timezone');
const eventManager = require('../../utils/Event');
const creditCardType = require('credit-card-type');

const Helper = require('../../utils/helper');
const { PaymentVeritrans4gService } = require('payment-veritrans4g');
const CustomerModel = require('./Customer');
const PaymentService = require('../../services/PaymentService');
const Errors = require('../../const/Errors');
const { PAYMENT_STATUS, DEPOSIST_PAYMENT_STATUS, EVENTS } = require('../../const/Constants');
const BookingModel = require('./Booking');

const veriTransService = PaymentService.getVeriTransService();

const writeErrorLog = (functionName, error) => {
  console.error(`Error ${functionName}`, error);
};

const buildCustomerInfo = (customerParse) => {
  return Helper.convertParseObjectToJson(customerParse, [
    'veriTransInformation.veriTransAccountId',
    'veriTransInformation.cardHolderNamesMap',
  ]);
};

/**
 * Ensure an object named VeriTransInfo exist for specific user, this will be link with VeriTrans4G's account
 * @param email
 *
 * @return Promise<Parse.Object>
 */
VeriTransPaymentModel._ensureVeriTransInfo = async (customerDetail, email) => {
  const { veriTransInformation } = customerDetail;
  //
  // exists
  //
  if (!_isEmpty(veriTransInformation)) {
    return new Parse.Object('VeriTransInformation', {
      id: veriTransInformation.objectId,
      veriTransAccountId: veriTransInformation.veriTransAccountId,
      cardHolderNamesMap: veriTransInformation.cardHolderNamesMap,
    });
  }

  //
  // not exists
  //
  const parseVeriTransInformation = new Parse.Object('VeriTransInformation');

  // update veriTransInformation link to a specific client (User)
  parseVeriTransInformation.set('client', Helper.getPointerValue('Customer', customerDetail.objectId));
  await parseVeriTransInformation.save(null, { useMasterKey: true });

  // update User link to VeriTransInformation
  await CustomerModel.updateCustomerInfo({
    email,
    veriTransInformationId: parseVeriTransInformation.id,
  });

  return parseVeriTransInformation;
};

/**
 * Ensure VeriTransAccount exist and return VeriTrans's accountId
 * @param veriTransAccountId
 *
 * @return Promise<PaymentVeritrans4gService.Account>
 */
VeriTransPaymentModel._ensureVeriTransAccount = async (veriTransAccountId) => {
  let account;

  // check account exists, if not exists, then create account
  try {
    account = await veriTransService.getUserAccount({ accountId: veriTransAccountId });
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.addCard.getUserAccount', error);

    if (!PaymentVeritrans4gService.isUnregisteredMember(error)) {
      throw error.message;
    }

    // only create account without card token in case unregistered account
    account = await veriTransService.createUserAccount({
      accountId: veriTransAccountId,
    });
  }

  return account;
};

VeriTransPaymentModel.addCard = async (data) => {
  const customerDetail = await CustomerModel.getCustomerDetail(
    { email: data.email },
    {
      selectFields: ['veriTransInformation.veriTransAccountId', 'veriTransInformation.cardHolderNamesMap'],
    },
  );

  const parseVeriTransInformation = await VeriTransPaymentModel._ensureVeriTransInfo(customerDetail, data.email);
  const veriTransAccount = await VeriTransPaymentModel._ensureVeriTransAccount(
    PaymentService.getAccountId({ userId: customerDetail.objectId }),
  );

  // add card
  try {
    const cardId = await veriTransService.addCardInfo(veriTransAccount.accountId, data.cardToken);

    // save card holder's name for later use (not supported by VeriTrans4G addCard func)
    parseVeriTransInformation.set('cardHolderNamesMap', {
      ...parseVeriTransInformation.get('cardHolderNamesMap'),
      [cardId]: data.cardHolderName,
    });

    // save VeriTrans4G's account id for later use
    parseVeriTransInformation.set('veriTransAccountId', veriTransAccount.accountId);

    await parseVeriTransInformation.save(null, { useMasterKey: true });
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.addCard.addCardInfo', error);
    throw error.message;
  }

  // set default card if only have 1 card
  try {
    // get latest card list
    const cardList = await veriTransService.getListCardInfo(veriTransAccount.accountId);
    if (cardList.length === 1) {
      await veriTransService.updateCardInfo(veriTransAccount.accountId, cardList[0].cardId, { defaultCard: '1' });
    }
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.addCard.setDefaultCard', error);
    throw error.message;
  }

  return true;
};

VeriTransPaymentModel.getCardList = async (email, customerDetail) => {
  if (_isNil(customerDetail)) {
    customerDetail = await CustomerModel.getCustomerDetail(
      { email },
      { selectFields: ['veriTransInformation.veriTransAccountId', 'veriTransInformation.cardHolderNamesMap'] },
    );
  }

  const veriTransAccountId = _get(customerDetail, 'veriTransInformation.veriTransAccountId');

  if (!veriTransAccountId) {
    return [];
  }

  const cardList = await veriTransService.getListCardInfo(veriTransAccountId).catch((error) => {
    writeErrorLog('getListCardInfo', error);
  });
  if (!cardList) {
    return [];
  }

  const cardHolderNamesMap = _get(customerDetail, 'veriTransInformation.cardHolderNamesMap') || {};

  return cardList.map((card) => ({
    cardId: card.cardId,
    cardNumber: Helper.replaceRange(card.cardNumber, 4, 6, '**'),
    cardExpire: card.cardExpire,
    cardType: VeriTransPaymentModel.getCardType(card.cardNumber),
    isDefault: card.defaultCard === '1',
    cardHolderName: cardHolderNamesMap[card.cardId] || '',
  }));
};

VeriTransPaymentModel.deleteCard = async (data) => {
  const customerDetail = await CustomerModel.getCustomerDetail(
    { email: data.email },
    { selectFields: ['veriTransInformation.veriTransAccountId'] },
  );
  const veriTransAccountId = _get(customerDetail, 'veriTransInformation.veriTransAccountId');

  if (!veriTransAccountId) {
    const { code, message } = Errors.VERITRANS_ACCOUNT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  try {
    const cardList = await veriTransService.getListCardInfo(veriTransAccountId);
    if (cardList.length === 1) {
      const { code, message } = Errors.DELETE_CARD_ERROR;
      throw new Parse.Error(code, message);
    }
    await veriTransService.deleteCardInfo(veriTransAccountId, data.cardId);
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.deleteCard', error);
    throw error.message;
  }

  return true;
};

VeriTransPaymentModel.setDefaultCard = async (data) => {
  const customerDetail = await CustomerModel.getCustomerDetail(
    { email: data.email },
    {
      selectFields: ['veriTransInformation.veriTransAccountId'],
    },
  );
  const veriTransAccountId = _get(customerDetail, 'veriTransInformation.veriTransAccountId');

  if (!veriTransAccountId) {
    const { code, message } = Errors.VERITRANS_ACCOUNT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  try {
    await veriTransService.updateCardInfo(veriTransAccountId, data.cardId, { defaultCard: '1' });
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.setDefaultCard', error);
    throw error.message;
  }

  return true;
};

VeriTransPaymentModel.getCardType = (cardNumber) => {
  if (!cardNumber) {
    return '';
  }

  return _get({ arr: creditCardType(cardNumber) }, 'arr[0].niceType', '');
};

VeriTransPaymentModel.charge = async (bookingParse) => {
  const customerDetail = buildCustomerInfo(bookingParse.get('customer'));
  // check exists card
  const cardList = await VeriTransPaymentModel.getCardList(undefined, customerDetail);
  const cardId = bookingParse.get('cardInfo').cardId;
  const paymentCard = cardList.find((card) => card.cardId === cardId);
  if (!paymentCard) {
    bookingParse.set('paymentStatus', PAYMENT_STATUS.FAILED);
    await bookingParse.save(null, { useMasterKey: true });

    return false;
  }

  const bookingId = bookingParse.id;
  const transactionNo = PaymentService.getTransactionNo(bookingParse.get('salon').id, bookingId);
  const requestData = {
    orderId: transactionNo,
    accountId: PaymentService.getAccountId({ userId: customerDetail.objectId }),
    cardId,
    amount: `${bookingParse.get('totalPrice')}`,
    withCapture: 'true',
  };

  const paymentObj = new Parse.Object('Payment');
  paymentObj.set('bookingId', bookingId);
  paymentObj.set('transactionNo', transactionNo);
  paymentObj.set('request', requestData);
  paymentObj.set('status', PAYMENT_STATUS.IN_PROGRESS);

  // prevent duplicate charge
  paymentObj.set('chargeId', bookingId);

  bookingParse.set('transactionNo', transactionNo);
  bookingParse.set('paymentDate', new Date());
  bookingParse.set('payment', paymentObj);

  let isSucceeded = false;
  try {
    // insert lock by chargeId = bookingId
    await paymentObj.save(null, { useMasterKey: true });

    // do capture transaction
    const paymentResponse = await veriTransService.authorizePaymentCredit(requestData);

    // update status
    paymentObj.set('response', paymentResponse);
    paymentObj.set('status', PAYMENT_STATUS.SUCCEEDED);

    bookingParse.set('paymentStatus', PAYMENT_STATUS.SUCCEEDED);
    bookingParse.set('paymentAt', moment().toDate());
    bookingParse.set('payoutInfo', {
      status: DEPOSIST_PAYMENT_STATUS.PENDING,
    });
    isSucceeded = true;
  } catch (error) {
    writeErrorLog('VeriTransPaymentModel.charge doCapture', error);

    // release insert lock & update status
    paymentObj.set('chargeId', PaymentService.getChargeFailId(bookingId));
    paymentObj.set('status', PAYMENT_STATUS.FAILED);
    paymentObj.set('error', error);

    bookingParse.set('paymentStatus', PAYMENT_STATUS.FAILED);
    isSucceeded = false;
  }

  // auto save paymentObj
  await bookingParse.save(null, { useMasterKey: true });
  if (isSucceeded) {
    eventManager.emit(EVENTS.PAYMENT_SUCCESS, {
      bookingId: bookingParse.id,
      originalPrice: bookingParse.get('originalPrice'),
      stylistId: bookingParse.get('stylist').id,
      salonId: bookingParse.get('salon').id,
    });
  }

  return isSucceeded;
};
