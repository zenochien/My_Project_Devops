const StylistModel = {};
module.exports = StylistModel;

const moment = require('moment-timezone');
const _reduce = require('lodash/reduce');
const _get = require('lodash/get');
const _forEach = require('lodash/forEach');
const _remove = require('lodash/remove');
const _map = require('lodash/map');
const _includes = require('lodash/includes');
const _groupBy = require('lodash/groupBy');
const _some = require('lodash/some');
const _isEmpty = require('lodash/isEmpty');
const _sortBy = require('lodash/sortBy');
const _sortedUniqBy = require('lodash/sortedUniqBy');
const _omit = require('lodash/omit');
const _filter = require('lodash/filter');
const _isNil = require('lodash/isNil');
const _find = require('lodash/find');
const _max = require('lodash/max');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoDB = require('../../db/mongoDB');
const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const eventManager = require('./../../utils/Event');
const {
  USER_STATUS,
  USER_ROLE,
  STATUS,
  EMPTY_WEEKLY_SCHEDULE,
  DEFAULT_TIMEZONE,
  EMPTY_SALON_SCHEDULE,
  MINUTES_PER_HOUR,
  BOOKING_STATUS,
  ONE_DAY_IN_MS,
  CLOSING_DATE_SUM_SCHEDULE,
  UNAVAILABLE_SUM_SCHEDULE,
  EMPTY_ISO_STRING,
  EVENTS,
  DEFAULT_CLEARED_FIELDS,
  MAX_TOP_STYLIST,
} = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const UserModel = require('./User');
const ImageModel = require('./Image');
const { ParseServerLogger } = require('../../logger');
const { parseServerConfig } = require('../../config/parseServerConfig');
const ControllerBoardModel = require('./ControllerBoard');
const {
  ADD_STYLIST_CB_ERROR,
  INVALID_MONGO_OPERATION,
  INVALID_PARAMS,
  OBJECT_NOT_FOUND,
  DELETED_STYLIST,
} = require('../../const/Errors');
const Errors = require('../../const/Errors');
const BookingModel = require('./Booking');
const ClosingDateModel = require('./ClosingDate');
const ClosedSlotsModel = require('./ClosedSlots');
const { generalConfig } = require('../../config');

const buildStylistInfo = (stylistParse, selectFields = DefaultSelectFields.STYLIST, unsetField) => {
  return Helper.convertParseObjectToJson(stylistParse, selectFields, unsetField);
};

const getOutsideBookingsInDays = async (stylistId, groupedStylistDailySchedules, requestUser) => {
  const outsideBookings = [];
  const promises = _map(groupedStylistDailySchedules, async (dayDailySchedules, day) => {
    const startDayMoment = moment(day).tz(DEFAULT_TIMEZONE).startOf('day').toISOString();
    const endDayMoment = moment(day).tz(DEFAULT_TIMEZONE).endOf('day').toISOString();
    const bookings = await BookingModel.getFullBookingList(
      {
        stylistIds: [stylistId],
        bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
        fromServiceDateTime: startDayMoment,
        toServiceDateTime: endDayMoment,
      },
      requestUser,
      { selectFields: ['serviceDateTime', 'totalDuration'] },
    );
    _forEach(bookings, (booking) => {
      const isInside = _some(
        dayDailySchedules,
        (sched) =>
          sched.startAt <= booking.serviceDateTime.iso &&
          moment(booking.serviceDateTime.iso).add(booking.totalDuration, 'minutes').toISOString() <= sched.endAt,
      );
      if (!isInside) {
        outsideBookings.push(booking);
      }
    });
  });
  await Promise.all(promises);

  return outsideBookings;
};

StylistModel.verifyStylists = async (stylistIds, salonParse) => {
  if (stylistIds.length > 0) {
    const stylistQuery = BaseQuery.getStylistQuery();
    stylistQuery.containedIn('objectId', stylistIds);
    stylistQuery.equalTo('salon', salonParse);
    const stylistParses = await stylistQuery.find({ useMasterKey: true });
    if (stylistParses.length !== stylistIds.length) {
      const { code } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, 'Some Stylists can not be found.');
    }
  }
};

const addAllSalonMenuForStylist = async (salonId, stylistId) => {
  const db = await mongoDB.getMongoDB();
  return db.collection('Menu').updateMany(
    {
      _p_salon: {
        $eq: `Salon$${salonId}`,
      },
      status: {
        $in: [STATUS.PUBLISHED],
      },
    },
    { $push: { assignedStylistIds: stylistId } },
  );
};

StylistModel.getStaffIdFromCB = async ({ cbSalonId, email, stylistId, nickName }) => {
  try {
    const staffResponse = await ControllerBoardModel.getListStaff({ cbSalonId, email });
    let cbStaffId = _get(staffResponse, 'data.0.id');
    if (!cbStaffId) {
      const data = await ControllerBoardModel.addStaff({
        cbSalonId: cbSalonId,
        sourceId: stylistId,
        email,
        name: `${nickName}`,
      });
      cbStaffId = _get(data, 'id');
    }
    return cbStaffId;
  } catch (error) {
    ParseServerLogger.error(error);
    const { message, code } = ADD_STYLIST_CB_ERROR;
    throw new Parse.Error(code, message);
  }
};

StylistModel.existsStaffId = async ({ cbStaffId }) => {
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.equalTo('cbStaffId', cbStaffId);
  const stylistParses = await stylistQuery.find({ useMasterKey: true });
  if (stylistParses.length) {
    return true;
  }
  return false;
};

StylistModel.createStylist = async (params, requestUser) => {
  const {
    profileImages: imageIds = [],
    email,
    salonId,
    firstName,
    lastName,
    gender,
    nickName,
    profileText,
    stylistSNS,
    profile,
    isOfficial,
  } = params;

  const stylistId = await Helper.getRandomUsername(10);

  let cbStaffId;
  let db;
  let salon;

  try {
    db = await mongoDB.getMongoDB();
    salon = await db.collection('Salon').findOne({ _id: salonId }, { projection: { cbSalonId: 1, salonName: 1 } });
    cbStaffId = await StylistModel.getStaffIdFromCB({ cbSalonId: salon.cbSalonId, email, stylistId, nickName });
    const existsStaffId = await StylistModel.existsStaffId({ cbStaffId });
    if (existsStaffId) {
      console.log('StaffId:', cbStaffId);
      throw new Parse.Error(ADD_STYLIST_CB_ERROR.code, 'StaffId have existed in system');
    }
  } catch (error) {
    ParseServerLogger.error(error);
    const { message, code } = ADD_STYLIST_CB_ERROR;
    throw new Parse.Error(code, message);
  }

  let imageObjects = [];
  if (imageIds && imageIds.length > 0) {
    imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);
  }
  const { startCycle } = Helper.getCurrentCycle();
  try {
    const now = new Date();
    await db.collection('Stylist').insertOne({
      _id: stylistId,
      _created_at: now,
      _updated_at: now,
      _p_salon: `Salon$${salonId}`,
      profileImages: imageObjects,
      profileImageIds: imageIds,
      status: STATUS.PUBLISHED,
      firstName,
      lastName,
      fullName: `${lastName} ${firstName}`,
      gender,
      nickName,
      slug: Helper.slugify(nickName),
      profileText,
      commissonRate: [
        {
          percent: 20,
          startCycle: startCycle.toISOString(),
        },
      ],
      stylistSNS,
      cbStaffId,
      stylistEmail: email,
      isFirstSetWeeklySchedule: false,
      maxConfirmedBookingCount: 5,
      profile,
      isOfficial,
      totalPressPost: 0,
      salonObject: {
        salonName: salon.salonName,
      },
    });
  } catch (error) {
    ParseServerLogger.error(error);

    const { message, code } = INVALID_MONGO_OPERATION;
    throw new Parse.Error(code, message);
  }

  const stylist = Helper.getPointerValue('Stylist', stylistId);

  try {
    await UserModel.createUser(
      {
        username: email,
        email,
        password: `Abc@123` + Helper.randomString(5),
        role: USER_ROLE.STYLIST,
        status: USER_STATUS.INVITED,
        stylist,
      },
      { sendFirstResetPasswordMail: true },
    );
  } catch (error) {
    ParseServerLogger.error(error);
    stylist.destroy({ useMasterKey: true }).catch((e) => {
      ParseServerLogger.error(e);
    });

    const { message, code } = INVALID_PARAMS;
    throw new Parse.Error(code, message);
  }

  await addAllSalonMenuForStylist(salonId, stylistId);

  // Delay 2 seconds to make sure CB have initiated stylist's default schedule (when adding Staff and it is asynchronous)
  setTimeout(function () {
    ControllerBoardModel.updateStaffWeeklySchedule({
      cbStaffId,
      schedules: EMPTY_WEEKLY_SCHEDULE,
    }).catch((error) => ParseServerLogger.error(error));
  }, 2000);

  return StylistModel.getStylistDetail({ objectId: stylistId }, requestUser);
};

StylistModel.updateStylist = async (params, requestUser, stylistUserParse) => {
  const { stylistId, profileImages: imageIds, stylistEmail } = params;

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select('profileImageIds', 'cbStaffId', 'userStatus');

  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    stylistQuery.equalTo('salon', requestUser.get('salon'));
  }

  const stylistParse = await stylistQuery.get(stylistId, { useMasterKey: true });
  if (stylistParse.get('userStatus') === USER_STATUS.DELETED) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, DELETED_STYLIST.message);
  }

  const prevImageIds = stylistParse.get('profileImageIds');
  if (imageIds) {
    let imageObjects = [];
    if (imageIds.length > 0) {
      imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);
    }
    stylistParse.set('profileImages', imageObjects);
    stylistParse.set('profileImageIds', imageIds);
  }

  if (params.nickName) {
    params.slug = Helper.slugify(params.nickName);
  }

  const updatedFieldForControllerBoar = {
    name: `${params.nickName}`,
  };
  if (stylistEmail) {
    if (stylistUserParse.get('status') === USER_STATUS.INVITED) {
      await StylistModel.setEmail({ stylistEmail, stylistUserParse, stylistId });
      updatedFieldForControllerBoar.email = stylistEmail;
    } else {
      await StylistModel.updateNewEmail({ stylistId, stylistUserParse, stylistEmail });
    }
  }

  Helper.updateDataToParseObj(stylistParse, params, [
    'gender',
    'firstName',
    'lastName',
    'nickName',
    'slug',
    'profileText',
    'stylistSNS',
    'status',
    'profile',
    'isOfficial',
  ]);
  await stylistParse.save(null, { useMasterKey: true });

  ControllerBoardModel.updateStaffInfo({
    ...updatedFieldForControllerBoar,
    cbStaffId: stylistParse.get('cbStaffId'),
  }).catch((error) => ParseServerLogger.error(error));

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

  return StylistModel.getStylistDetail({ objectId: stylistId }, requestUser);
};

StylistModel.checkStylistWeeklySchedule = async (params, requestUser, stylistObj) => {
  const { stylistId, stylistSchedules } = params;

  let stylistObject = stylistObj;
  if (!stylistObject) {
    const stylistQuery = BaseQuery.getStylistQuery();
    stylistQuery.select('salon', 'cbStaffId');
    stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
  }

  if (
    requestUser.get('role') === USER_ROLE.SALON_OPERATOR &&
    requestUser.get('username') !== stylistObject.get('salon').id
  ) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  const tomorrow = moment().add(1, 'days').tz(DEFAULT_TIMEZONE).startOf('day').toISOString();
  const bookings = await BookingModel.getFullBookingList(
    {
      stylistIds: [stylistId],
      bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
      fromServiceDateTime: tomorrow,
    },
    requestUser,
    { selectFields: ['serviceDateTime', 'totalDuration'] },
  );

  const outsideBookingsWeekly = Helper.getOutsideBookingsOfWeeklySchedules(bookings, stylistSchedules);
  if (!_isEmpty(outsideBookingsWeekly)) {
    const sortedBookingsInfos = Helper.formatOutsideBookings(outsideBookingsWeekly);
    const { code } = Errors.AFFECT_BOOKING_ERROR;
    throw new Parse.Error(code, sortedBookingsInfos);
  }

  return stylistSchedules;
};

StylistModel.updateStylistWeeklySchedule = async (params, requestUser, stylistObj) => {
  const { stylistId } = params;

  let stylistObject = stylistObj;
  if (!stylistObject) {
    const stylistQuery = BaseQuery.getStylistQuery();
    stylistQuery.select('salon', 'cbStaffId', 'isFirstSetWeeklySchedule');
    stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
  }

  const stylistSchedules = await StylistModel.checkStylistWeeklySchedule(params, requestUser, stylistObject);
  await ControllerBoardModel.updateStaffWeeklySchedule({
    cbStaffId: stylistObject.get('cbStaffId'),
    schedules: stylistSchedules,
  });

  // mark modified Schedule
  if (!stylistObject.get('isFirstSetWeeklySchedule')) {
    try {
      stylistObject.set('isFirstSetWeeklySchedule', true);
      await stylistObject.save(null, { useMasterKey: true });
    } catch (error) {
      ParseServerLogger.error(error);
    }
  }

  return { success: true, stylistSchedules: stylistSchedules };
};

StylistModel.updateStylistDailySchedule = async (params, requestUser) => {
  const { stylistId, stylistDailySchedules } = params;

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select('cbStaffId', 'salon');
  const stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });

  if (
    requestUser.get('role') === USER_ROLE.SALON_OPERATOR &&
    requestUser.get('username') !== stylistObject.get('salon').id
  ) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  const mapStylistDailySchedules = Helper.mergeCBSchedules(stylistDailySchedules, true);
  const mergedStylistDailySchedules = _reduce(
    mapStylistDailySchedules,
    (arr, schedules) => {
      arr.push(...schedules);
      return arr;
    },
    [],
  );
  const groupedStylistDailySchedules = _groupBy(mergedStylistDailySchedules, (dailySched) =>
    moment(dailySched.startAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD'),
  );

  const outsideBookings = await getOutsideBookingsInDays(stylistId, groupedStylistDailySchedules, requestUser);
  if (!_isEmpty(outsideBookings)) {
    const sortedBookingsInfos = Helper.formatOutsideBookings(outsideBookings);
    const { code } = Errors.AFFECT_BOOKING_ERROR;
    throw new Parse.Error(code, sortedBookingsInfos);
  }

  await ControllerBoardModel.updateStaffDailySchedule({
    cbStaffId: stylistObject.get('cbStaffId'),
    stylistDailySchedules: mergedStylistDailySchedules,
  });

  return { success: true, stylistDailySchedules: groupedStylistDailySchedules };
};

const selectStylistEmail = (objectId, requestUser, selectFields) => {
  if (
    requestUser &&
    (requestUser.get('role') === USER_ROLE.SALON_OPERATOR ||
      requestUser.get('role') === USER_ROLE.ADMIN ||
      (requestUser.get('role') === USER_ROLE.STYLIST && requestUser.get('stylist').id === objectId))
  ) {
    selectFields.push('stylistEmail');
  }
};

const selectStylistfavorite = (requestUser, selectFields) => {
  selectFields.push('favoriteTotal');
  if (requestUser && requestUser.get('role') === USER_ROLE.CUSTOMER) {
    selectFields.push('favoriteCustomers');
  }
};

const addFavoritedStylistData = (stylist, requestUser) => {
  stylist['isFavorited'] = false;
  if (requestUser && requestUser.get('role') === USER_ROLE.CUSTOMER && stylist.favoriteCustomers) {
    stylist['isFavorited'] = stylist.favoriteCustomers.includes(requestUser.get('customer').id);
    delete stylist.favoriteCustomers;
  }
};

const removeDeletedStylistForCusomerStylistGuest = (requestUser, stylistQuery) => {
  if (
    !requestUser ||
    (requestUser && [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST].indexOf(requestUser.get('role')) !== -1)
  ) {
    stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
    stylistQuery.doesNotExist('requestDeletingAccount');
  }
};

StylistModel.getStylistDetail = async (params, requestUser, opts = {}) => {
  const { objectId, status } = params;
  const { selectFields = [...DefaultSelectFields.STYLIST] } = opts;
  selectFields.push('requestDeletingAccount');
  selectFields.push('deletedAt');

  if (requestUser && requestUser.get('role') === USER_ROLE.ADMIN) {
    selectFields.push('commissonRate');
  }

  const stylistQuery = BaseQuery.getStylistQuery();
  status && stylistQuery.equalTo('status', status);

  selectStylistEmail(objectId, requestUser, selectFields);

  selectStylistfavorite(requestUser, selectFields);

  stylistQuery.select(selectFields);

  /**
   * SALON can only see their stylist
   */
  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    stylistQuery.equalTo('salon', requestUser.get('salon'));
  }

  // remove deleted stylist for customer, stylist and guest
  removeDeletedStylistForCusomerStylistGuest(requestUser, stylistQuery);

  try {
    const stylistParse = await stylistQuery.get(objectId, { useMasterKey: true });
    const result = buildStylistInfo(stylistParse, selectFields);
    addFavoritedStylistData(result, requestUser);
    return result;
  } catch (error) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, DELETED_STYLIST.message);
  }
};

StylistModel.getStylistList = async (params, requestUser, opts = {}) => {
  const { salonId, searchKey, status, from, to, ...pagingParams } = params;
  const { selectFields = [...DefaultSelectFields.STYLIST] } = opts;

  const stylistQuery = BaseQuery.getStylistQuery();
  status && stylistQuery.equalTo('status', status);
  if (
    requestUser &&
    (requestUser.get('role') === USER_ROLE.SALON_OPERATOR || requestUser.get('role') === USER_ROLE.ADMIN)
  ) {
    selectFields.push('stylistEmail');
  }
  stylistQuery.include('lastContributor');
  stylistQuery.select(selectFields);

  /**
   * SALON can only see their stylist
   */
  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    stylistQuery.equalTo('salon', requestUser.get('salon'));
  } else if (salonId) {
    stylistQuery.equalTo('salon', Helper.getPointerValue('Salon', salonId));
  }

  if (searchKey) {
    const regExp = new RegExp(Helper.escapeRegExp(searchKey).toLowerCase(), 'i');
    const searchQuery = BaseQuery.getStylistQuery()._orQuery([
      BaseQuery.getStylistQuery().matches('fullName', regExp),
      BaseQuery.getStylistQuery().matches('nickName', regExp),
      BaseQuery.getStylistQuery().matches('salonObject.salonName', regExp),
    ]);
    stylistQuery._andQuery([searchQuery]);
  }

  from && stylistQuery.greaterThanOrEqualTo('createdAt', moment.tz(from, DEFAULT_TIMEZONE).toDate());
  to && stylistQuery.lessThanOrEqualTo('createdAt', moment.tz(to, DEFAULT_TIMEZONE).endOf('day').toDate());

  // remove deleted stylist for customer, stylist and guest
  if (
    !requestUser ||
    (requestUser && [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST].indexOf(requestUser.get('role')) !== -1)
  ) {
    stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
    stylistQuery.equalTo('status', STATUS.PUBLISHED);
    stylistQuery.doesNotExist('requestDeletingAccount');
  }

  Helper.queryPagingHandler(stylistQuery, pagingParams);
  const [stylistParses, total] = await Promise.all([stylistQuery.find({ useMasterKey: true }), stylistQuery.count()]);

  return {
    total,
    list: stylistParses.map((stylistParse) => buildStylistInfo(stylistParse, selectFields)),
  };
};

StylistModel.getStylistListByAdmin = async (params) => {
  const { searchKey, status = [STATUS.PUBLISHED, STATUS.UNPUBLISHED], ...pagingParams } = params;

  const page = !_isNil(pagingParams.page) ? Number(pagingParams.page) : 1;
  const limit = !_isNil(pagingParams.limit) ? Number(pagingParams.limit) : 10;
  const skip = limit * (page - 1);

  const query = {
    status: {
      $in: status,
    },
    userStatus: { $ne: STATUS.DELETED },
  };
  if (searchKey) {
    query['fullName'] = { $regex: Helper.convertSpecialCharacterForMongo(searchKey), $options: 'i' };
  }

  const db = await mongoDB.getMongoDB();
  return db
    .collection('Stylist')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({
      _created_at: 1,
    })
    .project(DefaultSelectFields.STYLIST_ADMIN)
    .toArray();
};

StylistModel.getAvailableStylists = async (params, requestUser, opts = {}) => {
  const { bookingId } = params;
  const { selectFields = ['nickName', 'profileImages', 'cbStaffId', 'salon', 'salon.salonSchedules', 'createdAt'] } =
    opts;

  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select('serviceDateTime', 'totalDuration');
  bookingQuery.equalTo('salon', requestUser.get('salon'));

  const bookingParse = await bookingQuery.get(bookingId, { useMasterKey: true });

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.equalTo('status', STATUS.PUBLISHED);
  stylistQuery.select(...selectFields);
  stylistQuery.equalTo('salon', requestUser.get('salon'));

  const stylistParses = await stylistQuery.find({ useMasterKey: true });

  const checkAvailableDateTime = async (stylistObject) => {
    const result = await StylistModel.getStylistAvailableSlots(
      { dateTime: bookingParse.get('serviceDateTime'), totalDuration: bookingParse.get('totalDuration') },
      stylistObject,
      false,
      false,
    ).catch(ParseServerLogger.error);
    if (!result) {
      return false;
    }

    const serviceDateTimeHourFormat = moment(bookingParse.get('serviceDateTime')).tz(DEFAULT_TIMEZONE).format('HH:mm');
    return _includes(result.availableSlots, serviceDateTimeHourFormat);
  };

  const availableStylists = [];
  await Promise.all(
    stylistParses.map(async (stylistParse) => {
      const isAvailable = await checkAvailableDateTime(stylistParse);
      if (isAvailable) {
        availableStylists.push(buildStylistInfo(stylistParse, selectFields, ['cbStaffId', 'salon']));
      }
    }),
  );

  return availableStylists;
};

StylistModel.getStylistAvailableSlots = async (
  params,
  stylistObj,
  checkClosingDates = true,
  checkRequestBookingDay = true,
) => {
  const { stylistId, dateTime, totalDuration } = params;

  const dateTimeMoment = moment(dateTime).tz(DEFAULT_TIMEZONE);
  const dateTimeStartDayMoment = dateTimeMoment.clone().startOf('day');
  const nowMoment = moment().tz(DEFAULT_TIMEZONE);
  const nowStartDayMoment = nowMoment.clone().startOf('day');

  // The case of the first request booking day is handle below
  if (checkRequestBookingDay && !Helper.checkRequestBookingDay(dateTimeStartDayMoment, nowStartDayMoment)) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'The dateTime must be between today and up to 60 days.');
  }

  let stylistObject = stylistObj;
  if (!stylistObject) {
    const stylistQuery = BaseQuery.getStylistQuery();
    stylistQuery.select('cbStaffId', 'salon', 'salon.salonSchedules', 'createdAt', 'maxConfirmedBookingCount');
    stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
  }

  const createdAtStartDayMoment = moment(stylistObject.get('createdAt')).tz(DEFAULT_TIMEZONE).startOf('day');
  if (dateTimeStartDayMoment.toISOString() === createdAtStartDayMoment.toISOString()) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'It is a created date.');
  }

  if (checkClosingDates) {
    const date = dateTimeMoment.format('YYYY-MM-DD');
    const closingDates = (
      await ClosingDateModel.getClosingDatesList({ from: date, to: date }, stylistObject.get('salon').id)
    ).list;
    if (_includes(closingDates, date)) {
      const { code } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, 'It is a closing date.');
    }
  }

  const weeklySchedules = await ControllerBoardModel.getWeeklyScheduleByStaff({
    cbStaffId: stylistObject.get('cbStaffId'),
    date: dateTimeStartDayMoment.toISOString(),
  });
  const dailySchedules = (
    await ControllerBoardModel.getDailyScheduleByStaff({
      cbStaffId: stylistObject.get('cbStaffId'),
      date: dateTimeStartDayMoment.toISOString(),
    })
  ).schedulesDaily;

  const availableSchedule = Helper.getSumScheduleOfDayView(
    dateTimeStartDayMoment.format('YYYY-MM-DD'),
    dateTimeStartDayMoment.isoWeekday() % 7,
    Helper.mergeCBSchedules(weeklySchedules),
    dailySchedules,
    Helper.getParseProp(stylistObject, 'salon.salonSchedules') || EMPTY_SALON_SCHEDULE,
    false,
  ).availableSchedule;

  if (!availableSchedule || availableSchedule.length === 0) {
    const { code } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, 'Schedule info can not be found.');
  }

  const availableSlots = [];
  _forEach(availableSchedule, (sched) => {
    const endMin = Helper.convertToMinutesFromHourFormat(sched.endTime) - totalDuration;
    let minSlot = 0;
    if (checkRequestBookingDay && Helper.isFirstRequestBookingDay(dateTimeStartDayMoment, nowStartDayMoment)) {
      const dateTimeMinutes = Helper.convertToMinutes(nowMoment);
      minSlot = dateTimeMinutes + (generalConfig.minRequestBookingTime % (ONE_DAY_IN_MS / 1000)) / MINUTES_PER_HOUR;
    }
    const availableSlotsInMinutes = Helper.getAvailableSlotsFromRange(
      Helper.convertToMinutesFromHourFormat(sched.startTime),
      endMin,
      minSlot,
    );
    availableSlots.push(..._map(availableSlotsInMinutes, Helper.convertMinutesToHourFormat));
  });
  const slots = await ClosedSlotsModel.removeClosedSlotsFromList(
    stylistObject,
    dateTime,
    totalDuration,
    availableSlots,
  );
  return {
    availableSlots: slots,
  };
};

// The dateTime must be a day of the current or future month (not a past month)
StylistModel.getStylistUnavailableDaysOfMonth = async (params) => {
  const { stylistId, dateTime } = params;

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select('cbStaffId', 'salon', 'salon.salonSchedules', 'salon.cbSalonId', 'createdAt');
  const stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });

  const unavailableDaysArr = [];

  const dateTimeMoment = moment(dateTime).tz(DEFAULT_TIMEZONE);
  const startMonth = dateTimeMoment.clone().startOf('month');
  const endMonth = dateTimeMoment.clone().endOf('month');

  const today = moment().tz(DEFAULT_TIMEZONE).startOf('day');
  const tomorrow = today.clone().add(1, 'day');
  let from = today;
  if (today.format('YYYY-MM') < startMonth.format('YYYY-MM')) {
    from = startMonth;
  } else {
    const createdAtDay = moment(stylistObject.get('createdAt')).tz(DEFAULT_TIMEZONE).startOf('day');
    if (createdAtDay.toISOString() === from.toISOString()) {
      unavailableDaysArr.push(createdAtDay.format('YYYY-MM-DD'));
      if (tomorrow > endMonth) {
        return unavailableDaysArr;
      }
      from = tomorrow;
    }
  }

  const closingDates = (
    await ClosingDateModel.getClosingDatesList(
      { from: from.format('YYYY-MM-DD'), to: endMonth.format('YYYY-MM-DD') },
      stylistObject.get('salon').id,
    )
  ).list;
  unavailableDaysArr.push(...closingDates);

  const staffSchedule = await ControllerBoardModel.getStaffScheduleOfSalon({
    cbSalonId: Helper.getParseProp(stylistObject, 'salon.cbSalonId'),
    cbStaffId: stylistObject.get('cbStaffId'),
    from: from.toISOString(),
    to: endMonth.toISOString(),
  });
  const weeklySchedule = staffSchedule.data[0].schedules;
  const groupedWeeklySchedule = _groupBy(weeklySchedule, (sched) => sched.dayOfWeek);

  unavailableDaysArr.push(
    ...Helper.getUnavailableDaysFromWeeklySchedule(groupedWeeklySchedule, from, today, tomorrow, endMonth),
  );

  const dailySchedule = staffSchedule.data[0].scheduleDailies;
  _forEach(dailySchedule, (dailySched) => {
    if (dailySched.startAt === dailySched.endAt) {
      unavailableDaysArr.push(moment(dailySched.startAt).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD'));
    }
  });

  return _sortedUniqBy(_sortBy(unavailableDaysArr));
};

StylistModel.getStylistScheduleMonthView = async (params, requestUser) => {
  const { date, isGetFieldIsFirstSetWeeklySchedule = false } = params;

  const stylistId = requestUser.get('stylist').id;
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select(
    'cbStaffId',
    'salon.cbSalonId',
    'profileImages',
    'nickName',
    'createdAt',
    'isOfficial',
    'isFirstSetWeeklySchedule',
    'salon.salonSchedules',
  );
  const stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
  const salonObject = stylistObject.get('salon');

  const dateMoment = moment(date).tz(DEFAULT_TIMEZONE);
  let from = dateMoment.clone().startOf('month');
  const todayMoment = moment().tz(DEFAULT_TIMEZONE).startOf('day');
  if (todayMoment > from) {
    from = todayMoment;
  }
  const to = dateMoment.clone().endOf('month');
  const staffSchedule = (
    await ControllerBoardModel.getStaffScheduleOfSalon({
      cbSalonId: salonObject.get('cbSalonId'),
      cbStaffId: stylistObject.get('cbStaffId'),
      from: from.toISOString(),
      to: to.toISOString(),
    })
  ).data[0];
  const closingDates = (await ClosingDateModel.getClosingDatesList({ from: date, to: date }, salonObject.id)).list;

  const salonScheduleStartEnd = Helper.getSalonScheduleStartEnd(salonObject.get('salonSchedules'));
  staffSchedule.sumSchedule = [];
  for (var iterator = from.clone(); iterator < to; iterator.add(1, 'day')) {
    const iteratorDate = iterator.format('YYYY-MM-DD');
    const iteratorDayOfWeek = iterator.isoWeekday() % 7;
    if (_includes(closingDates, iteratorDate)) {
      staffSchedule.sumSchedule.push({ date: iteratorDate, ...CLOSING_DATE_SUM_SCHEDULE });
    } else if (
      moment(stylistObject.get('createdAt')).tz(DEFAULT_TIMEZONE).isSame(iterator.clone().tz(DEFAULT_TIMEZONE), 'date')
    ) {
      staffSchedule.sumSchedule.push({ date: iteratorDate, ...UNAVAILABLE_SUM_SCHEDULE });
    } else {
      const scheduleDailies = _filter(
        staffSchedule.scheduleDailies ? staffSchedule.scheduleDailies : [],
        function (item) {
          return moment(item.startAt).tz(DEFAULT_TIMEZONE).isSame(iterator.clone().tz(DEFAULT_TIMEZONE), 'date');
        },
      );
      staffSchedule.sumSchedule.push({
        date: iteratorDate,
        ...Helper.getSumScheduleOfDayView(
          iteratorDate,
          iteratorDayOfWeek,
          Helper.mergeCBSchedules(staffSchedule.schedules),
          scheduleDailies,
          salonObject.get('salonSchedules') ? salonObject.get('salonSchedules') : EMPTY_SALON_SCHEDULE,
          true,
          salonScheduleStartEnd,
        ),
      });
    }
  }
  delete staffSchedule.schedules;
  delete staffSchedule.scheduleDailies;

  const bookings = await BookingModel.getFullBookingList(
    {
      bookingStatuses: [BOOKING_STATUS.REQUESTED, BOOKING_STATUS.CONFIRMED],
      stylistIds: [stylistId],
      fromServiceDateTime: dateMoment.clone().startOf('month'),
      toServiceDateTime: to,
    },
    requestUser,
  );

  const sortedStylistBookings = _sortBy(bookings, [
    (booking) => {
      if (booking.bookingStatus === BOOKING_STATUS.CONFIRMED) {
        return '0' + _get(booking, 'serviceDateTime.iso', EMPTY_ISO_STRING) + _get(booking, 'confirmedAt', '9');
      }
      return '1' + EMPTY_ISO_STRING + _get(booking, 'createdAt', '9');
    },
  ]);
  staffSchedule.bookings = sortedStylistBookings;
  const data = _omit(staffSchedule, ['id', 'connections']);

  const resultData = {
    objectId: stylistId,
    ...data,
    salonScheduleStartEnd,
  };
  if (isGetFieldIsFirstSetWeeklySchedule) {
    resultData.isFirstSetWeeklySchedule = await StylistModel.checkIsFirstSetWeeklySchedule({
      stylistObject,
      stylistCreatedAt: stylistObject.get('createdAt'),
    });
  }
  return resultData;
};

StylistModel.getSalonScheduleAndStylistWeeklySchedule = async (requestUser) => {
  const stylistId = requestUser.get('stylist').id;
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select('cbStaffId', 'salon.cbSalonId', 'createdAt', 'salon.salonSchedules');
  const stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
  const currentWeeklySchedule = await StylistModel.getCurrentStylistWeeklySchedule({
    cbSalonId: stylistObject.get('salon').get('cbSalonId'),
    cbStaffId: stylistObject.get('cbStaffId'),
  });
  const salonSchedules = stylistObject.get('salon').get('salonSchedules')
    ? stylistObject.get('salon').get('salonSchedules')
    : EMPTY_SALON_SCHEDULE;
  return {
    currentWeeklySchedule,
    salonSchedules,
  };
};

StylistModel.getCurrentStylistWeeklySchedule = async ({ cbSalonId, cbStaffId }) => {
  const tomorrow = moment().add(1, 'day').tz(DEFAULT_TIMEZONE);
  const result = await ControllerBoardModel.getStaffScheduleOfSalon(
    {
      cbSalonId,
      cbStaffId,
      from: tomorrow.startOf('day').toISOString(),
      to: tomorrow.endOf('day').toISOString(),
    },
    false, // from is tomorrow => doesn't have invalid record => flag = false
  );
  const currentWeeklySchedule = _get(result, 'data[0].schedules');
  if (!currentWeeklySchedule) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return currentWeeklySchedule;
};

StylistModel.checkIsFirstSetWeeklySchedule = async ({ stylistObject, stylistCreatedAt }) => {
  if (!stylistObject.has('isFirstSetWeeklySchedule')) {
    const weeklyschedules = await StylistModel.getCurrentStylistWeeklySchedule({
      cbSalonId: stylistObject.get('salon').get('cbSalonId'),
      cbStaffId: stylistObject.get('cbStaffId'),
    });
    const isFirstSetWeeklySchedule = Helper.isFirstSetWeeklySchedule(stylistCreatedAt, weeklyschedules);
    stylistObject.set('isFirstSetWeeklySchedule', isFirstSetWeeklySchedule);
    await stylistObject.save(null, { useMasterKey: true });
  }
  return stylistObject.get('isFirstSetWeeklySchedule');
};

StylistModel.updateNewEmail = async ({ stylistId, stylistUserParse, stylistEmail }) => {
  const mongodbClient = await mongoDB.getClient();
  await Helper.executeInTransaction(async (session) => {
    const db = await mongoDB.getMongoDB();
    await db.collection('_User').updateOne(
      {
        _id: stylistUserParse.id,
      },
      {
        $set: {
          newEmail: stylistEmail,
        },
      },
      {
        session,
      },
    );
    await db.collection('Stylist').updateOne(
      {
        _id: stylistId,
      },
      {
        $set: {
          newEmail: stylistEmail,
        },
      },
      {
        session,
      },
    );
    await StylistModel.sendEmailForVerifyNewEmail({ newEmail: stylistEmail, stylistUserParse, session });
  }, mongodbClient);
};

StylistModel.sendEmailForVerifyNewEmail = async ({ newEmail, stylistUserParse, session }) => {
  const setNewPassword = Helper.checkIfStylistNeedSetNewPassword(stylistUserParse);
  const token = jwt.sign({ setNewPassword }, generalConfig.jwtKey, { expiresIn: generalConfig.newEmailExpiresIn });
  const db = await mongoDB.getMongoDB();
  await db.collection('_User').updateOne(
    {
      _id: stylistUserParse.id,
    },
    {
      $set: {
        tokenForVerifyNewEmail: token,
      },
    },
    {
      session,
    },
  );
  await parseServerConfig.emailAdapter.sendMailByTemplate(
    'verify-new-email',
    { to: newEmail, customerBaseUrl: generalConfig.customerBaseUrl },
    { token, customerBaseUrl: generalConfig.customerBaseUrl },
  );
};

StylistModel.setEmail = async ({ stylistEmail, stylistUserParse, stylistId }) => {
  const mongodbClient = await mongoDB.getClient();
  await Helper.executeInTransaction(async (session) => {
    const db = await mongoDB.getMongoDB();
    await db.collection('_User').updateOne(
      {
        _id: stylistUserParse.id,
      },
      {
        $set: {
          email: stylistEmail,
          username: stylistEmail,
        },
      },
      {
        session,
      },
    );
    await db.collection('Stylist').updateOne(
      {
        _id: stylistId,
      },
      {
        $set: {
          stylistEmail: stylistEmail,
        },
      },
      {
        session,
      },
    );
  }, mongodbClient);
  try {
    await Parse.User.requestPasswordReset(stylistEmail);
  } catch (error) {
    ParseServerLogger.error('Error when send invitation email', error);
  }
};

StylistModel.getStylistById = async ({ stylistId, includes }) => {
  const stylistQuery = BaseQuery.getStylistQuery();
  if (includes) {
    stylistQuery.include(includes);
  }
  return await stylistQuery.get(stylistId, { useMasterKey: true });
};

StylistModel.getExpiredDeletingAccount = async () => {
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
  stylistQuery.lessThanOrEqualTo('requestDeletingAccount.expiredAt', moment().tz(DEFAULT_TIMEZONE).toDate());
  return await stylistQuery.find({ useMasterKey: true });
};

StylistModel.deletedStylistNotUpdateStaffInfo = async () => {
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.equalTo('userStatus', USER_STATUS.DELETED);
  stylistQuery.equalTo('updatedStaffInfoAfterDeleteStylist.handledByJob', false);
  return await stylistQuery.find({ useMasterKey: true });
};

StylistModel.getStylistProfile = async ({ stylistId }) => {
  const selectFields = [
    ...DefaultSelectFields.STYLIST,
    'requestDeletingAccount',
    'deletedAt',
    'stylistEmail',
    'maxConfirmedBookingCount',
  ];
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.select(selectFields);
  stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
  const stylistParse = await stylistQuery.get(stylistId, { useMasterKey: true });
  return buildStylistInfo(stylistParse, selectFields);
};

StylistModel.getStylistBelongtoASalon = async ({ salonId }) => {
  const pipeline = [
    {
      $match: {
        _p_salon: `Salon$${salonId}`,
        userStatus: { $ne: 'DELETED' },
      },
    },
    {
      $lookup: {
        from: '_User',
        let: { stylistId: { $concat: ['Stylist$', '$_id'] } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$$stylistId', '$_p_stylist'] },
            },
          },
        ],
        as: 'user',
      },
    },
    {
      $project: {
        _id: 1,
        stylistEmail: 1,
        cbStaffId: 1,
        user: { $arrayElemAt: ['$user', 0] },
      },
    },
  ];
  const db = await mongoDB.getMongoDB();
  return await db.collection('Stylist').aggregate(pipeline).toArray();
};

StylistModel.handleAfterDelete = async (stylistId) => {
  const stylistObject = await StylistModel.getStylistById({ stylistId });
  eventManager.emit(EVENTS.STYLIST_CHANGE_PROFILE, {
    dirtyKeys: DEFAULT_CLEARED_FIELDS.STYLIST,
    objectData: stylistObject.toJSON(),
  });
};

StylistModel.getStylistByIds = async ({ ids, selectedFields }) => {
  const query = BaseQuery.getStylistQuery();
  query.select(selectedFields);
  query.containedIn('objectId', ids);
  return await query.find({ useMasterKey: true });
};

StylistModel.updateStylistCommissonRateByAdmin = async (params, requestUser) => {
  const { stylistId, commissonRate } = params;
  const db = await mongoDB.getMongoDB();

  const stylist = await db.collection('Stylist').findOne({
    _id: stylistId,
  });
  if (stylist.userStatus === USER_STATUS.DELETED) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, DELETED_STYLIST.message);
  }

  const commissonRates = stylist.commissonRate || [];
  const { startCycle } = Helper.getNextCycle();

  const oldCommissonRate = _find(commissonRates, (value) => value.startCycle === startCycle.toISOString());
  if (oldCommissonRate) {
    await db
      .collection('Stylist')
      .updateOne(
        { _id: stylistId },
        { $set: { 'commissonRate.$[element].percent': commissonRate } },
        { arrayFilters: [{ 'element.startCycle': startCycle.toISOString() }] },
      );
  } else {
    await db.collection('Stylist').updateOne(
      {
        _id: stylistId,
      },
      {
        $push: {
          commissonRate: {
            percent: commissonRate,
            startCycle: startCycle.toISOString(),
          },
        },
      },
    );
  }

  return StylistModel.getStylistDetail({ objectId: stylistId }, requestUser);
};

StylistModel.getCommissonRate = async ({ startCycle, stylistId }) => {
  const stylist = await StylistModel.getStylistById({ stylistId });
  const commissonRate = stylist.get('commissonRate');
  if (_.isArray(commissonRate)) {
    const newData = _.sortBy(commissonRate, [
      function (item) {
        return new Date(item.startCycle);
      },
    ]);
    for (let i = newData.length - 1; i >= 0; i--) {
      if (moment(newData[i].startCycle).isSameOrBefore(moment(startCycle))) {
        return newData[i].percent;
      }
    }
  }
  throw new Parse.Error(Errors.UNAVAILABLE_COMMISSION_RATE.code, Errors.UNAVAILABLE_COMMISSION_RATE.message);
};

StylistModel.updateStylistStatus = async (params, requestUser) => {
  const { stylistId, status } = params;
  const stylistQuery = BaseQuery.getStylistQuery();
  const stylistParse = await stylistQuery.get(stylistId, { useMasterKey: true });
  if (stylistParse.get('userStatus') === USER_STATUS.DELETED) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, DELETED_STYLIST.message);
  }
  stylistParse.set('status', status);
  await stylistParse.save(null, { useMasterKey: true });
  return StylistModel.getStylistDetail({ objectId: stylistId }, requestUser);
};

StylistModel.addTopStylistByAdmin = async (params) => {
  const { stylistIds } = params;
  const db = await mongoDB.getMongoDB();
  const stylists = await db
    .collection('Stylist')
    .find({ _id: { $nin: stylistIds }, 'topStylist.top': true, status: { $nin: [USER_STATUS.DELETED] } })
    .toArray();
  const sortOrderList = stylists.map((stylist) => stylist.topStylist.sortOrder);
  const maxOrderStylist = _max(sortOrderList);
  const totalTopStylist = stylists.length + stylistIds.length;
  if (totalTopStylist > MAX_TOP_STYLIST) {
    const { code, message } = Errors.STYLIST_TOP_STYLIST_MAX;
    throw new Parse.Error(code, message);
  }

  const mongodbClient = await mongoDB.getClient();
  await Helper.executeInTransaction(async (session) => {
    const ops = stylistIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, status: { $nin: [USER_STATUS.DELETED] }, topStylist: { $exists: false } },
        update: {
          $set: {
            topStylist: {
              top: true,
              sortOrder: maxOrderStylist ? maxOrderStylist + index + 1 : index + 1,
            },
          },
        },
      },
    }));
    const result = await db.collection('Stylist').bulkWrite(ops, { session });
    if (result.modifiedCount < stylistIds.length) {
      const { code, message } = Errors.TOP_STYLIST_ADD_ERROR;
      throw new Parse.Error(code, message);
    }
  }, mongodbClient);

  return {
    success: true,
  };
};
StylistModel.getTopStylistByAdmin = async () => {
  const db = await mongoDB.getMongoDB();
  return db
    .collection('Stylist')
    .find({ 'topStylist.top': true, status: { $nin: [USER_STATUS.DELETED] } })
    .sort({ 'topStylist.sortOrder': 1 })
    .project(DefaultSelectFields.TOP_STYLIST)
    .toArray();
};

StylistModel.deleteTopStylistByAdmin = async (params) => {
  const { stylistIds } = params;
  const db = await mongoDB.getMongoDB();
  await db.collection('Stylist').updateMany(
    { _id: { $in: stylistIds }, 'topStylist.top': true, status: { $nin: [USER_STATUS.DELETED] } },
    {
      $unset: {
        topStylist: '',
      },
    },
  );
  return {
    success: true,
  };
};

StylistModel.sortTopStylistByAdmin = async (params) => {
  const { stylists } = params;
  const db = await mongoDB.getMongoDB();
  const ops = stylists.map((stylist) => ({
    updateOne: {
      filter: {
        _id: stylist.objectId,
        'topStylist.top': true,
        status: { $nin: [USER_STATUS.DELETED] },
      },
      update: {
        $set: {
          'topStylist.sortOrder': stylist.sortOrder,
        },
      },
    },
  }));
  await db.collection('Stylist').bulkWrite(ops);
  return {
    success: true,
  };
};

StylistModel.getTopStylistByCustomer = async (params, opts = {}) => {
  const { status = STATUS.PUBLISHED, orderBy = 'topStylist.sortOrder', order = 'ascending', page, limit } = params;
  const { selectFields = [...DefaultSelectFields.STYLIST] } = opts;

  const stylistQuery = BaseQuery.getStylistQuery();
  status && stylistQuery.equalTo('status', status);
  stylistQuery.equalTo('topStylist.top', true);
  stylistQuery.include('lastContributor');
  stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
  stylistQuery.doesNotExist('requestDeletingAccount');
  stylistQuery.select(selectFields);

  Helper.queryPagingHandler(stylistQuery, {
    orderBy,
    order,
    page,
    limit,
  });
  const [stylistParses, total] = await Promise.all([stylistQuery.find({ useMasterKey: true }), stylistQuery.count()]);

  return {
    total,
    list: stylistParses.map((stylistParse) => buildStylistInfo(stylistParse, selectFields)),
  };
};
StylistModel.getStylistListForPressPost = async (params, opts = {}) => {
  const { searchKey, ...pagingParams } = params;
  const { selectFields = [...DefaultSelectFields.STYLIST_FOR_PRESS_POST] } = opts;

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.notEqualTo('userStatus', USER_STATUS.DELETED);
  stylistQuery.equalTo('status', STATUS.PUBLISHED);

  stylistQuery.select(selectFields);

  if (searchKey) {
    const regExp = new RegExp(Helper.escapeRegExp(searchKey).toLowerCase(), 'i');
    const searchQuery = BaseQuery.getStylistQuery()._orQuery([
      BaseQuery.getStylistQuery().matches('fullName', regExp),
      BaseQuery.getStylistQuery().matches('nickName', regExp),
      BaseQuery.getStylistQuery().matches('salonObject.salonName', regExp),
    ]);
    stylistQuery._andQuery([searchQuery]);
  }

  Helper.queryPagingHandler(stylistQuery, pagingParams);
  const [stylistParses, total] = await Promise.all([
    stylistQuery.find({ useMasterKey: true }),
    stylistQuery.count({ useMasterKey: true }),
  ]);

  return {
    total,
    list: stylistParses.map((stylistParse) => buildStylistInfo(stylistParse, selectFields)),
  };
};
