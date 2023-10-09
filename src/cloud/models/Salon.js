const SalonModel = {};
module.exports = SalonModel;

const _get = require('lodash/get');
const _forEach = require('lodash/forEach');
const _isNull = require('lodash/isNull');
const _isEqual = require('lodash/isEqual');
const _isEmpty = require('lodash/isEmpty');
const _omit = require('lodash/omit');
const _map = require('lodash/map');
const _find = require('lodash/find');
const _filter = require('lodash/filter');
const _includes = require('lodash/includes');
const _sortBy = require('lodash/sortBy');
const _orderBy = require('lodash/orderBy');
const _reduce = require('lodash/reduce');
const moment = require('moment');
const slug = require('limax');

const eventManager = require('./../../utils/Event');
const BaseQuery = require('../BaseQuery');
const { ParseServerLogger } = require('../../logger');
const Errors = require('../../const/Errors');
const Helper = require('../../utils/helper');
const {
  USER_ROLE,
  STATUS,
  BOOKING_STATUS,
  EMPTY_SCHEDULE,
  EMPTY_SALON_SCHEDULE,
  UNAVAILABLE_SUM_SCHEDULE,
  CLOSING_DATE_SUM_SCHEDULE,
  EMPTY_ISO_STRING,
  SALON_STATUS,
  DATE_TIME_FORMAT,
  EVENTS,
  DEFAULT_CLEARED_FIELDS,
} = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const ControllerBoardModel = require('./ControllerBoard');
const mongoDB = require('../../db/mongoDB');
const { DEFAULT_TIMEZONE } = require('../../const/Constants');
const BookingModel = require('./Booking');
const ClosingDateModel = require('./ClosingDate');
const StylistModel = require('./Stylist');
const HoldingCompanyModel = require('./HoldingCompany');
const EXTENDED_SALON_SELECT_FIELDS = [
  ...DefaultSelectFields.SALON,
  'salonImage.thumbLarge',
  'salonImage.thumbSmall',
  'salonImage.file',
];

const buildSalonInfo = (salonParse, imageInfo = '') => {
  const salonInfo = Helper.convertParseObjectToJson(salonParse, DefaultSelectFields.SALON);
  if (imageInfo) {
    const imageJSON = imageInfo.toJSON();
    salonInfo.salonImage = {
      objectId: imageJSON.objectId,
      thumbLarge: _get(imageJSON, 'thumbLarge.url'),
      thumbSmall: _get(imageJSON, 'thumbSmall.url'),
      file: _get(imageJSON, 'file.url'),
    };
  }

  if (salonInfo.holdingCompany && salonInfo.holdingCompany.status === STATUS.DELETED) {
    delete salonInfo.holdingCompany;
  }

  return salonInfo;
};

const calcCountBookingsWeekView = async (fromServiceDateStr, toServiceDateStr, stylistPointerIds) => {
  const matchQuery = {
    bookingStatus: { $in: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED] },
  };
  if (fromServiceDateStr && toServiceDateStr) {
    matchQuery['serviceDateTime'] = { $gte: new Date(fromServiceDateStr), $lte: new Date(toServiceDateStr) };
  }
  if (stylistPointerIds) {
    matchQuery['_p_stylist'] = { $in: stylistPointerIds };
  }
  const match = {
    $match: matchQuery,
  };

  const project = {
    $project: {
      _p_stylist: 1,
      bookingStatus: 1,
      serviceDateTime: 1,
      dayOfWeek: {
        $dayOfWeek: {
          date: '$serviceDateTime',
          timezone: DEFAULT_TIMEZONE,
        },
      },
      stylistId: { $substr: ['$_p_stylist', 'Stylist$'.length, -1] },
    },
  };
  const groupByStylistAndDate = {
    $group: {
      _id: {
        stylistId: '$stylistId',
        dayOfWeek: { $subtract: ['$dayOfWeek', 1] }, //Sun = 0, ..., Sat = 6
      },
      countRequested: {
        $sum: { $cond: { if: { $eq: ['$bookingStatus', BOOKING_STATUS.REQUESTED] }, then: 1, else: 0 } },
      },
      countConfirmed: {
        $sum: { $cond: { if: { $eq: ['$bookingStatus', BOOKING_STATUS.CONFIRMED] }, then: 1, else: 0 } },
      },
    },
  };
  const groupByStylist = {
    $group: {
      _id: '$_id.stylistId',
      stats: {
        $push: {
          dayOfWeek: '$_id.dayOfWeek',
          countRequested: '$countRequested',
          countConfirmed: '$countConfirmed',
        },
      },
    },
  };

  const pipeline = [match, project, groupByStylistAndDate, groupByStylist];

  const db = await mongoDB.getMongoDB();
  return await db.collection('Booking').aggregate(pipeline).toArray();
};

const shrinkWeeklySchedules = (schedulesStylist, salonSchedules) => {
  const newWeeklySchedules = {};
  const weeklySchedules = schedulesStylist.schedules;
  const mergedWeeklySchedules = Helper.mergeCBSchedules(weeklySchedules);
  for (let i = 0; i <= 6; i++) {
    const dayWeeklySchedule = mergedWeeklySchedules[i];
    const daySalonSchedule = salonSchedules[i];

    newWeeklySchedules[i] = [];
    _forEach(dayWeeklySchedule, (sched) => {
      const overlappedRange = Helper.getOverlappedRange(sched, daySalonSchedule);
      if (overlappedRange) {
        newWeeklySchedules[i].push(overlappedRange);
      }
    });
    if (newWeeklySchedules[i].length === 0) {
      newWeeklySchedules[i].push(EMPTY_SCHEDULE);
    }
  }

  return newWeeklySchedules;
};

const updateSalonStylistSchedule = async (cbSalonId, salonSchedules, requestUser) => {
  // Check today's bookings because updating salon's schedules will affect from today
  const today = moment().tz(DEFAULT_TIMEZONE);
  const startOfToday = today.startOf('day').toISOString();
  const endOfToday = today.endOf('day').toISOString();
  const bookings = await BookingModel.getFullBookingList(
    {
      bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
      fromServiceDateTime: startOfToday,
      toServiceDateTime: endOfToday,
    },
    requestUser,
    { selectFields: ['serviceDateTime', 'totalDuration'] },
  );

  const outsideBookingsToday = Helper.getOutsideBookingsOfWeeklySchedules(bookings, salonSchedules);
  const outsideBookingList = [];
  if (!_isEmpty(outsideBookingsToday)) {
    const sortedBookingsInfos = Helper.formatOutsideBookings(outsideBookingsToday);
    outsideBookingList.push(...sortedBookingsInfos);
  }

  // shrink stylist's weekly schedule when salon operator shrink salon schedule
  const tomorrow = moment().add(1, 'days').tz(DEFAULT_TIMEZONE);
  const fromStr = tomorrow.startOf('day').toISOString();
  const toStr = tomorrow.endOf('day').toISOString();
  const limit = 200;

  let schedulesStylistsList;
  let page = 1;
  const updateParamsList = [];
  do {
    const result = await ControllerBoardModel.getStaffScheduleOfSalon({
      cbSalonId,
      page,
      limit,
      from: fromStr,
      to: toStr,
    });

    schedulesStylistsList = result.data;
    const promises = await schedulesStylistsList.map(async (cbStylistSchedules) => {
      const newWeeklySchedules = shrinkWeeklySchedules(cbStylistSchedules, salonSchedules);
      await StylistModel.checkStylistWeeklySchedule(
        {
          stylistId: cbStylistSchedules.connections[0].sourceId,
          stylistSchedules: newWeeklySchedules,
        },
        requestUser,
      )
        .then((stylistSchedules) => {
          if (stylistSchedules) {
            updateParamsList.push({
              cbStaffId: cbStylistSchedules.id,
              schedules: stylistSchedules,
            });
          }
        })
        .catch((error) => {
          if (error.code === Errors.AFFECT_BOOKING_ERROR.code) {
            outsideBookingList.push(...error.message);
          } else {
            throw error;
          }
        });
    });
    await Promise.all(promises);
    page++;
  } while (schedulesStylistsList.length === limit);

  if (!_isEmpty(outsideBookingList)) {
    const { code } = Errors.AFFECT_BOOKING_ERROR;
    throw new Parse.Error(code, outsideBookingList);
  }

  const promises = updateParamsList.map(async (updateParams) => {
    await ControllerBoardModel.updateStaffWeeklySchedule(updateParams).catch((error) => {
      ParseServerLogger.error(
        `Error updateSalonStylistSchedule updateStaffWeeklySchedule cbStaffId=${updateParams.cbStaffId}`,
        error,
      );
      throw error;
    });
  });
  await Promise.all(promises);

  ControllerBoardModel.updateSalonSchedule({
    cbSalonId: cbSalonId,
    schedules: salonSchedules,
  }).catch((error) => ParseServerLogger.error('Error updateSalonStylistSchedule updateSalonSchedule', error));
};

SalonModel.updateSalonInfo = async (params) => {
  const { objectId, holdingCompanyId, user, salonImage, salonSchedules, ...otherInfos } = params;
  if (user.get('role') === USER_ROLE.SALON_OPERATOR && user.get('username') !== objectId) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.select(...EXTENDED_SALON_SELECT_FIELDS, 'cbSalonId');
  const salonObject = await salonQuery.get(objectId, { useMasterKey: true });

  let imageParse;
  if (salonImage) {
    imageParse = Helper.getPointerValue('Image', salonImage);
    salonImage && salonObject.set('salonImage', imageParse);
  }

  if (salonSchedules) {
    const strippedSalonSchedules = Helper.stripUndefined(salonSchedules);
    if (strippedSalonSchedules && !_isEqual(strippedSalonSchedules, salonObject.get('salonSchedules'))) {
      salonObject.set('salonSchedules', strippedSalonSchedules);
      await updateSalonStylistSchedule(salonObject.get('cbSalonId'), strippedSalonSchedules, user);
    }
  }

  if (holdingCompanyId) {
    const holdingCompany = await HoldingCompanyModel.getHoldingCompanyById(holdingCompanyId);
    salonObject.set('holdingCompany', {
      objectId: holdingCompany.id,
      name: holdingCompany.get('name'),
      status: holdingCompany.get('status'),
    });
  }

  try {
    otherInfos.slug = Helper.slugify(otherInfos.salonName);
    _forEach(otherInfos, (value, key) => {
      if (_isNull(value)) {
        salonObject.unset(key);
      } else {
        salonObject.set(key, value);
      }
    });

    const result = await salonObject.save(null, { useMasterKey: true });

    ControllerBoardModel.updateSalonInfo({
      cbSalonId: salonObject.get('cbSalonId'),
      ...otherInfos,
    }).catch((error) => ParseServerLogger.error(error));

    // If success, change Image status to ACTIVE
    if (salonImage && imageParse) {
      imageParse.set('status', STATUS.ACTIVE);

      imageParse.save(null, { useMasterKey: true });
    }
    let imageInfo;
    if (imageParse) {
      imageInfo = await imageParse.fetch({ useMasterKey: true });
    }
    return buildSalonInfo(result, imageInfo);
  } catch (error) {
    ParseServerLogger.error(error);
  }
};

SalonModel.getStaffsScheduleOfSalonWeekView = async (params, requestUser) => {
  const { salonId, from, to, ...others } = params;

  if (requestUser.get('role') === USER_ROLE.SALON_OPERATOR && requestUser.get('username') !== salonId) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.select('cbSalonId', 'salonSchedules');
  const salonObject = await salonQuery.get(salonId, { useMasterKey: true });

  const fromMoment = moment(from).tz(DEFAULT_TIMEZONE).startOf('day');
  const toMoment = moment(to).tz(DEFAULT_TIMEZONE).endOf('day');
  const fromStr = fromMoment.toISOString();
  const toStr = toMoment.toISOString();
  const result = await ControllerBoardModel.getFullStaffScheduleOfSalon({
    cbSalonId: salonObject.get('cbSalonId'),
    ...others,
    from: fromStr,
    to: toStr,
  });

  const closingDates = (
    await ClosingDateModel.getClosingDatesList(
      { from: fromMoment.format('YYYY-MM-DD'), to: toMoment.format('YYYY-MM-DD') },
      requestUser.get('salon').id,
    )
  ).list;

  const stylistIds = _map(result, (stylistObj, key) => {
    const objectId = _get(stylistObj, 'connections.0.sourceId');
    stylistObj.objectId = objectId;

    result[key] = _omit(stylistObj, ['id', 'connections']);

    return objectId;
  });

  const db = await mongoDB.getMongoDB();
  const stylistArray = await db
    .collection('Stylist')
    .find({ _id: { $in: stylistIds } })
    .project({
      _id: 1,
      profileImages: 1,
      nickName: 1,
      _created_at: 1,
    })
    .toArray();

  const stylistPointerIds = _map(stylistIds, (stylistId) => `Stylist$${stylistId}`);
  const groupedBookingStats = await calcCountBookingsWeekView(fromStr, toStr, stylistPointerIds);

  _forEach(result, (stylistObj, key) => {
    const stylist = _find(stylistArray, { _id: stylistObj.objectId });
    if (stylist) {
      stylistObj.profileImages = stylist.profileImages;
      stylistObj.nickName = stylist.nickName;
      stylistObj.sumSchedule = Helper.getSumScheduleOfWeekView(
        fromMoment.format('YYYY-MM-DD'),
        Helper.mergeCBSchedules(stylistObj.schedules),
        stylistObj.scheduleDailies,
        salonObject.get('salonSchedules') ? salonObject.get('salonSchedules') : EMPTY_SALON_SCHEDULE,
        closingDates,
        moment(stylist._created_at).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD'),
      );
    }
    const stylistBookingStats = _find(groupedBookingStats, { _id: stylistObj.objectId });
    if (stylistBookingStats) {
      stylistObj.bookingStats = stylistBookingStats.stats;
    }

    result[key] = _omit(stylistObj, ['scheduleDailies']);
  });

  const sortedResult = _orderBy(
    result,
    [
      (stylistObj) => {
        const bookingStats = _get(stylistObj, 'bookingStats');
        if (!bookingStats) {
          return 0;
        }
        return _reduce(bookingStats, (sum, next) => sum + next.countConfirmed, 0);
      },
      'nickName',
    ],
    ['desc', 'asc'],
  );

  const tomorrow = moment().add(1, 'day').tz(DEFAULT_TIMEZONE);
  const currentWeeklySchedule = await ControllerBoardModel.getFullStaffScheduleOfSalon(
    {
      cbSalonId: salonObject.get('cbSalonId'),
      ...others,
      from: tomorrow.startOf('day').toISOString(),
      to: tomorrow.endOf('day').toISOString(),
    },
    false, // from is tomorrow => doesn't have invalid record => flag = false
  );
  _map(currentWeeklySchedule, (stylistObj, key) => {
    const objectId = _get(stylistObj, 'connections.0.sourceId');
    stylistObj.objectId = objectId;
    currentWeeklySchedule[key] = _omit(stylistObj, ['id', 'connections', 'scheduleDailies']);
  });

  return { data: sortedResult, currentWeeklySchedule };
};

SalonModel.getStaffsScheduleOfSalonDayView = async (params, requestUser) => {
  const { salonId, date, ...others } = params;

  if (requestUser.get('role') === USER_ROLE.SALON_OPERATOR && requestUser.get('username') !== salonId) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.select('cbSalonId', 'salonSchedules');
  const salonObject = await salonQuery.get(salonId, { useMasterKey: true });

  const dateMoment = moment(date).tz(DEFAULT_TIMEZONE);
  const dayOfWeek = dateMoment.isoWeekday() % 7;
  const from = dateMoment.startOf('day').toISOString();
  const to = dateMoment.endOf('day').toISOString();
  let result = await ControllerBoardModel.getFullStaffScheduleOfSalon({
    cbSalonId: salonObject.get('cbSalonId'),
    ...others,
    from,
    to,
  });

  const stylistIds = _map(result, (stylistObj, key) => {
    const objectId = _get(stylistObj, 'connections.0.sourceId');
    stylistObj.objectId = objectId;

    result[key] = _omit(stylistObj, ['id', 'connections']);

    return objectId;
  });

  const closingDates = (
    await ClosingDateModel.getClosingDatesList({ from: date, to: date }, requestUser.get('salon').id)
  ).list;

  const db = await mongoDB.getMongoDB();
  const stylistArray = await db
    .collection('Stylist')
    .find({ _id: { $in: stylistIds }, userStatus: { $ne: STATUS.DELETED } })
    .project({
      _id: 1,
      profileImages: 1,
      nickName: 1,
      _created_at: 1,
    })
    .toArray();

  const bookings = await BookingModel.getFullBookingList(
    {
      bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
      stylistIds,
      fromServiceDateTime: from,
      toServiceDateTime: to,
    },
    requestUser,
  );

  _forEach(stylistArray, (stylist, key) => {
    const stylistObj = _find(result, { objectId: stylist._id });
    stylistObj.avaliable = true;
    if (stylistObj) {
      stylistObj.profileImages = stylist.profileImages;
      stylistObj.nickName = stylist.nickName;

      const stylistBookings = _filter(bookings, { stylist: { objectId: stylist._id } });
      const sortedStylistBookings = _sortBy(stylistBookings, [
        (booking) => {
          if (booking.bookingStatus === BOOKING_STATUS.CONFIRMED) {
            return '0' + _get(booking, 'serviceDateTime.iso', EMPTY_ISO_STRING) + _get(booking, 'confirmedAt', '9');
          }
          return '1' + EMPTY_ISO_STRING + _get(booking, 'createdAt', '9');
        },
      ]);
      stylistObj.bookings = sortedStylistBookings;

      if (_includes(closingDates, date)) {
        stylistObj.sumSchedule = CLOSING_DATE_SUM_SCHEDULE;
      } else if (moment(stylist._created_at).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD') === date) {
        stylistObj.sumSchedule = UNAVAILABLE_SUM_SCHEDULE;
      } else {
        stylistObj.sumSchedule = Helper.getSumScheduleOfDayView(
          date,
          dayOfWeek,
          Helper.mergeCBSchedules(stylistObj.schedules),
          stylistObj.scheduleDailies,
          salonObject.get('salonSchedules') ? salonObject.get('salonSchedules') : EMPTY_SALON_SCHEDULE,
        );
      }
      delete stylistObj.schedules;
      delete stylistObj.scheduleDailies;
    }
  });
  result = _filter(result, { avaliable: true });
  const sortedResult = _sortBy(result, [
    (stylistObj) => {
      if (_get(stylistObj, 'bookings[0].bookingStatus') === BOOKING_STATUS.CONFIRMED) {
        return '0' + _get(stylistObj, 'bookings[0].serviceDateTime.iso', EMPTY_ISO_STRING) + stylistObj.nickName;
      }
      return '1' + EMPTY_ISO_STRING + stylistObj.nickName; //Ignore sorting level 2 with same length as '2021-04-24T07:30:00.000Z'
    },
  ]);

  const tomorrow = moment().add(1, 'day').tz(DEFAULT_TIMEZONE);
  const currentWeeklySchedule = await ControllerBoardModel.getFullStaffScheduleOfSalon(
    {
      cbSalonId: salonObject.get('cbSalonId'),
      ...others,
      from: tomorrow.startOf('day').toISOString(),
      to: tomorrow.endOf('day').toISOString(),
    },
    false, // from is tomorrow => doesn't have invalid record => flag = false
  );
  _map(currentWeeklySchedule, (stylistObj, key) => {
    const objectId = _get(stylistObj, 'connections.0.sourceId');
    stylistObj.objectId = objectId;
    currentWeeklySchedule[key] = _omit(stylistObj, ['id', 'connections', 'scheduleDailies']);
  });

  return { data: sortedResult, currentWeeklySchedule };
};

SalonModel.getSalonDetail = async (params) => {
  const { objectId } = params;

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.notEqualTo('status', SALON_STATUS.DELETED);
  salonQuery.select([...EXTENDED_SALON_SELECT_FIELDS, 'bankInfo', 'holdingCompany']);
  const salonObject = await salonQuery.get(objectId, { useMasterKey: true });

  return buildSalonInfo(salonObject);
};

SalonModel.getSalonList = async (params) => {
  const { searchKey, objectIds, ...pagingParams } = params;

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.notEqualTo('status', SALON_STATUS.DELETED);
  salonQuery.select([...EXTENDED_SALON_SELECT_FIELDS, 'holdingCompany']);

  if (searchKey) {
    const pattern = Helper.escapeRegExp(searchKey);
    const searchQuery = BaseQuery.getSalonQuery()._orQuery([
      BaseQuery.getSalonQuery().matches('salonName', new RegExp(pattern.toLowerCase(), 'i')),
      BaseQuery.getSalonQuery().matches('salonEmail', new RegExp(pattern.toLowerCase(), 'i')),
      BaseQuery.getSalonQuery().matches('phone', new RegExp(pattern.toLowerCase(), 'i')),
      BaseQuery.getSalonQuery().matches('objectId', new RegExp(pattern.toLowerCase(), 'i')),
    ]);
    salonQuery._andQuery([searchQuery]);
  }
  if (objectIds && objectIds.length > 0) {
    salonQuery.containedIn('objectId', objectIds);
  }

  Helper.queryPagingHandler(salonQuery, pagingParams);
  const [salons, total] = await Promise.all([salonQuery.find({ useMasterKey: true }), salonQuery.count()]);

  return {
    total,
    list: salons.map((salon) => buildSalonInfo(salon)),
  };
};

SalonModel.getDataForCSV = async (params) => {
  const { ...pagingParams } = params;
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.notEqualTo('status', SALON_STATUS.DELETED);
  salonQuery.select(...DefaultSelectFields.SALON_CSV);
  const orderBy = pagingParams.orderBy ? `${pagingParams.orderBy},objectId` : `createdAt,objectId`;
  Helper.queryPagingHandler(salonQuery, {
    ...pagingParams,
    orderBy,
  });
  const parserSalons = await salonQuery.find({ useMasterKey: true });
  return Helper.processAttributeForCsv(parserSalons, DefaultSelectFields.SALON_CSV, DEFAULT_TIMEZONE, DATE_TIME_FORMAT);
};

SalonModel.getSalonById = async (salonId) => {
  const salonQuery = BaseQuery.getSalonQuery();
  return await salonQuery.get(salonId, { useMasterKey: true });
};

SalonModel.getSalonByIds = async (salonIds) => {
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.containedIn('objectId', salonIds);
  salonQuery.includeAll();
  salonQuery.select([
    'salonImage.thumbLarge',
    'salonImage.thumbSmall',
    'salonImage.file',
    'salonName',
    'salonEmail',
    'holdingCompany',
  ]);
  const salons = await salonQuery.find({ useMasterKey: true });
  return salons.map((salon) => buildSalonInfo(salon, salon.get('salonImage')));
};

SalonModel.handleAfterDelete = async (salonId) => {
  const salonObject = await SalonModel.getSalonById(salonId);
  eventManager.emit(EVENTS.SALON_CHANGE_PROFILE, {
    dirtyKeys: DEFAULT_CLEARED_FIELDS.SALON,
    objectData: salonObject.toJSON(),
  });
};

SalonModel.getSalonWithoutPayoutAccount = (limit) => {
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.doesNotExist('payoutAccount');
  salonQuery.limit(limit);
  return salonQuery.find({ useMasterKey: true });
};

SalonModel.countSalonWithoutPayoutAccount = () => {
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.doesNotExist('payoutAccount');
  return salonQuery.count({ useMasterKey: true });
};

SalonModel.getPayoutAccount = async (salonId) => {
  const salon = await SalonModel.getSalonById(salonId);
  const payoutAccount = salon.get('payoutAccount');
  if (payoutAccount) {
    return payoutAccount;
  }
  throw new Parse.Error(Errors.PAYOUT_ACCOUNT.code, Errors.PAYOUT_ACCOUNT.message);
};

SalonModel.checkSalonExistsByIds = async (salonIds) => {
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.containedIn('objectId', salonIds);
  salonQuery.containedIn('status', [SALON_STATUS.ACTIVE]);
  const numberSalon = await salonQuery.count({ useMasterKey: true });
  const salonIdsNotSame = new Set(salonIds);
  if (numberSalon !== salonIdsNotSame.size) {
    const { code, message } = Errors.SALON_NOT_EXISTS;
    throw new Parse.Error(code, message);
  }
};

const buildSalonInfoForHoldingCompany = (salonParse, holdingCompanyId, imageInfo = '') => {
  const salonInfo = Helper.convertParseObjectToJson(salonParse, DefaultSelectFields.SALON_HOLDING_COMPANY, [
    'createdAt',
  ]);
  if (imageInfo) {
    const imageJSON = imageInfo.toJSON();
    salonInfo.salonImage = {
      objectId: imageJSON.objectId,
      thumbLarge: _get(imageJSON, 'thumbLarge.url'),
      thumbSmall: _get(imageJSON, 'thumbSmall.url'),
      file: _get(imageJSON, 'file.url'),
    };
  }

  salonInfo.belongingCompany = false;

  if (holdingCompanyId && salonInfo.holdingCompany && salonInfo.holdingCompany.objectId === holdingCompanyId) {
    salonInfo.belongingCompany = true;
    delete salonInfo.holdingCompany;
  }

  return salonInfo;
};

SalonModel.getSalonsByHoldingCompanyByAdmin = async (params) => {
  const { searchKey, holdingCompanyId, ...pagingParams } = params;

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.notEqualTo('status', STATUS.DELETED);
  salonQuery.select(DefaultSelectFields.SALON_HOLDING_COMPANY);

  if (!holdingCompanyId) {
    salonQuery.doesNotExist('holdingCompany');
  } else {
    const query = BaseQuery.getSalonQuery()._orQuery([
      BaseQuery.getSalonQuery().doesNotExist('holdingCompany'),
      BaseQuery.getSalonQuery().equalTo('holdingCompany.objectId', holdingCompanyId),
    ]);
    salonQuery._andQuery([query]);
  }

  if (searchKey) {
    const pattern = Helper.escapeRegExp(searchKey);
    salonQuery.matches('salonName', new RegExp(pattern.toLowerCase(), 'i'));
  }

  Helper.queryPagingHandler(salonQuery, pagingParams);
  const [salons, total] = await Promise.all([
    salonQuery.find({ useMasterKey: true }),
    salonQuery.count({ useMasterKey: true }),
  ]);
  return {
    total,
    list: salons.map((salon) => buildSalonInfoForHoldingCompany(salon, holdingCompanyId)),
  };
};
