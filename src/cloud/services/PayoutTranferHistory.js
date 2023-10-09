const moment = require('moment-timezone');

const Helper = require('../../utils/helper');
const mongoDB = require('../../db/mongoDB');
const { DEFAULT_TIMEZONE, PAYOUT_TRANSFER_STATUS } = require('../../const/Constants');
const { OBJECT_NOT_FOUND } = require('../../const/Errors');
const PayoutTranferHistoryService = {
  create: async (input) => {
    try {
      const id = await Helper.getAnNanoId();
      const db = await mongoDB.getMongoDB();
      const data = {
        ...input,
        _id: id,
        _updated_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
        _created_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
      };
      await db.collection('PayoutTranferHistory').insertOne(data);
      return PayoutTranferHistoryService.getByPayoutId(input.payoutId);
    } catch (error) {
      if (error.name === 'MongoError' && (error.code === 11000 || error.code === 11001)) {
        return PayoutTranferHistoryService.getByPayoutId(input.payoutId);
      }
    }
  },
  getByPayoutId: async (payoutId) => {
    const db = await mongoDB.getMongoDB();
    const result = await db.collection('PayoutTranferHistory').find({ payoutId }).toArray();
    if (result.length > 0) {
      return result[0];
    }
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  },
  updateStatus: async ({ id, status }) => {
    const db = await mongoDB.getMongoDB();
    const data = {
      status,
      _updated_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
    };
    return db.collection('PayoutTranferHistory').update({ _id: id }, { $set: data });
  },

  getProcessPayoutHistory: async () => {
    const db = await mongoDB.getMongoDB();
    return db.collection('PayoutTranferHistory').find({ status: PAYOUT_TRANSFER_STATUS.PROCESS }).toArray();
  },

  deleteById: async (id) => {
    const db = await mongoDB.getMongoDB();
    return db.collection('PayoutTranferHistory').deleteOne({ _id: id });
  },

  changeFormatCreatedAtUpdatedAt: async () => {
    const db = await mongoDB.getMongoDB();
    const payoutTranferHistorys = await db
      .collection('PayoutTranferHistory')
      .find({})
      .project({ updatedAt: 1, createdAt: 1, _id: 1 })
      .toArray();
    const updateds = payoutTranferHistorys.map((item) => {
      const filter = {
        _id: item._id,
      };
      const update = {
        $set: {
          _updated_at: moment(item.updatedAt._d).tz(DEFAULT_TIMEZONE).toDate(),
          _created_at: moment(item.createdAt._d).tz(DEFAULT_TIMEZONE).toDate(),
        },
        $unset: {
          createdAt: 1,
          updatedAt: 1,
        },
      };
      return {
        updateOne: {
          filter,
          update,
        },
      };
    });
    await db.collection('PayoutTranferHistory').bulkWrite(updateds);
  },
};
module.exports = PayoutTranferHistoryService;
