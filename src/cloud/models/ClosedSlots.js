const ClosedSlotsModel = {};
module.exports = ClosedSlotsModel;

const moment = require('moment-timezone');
const _ = require('lodash');
const Helper = require('../../utils/helper');
const {
  BOOKING_STATUS,
  DEFAULT_TIMEZONE,
  SLOT_INTERVAL,
  DEFAULT_MAX_CONFIRM_BOOKING,
} = require('../../const/Constants');
const mongoDB = require('../../db/mongoDB');
const Errors = require('./../../const/Errors');
ClosedSlotsModel.findByQuery = async (query) => {
  const db = await mongoDB.getMongoDB();
  return db.collection('ClosedSlots').find(query).toArray();
};

ClosedSlotsModel.getClosedSlotsStylist = async (
  stylistId,
  date,
  maxConfirmedBookingCount = DEFAULT_MAX_CONFIRM_BOOKING,
) => {
  const db = await mongoDB.getMongoDB();
  return db
    .collection('ClosedSlots')
    .find({
      stylistId,
      slot: {
        $gte: date.start,
        $lte: date.end,
      },
      count: { $gte: maxConfirmedBookingCount },
    })
    .toArray();
};

ClosedSlotsModel.updateClosedSlotsByStylist = async (
  attributes,
  maxConfirmedBookingCount = DEFAULT_MAX_CONFIRM_BOOKING,
  upSert = false,
  session,
) => {
  const {
    stylistId,
    slot,
    confirmedBooking,
    canceledBooking,
    _updated_at = Date(),
    _created_at,
    count = 1,
  } = attributes;
  const setData = {
    _updated_at,
  };

  const addToSet = {};
  const pull = {};
  const countFillter = {};
  const fillter = {
    stylistId,
    slot,
    count: countFillter,
  };

  if (confirmedBooking) {
    addToSet['confirmedBookings'] = confirmedBooking;
    fillter['canceledBookings'] = { $ne: confirmedBooking };
    countFillter['$lt'] = maxConfirmedBookingCount;
  }

  if (canceledBooking) {
    addToSet['canceledBookings'] = canceledBooking;
    countFillter['$gt'] = 0;
    pull['confirmedBookings'] = canceledBooking;
    fillter['canceledBookings'] = { $ne: canceledBooking };
    fillter['confirmedBookings'] = canceledBooking;
  }

  if (_created_at) setData['setData'] = _created_at;
  const db = await mongoDB.getMongoDB();

  return db.collection('ClosedSlots').updateOne(
    fillter,
    {
      $inc: { count: count },
      $set: setData,
      $addToSet: addToSet,
      $pull: pull,
    },
    { upsert: upSert, session },
  );
};

ClosedSlotsModel.checkMaxConfirmBooking = async (
  stylistId,
  serviceDateTime,
  totalDuration,
  maxConfirmedBookingCount = DEFAULT_MAX_CONFIRM_BOOKING,
) => {
  const currentDate = moment(serviceDateTime).tz(DEFAULT_TIMEZONE);
  currentDate.add(totalDuration - SLOT_INTERVAL, 'minutes');
  const date = {
    start: moment(serviceDateTime).tz(DEFAULT_TIMEZONE).toDate(),
    end: currentDate.toDate(),
  };
  const closedSlots = await ClosedSlotsModel.getClosedSlotsStylist(stylistId, date, maxConfirmedBookingCount);
  if (closedSlots.length === 0) return false;
  return true;
};

ClosedSlotsModel.removeClosedSlotsFromList = async (stylist, dateTime, totalDuration, availableSlots) => {
  if (availableSlots.length === 0) return [];
  const startOfDate = moment(dateTime).tz(DEFAULT_TIMEZONE).startOf('days');
  const startMin = Helper.convertToMinutesFromHourFormat(availableSlots[0]);
  const endMin = Helper.convertToMinutesFromHourFormat(availableSlots[availableSlots.length - 1]);
  const date = {
    start: startOfDate.clone().add(startMin, 'minutes').toDate(),
    end: startOfDate.clone().add(endMin, 'minutes').toDate(),
  };
  console.log(startMin, endMin);
  const ClosedSlots = await ClosedSlotsModel.getClosedSlotsStylist(
    stylist.id,
    date,
    stylist.get('maxConfirmedBookingCount'),
  );
  console.log('[removeClosedSlotsFromList]', ClosedSlots, stylist.get('maxConfirmedBookingCount'), stylist.id, date);
  const closedSlotsWithDuration = new Set();
  ClosedSlots.forEach((closedSlot) => {
    for (let step = 0; step < totalDuration / SLOT_INTERVAL; step++) {
      const date = moment(closedSlot.slot).tz(DEFAULT_TIMEZONE); // new Date(closedSlot.slot);
      date.subtract(SLOT_INTERVAL * step, 'minutes');
      closedSlotsWithDuration.add(date.format('HH:mm'));
    }
  });
  return availableSlots.filter((value) => !closedSlotsWithDuration.has(value));
};
ClosedSlotsModel.getSLotsFromServiceDateTime = (serviceDateTime, totalDuration) => {
  const slots = new Set();
  for (let step = 0; step < totalDuration / SLOT_INTERVAL; step++) {
    const date = new Date(serviceDateTime);
    date.setMinutes(date.getMinutes() + SLOT_INTERVAL * step);
    slots.add(date);
  }
  return [...slots];
};

ClosedSlotsModel.getSlotsFromStartDateAndDuration = ({ startDate, duration }) => {
  const start = moment(startDate).tz(DEFAULT_TIMEZONE);
  const end = start.clone().add(duration, 'minutes');
  const result = [];
  do {
    result.push(start.clone());
    start.add(30, 'minutes');
  } while (start < end);
  return result;
};
ClosedSlotsModel.getTotalConfirmedBookingForMigration = async ({ startDate }) => {
  const db = await mongoDB.getMongoDB();
  return await db.collection('Booking').count({
    serviceDateTime: { $gte: startDate.toDate() },
    bookingStatus: BOOKING_STATUS.CONFIRMED,
    migrateMaxConfirmeedBooking: { $exists: false },
  });
};

ClosedSlotsModel.getConfirmedBookingForMigration = async ({ startDate, limit = 50 }) => {
  const db = await mongoDB.getMongoDB();
  return await db
    .collection('Booking')
    .find(
      {
        serviceDateTime: { $gte: startDate.toDate() },
        bookingStatus: BOOKING_STATUS.CONFIRMED,
        migrateMaxConfirmeedBooking: { $exists: false },
      },
      {
        projection: {
          _id: 1,
          serviceDateTime: 1,
          totalDuration: 1,
          _p_stylist: 1,
        },
      },
    )
    .limit(limit)
    .toArray();
};

ClosedSlotsModel.updateClosedSlotByBookingForMigration = async ({
  serviceDateTime,
  totalDuration,
  bookingId,
  stylistId,
}) => {
  const mongodbClient = await mongoDB.getClient();
  const db = await mongoDB.getMongoDB();
  const slots = await ClosedSlotsModel.getSlotsFromStartDateAndDuration({
    startDate: serviceDateTime,
    duration: totalDuration,
  });
  const date = moment(serviceDateTime).tz(DEFAULT_TIMEZONE).startOf('days').toDate();
  const currentDate = moment().toDate();
  let status = 'success';
  try {
    await Helper.executeInTransaction(async (session) => {
      const allSlot = [];
      for (let i = 0; i < slots.length; i++) {
        const filter = {
          stylistId,
          slot: slots[i].toDate(),
          confirmedBookings: { $ne: bookingId },
        };
        const updatedData = {
          $set: {
            _created_at: currentDate,
            _updated_at: currentDate,
            date,
          },
          $inc: {
            count: 1,
          },
          $addToSet: {
            confirmedBookings: bookingId,
          },
        };
        allSlot.push(db.collection('ClosedSlots').updateOne(filter, updatedData, { session, upsert: true }));
      }
      await Promise.all(allSlot);
    }, mongodbClient);
  } catch (error) {
    status = 'fail';
  } finally {
    await db.collection('Booking').updateOne({ _id: bookingId }, { $set: { migrateMaxConfirmeedBooking: { status } } });
  }
};

ClosedSlotsModel.clearOldClosedSlotsByDate = async ({ endDate }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db.collection('ClosedSlots').remove({ slot: { $lte: endDate.toDate() } });
  return _.get(result, 'result.n');
};

ClosedSlotsModel.processClosedSlot = async (params) => {
  const { stylistId, bookingId, serviceDateTime, session, maxConfirmedBookingCount, totalDuration } = params;
  try {
    const slots = ClosedSlotsModel.getSLotsFromServiceDateTime(serviceDateTime, totalDuration);
    const promiseUpdateClosedSlot = slots.map((slot) => {
      const attributes = {
        stylistId,
        slot,
        confirmedBooking: bookingId,
      };
      return ClosedSlotsModel.updateClosedSlotsByStylist(attributes, maxConfirmedBookingCount, true, session);
    });
    await Promise.all(promiseUpdateClosedSlot);
  } catch (error) {
    console.log(`[ClosedSlotsModel][processClosedSlot]:retry_${bookingId}`, error);
    throw error;
  }
};

ClosedSlotsModel.updateClosedSlotWhenCancelBooking = async ({
  serviceDateTime,
  totalDuration,
  stylistId,
  bookingId,
}) => {
  const mongodbClient = await mongoDB.getClient();
  const db = await mongoDB.getMongoDB();
  const slots = await ClosedSlotsModel.getSlotsFromStartDateAndDuration({
    startDate: serviceDateTime,
    duration: totalDuration,
  });
  const currentDate = moment().toDate();
  let status = 'success';
  try {
    await Helper.executeInTransaction(async (session) => {
      const allSlot = [];
      for (let i = 0; i < slots.length; i++) {
        const filter = {
          stylistId,
          slot: slots[i].toDate(),
          confirmedBookings: bookingId,
          canceledBookings: { $ne: bookingId },
          count: { $gt: 0 },
        };
        const updatedData = {
          $set: {
            _updated_at: currentDate,
          },
          $inc: {
            count: -1,
          },
          $addToSet: {
            canceledBookings: bookingId,
          },
          $pull: {
            confirmedBookings: bookingId,
          },
        };
        allSlot.push(db.collection('ClosedSlots').updateOne(filter, updatedData, { session }));
      }
      await Promise.all(allSlot);
    }, mongodbClient);
  } catch (error) {
    status = 'fail';
  } finally {
    await db
      .collection('Booking')
      .updateOne({ _id: bookingId }, { $set: { 'handleMaxConfirmeedBookingCount.cancelBooking': { status } } });
  }
};

ClosedSlotsModel.updateClosedSlotWhenFinishBooking = async ({
  serviceDateTime,
  bookingId,
  stylistId,
  totalDuration,
}) => {
  let status = 'success';
  const mongodbClient = await mongoDB.getClient();
  const db = await mongoDB.getMongoDB();
  try {
    await Helper.executeInTransaction(async (session) => {
      const slots = ClosedSlotsModel.getSLotsFromServiceDateTime(serviceDateTime, totalDuration);
      const promiseUpdateClosedSlot = slots.map((slot) => {
        const attributes = {
          stylistId,
          count: -1,
          canceledBooking: bookingId,
          slot,
        };
        return ClosedSlotsModel.updateClosedSlotsByStylist(attributes, 1, false, session);
      });
      await Promise.all(promiseUpdateClosedSlot);
    }, mongodbClient);
  } catch (error) {
    console.log('[ClosedSlotsModel][updateClosedSlotWhenFinishBooking]:error:', error);
    status = 'fail';
  } finally {
    await db
      .collection('Booking')
      .updateOne({ _id: bookingId }, { $set: { 'handleMaxConfirmeedBookingCount.finishBooking': { status } } });
  }
};

ClosedSlotsModel.getClosedSlotForStylistByDate = async ({ stylistId, from, to, maxConfirmedBookingCount }) => {
  const query = {
    stylistId,
    slot: {
      $gte: from.toDate(),
      $lte: to.toDate(),
    },
    count: { $gte: maxConfirmedBookingCount },
  };
  const db = await mongoDB.getMongoDB();
  return db.collection('ClosedSlots').find(query).toArray();
};
