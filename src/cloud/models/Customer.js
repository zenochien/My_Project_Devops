const CustomerModel = {};
module.exports = CustomerModel;

const _reduce = require('lodash/reduce');
const _forEach = require('lodash/forEach');
const _isNull = require('lodash/isNull');
const _isNil = require('lodash/isNil');
const moment = require('moment');
const eventManager = require('./../../utils/Event');
const {
  STATUS,
  PAYMENT_STATUS,
  BOOKING_STATUS,
  DEFAULT_TIMEZONE,
  EVENTS,
  DEFAULT_CLEARED_FIELDS,
  DATE_TIME_FORMAT,
} = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Errors = require('../../const/Errors');
const { default: ParseServerLogger } = require('../../logger/ParseServerLogger');
const Helper = require('../../utils/helper');
const BaseQuery = require('../BaseQuery');
const ImageModel = require('./Image');
const VeriTransPaymentModel = require('./VeriTransPayment');

const buildCustomerInfo = (customerParse) => {
  return Helper.convertParseObjectToJson(customerParse, DefaultSelectFields.CUSTOMER);
};

const checkCompletedProfile = (customerParse) => {
  const allRequiredFields = [
    'firstName',
    'lastName',
    'phoneticFirstName',
    'phoneticLastName',
    'gender',
    'birthDate',
    'phone',
    'paymentMethod',
  ];
  let isAllDefined = true;
  _forEach(allRequiredFields, (value) => {
    if (_isNil(customerParse.get(value))) {
      isAllDefined = false;
      return false;
    }
  });
  return isAllDefined;
};

CustomerModel.deleteCard = async (requestUser, cardId) => {
  const bookingQuery = BaseQuery.getBookingQuery();
  const statusQuery = BaseQuery.getBookingQuery()._orQuery([
    BaseQuery.getBookingQuery().containedIn('paymentStatus', [PAYMENT_STATUS.FAILED]),
    BaseQuery.getBookingQuery().containedIn('bookingStatus', [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED]),
  ]);
  bookingQuery._andQuery([statusQuery]);
  bookingQuery.equalTo('customer', requestUser.get('customer'));
  bookingQuery.equalTo('cardInfo.cardId', cardId);

  const bookingCount = await bookingQuery.count({ useMasterKey: true });
  if (bookingCount > 0) {
    const { code, message } = Errors.DELETE_CARD_CUSTOMER_ERROR;
    throw new Parse.Error(code, message);
  }

  const email = requestUser.get('email');
  await VeriTransPaymentModel.deleteCard({ cardId, email });
  return VeriTransPaymentModel.getCardList(email);
};

CustomerModel.updateCustomerInfo = async (params) => {
  const { user, email, veriTransInformationId, profileImages: imageIds, ...otherInfos } = params;

  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.equalTo('email', email || user.get('email'));
  customerQuery.select(DefaultSelectFields.CUSTOMER);
  const customerParse = await customerQuery.first({ useMasterKey: true });

  if (!customerParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Customer info can not be found.');
  }

  const prevImageIds = customerParse.get('profileImageIds');
  if (imageIds) {
    let imageObjects = [];
    if (imageIds.length > 0) {
      imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);
    }
    customerParse.set('profileImages', imageObjects);
    customerParse.set('profileImageIds', imageIds);
  }

  _forEach(otherInfos, (value, key) => {
    if (_isNull(value)) {
      customerParse.unset(key);
    } else {
      customerParse.set(key, value);
    }
  });
  if (otherInfos.lastName && otherInfos.firstName) {
    customerParse.set('fullName', `${otherInfos.lastName} ${otherInfos.firstName}`);
  }
  if (otherInfos.phoneticLastName && otherInfos.phoneticFirstName) {
    customerParse.set('phoneticFullName', `${otherInfos.phoneticLastName} ${otherInfos.phoneticFirstName}`);
  }
  customerParse.set('isCompletedProfile', checkCompletedProfile(customerParse));

  if (veriTransInformationId) {
    customerParse.set('veriTransInformation', Helper.getPointerValue('VeriTransInformation', veriTransInformationId));
  }

  await customerParse.save(null, { useMasterKey: true });

  if (imageIds) {
    const deletedImageParses = _reduce(
      prevImageIds,
      (array, imageId) => {
        if (imageIds.includes(imageId)) {
          return array;
        }
        const deletedImageParse = Helper.getPointerValue('Image', imageId);
        deletedImageParse.set('status', STATUS.DELETED);
        array.push(deletedImageParse);
        return array;
      },
      [],
    );

    Parse.Object.saveAll(deletedImageParses, { useMasterKey: true }).catch((error) => ParseServerLogger.error(error));
  }

  return buildCustomerInfo(customerParse);
};

CustomerModel.getCustomerDetail = async (params, opts = {}) => {
  const { user, email } = params;
  const { selectFields = DefaultSelectFields.CUSTOMER, isGetCardDetail = false } = opts;
  const queryEmail = email || user.get('email');

  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.equalTo('email', queryEmail);
  selectFields.push('requestDeletingAccount');
  selectFields.push('deletedAt');
  if (isGetCardDetail) {
    selectFields.push('veriTransInformation.veriTransAccountId');
    selectFields.push('veriTransInformation.cardHolderNamesMap');
  }
  customerQuery.select(selectFields);

  const customerParse = await customerQuery.first({ useMasterKey: true });

  if (!customerParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Customer info can not be found.');
  }

  const customerDetail = buildCustomerInfo(customerParse);
  if (isGetCardDetail) {
    customerDetail.cardList = await VeriTransPaymentModel.getCardList(queryEmail, customerDetail);
    delete customerDetail.veriTransInformation;
  }

  return customerDetail;
};

CustomerModel.getCustomerDetailByAdmin = async (params, opts = {}) => {
  const { customerId } = params;
  const { selectFields = DefaultSelectFields.CUSTOMER, isGetCardDetail = false } = opts;

  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.equalTo('objectId', customerId);
  selectFields.push('requestDeletingAccount');
  selectFields.push('deletedAt');
  if (isGetCardDetail) {
    selectFields.push('veriTransInformation.veriTransAccountId');
    selectFields.push('veriTransInformation.cardHolderNamesMap');
  }
  customerQuery.select(selectFields);

  const customerParse = await customerQuery.first({ useMasterKey: true });

  if (!customerParse) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Customer info can not be found.');
  }

  const customerDetail = buildCustomerInfo(customerParse);
  if (isGetCardDetail) {
    customerDetail.cardList = await VeriTransPaymentModel.getCardList(customerParse.get('email'), customerDetail);
    delete customerDetail.veriTransInformation;
  }

  return customerDetail;
};

CustomerModel.getCustomerList = async (params, requestUser) => {
  const { searchKey, ...pagingParams } = params;

  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.select(DefaultSelectFields.CUSTOMER);
  Helper.queryPagingHandler(customerQuery, pagingParams);

  if (searchKey) {
    const regExp = new RegExp(Helper.escapeRegExp(searchKey).toLowerCase(), 'i');
    const searchQuery = BaseQuery.getCustomerQuery()._orQuery([
      BaseQuery.getCustomerQuery().matches('fullName', regExp),
      BaseQuery.getCustomerQuery().matches('phoneticFullName', regExp),
      BaseQuery.getCustomerQuery().matches('email', regExp),
      BaseQuery.getCustomerQuery().matches('objectId', regExp),
    ]);
    customerQuery._andQuery([searchQuery]);
  }

  const [customerParses, total] = await Promise.all([
    customerQuery.find({ useMasterKey: true }),
    customerQuery.count(),
  ]);

  return {
    total,
    list: customerParses.map((customerParse) => buildCustomerInfo(customerParse)),
  };
};

CustomerModel.getExpiredDeletingAccount = async () => {
  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.notEqualTo('userStatus', 'DELETED');
  customerQuery.lessThanOrEqualTo('requestDeletingAccount.expiredAt', moment().tz(DEFAULT_TIMEZONE).toDate());
  return await customerQuery.find({ useMasterKey: true });
};

CustomerModel.getCustomerById = async ({ customerId }) => {
  const customerQuery = BaseQuery.getCustomerQuery();
  return await customerQuery.get(customerId, { useMasterKey: true });
};

CustomerModel.getDataForCSV = async (params) => {
  const { ...pagingParams } = params;
  const customerQuery = BaseQuery.getCustomerQuery();
  customerQuery.notEqualTo('userStatus', STATUS.DELETED);
  customerQuery.doesNotExist('requestDeletingAccount');
  customerQuery.select(...DefaultSelectFields.CUSTOMER_CSV);
  const orderBy = pagingParams.orderBy ? `${pagingParams.orderBy},objectId` : `createdAt,objectId`;
  Helper.queryPagingHandler(customerQuery, {
    ...pagingParams,
    orderBy,
  });
  const parserCustomers = await customerQuery.find({ useMasterKey: true });
  return Helper.processAttributeForCsv(
    parserCustomers,
    DefaultSelectFields.CUSTOMER_CSV,
    DEFAULT_TIMEZONE,
    DATE_TIME_FORMAT,
  );
};
CustomerModel.handleAfterDelete = async (customerId) => {
  const customerObject = await CustomerModel.getCustomerById({ customerId });
  eventManager.emit(EVENTS.CUSTOMER_CHANGE_PROFILE, {
    dirtyKeys: DEFAULT_CLEARED_FIELDS.CUSTOMER,
    objectData: customerObject.toJSON(),
  });
};
CustomerModel.getCustomerByIds = async ({ ids, selectedFields }) => {
  const query = BaseQuery.getCustomerQuery();
  query.select(selectedFields);
  query.containedIn('objectId', ids);
  return await query.find({ useMasterKey: true });
};
