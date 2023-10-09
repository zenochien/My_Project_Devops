const ClosingDateModel = {};
module.exports = ClosingDateModel;

const moment = require('moment');
const _reduce = require('lodash/reduce');
const _isEmpty = require('lodash/isEmpty');

const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');
const BaseQuery = require('../BaseQuery');
const { DEFAULT_TIMEZONE, BOOKING_STATUS } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const BookingModel = require('./Booking');

const buildClosingDateInfo = (closingDateParse) => {
  return Helper.convertParseObjectToJson(closingDateParse, DefaultSelectFields.CLOSING_DATE);
};

const buildClosingDateList = (closingDateParse, from, to) => {
  const closingDateInfo = Helper.convertParseObjectToJson(closingDateParse, DefaultSelectFields.CLOSING_DATE);

  const result = [];
  if (
    closingDateInfo.startDate === closingDateInfo.endDate &&
    closingDateInfo.startDate >= from &&
    closingDateInfo.startDate <= to
  ) {
    result.push(closingDateInfo.startDate);
  } else {
    const firstDay = closingDateInfo.startDate >= from ? closingDateInfo.startDate : from;
    const lastDay = closingDateInfo.endDate <= to ? closingDateInfo.endDate : to;
    result.push(firstDay);

    let nextDay = moment(firstDay).tz(DEFAULT_TIMEZONE);
    let nextDayStr = nextDay.format('YYYY-MM-DD');
    while (nextDayStr < lastDay) {
      nextDay = nextDay.add(1, 'day');
      nextDayStr = nextDay.format('YYYY-MM-DD');
      result.push(nextDayStr);
    }
  }

  return result;
};

ClosingDateModel.addClosingDates = async (params, requestUser) => {
  const { startDate, endDate, note } = params;

  const fromServiceDateTime = moment(startDate).tz(DEFAULT_TIMEZONE).startOf('day').toISOString();
  const toServiceDateTime = moment(endDate).tz(DEFAULT_TIMEZONE).endOf('day').toISOString();
  const overlapBookings = await BookingModel.getFullBookingList(
    {
      bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
      fromServiceDateTime,
      toServiceDateTime,
    },
    requestUser,
    { selectFields: ['serviceDateTime'] },
  );

  if (!_isEmpty(overlapBookings)) {
    const sortedBookingsInfos = Helper.formatOutsideBookings(overlapBookings);
    const { code } = Errors.AFFECT_BOOKING_ERROR;
    throw new Parse.Error(code, sortedBookingsInfos);
  }

  const closingDateParse = new Parse.Object('ClosingDate');
  closingDateParse.set('startDate', startDate);
  closingDateParse.set('endDate', endDate);
  closingDateParse.set('note', note);
  closingDateParse.set('salonId', requestUser.get('salon').id);

  const closingDate = await closingDateParse.save(null, { useMasterKey: true });
  return buildClosingDateInfo(closingDate);
};

ClosingDateModel.deleteClosingDates = async (params, requestUser) => {
  const { objectId } = params;

  const closingDateQuery = BaseQuery.getClosingDateQuery();
  closingDateQuery.equalTo('salonId', requestUser.get('salon').id);
  const closingDateParse = await closingDateQuery.get(objectId, { useMasterKey: true });

  await closingDateParse.destroy();
  return { success: true };
};

ClosingDateModel.getClosingDates = async (params, salonId) => {
  const { ...pagingParams } = params;

  const closingDateQuery = BaseQuery.getClosingDateQuery();
  closingDateQuery.select(...DefaultSelectFields.CLOSING_DATE);
  closingDateQuery.equalTo('salonId', salonId);
  Helper.queryPagingHandler(closingDateQuery, pagingParams);

  const closingDateParses = await closingDateQuery.find({ useMasterKey: true });

  return {
    list: closingDateParses.map((closingDateParse) => buildClosingDateInfo(closingDateParse)),
  };
};

ClosingDateModel.getClosingDatesList = async (params, salonId) => {
  const { from, to } = params;

  const closingDateQuery = BaseQuery.getClosingDateQuery();
  closingDateQuery.equalTo('salonId', salonId);
  to && closingDateQuery.lessThanOrEqualTo('startDate', to);
  from && closingDateQuery.greaterThanOrEqualTo('endDate', from);
  closingDateQuery.select('startDate', 'endDate');
  closingDateQuery.limit(1000);

  const closingDateParses = await closingDateQuery.find({ useMasterKey: true });
  const closingDatesList = _reduce(
    closingDateParses,
    (result, next) => {
      result.push(...buildClosingDateList(next, from, to));
      return result;
    },
    [],
  );

  return {
    list: closingDatesList,
  };
};
