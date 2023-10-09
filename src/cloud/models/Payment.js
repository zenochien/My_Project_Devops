const PaymentModel = {};
module.exports = PaymentModel;

const _ = require('lodash');

const BaseQuery = require('../BaseQuery');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');

const buildCardStatusInfo = (paymentParse) => {
  const result = Helper.convertParseObjectToJson(paymentParse, DefaultSelectFields.PAYMENT);
  result.cardId = _.get(result, 'request.cardId');
  _.unset(result, 'request');
  _.unset(result, 'objectId');
  return result;
};

PaymentModel.getCardStatusList = async (bookingId) => {
  const paymentQuery = BaseQuery.getPaymentQuery();
  paymentQuery.select(DefaultSelectFields.PAYMENT);
  paymentQuery.equalTo('bookingId', bookingId);
  paymentQuery.descending('createdAt');

  const paymentParses = await paymentQuery.find({ useMasterKey: true });

  return _.map(
    _.uniqBy(paymentParses, (parseObj) => _.get(parseObj.get('request'), 'cardId')),
    (paymentParse) => buildCardStatusInfo(paymentParse),
  );
};
