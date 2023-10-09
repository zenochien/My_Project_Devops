const BookingModel = {};
module.exports = BookingModel;
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { unset, pick: _pick } = require('lodash');
const _reduce = require('lodash/reduce');
const _map = require('lodash/map');
const _findIndex = require('lodash/findIndex');
const _find = require('lodash/find');
const _forEach = require('lodash/forEach');
const _isNil = require('lodash/isNil');
const _includes = require('lodash/includes');
const _some = require('lodash/some');
const _get = require('lodash/get');
const _ = require('lodash');

const { getCouponService } = require('../../services/CouponService');
const { generalConfig } = require('../../config');
const { ParseServerLogger } = require('../../logger');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const eventManager = require('../../utils/Event');
const {
  BOOKING_STATUS,
  PAYMENT_STATUS,
  STATUS,
  USER_ROLE,
  DEFAULT_TIMEZONE,
  CONFIRM_BOOKING_ACTION,
  NOTIFICATION_TYPE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TEMPLATES,
  CSV_BOOKING_HEADER,
  DATE_TIME_FORMAT,
  PAYMENT_STATUS_JP,
  BOOKING_STATUS_JP,
  EVENTS,
  USER_STATUS,
  DEFAULT_MAX_CONFIRM_BOOKING,
  ADMIN_EMAIL,
} = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const BaseQuery = require('../BaseQuery');
const VeriTransPaymentModel = require('./VeriTransPayment');
const PaymentModel = require('./Payment');
const { parseServerConfig } = require('../../config/parseServerConfig');
const StylistModel = require('./Stylist');
const ClosedSlotsModel = require('./ClosedSlots');
const NotificationModel = require('./Notification');
const mongoDB = require('../../db/mongoDB');

const EXTENDED_BOOKING_SELECT_FIELDS = [
  ...DefaultSelectFields.BOOKING,
  'actionLogs',
  'coupon.couponCode',
  'coupon.transaction',
];

let notificationService;
let bookingService;
BookingModel.init = (_notificationService, _bookingService) => {
  notificationService = _notificationService;
  bookingService = _bookingService;
};

const buildBookingInfo = (bookingParse, includeFields = DefaultSelectFields.BOOKING, unsetFields) => {
  const result = Helper.convertParseObjectToJson(bookingParse, includeFields, unsetFields);
  const actionLogs = bookingParse.get('actionLogs');
  if (actionLogs && actionLogs.length > 0) {
    result.lastBookingStatus = actionLogs[actionLogs.length - 1].bookingStatus;
    const confirmedStatus = _find(actionLogs, (log) => log.action === CONFIRM_BOOKING_ACTION);
    if (confirmedStatus) {
      result.confirmedAt = confirmedStatus.time;
    }
    unset(result, 'actionLogs');
  }

  // select coupon data
  if (result.coupon) {
    result.coupon.transaction = _pick(result.coupon.transaction, ['couponAmount', 'status']);
  }

  if (result.salon && result.salon.salonImage) {
    const salonImage = result.salon.salonImage;
    result.salon.salonImage = {
      objectId: salonImage.objectId,
      file: salonImage.file.url,
      thumbSmall: salonImage.thumbSmall.url,
      thumbMedium: salonImage.thumbMedium.url,
      thumbLarge: salonImage.thumbLarge.url,
    };
  }

  // remove deleted review
  if (result.review && result.review.status === STATUS.DELETED) {
    delete result.review;
  }

  return result;
};

const buildBookingJsonForCsv = (bookingParse, includeFields, unsetFields) => {
  const result = Helper.convertParseObjectToJson(bookingParse, includeFields, unsetFields);
  const menusName = result.menus.map((menu) => menu.name).join(', ');
  result.menusName = menusName;
  result.serviceDateTime = moment(result.serviceDateTime.iso).tz(DEFAULT_TIMEZONE).format(DATE_TIME_FORMAT);
  result.createdAt = moment(result.createdAt).tz(DEFAULT_TIMEZONE).format(DATE_TIME_FORMAT);
  result.stylistFullName = result.stylist.fullName;
  result.customerFullName = result.customer.fullName;
  result.customerGender = result.customer.gender;
  result.totalPrice = Helper.numberWithCommas(result.totalPrice) + '円';
  result.bookingStatus = BOOKING_STATUS_JP[result.bookingStatus];
  result.paymentStatus = PAYMENT_STATUS_JP[result.paymentStatus];
  result.paymentDate = result.paymentDate
    ? moment(result.paymentDate.iso).tz(DEFAULT_TIMEZONE).format(DATE_TIME_FORMAT)
    : '';
  delete result.customer;
  delete result.stylist;
  delete result.menus;

  return Object.keys(CSV_BOOKING_HEADER).reduce(function (res, key) {
    res[key] = result[key];
    return res;
  }, {});
};

const buildMenusName = (menus) => {
  return _map(menus, (menu) => {
    return _get(menu, 'name');
  }).join(', ');
};

const getBookingTotalDurationAndPrice = (menus) => {
  return _reduce(
    menus,
    (result, menu) => {
      let { totalDuration, totalPrice } = result;
      const menuDuration = menu.duration || 0;
      const menuPrice = menu.amount || 0;
      totalDuration += menuDuration;
      totalPrice += menuPrice;
      return { totalDuration, totalPrice };
    },
    { totalDuration: 0, totalPrice: 0 },
  );
};

const getStylist = async (stylistId) => {
  if (!stylistId) {
    return undefined;
  }
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select(
    'salon',
    'salon.salonName',
    'salon.postalCode',
    'salon.salonAddress3',
    'salon.salonAddress4',
    'salon.salonSchedules',
    'cbStaffId',
    'nickName',
    'stylistEmail',
    'createdAt',
    'requestDeletingAccount',
    'userStatus',
    'deletedAt',
    'maxConfirmedBookingCount',
  );
  stylistQuery.equalTo('objectId', stylistId);
  const stylistParse = await stylistQuery.first({ useMasterKey: true });
  if (!stylistParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Stylist does not exist.');
  }
  return stylistParse;
};

// Verify MENU with stylist or salon
const getMenus = async (menuIds, stylistId, salonParse, isVerifyPublished = true) => {
  if (menuIds.length < 1) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Menus array must have at least one item.');
  }
  const menuQuery = BaseQuery.getMenuQuery();
  menuQuery.select('amount', 'duration', 'name');
  isVerifyPublished && menuQuery.equalTo('status', STATUS.PUBLISHED);
  stylistId && menuQuery.containsAll('assignedStylistIds', [stylistId]);
  salonParse && menuQuery.equalTo('salon', salonParse);

  menuQuery.containedIn('objectId', menuIds);
  const menuParses = await menuQuery.find({ useMasterKey: true });

  if (menuParses.length !== menuIds.length) {
    const foundMenuIds = menuParses.map((menu) => menu.id);
    const errorMenuIds = menuIds.filter((menuId) => {
      return !foundMenuIds.includes(menuId);
    });
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(
      code,
      JSON.stringify({ errorMenuIds, message: '削除されたメニューです。他のメニューを選択してください。' }),
    );
  }
  return menuParses;
};

const formatMenus = (menus) => {
  return menus.map((item) => ({
    amount: item.get('amount'),
    duration: item.get('duration'),
    name: item.get('name'),
    objectId: item.id,
  }));
};

const logAction = (bookingParse, userId, action) => {
  return {
    bookingStatus: bookingParse.get('bookingStatus'),
    paymentStatus: bookingParse.get('paymentStatus'),
    userId,
    action,
    time: new Date().toISOString(),
  };
};

const sendEmailTemplate = ({
  bookingParse,
  template,
  toEmail = bookingParse.get('customer').get('email'),
  isWithMapURL = true,
  hasChangedStylistId = false,
  extraData = {},
}) => {
  const salon = bookingParse.get('salon');
  const menusName = buildMenusName(bookingParse.get('menus'));
  const canceledFee = bookingParse.get('canceledFee') !== undefined ? bookingParse.get('canceledFee') : 0;
  const mailData = {
    salon,
    booking: bookingParse,
    serviceDateTime: moment(bookingParse.get('serviceDateTime')).tz(DEFAULT_TIMEZONE).format('YYYY/MM/DD HH:mm'),
    menusName,
    couponName: _get(bookingParse.get('coupon'), 'couponName'),
    couponCode: _get(bookingParse.get('coupon'), 'couponCode'),
    couponAmount: _get(bookingParse.get('coupon'), 'transaction.couponAmount'),
    totalPrice: Helper.numberWithCommas(bookingParse.get('totalPrice')),
    originalPrice: Helper.numberWithCommas(bookingParse.get('originalPrice')),
    canceledFee: Helper.numberWithCommas(canceledFee),
    cancelNote: bookingParse.get('cancelNote'),
    hasChangedStylistId,
    customerBaseUrl: generalConfig.customerBaseUrl,
    ...extraData,
  };
  if (isWithMapURL) {
    const address = [
      salon.get('postalCode') || null,
      salon.get('salonAddress3') || null,
      salon.get('salonAddress4') || null,
    ]
      .filter((t) => !!t)
      .join(', ');

    const mapURL = `https://maps.google.com/maps?q=${encodeURI(address)}&hl=ja`;
    mailData.mapURL = mapURL;
    mailData.address = address;
  }
  parseServerConfig.emailAdapter.sendMailByTemplate(template, { to: toEmail }, mailData);
};

const checkServiceDateTime = (serviceDateTimeMoment, nowMoment) => {
  if (!Helper.checkRequestBookingTime(serviceDateTimeMoment, nowMoment)) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(
      code,
      'You can book at least 1 hour and no more than 60 days before the desired service time.',
    );
  }
  return true;
};

const getCardInfo = async (cardId, email) => {
  const cardList = await VeriTransPaymentModel.getCardList(email);
  const index = _findIndex(cardList, { cardId });
  if (index === -1) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Card not found.');
  }
  const { cardNumber, cardType } = cardList[index];
  return { cardId, cardNumber, cardType };
};

const checkAvailableDateTime = async (
  stylistObject,
  serviceDateTime,
  totalDuration,
  checkClosingDates = true,
  checkRequestBookingDay = true,
) => {
  const availableSlots = (
    await StylistModel.getStylistAvailableSlots(
      { dateTime: serviceDateTime, totalDuration },
      stylistObject,
      checkClosingDates,
      checkRequestBookingDay,
    )
  ).availableSlots;

  const serviceDateTimeHourFormat = moment(serviceDateTime).tz(DEFAULT_TIMEZONE).format('HH:mm');
  const isAvailable = _includes(availableSlots, serviceDateTimeHourFormat);

  if (!isAvailable) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Service date time is not available.');
  }

  return true;
};

const getCustomerInfo = async (customerId) => {
  if (!customerId) {
    return undefined;
  }

  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.equalTo('objectId', customerId);
  customerQuery.select(
    'nickName',
    'profileImages',
    'email',
    'requestDeletingAccount',
    'userStatus',
    'deletedAt',
    'fullName',
  );
  const customerParse = await customerQuery.first({ useMasterKey: true });

  if (!customerParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Customer does not exist.');
  }

  return customerParse;
};

const getShortReviewLink = (bookingId, role = USER_ROLE.CUSTOMER) => {
  const url = `${generalConfig.customerBaseUrl}/user/booking/${bookingId}?forceReview=true`;
  if (role === USER_ROLE.CUSTOMER) {
    return Helper.getShortLinkForCustomer(url);
  }
  return Helper.getShortLinkForStylist(url);
};

const getShortBookingLink = (bookingId, role = USER_ROLE.CUSTOMER) => {
  const url = `${generalConfig.customerBaseUrl}/user/booking/${bookingId}`;
  if (role === USER_ROLE.CUSTOMER) {
    return Helper.getShortLinkForCustomer(url);
  }
  return Helper.getShortLinkForStylist(url);
};

BookingModel.countActiveBooking = async ({ customerId, excludeIds, toDate }) => {
  const db = await mongoDB.getMongoDB();
  const conditions = {
    _p_customer: `Customer$${customerId}`,
    bookingStatus: { $in: [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.REQUESTED] },
  };
  if (excludeIds) {
    conditions._id = { $nin: excludeIds };
  }
  if (toDate) {
    conditions._created_at = { $lt: moment(toDate).toDate() };
  }
  return await db.collection('Booking').count(conditions);
};

BookingModel.rechargeBooking = async (params, requestUser) => {
  const { bookingId } = params;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    'salon',
    'salon.salonName',
    'menus',
    'serviceDateTime',
    'totalDuration',
    'canceledFee',
    'customer',
    'customer.email',
    'stylist',
    'stylist.nickName',
    'stylist.stylistEmail',
    'cardInfo',
    'salon',
    'totalPrice',
    'bookingStatus',
    'paymentStatus',
    'customer.veriTransInformation.veriTransAccountId',
    'customer.veriTransInformation.cardHolderNamesMap',
    'originalPrice',
  ]);
  bookingQuery.equalTo('salon', requestUser.get('salon'));

  const bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  if (
    !(
      (bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED ||
        bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED ||
        bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_WITH_FEE) &&
      bookingParse.get('paymentStatus') === PAYMENT_STATUS.FAILED
    )
  ) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Operator cannot recharge this booking with this status.');
  }

  let customerTemplateName;
  let stylistTemplateName;
  const isSuccess = await VeriTransPaymentModel.charge(bookingParse);
  if (isSuccess) {
    if (bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED) {
      const shortReviewLink = await getShortReviewLink(bookingId);
      sendEmailTemplate({
        bookingParse,
        template: 'booking-operator-arrived-customer',
        extraData: { shortReviewLink },
      });
    } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED) {
      sendEmailTemplate({ bookingParse, template: 'booking-operator-absent-customer' });
    } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_WITH_FEE) {
      sendEmailTemplate({ bookingParse, template: 'booking-customer-canceled-customer' });
    }
    sendEmailTemplate({
      bookingParse,
      template: 'booking-payment-succeed-stylist',
      toEmail: bookingParse.get('stylist').get('stylistEmail'),
    });
    stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_STYLIST;
    customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_CUSTOMER;
  } else {
    if (bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED) {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-arrived-fail-stylist',
        toEmail: bookingParse.get('stylist').get('stylistEmail'),
      });
    } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED) {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-absent-fail-stylist',
        toEmail: bookingParse.get('stylist').get('stylistEmail'),
      });
    }
    const shortBookingLink = await getShortBookingLink(bookingId);
    sendEmailTemplate({
      bookingParse,
      template: 'booking-payment-fail-customer',
      extraData: { shortBookingLink },
    });
    stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
    customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
  }

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(bookingParse.get('stylist').id);
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    notificationService.saveAndSendNotificationWithTemplate(
      Helper.createContextFromRequestUser(requestUser),
      [stylistReceiver],
      stylistTemplateName,
      {
        booking: bookingParse,
      },
      { isPush: false, isSave: true },
    );

    const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
    const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
    notificationService.saveAndSendNotificationWithTemplate(
      Helper.createContextFromRequestUser(requestUser),
      [customerReceiver],
      customerTemplateName,
      {
        booking: bookingParse,
      },
      { isPush: false, isSave: true },
    );
  }

  return isSuccess;
};

BookingModel.createBooking = async (params, requestUser) => {
  const {
    stylistId,
    menus: menuIds,
    serviceDateTime,
    cardId,
    timezone = DEFAULT_TIMEZONE,
    visitedSalon,
    customerPhoneNumber,
    customerNote,
    platform,
  } = params;
  const customer = requestUser.get('customer');
  const couponService = getCouponService();

  // check data
  checkServiceDateTime(moment(serviceDateTime), moment());

  // prepare data
  const [stylistParse, menuParses, customerParse] = await Promise.all([
    getStylist(stylistId),
    getMenus(menuIds, stylistId),
    getCustomerInfo(customer.id),
  ]);

  // check deleted account
  if (stylistParse.has('requestDeletingAccount') || stylistParse.get('userStatus') === USER_STATUS.DELETED) {
    throw new Parse.Error(Errors.DELETED_STYLIST.code, Errors.DELETED_STYLIST.message);
  }
  if (customerParse.has('requestDeletingAccount') || customerParse.get('userStatus') === USER_STATUS.DELETED) {
    throw new Parse.Error(Errors.PERMISSION_ERROR.code, Errors.PERMISSION_ERROR.message);
  }

  const menus = formatMenus(menuParses);
  const serviceInfo = getBookingTotalDurationAndPrice(menus);
  const totalDuration = serviceInfo.totalDuration;
  let totalPrice = serviceInfo.totalPrice;
  const originalPrice = serviceInfo.totalPrice;
  await checkAvailableDateTime(stylistParse, serviceDateTime, totalDuration);
  const cardInfo = await getCardInfo(cardId, requestUser.get('email'));
  const salonParse = stylistParse.get('salon');

  // apply coupon
  let couponData;
  const appTransactionId = uuidv4();
  if (params.couponCode) {
    const couponParams = {
      code: params.couponCode,
      totalPrice,
      customerId: customer.id,
      bookingDatetime: moment(serviceDateTime).toISOString(),
      appTransactionId,
      servicerId: salonParse.id,
      serviceUsageCount: await BookingModel.countActiveBooking({ customerId: customer.id }),
    };
    const couponObject = await BookingModel.getCouponDetailBasedOnCode({ code: params.couponCode });
    if (couponObject.amount >= totalPrice) {
      throw new Parse.Error(Errors.LARGE_AMOUNT_COUPON.code, Errors.LARGE_AMOUNT_COUPON.message);
    }
    const transaction = await couponService.useCoupon(couponParams);
    couponData = {
      couponCode: params.couponCode,
      couponName: couponObject.title,
      transaction,
    };
    totalPrice = transaction.totalAmount;
  }

  let newBooking;
  const bookingParse = new Parse.Object('Booking');
  try {
    // create booking
    bookingParse.set('bookingStatus', BOOKING_STATUS.REQUESTED);
    bookingParse.set('bookingStatusExtend', BOOKING_STATUS.REQUESTED);
    bookingParse.set('paymentStatus', PAYMENT_STATUS.PENDING);
    bookingParse.set('salon', salonParse);
    bookingParse.set('stylist', stylistParse);
    bookingParse.set('customer', customerParse);
    bookingParse.set('menus', menus);
    bookingParse.set('serviceDateTime', new Date(serviceDateTime));
    bookingParse.set('timezone', timezone);
    bookingParse.set('cardInfo', cardInfo);
    bookingParse.set('totalPrice', totalPrice);
    bookingParse.set('canceledFee', 0);
    bookingParse.set('totalDuration', totalDuration);
    bookingParse.set('actionLogs', []);
    bookingParse.set('coupon', couponData);
    bookingParse.set('originalPrice', originalPrice);
    bookingParse.set('appTransactionId', appTransactionId);
    bookingParse.set('customerNote', customerNote);
    bookingParse.set('platform', platform);
    if (visitedSalon !== undefined) {
      bookingParse.set('visitedSalon', visitedSalon);
    }
    newBooking = await bookingParse.save(null, { useMasterKey: true });
  } catch (error) {
    // handle cancel coupon
    if (couponData) {
      await couponService.cancelTransaction(couponData.data.id);
    }
    throw error;
  }

  if (customerPhoneNumber) {
    customerParse.set('phone', customerPhoneNumber);
    await customerParse.save(null, { useMasterKey: true });
  }

  NotificationModel.saveNotification({
    data: {
      message: NOTIFICATION_MESSAGE.RECEIVE_BOOKING,
      type: NOTIFICATION_TYPE.RECEIVE_BOOKING,
      popupData: {
        nickName: customerParse.get('nickName'),
        profileImage: customerParse.get('profileImages'),
      },
    },
    booking: newBooking,
    sender: requestUser,
    senderCustomer: customerParse,
    receiverId: salonParse.id,
  }).catch(ParseServerLogger.error);

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(stylistId);
    const receiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    const templateName = NOTIFICATION_TEMPLATES.BOOKING_REQUESTED_BY_CUSTOMER;
    notificationService.saveAndSendNotificationWithTemplate(
      Helper.createContextFromRequestUser(requestUser),
      [receiver],
      templateName,
      {
        booking: bookingParse,
      },
    );
  }

  sendEmailTemplate({ bookingParse, template: 'booking-customer-requested-customer', isWithMapURL: true });
  sendEmailTemplate({
    bookingParse,
    template: 'booking-customer-requested-stylist',
    toEmail: [ADMIN_EMAIL, stylistParse.get('stylistEmail')],
  });
  return BookingModel.getBookingDetail({ bookingId: newBooking.id }, requestUser);
};

BookingModel.cancelBookingByCustomer = async (params, requestUser) => {
  const { bookingId, cancelNote } = params;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'customer.veriTransInformation.veriTransAccountId',
    'customer.veriTransInformation.cardHolderNamesMap',
    'customer.email',
    'canceledFee',
    'stylist.stylistEmail',
    'coupon',
  ]);
  bookingQuery.equalTo('customer', requestUser.get('customer'));

  var bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });
  const originalBooking = bookingParse.toJSON();
  const bookingStatus = bookingParse.get('bookingStatus');
  if (bookingStatus !== BOOKING_STATUS.REQUESTED && bookingStatus !== BOOKING_STATUS.CONFIRMED) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Customer cannot cancel booking when status is not REQUESTED or CONFIRMED.');
  }
  if (moment(bookingParse.get('serviceDateTime')) < moment()) {
    const { code, message } = Errors.CANCEL_LATE_ERROR;
    throw new Parse.Error(code, message);
  }

  const newLog = logAction(bookingParse, requestUser.id, 'cancelBookingByCustomer');
  const stylistParse = bookingParse.get('stylist');

  const conxtext = Helper.createContextFromRequestUser(requestUser);
  const bookingStatusExtend = Helper.processBookingStatusExtend({
    bookingStatus: BOOKING_STATUS.CANCELED_CUSTOMER,
    lastBookingStatus: bookingParse.get('bookingStatus'),
  });

  await bookingService.updateBooking(
    conxtext,
    { bookingStatus, _id: bookingId },
    {
      bookingStatus: BOOKING_STATUS.CANCELED_CUSTOMER,
      bookingStatusExtend,
      paymentStatus: PAYMENT_STATUS.CANCELED,
      cancelNote,
    },
    { actionLogs: newLog },
  );

  bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  // trigger event cancel booking
  eventManager.emit(EVENTS.CANCEL_BOOKING, { originalBooking, ...bookingParse.toJSON() });

  sendEmailTemplate({ bookingParse, template: 'booking-customer-canceled-customer' });
  sendEmailTemplate({
    bookingParse,
    template: 'booking-customer-canceled-stylist',
    toEmail: [ADMIN_EMAIL, stylistParse.get('stylistEmail')],
  });

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(stylistParse.id);
    const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
    const templateNameForCustomer =
      bookingStatus === BOOKING_STATUS.REQUESTED
        ? NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_CUSTOMER_FOR_CUSTOMER
        : NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_CUSTOMER_FOR_CUSTOMER;
    notificationService.saveAndSendNotificationWithTemplate(conxtext, [customerReceiver], templateNameForCustomer, {
      booking: bookingParse,
    });

    const templateNameForStylist =
      bookingStatus === BOOKING_STATUS.REQUESTED
        ? NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_CUSTOMER_FOR_STYLIST
        : NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_CUSTOMER_FOR_STYLIST;
    notificationService.saveAndSendNotificationWithTemplate(conxtext, [stylistReceiver], templateNameForStylist, {
      booking: bookingParse,
    });
  }

  return buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING, ['payment', 'transactionNo', 'paymentDate']);
};

BookingModel.cancelBooking = async (params, requestUser) => {
  const { bookingId, cancelNote } = params;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'salon.salonNameKatakana',
    'salon.salonImage.thumbSmall',
    'salon.salonImage.thumbLarge',
    'salon.salonImage.thumbMedium',
    'customer.email',
    'canceledFee',
    'stylist.stylistEmail',
    'coupon',
  ]);

  const userRole = requestUser ? requestUser.get('role') : 'Job';
  if (userRole === USER_ROLE.STYLIST) {
    bookingQuery.equalTo('stylist', requestUser.get('stylist'));
  } else if (userRole === USER_ROLE.SALON_OPERATOR) {
    bookingQuery.equalTo('salon', requestUser.get('salon'));
  }

  var bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });
  const originalBooking = bookingParse.toJSON();
  const bookingStatus = bookingParse.get('bookingStatus');
  if (bookingStatus !== BOOKING_STATUS.REQUESTED && bookingStatus !== BOOKING_STATUS.CONFIRMED) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, `${userRole} cannot cancel booking when status is not REQUESTED nor CONFIRMED.`);
  }

  if (
    requestUser &&
    userRole !== USER_ROLE.SALON_OPERATOR &&
    bookingStatus === BOOKING_STATUS.CONFIRMED &&
    moment(bookingParse.get('serviceDateTime')).subtract(generalConfig.minConfirmBookingTime, 'seconds') < moment()
  ) {
    const { code, message } = Errors.CANCEL_LATE_ERROR;
    throw new Parse.Error(code, message);
  }

  const pushParams = {};
  const setParams = {};
  if (userRole === USER_ROLE.STYLIST) {
    pushParams.actionLogs = logAction(bookingParse, requestUser.id, 'cancelBookingByStylist');
    setParams.bookingStatus = BOOKING_STATUS.CANCELED_STYLIST;
  } else if (userRole === USER_ROLE.SALON_OPERATOR) {
    pushParams.actionLogs = logAction(bookingParse, requestUser.id, 'cancelBookingByOperator');
    setParams.bookingStatus = BOOKING_STATUS.CANCELED_OPERATOR;
  } else {
    pushParams.actionLogs = logAction(bookingParse, 'system', 'cancelBookingByJob');
    setParams.bookingStatus = BOOKING_STATUS.CANCELED_AUTO;
  }
  setParams.paymentStatus = PAYMENT_STATUS.CANCELED;
  setParams.cancelNote = cancelNote;

  setParams.bookingStatusExtend = Helper.processBookingStatusExtend({
    bookingStatus: setParams.bookingStatus,
    lastBookingStatus: bookingParse.get('bookingStatus'),
  });

  const conxtext = Helper.createContextFromRequestUser(requestUser);
  await bookingService.updateBooking(conxtext, { bookingStatus, _id: bookingId }, setParams, pushParams);

  bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  // trigger event cancel booking
  eventManager.emit(EVENTS.CANCEL_BOOKING, { originalBooking, ...bookingParse.toJSON() });

  const stylistParse = bookingParse.get('stylist');
  let notificationTemplateNameForStylist;
  let notificationTemplateNameForCustomer;
  const shortWebsiteLink = await Helper.getShortWebsiteLink({ customerId: bookingParse.get('customer').id });
  if (userRole === USER_ROLE.STYLIST) {
    sendEmailTemplate({
      bookingParse,
      template: 'booking-operatorStylist-canceled-customer',
      extraData: { shortWebsiteLink },
      toEmail: bookingParse.get('customer').get('email'),
    });
    notificationTemplateNameForCustomer =
      bookingStatus === BOOKING_STATUS.REQUESTED
        ? NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_STYLIST_FOR_CUSTOMER
        : NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_STYLIST_FOR_CUSTOMER;
  } else {
    if (userRole === USER_ROLE.SALON_OPERATOR) {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-operatorStylist-canceled-customer',
        extraData: { shortWebsiteLink },
        toEmail: bookingParse.get('customer').get('email'),
      });
      notificationTemplateNameForCustomer = NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SALON_FOR_CUSTOMER;
    } else {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-system-canceled-customer',
        extraData: { shortWebsiteLink },
        toEmail: bookingParse.get('customer').get('email'),
      });
      sendEmailTemplate({
        bookingParse,
        template: 'booking-system-canceled-stylist',
        extraData: { shortWebsiteLink },
        toEmail: [ADMIN_EMAIL, stylistParse.get('stylistEmail')],
      });
      notificationTemplateNameForStylist = NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SYSTEM_FOR_STYLIST;
      notificationTemplateNameForCustomer = NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SYSTEM_FOR_CUSTOMER;
    }
  }

  if (notificationService) {
    const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
    const stylistUserParse = await Helper.getStylistUser(stylistParse.id);
    const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    notificationService.saveAndSendNotificationWithTemplate(
      conxtext,
      [customerReceiver],
      notificationTemplateNameForCustomer,
      {
        booking: bookingParse,
      },
    );
    if (notificationTemplateNameForStylist) {
      notificationService.saveAndSendNotificationWithTemplate(
        conxtext,
        [stylistReceiver],
        notificationTemplateNameForStylist,
        {
          booking: bookingParse,
        },
      );
    }
  }

  return buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING, ['salon.salonImage']);
};

BookingModel.updateBookingCard = async (params, requestUser) => {
  const { bookingId, cardId } = params;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'stylist.stylistEmail',
    'customer.veriTransInformation.veriTransAccountId',
    'customer.veriTransInformation.cardHolderNamesMap',
    'customer.email',
    'canceledFee',
    'coupon',
  ]);
  bookingQuery.equalTo('customer', requestUser.get('customer'));

  const bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  if (
    ((bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED ||
      bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_WITH_FEE ||
      bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED) &&
      bookingParse.get('paymentStatus') === PAYMENT_STATUS.SUCCEEDED) ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_OPERATOR ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_CUSTOMER ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_STYLIST ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_AUTO
  ) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Customer cannot change card with the current status.');
  }

  const cardInfo = await getCardInfo(cardId, requestUser.get('email'));
  bookingParse.set('cardInfo', cardInfo);

  await bookingParse.save(null, { useMasterKey: true });

  let customerTemplateName;
  let stylistTemplateName;
  if (
    bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED ||
    bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_WITH_FEE
  ) {
    if (await VeriTransPaymentModel.charge(bookingParse)) {
      if (bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED) {
        const shortReviewLink = await getShortReviewLink(bookingId);
        sendEmailTemplate({
          bookingParse,
          template: 'booking-operator-arrived-customer',
          extraData: { shortReviewLink },
        });
      } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED) {
        sendEmailTemplate({ bookingParse, template: 'booking-operator-absent-customer' });
      } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.CANCELED_WITH_FEE) {
        sendEmailTemplate({ bookingParse, template: 'booking-customer-canceled-customer' });
      }
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-succeed-stylist',
        toEmail: bookingParse.get('stylist').get('stylistEmail'),
      });
      stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_STYLIST;
      customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_CUSTOMER;
    } else {
      if (bookingParse.get('bookingStatus') === BOOKING_STATUS.COMPLETED) {
        sendEmailTemplate({
          bookingParse,
          template: 'booking-payment-arrived-fail-stylist',
          toEmail: bookingParse.get('stylist').get('stylistEmail'),
        });
      } else if (bookingParse.get('bookingStatus') === BOOKING_STATUS.NOT_ARRIVED) {
        sendEmailTemplate({
          bookingParse,
          template: 'booking-payment-absent-fail-stylist',
          toEmail: bookingParse.get('stylist').get('stylistEmail'),
        });
      }
      const shortBookingLink = await getShortBookingLink(bookingId);
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-fail-customer',
        extraData: { shortBookingLink },
      });
      stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
      customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
    }

    if (notificationService) {
      const stylistUserParse = await Helper.getStylistUser(bookingParse.get('stylist').id);
      const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
      notificationService.saveAndSendNotificationWithTemplate(
        Helper.createContextFromRequestUser(requestUser),
        [stylistReceiver],
        stylistTemplateName,
        {
          booking: bookingParse,
        },
        { isPush: false, isSave: true },
      );

      const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
      const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
      notificationService.saveAndSendNotificationWithTemplate(
        Helper.createContextFromRequestUser(requestUser),
        [customerReceiver],
        customerTemplateName,
        {
          booking: bookingParse,
        },
        { isPush: false, isSave: true },
      );
    }
  }

  return buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING, ['payment', 'transactionNo', 'paymentDate']);
};

BookingModel.confirmBooking = async (params, requestUser) => {
  const { bookingId, stylistId } = params;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'salon.salonNameKatakana',
    'salon.postalCode',
    'salon.salonAddress3',
    'salon.salonAddress4',
    'salon.salonImage.thumbSmall',
    'salon.salonImage.thumbLarge',
    'salon.salonImage.thumbMedium',
    'customer.email',
    'stylist.stylistEmail',
    'coupon',
  ]);

  const userRole = requestUser.get('role');
  if (userRole === USER_ROLE.STYLIST) {
    bookingQuery.equalTo('stylist', requestUser.get('stylist'));
  } else {
    bookingQuery.equalTo('salon', requestUser.get('salon'));
  }

  var bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });
  const bookingStatus = bookingParse.get('bookingStatus');

  if (bookingStatus !== BOOKING_STATUS.REQUESTED) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, `${userRole} cannot confirm booking when status is not REQUESTED.`);
  }

  const newLog = logAction(bookingParse, requestUser.id, CONFIRM_BOOKING_ACTION);

  const nowTimestamp = new Date().getTime();
  const serviceDateTimestamp = bookingParse.get('serviceDateTime').getTime();

  const setParams = {};
  // Salon must respond to a request at least 30 minutes before the service time
  if (nowTimestamp > serviceDateTimestamp - generalConfig.minConfirmBookingTime * 1000) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Salon must respond to a request at least 30 minutes before the service time.');
  }
  setParams.bookingStatus = BOOKING_STATUS.CONFIRMED;
  setParams.bookingStatusExtend = BOOKING_STATUS.CONFIRMED;

  const hasChangedStylistId = stylistId && bookingParse.get('stylist').id !== stylistId;
  const stylistParse = await getStylist(stylistId ? stylistId : bookingParse.get('stylist').id);
  if (hasChangedStylistId) {
    await checkAvailableDateTime(
      stylistParse,
      bookingParse.get('serviceDateTime'),
      bookingParse.get('totalDuration'),
      false,
      false,
    );
    setParams._p_stylist = `Stylist$${stylistParse.id}`;
  }

  const { serviceDateTime, totalDuration } = bookingParse.attributes;

  const maxConfirmBooking = await ClosedSlotsModel.checkMaxConfirmBooking(
    stylistParse.id,
    serviceDateTime,
    totalDuration,
    stylistParse.get('maxConfirmedBookingCount') || DEFAULT_MAX_CONFIRM_BOOKING,
  );

  if (maxConfirmBooking) {
    throw new Parse.Error(Errors.MAX_CONFIRMED_BOOKING_COUNT.code, Errors.MAX_CONFIRMED_BOOKING_COUNT.message);
  }

  const conxtext = Helper.createContextFromRequestUser(requestUser);
  const mongodbClient = await mongoDB.getClient();
  try {
    await Helper.executeInTransaction(async (session) => {
      const inputClosedSLot = {
        stylistId: stylistParse.id,
        bookingId,
        serviceDateTime,
        session,
        maxConfirmedBookingCount: stylistParse.get('maxConfirmedBookingCount'),
        totalDuration,
      };
      const executedData = [
        bookingService.updateBooking(
          conxtext,
          { bookingStatus, _id: bookingId },
          setParams,
          { actionLogs: newLog },
          session,
        ),
        ClosedSlotsModel.processClosedSlot(inputClosedSLot),
      ];
      await Promise.all(executedData);
    }, mongodbClient);
  } catch (error) {
    if (error.message.indexOf('duplicate')) {
      throw new Parse.Error(Errors.MAX_CONFIRMED_BOOKING_COUNT.code, Errors.MAX_CONFIRMED_BOOKING_COUNT.message);
    } else {
      throw new Parse.Error(Errors.RETRY.code, Errors.RETRY.message);
    }
  }

  bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  sendEmailTemplate({
    bookingParse,
    template: 'booking-operatorStylist-confirmed-customer',
    isWithMapURL: true,
    hasChangedStylistId,
  });
  sendEmailTemplate({
    bookingParse,
    template: 'booking-operatorStylist-confirmed-stylist',
    toEmail: [ADMIN_EMAIL, stylistParse.get('stylistEmail')],
  });

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(bookingParse.get('stylist').id);
    const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
    let templateName = NOTIFICATION_TEMPLATES.BOOKING_CONFIRMED_BY_SALON;
    if (userRole === USER_ROLE.STYLIST) {
      templateName = NOTIFICATION_TEMPLATES.BOOKING_CONFIRMED_BY_STYLIST;
    }
    notificationService.saveAndSendNotificationWithTemplate(
      conxtext,
      [stylistReceiver, customerReceiver],
      templateName,
      {
        booking: bookingParse,
        $type: NOTIFICATION_TYPE.BOOKING_CONFIRMED,
      },
    );
  }
  return buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING, ['salon.salonImage']);
};

BookingModel.completeBooking = async (params, requestUser) => {
  const conxtext = Helper.createContextFromRequestUser(requestUser);
  const { bookingId, paymentNote, isArrived = true, isWithPayment = true, menus: menuIds, newMenus } = params;
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'stylist.stylistEmail',
    'salon.salonNameKatakana',
    'customer.email',
    'customer.veriTransInformation.veriTransAccountId',
    'customer.veriTransInformation.cardHolderNamesMap',
    'canceledFee',
    'coupon',
    'appTransactionId',
    'createdAt',
  ]);

  const userRole = requestUser.get('role');
  if (userRole === USER_ROLE.STYLIST) {
    bookingQuery.equalTo('stylist', requestUser.get('stylist'));
  } else {
    bookingQuery.equalTo('salon', requestUser.get('salon'));
  }

  var bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });
  const bookingStatus = bookingParse.get('bookingStatus');

  if (moment.tz(bookingParse.get('serviceDateTime'), DEFAULT_TIMEZONE).startOf('day') > moment().tz(DEFAULT_TIMEZONE)) {
    const { code, message } = Errors.COMPLETE_BOOKING_EARLY_ERROR;
    throw new Parse.Error(code, message);
  }

  if (bookingStatus !== BOOKING_STATUS.CONFIRMED) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, `${userRole} cannot complete booking when status is not CONFIRMED.`);
  }

  if (menuIds || newMenus) {
    const newValues = {};
    const lastMenus = bookingParse.get('menus');
    let newObjectMenus = [];
    const { oldObjectMenus, newMenuIds, menusInParams } = BookingModel.parseMenuInfoForCompleteBooking({
      menuIds,
      newMenus,
      lastMenus,
    });

    if (newMenuIds && newMenuIds.length > 0) {
      const newMenuParses = await getMenus(newMenuIds, undefined, requestUser.get('salon'));
      newObjectMenus = formatMenus(newMenuParses);
    }
    const menus = BookingModel.getNewMenuForCompleteBooking({
      oldMenus: oldObjectMenus,
      menusInParams,
      newMenus: newObjectMenus,
      newMenuIds,
    });
    if (BookingModel.isChangedMenus({ oldMenus: lastMenus, newMenus: menus })) {
      const { totalDuration, totalPrice } = getBookingTotalDurationAndPrice(menus);
      newValues.menus = menus;
      const coupon = bookingParse.get('coupon');
      const couponService = getCouponService();
      if (coupon) {
        const couponDetail = await couponService.getCouponDetail({ id: coupon.transaction.couponId });
        if (couponDetail.amount >= totalPrice) {
          throw new Parse.Error(Errors.LARGE_AMOUNT_COUPON.code, Errors.LARGE_AMOUNT_COUPON.message);
        }
        try {
          const transaction = await couponService.useCoupon({
            code: coupon.couponCode,
            totalPrice,
            customerId: bookingParse.get('customer').id,
            bookingDatetime: moment(bookingParse.get('serviceDateTime')).toISOString(),
            appTransactionId: bookingParse.get('appTransactionId'),
            transactionId: coupon.transaction.id,
            servicerId: bookingParse.get('salon').id,
            serviceUsageCount: await BookingModel.countActiveBooking({
              customerId: bookingParse.get('customer').id,
              excludeIds: [bookingParse.id],
              toDate: bookingParse.get('createdAt'),
            }),
          });
          coupon.transaction = transaction;
          newValues.coupon = coupon;
          newValues.totalPrice = transaction.totalAmount;
          newValues.originalPrice = totalPrice;
        } catch (error) {
          throw new Parse.Error(Errors.ERROR_COUPON.code, error.message ? error.message : Errors.ERROR_COUPON.message);
        }
      } else {
        newValues.totalPrice = totalPrice;
        newValues.originalPrice = totalPrice;
      }
      newValues.totalDuration = totalDuration;
      const menuLog = logAction(bookingParse, requestUser.id, 'updateMenu');
      await bookingService.updateBooking(conxtext, { bookingStatus, _id: bookingId }, newValues, {
        actionLogs: menuLog,
      });
      bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });
    }
  }

  // handle charge
  const newLog = logAction(bookingParse, requestUser.id, 'completeBooking');
  const setParams = {};
  let isPaymentSuccessful = false;
  if (isWithPayment) {
    isPaymentSuccessful = await VeriTransPaymentModel.charge(bookingParse);
  } else {
    setParams.paymentStatus = PAYMENT_STATUS.OTHER;
    isPaymentSuccessful = true;
  }

  if (isArrived) {
    setParams.bookingStatus = BOOKING_STATUS.COMPLETED;
    setParams.bookingStatusExtend = BOOKING_STATUS.COMPLETED;
  } else {
    setParams.bookingStatus = BOOKING_STATUS.NOT_ARRIVED;
    setParams.bookingStatusExtend = BOOKING_STATUS.NOT_ARRIVED;
    setParams.canceledFee = bookingParse.get('totalPrice');
  }

  setParams.paymentNote = paymentNote;
  await bookingService.updateBooking(conxtext, { bookingStatus, _id: bookingId }, setParams, { actionLogs: newLog });

  bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  let customerTemplateName;
  let stylistTemplateName;
  if (isPaymentSuccessful) {
    if (isArrived) {
      const shortReviewLink = await getShortReviewLink(bookingId);
      sendEmailTemplate({
        bookingParse,
        template: 'booking-operator-arrived-customer',
        extraData: { shortReviewLink },
      });
    } else {
      sendEmailTemplate({ bookingParse, template: 'booking-operator-absent-customer' });
    }
    sendEmailTemplate({
      bookingParse,
      template: 'booking-payment-succeed-stylist',
      toEmail: bookingParse.get('stylist').get('stylistEmail'),
    });
    stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_STYLIST;
    customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_CUSTOMER;
  } else {
    if (isArrived) {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-arrived-fail-stylist',
        toEmail: bookingParse.get('stylist').get('stylistEmail'),
      });
    } else {
      sendEmailTemplate({
        bookingParse,
        template: 'booking-payment-absent-fail-stylist',
        toEmail: bookingParse.get('stylist').get('stylistEmail'),
      });
      sendEmailTemplate({ bookingParse, template: 'booking-operator-absent-customer' });
    }
    const shortBookingLink = await getShortBookingLink(bookingId);
    sendEmailTemplate({
      bookingParse,
      template: 'booking-payment-fail-customer',
      extraData: { shortBookingLink },
    });
    stylistTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
    customerTemplateName = NOTIFICATION_TEMPLATES.PAYMENT_ERROR;
  }

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(bookingParse.get('stylist').id);
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    notificationService.saveAndSendNotificationWithTemplate(
      conxtext,
      [stylistReceiver],
      stylistTemplateName,
      {
        booking: bookingParse,
      },
      { isPush: false, isSave: true },
    );

    const customerUserParse = await Helper.getCustomerUser(bookingParse.get('customer').id);
    const customerReceiver = { id: customerUserParse.id, role: USER_ROLE.CUSTOMER };
    notificationService.saveAndSendNotificationWithTemplate(
      conxtext,
      [customerReceiver],
      customerTemplateName,
      {
        booking: bookingParse,
      },
      { isPush: false, isSave: true },
    );
  }
  const eventData = {
    totalDuration: bookingParse.get('totalDuration'),
    serviceDateTime: bookingParse.get('serviceDateTime'),
    stylistId: bookingParse.get('stylist').id,
    bookingId: bookingParse.id,
  };
  eventManager.emit(EVENTS.FINISH_BOOKING, eventData);

  return buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING, ['payment', 'transactionNo', 'paymentDate']);
};

BookingModel.getBookingDetail = async (params, requestUser) => {
  const { bookingId } = params;
  const selectedFields = [
    ...EXTENDED_BOOKING_SELECT_FIELDS,
    'review.generalScore',
    'review.styleScore',
    'review.serviceScore',
    'review.comment',
    'review.createdAt',
    'review.status',
    'coupon.couponCode',
    'coupon.transaction',
  ];
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.include('menus', 'review');
  bookingQuery.select(selectedFields);

  const [bookingParse, cardStatuses] = await Promise.all([
    bookingQuery.get(bookingId, { useMasterKey: true }),
    PaymentModel.getCardStatusList(bookingId),
  ]);

  // check permission of customer
  if (
    requestUser.get('role') === USER_ROLE.CUSTOMER &&
    requestUser.get('customer').id !== bookingParse.get('customer').id
  ) {
    throw new Parse.Error(Errors.PERMISSION_ERROR.code, Errors.PERMISSION_ERROR.message);
  }

  // check permission of salon
  if (
    requestUser.get('role') === USER_ROLE.SALON_OPERATOR &&
    requestUser.get('salon').id !== bookingParse.get('salon').id
  ) {
    throw new Parse.Error(Errors.PERMISSION_ERROR.code, Errors.PERMISSION_ERROR.message);
  }

  // check permission of stylist
  if (
    requestUser.get('role') === USER_ROLE.STYLIST &&
    requestUser.get('stylist').id !== bookingParse.get('stylist').id
  ) {
    throw new Parse.Error(Errors.PERMISSION_ERROR.code, Errors.PERMISSION_ERROR.message);
  }

  return { ...buildBookingInfo(bookingParse, selectedFields, ['review.__type', 'review.className']), cardStatuses };
};

const buildBookingListQuery = (params, requestUser, opts = {}) => {
  const {
    bookingStatuses,
    paymentStatuses,
    searchKey,
    stylistIds,
    fromServiceDateTime,
    toServiceDateTime,
    fromCreatedDate,
    toCreatedDate,
    bookingStatusExtends,
    salonId,
    ...pagingParams
  } = params;
  const { selectFields = EXTENDED_BOOKING_SELECT_FIELDS } = opts;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select(selectFields);
  Helper.queryPagingHandler(bookingQuery, pagingParams);

  if (requestUser.get('role') === USER_ROLE.CUSTOMER) {
    bookingQuery.equalTo('customer', requestUser.get('customer'));
  } else if (requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    bookingQuery.equalTo('salon', requestUser.get('salon'));
  } else if (requestUser.get('role') === USER_ROLE.STYLIST) {
    bookingQuery.equalTo('stylist', requestUser.get('stylist'));
  }

  if (requestUser.get('role') === USER_ROLE.ADMIN) {
    bookingQuery.include('salon.salonImage');
  }

  if (bookingStatuses && bookingStatuses.length > 0) {
    bookingQuery.containedIn('bookingStatus', bookingStatuses);
  }

  if (bookingStatusExtends && bookingStatusExtends.length > 0) {
    bookingQuery.containedIn('bookingStatusExtend', bookingStatusExtends);
  }

  if (paymentStatuses && paymentStatuses.length > 0) {
    bookingQuery.containedIn('paymentStatus', paymentStatuses);
  }

  if (searchKey) {
    const regExp = new RegExp(Helper.escapeRegExp(searchKey).toLowerCase(), 'i');

    const listQuery = [
      BaseQuery.getBookingQuery().matches('objectId', regExp),
      BaseQuery.getBookingQuery().matchesQuery('customer', BaseQuery.getCustomerQuery().matches('fullName', regExp)),
    ];

    if (requestUser.get('role') === USER_ROLE.ADMIN) {
      listQuery.push(
        BaseQuery.getBookingQuery().matchesQuery('stylist', BaseQuery.getStylistQuery().matches('fullName', regExp)),
        BaseQuery.getBookingQuery().matchesQuery('salon', BaseQuery.getSalonQuery().matches('salonName', regExp)),
      );
    } else {
      listQuery.push(
        BaseQuery.getBookingQuery().matchesQuery('stylist', BaseQuery.getStylistQuery().matches('nickName', regExp)),
      );
    }

    const searchQuery = BaseQuery.getBookingQuery()._orQuery(listQuery);
    bookingQuery._andQuery([searchQuery]);
  }

  if (stylistIds) {
    const stylistPointers = _map(stylistIds, (id) => Helper.getPointerValue('Stylist', id));
    bookingQuery.containedIn('stylist', stylistPointers);
  }

  fromServiceDateTime &&
    bookingQuery.greaterThanOrEqualTo('serviceDateTime', moment.tz(fromServiceDateTime, DEFAULT_TIMEZONE).toDate());
  toServiceDateTime &&
    bookingQuery.lessThanOrEqualTo(
      'serviceDateTime',
      moment.tz(toServiceDateTime, DEFAULT_TIMEZONE).endOf('day').toDate(),
    );

  fromCreatedDate &&
    bookingQuery.greaterThanOrEqualTo('createdAt', moment.tz(fromCreatedDate, DEFAULT_TIMEZONE).toDate());
  toCreatedDate &&
    bookingQuery.lessThanOrEqualTo('createdAt', moment.tz(toCreatedDate, DEFAULT_TIMEZONE).endOf('day').toDate());
  return bookingQuery;
};

BookingModel.getBookingListWithoutCount = async (params, requestUser, opts = {}) => {
  const bookingQuery = buildBookingListQuery(params, requestUser, opts);
  const bookingParses = await bookingQuery.find({ useMasterKey: true });

  return bookingParses.map((bookingParse) => buildBookingInfo(bookingParse));
};

BookingModel.getBookingCSV = async (params, requestUser) => {
  const selectFields = [
    'createdAt',
    'stylist',
    'stylist.fullName',
    'customer',
    'customer.fullName',
    'customer.gender',
    'menus',
    'menus.name',
    'serviceDateTime',
    'totalPrice',
    'bookingStatus',
    'paymentStatus',
    'paymentDate',
  ];
  const bookingQuery = buildBookingListQuery(params, requestUser, {
    selectFields,
  });
  const bookingParses = await bookingQuery.find({ useMasterKey: true });

  return bookingParses.map((bookingParse) => buildBookingJsonForCsv(bookingParse, selectFields));
};

BookingModel.getBookingList = async (params, requestUser, opts = {}) => {
  const bookingQuery = buildBookingListQuery(params, requestUser, opts);

  const [bookingParses, total] = await Promise.all([bookingQuery.find({ useMasterKey: true }), bookingQuery.count()]);

  return {
    total,
    list: bookingParses.map((bookingParse) => buildBookingInfo(bookingParse)),
  };
};

BookingModel.getFullBookingList = async (params, requestUser, opts = {}) => {
  const limit = 1000;

  const fullResult = [];
  let page = 1;
  let pageResult;

  do {
    pageResult = await BookingModel.getBookingListWithoutCount({ ...params, limit, page: page++ }, requestUser, opts);
    fullResult.push(...pageResult);
  } while (pageResult.length === limit);
  return fullResult;
};

BookingModel.getBookingStats = async (requestUser, opts = {}) => {
  const match = {
    $match: {
      _p_salon: `Salon$${requestUser.get('salon').id}`,
    },
  };
  const count = {
    $group: {
      _id: null,
      requestedCount: {
        $sum: { $cond: { if: { $eq: ['$bookingStatus', BOOKING_STATUS.REQUESTED] }, then: 1, else: 0 } },
      },
      confirmedCount: {
        $sum: { $cond: { if: { $eq: ['$bookingStatus', BOOKING_STATUS.CONFIRMED] }, then: 1, else: 0 } },
      },
      completedCount: {
        $sum: {
          $cond: {
            if: { $in: ['$bookingStatus', [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.NOT_ARRIVED]] },
            then: 1,
            else: 0,
          },
        },
      },
      canceledCount: {
        $sum: {
          $cond: {
            if: {
              $in: [
                '$bookingStatus',
                [
                  BOOKING_STATUS.CANCELED_OPERATOR,
                  BOOKING_STATUS.CANCELED_CUSTOMER,
                  BOOKING_STATUS.CANCELED_STYLIST,
                  BOOKING_STATUS.CANCELED_WITH_FEE,
                  BOOKING_STATUS.CANCELED_AUTO,
                ],
              ],
            },
            then: 1,
            else: 0,
          },
        },
      },
    },
  };

  const pipeline = [match, count];

  const db = await mongoDB.getMongoDB();
  return await db.collection('Booking').aggregate(pipeline).next();
};

BookingModel.updateBooking = async (bookingId, data) => {
  const booking = Helper.getPointerValue('Booking', bookingId);

  _forEach(data, (value, key) => {
    if (!_isNil(value)) {
      booking.set(key, value);
    } else {
      booking.unset(key);
    }
  });

  await booking.save(null, { useMasterKey: true });
  return true;
};

BookingModel.countInCompletedBooking = async ({ customerId, stylistId, salonId }) => {
  const db = await mongoDB.getMongoDB();
  const condition = {
    $or: [
      { bookingStatus: { $in: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED] } },
      {
        bookingStatus: { $in: [BOOKING_STATUS.COMPLETED, BOOKING_STATUS.NOT_ARRIVED] },
        paymentStatus: { $ne: PAYMENT_STATUS.SUCCEEDED },
      },
    ],
  };
  if (customerId) {
    condition._p_customer = `Customer$${customerId}`;
  }
  if (stylistId) {
    condition._p_stylist = `Stylist$${stylistId}`;
  }
  if (salonId) {
    condition._p_salon = `Salon$${salonId}`;
  }
  return await db.collection('Booking').count(condition);
};

BookingModel.getBookingWithConditions = ({ stylistId, customerId, salonId, bookingId, statuses }) => {
  const bookingQuery = BaseQuery.getBookingQuery();
  if (stylistId) {
    bookingQuery.equalTo('stylist', Helper.getPointerValue('Stylist', stylistId));
  }
  if (customerId) {
    bookingQuery.equalTo('customer', Helper.getPointerValue('Customer', customerId));
  }
  if (salonId) {
    bookingQuery.equalTo('salon', Helper.getPointerValue('Salon', salonId));
  }
  if (statuses && _.isArray(statuses)) {
    bookingQuery.containedIn('bookingStatus', statuses);
  }
  return bookingQuery.get(bookingId, { useMasterKey: true });
};

BookingModel.removeCoupon = async ({ stylistId, customerId, salonId, bookingId }) => {
  const booking = await BookingModel.getBookingWithConditions({
    stylistId,
    customerId,
    salonId,
    bookingId,
    statuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
  });
  const transactionId = _get(booking.get('coupon'), 'transaction.id');
  if (transactionId) {
    const couponService = getCouponService();
    await couponService.cancelTransaction(transactionId);
    const db = await mongoDB.getMongoDB();
    await db.collection('Booking').updateOne(
      {
        _id: bookingId,
      },
      {
        $set: {
          totalPrice: booking.get('originalPrice'),
        },
        $unset: {
          coupon: '',
        },
      },
    );
  } else {
    const { code, message } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, message);
  }
};

BookingModel.isChangedMenus = ({ oldMenus, newMenus }) => {
  if (oldMenus.length !== newMenus.length) {
    return true;
  }
  for (let i = 0; i < oldMenus.length; i++) {
    const oldMenu = oldMenus[i];
    const menu = _.find(newMenus, { objectId: oldMenu.objectId });
    if (!menu || menu.amount !== oldMenu.amount) {
      return true;
    }
  }
  return false;
};

BookingModel.parseMenuInfoForCompleteBooking = ({ menuIds, newMenus, lastMenus }) => {
  const newMenuIds = [];
  const oldObjectMenus = [];
  let menusInParams = [];
  if (newMenus) {
    // handle change menu for new params
    menusInParams = newMenus;
    _forEach(newMenus, (newMenu) => {
      const oldMenu = _find(lastMenus, (currentMenu) => currentMenu.objectId === newMenu.id);
      const isOldMenu = oldMenu && (newMenu.isNew === false || newMenu.newPrice);
      if (isOldMenu) {
        const item = { ...oldMenu };
        if (newMenu.newPrice && newMenu.newPrice !== item.amount) {
          item.originalPrice = oldMenu.amount;
          item.amount = newMenu.newPrice;
          if (newMenu.memo) {
            item.memo = newMenu.memo;
          }
        }
        oldObjectMenus.push(item);
      } else {
        newMenuIds.push(newMenu.id);
      }
    });
  } else {
    // handle change menu for old params
    _forEach(menuIds, (newMenuId) => {
      const oldMenu = _find(lastMenus, (currentMenu) => currentMenu.objectId === newMenuId);
      if (oldMenu) {
        oldObjectMenus.push({ ...oldMenu });
      } else {
        newMenuIds.push(newMenuId);
      }
    });
  }
  return { oldObjectMenus, newMenuIds, menusInParams };
};

BookingModel.getNewMenuForCompleteBooking = ({ oldMenus, menusInParams, newMenus, newMenuIds }) => {
  if (newMenuIds.length !== newMenus.length) {
    throw new Parse.Error(Errors.UNAVAILABLE_MENU.code, Errors.UNAVAILABLE_MENU.message);
  }
  const data = newMenus.map((newMenu) => {
    const result = { ...newMenu };
    const menu = _find(menusInParams, (menuInParam) => menuInParam.id === newMenu.objectId);
    if (menu && menu.newPrice && menu.newPrice !== result.amount) {
      result.originalPrice = newMenu.amount;
      result.amount = menu.newPrice;
      if (menu.memo) {
        result.memo = menu.memo;
      }
    }
    return result;
  });
  return [...oldMenus, ...data];
};

BookingModel.getCouponDetailBasedOnCode = async ({ code }) => {
  const couponService = getCouponService();
  const result = await couponService.getCoupons({
    code,
    status: 'ACTIVE',
  });
  if (result.coupons && result.coupons.length > 0) {
    return result.coupons[0];
  }
  throw new Parse.Error(Errors.INVALID_COUPON.code, Errors.INVALID_COUPON.message);
};

BookingModel.remindConfirmingBooking = async () => {
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select([
    ...DefaultSelectFields.BOOKING,
    'customer.email',
    'canceledFee',
    'stylist.stylistEmail',
    'coupon',
  ]);
  bookingQuery.equalTo('bookingStatus', BOOKING_STATUS.REQUESTED);
  bookingQuery.doesNotExist('remindConfirmingBooking');
  bookingQuery.lessThan('serviceDateTime', moment().add(60, 'minutes').toDate());
  bookingQuery.greaterThan('serviceDateTime', moment().add(55, 'minutes').toDate());
  const bookings = await bookingQuery.find({ useMasterKey: true });
  const data = await BookingModel.buildInforForReminding(bookings);
  const template = 'remind-confirming-booking-stylist';
  for (const key in data) {
    parseServerConfig.emailAdapter.sendMailByTemplate(template, { to: data[key].stylistEmail }, data[key]);
  }
  return await BookingModel.markRemindedBooking(bookings);
};

BookingModel.buildInforForReminding = async (bookings) => {
  const data = {};
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const startTime = moment(booking.get('serviceDateTime')).tz(DEFAULT_TIMEZONE);
    const key = `${booking.get('stylist').id}${startTime.format('YYYYMMDDHHmm')}`;
    if (!data[key]) {
      const link = await Helper.getShortSalonLinkForStylist({
        email: booking.get('stylist').get('stylistEmail'),
        tab: BOOKING_STATUS.REQUESTED,
      });
      data[key] = {
        stylistEmail: booking.get('stylist').get('stylistEmail'),
        bookings: [],
        beforeTime: startTime.clone().subtract(30, 'minutes').format('YYYY/MM/DD HH:mm'),
        link,
      };
    }
    data[key].bookings.push(BookingModel.getBookingInforForReminding(booking));
  }
  return data;
};

BookingModel.getBookingInforForReminding = (bookingParse) => {
  const salon = bookingParse.get('salon');
  const customer = bookingParse.get('customer');
  const menusName = buildMenusName(bookingParse.get('menus'));
  return {
    bookingId: bookingParse.id,
    serviceDateTime: moment(bookingParse.get('serviceDateTime')).tz(DEFAULT_TIMEZONE).format('YYYY/MM/DD HH:mm'),
    salonName: salon ? salon.get('salonName') : '',
    customerFullName: customer ? customer.get('fullName') : '',
    menusName,
    originalPrice: Helper.numberWithCommas(bookingParse.get('originalPrice')),
  };
};

BookingModel.markRemindedBooking = async (bookings) => {
  const bookingIds = [];
  bookings.forEach((booking) => {
    bookingIds.push(booking.id);
  });
  const db = await mongoDB.getMongoDB();
  await db
    .collection('Booking')
    .updateMany({ _id: { $in: bookingIds } }, { $set: { remindConfirmingBooking: moment().toDate() } });
  return bookingIds;
};

BookingModel.processBookingInfo = (bookings) => {
  if (bookings === []) return [];
  return bookings.map((booking) => {
    return {
      objectId: booking.id,
      stylist: {
        objectId: booking.attributes.stylist ? booking.attributes.stylist.id : undefined,
        fullName: booking.attributes.stylist ? booking.attributes.stylist.attributes.fullName : undefined,
        profileImages: booking.attributes.stylist ? booking.attributes.stylist.attributes.profileImages : undefined,
        email: booking.attributes.stylist ? booking.attributes.stylist.attributes.stylistEmail : undefined,
      },
      serviceDateTime: booking.attributes.serviceDateTime
        ? booking.attributes.serviceDateTime.toISOString()
        : undefined,
      paymentDate: booking.attributes.paymentDate ? booking.attributes.paymentDate.toISOString() : undefined,
      payoutInfo: {
        totalPrice: booking.attributes.payoutInfo.gross,
        commission: booking.attributes.payoutInfo.fee,
        subtotal: booking.attributes.payoutInfo.net,
      },
      bookingStatusExtend: booking.attributes.bookingStatusExtend ? booking.attributes.bookingStatusExtend : undefined,
    };
  });
};
BookingModel.getBookingByEarningId = async (earningId, pagingParams) => {
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.equalTo('payoutInfo.earningId', earningId);
  bookingQuery.include('stylist');
  Helper.queryPagingHandler(bookingQuery, pagingParams);
  const [list, total] = await Promise.all([bookingQuery.find({ useMasterKey: true }), bookingQuery.count()]);
  return {
    total,
    list: BookingModel.processBookingInfo(list),
  };
};

BookingModel.getBookingListByAdmin = async (params, requestUser, opts = {}) => {
  const bookingQuery = buildBookingListQuery(params, requestUser, { selectFields: DefaultSelectFields.BOOKING_ADMIN });
  const [bookingParses, total] = await Promise.all([bookingQuery.find({ useMasterKey: true }), bookingQuery.count()]);
  return {
    total,
    list: bookingParses.map((bookingParse) => {
      const result = buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING_ADMIN);
      result.serviceDateTime = result.serviceDateTime && result.serviceDateTime.iso ? result.serviceDateTime.iso : null;
      return result;
    }),
  };
};

BookingModel.getBookingWithStatusExtendsForCSV = async (params, requestUser) => {
  const selectFields = [
    'objectId',
    'salon',
    'salon.objectId',
    'salon.salonName',
    'stylist',
    'stylist.fullName',
    'stylist.objectId',
    'customer',
    'customer.fullName',
    'customer.objectId',
    'createdAt',
    'serviceDateTime',
    'originalPrice',
    'bookingStatusExtend',
    'paymentStatus',
    'coupon',
  ];

  const bookingQuery = buildBookingListQuery(params, requestUser, {
    selectFields,
  });

  const [bookingParses, total] = await Promise.all([bookingQuery.find({ useMasterKey: true }), bookingQuery.count()]);
  return {
    total,
    list: bookingParses.map((bookingParse) => buildBookingInfo(bookingParse, DefaultSelectFields.BOOKING_ADMIN)),
  };
};
