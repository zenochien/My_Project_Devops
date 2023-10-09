const bookingModel = require('./../models/Booking');
const moment = require('moment-timezone');
const mongoDB = require('../../db/mongoDB');
const userModel = require('../models/User');
const Errors = require('../../const/Errors');
const Helper = require('./../../utils/helper');
const { generalConfig } = require('./../../config');
const { USER_STATUS, EVENTS, DEFAULT_CLEARED_FIELDS, DEFAULT_TIMEZONE } = require('../../const/Constants');
const { parseServerConfig } = require('../../config/parseServerConfig');
const eventManager = require('../../utils/Event');

const customerService = {
  requestDeleteCustomer: async ({ userId, customerId, reasons, email }) => {
    const hasIncompleteBooking = await bookingModel.countInCompletedBooking({ customerId });
    if (hasIncompleteBooking) {
      const { code, message } = Errors.HAS_IMCOMPLETE_BOOKING;
      throw new Parse.Error(code, message);
    }
    const deletedAt = moment().add(generalConfig.expiredRequestDeletingAccount, 'hours').toDate();
    const requestDeletingAccount = {
      reasons,
      requestedAt: moment().toDate(),
      expiredAt: deletedAt,
      deletedAt,
    };
    const mongodbClient = await mongoDB.getClient();
    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('Customer').updateOne(
          {
            _id: customerId,
          },
          {
            $set: {
              requestDeletingAccount,
            },
          },
          {
            session,
          },
        ),
        await userModel.forceLogout({ session, db, userId }),
      ];
      await Promise.all(executedData);
    }, mongodbClient);

    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('customer-request-delete-account', { to: email });
  },

  deleteCustomer: async ({ userId, customerId, email }) => {
    const mongodbClient = await mongoDB.getClient();
    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const newEmail = `${userId}@generate.com`;
      const executedData = [
        db.collection('Customer').updateOne(
          {
            _id: customerId,
          },
          {
            $set: {
              userStatus: USER_STATUS.DELETED,
              firstName: '----',
              lastName: '----',
              fullName: '----',
              phoneticFirstName: '----',
              phoneticLastName: '----',
              phoneticFullName: '----',
              nickName: '----',
              gender: '無回答',
              email: newEmail,
              //
              phone: '',
              deletedAt: moment().toDate(),
              triggerChangeProfile: { dirtyKeys: DEFAULT_CLEARED_FIELDS.CUSTOMER },
            },
            $unset: {
              profileImages: '',
              profileImageIds: '',
              birthDate: '',
              newEmail: '',
            },
          },
          {
            session,
          },
        ),
        db.collection('_User').updateOne(
          {
            _id: userId,
          },
          {
            $set: {
              status: USER_STATUS.DELETED,
              email: newEmail,
              username: newEmail,
            },
          },
          {
            session,
          },
        ),
        userModel.forceLogout({ session, db, userId }),
      ];
      await Promise.all(executedData);
      eventManager.emit(EVENTS.DELETED_CUSTOMER, { objectId: customerId });
    }, mongodbClient);
    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('delete-customer-account-success', { to: email });
  },

  revokeDeleteAccountRequest: async ({ customer }) => {
    if (!customer.has('requestDeletingAccount') || customer.get('userStatus') === USER_STATUS.DELETED) {
      throw new Parse.Error(Errors.INVALID_ACTION.code, Errors.INVALID_ACTION.message);
    }
    const expiredAt = customer.get('requestDeletingAccount').expiredAt;
    if (moment(expiredAt).isBefore(moment())) {
      throw new Parse.Error(Errors.DELETE_ACCOUNT_REQUEST_ERROR.code, Errors.DELETE_ACCOUNT_REQUEST_ERROR.message);
    }
    const db = await mongoDB.getMongoDB();
    await db.collection('Customer').updateOne(
      {
        _id: customer.id,
      },
      {
        $unset: {
          requestDeletingAccount: '',
        },
      },
    );
    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('revoke-customer-account-request', { to: customer.get('email') });
  },

  getCardBlockedStatus: async (requestUser) => {
    const customer = await requestUser.get('customer').fetch();
    const blockCardInfo = customer.get('blockCardInfo');
    if (blockCardInfo && blockCardInfo.expriceDate) {
      const expriceDate = blockCardInfo.expriceDate;
      if (moment().isBefore(moment(expriceDate))) {
        return {
          isBlocked: true,
        };
      }
    }
    return {
      isBlocked: false,
    };
  },

  updateCardBlockedInfo: async (requestUser) => {
    const MAX_INPUT_INVALID_CARD = 10;
    const today = moment().tz(DEFAULT_TIMEZONE);
    const todayText = today.clone().format('YYYYMMDD');
    const customer = await requestUser.get('customer').fetch();

    const blockCardInfo = customer.get('blockCardInfo');
    const timesInputInvalidCard = blockCardInfo && blockCardInfo[todayText] ? blockCardInfo[todayText] + 1 : 1;

    if (!blockCardInfo) {
      const blockCardInfoInput = {};
      blockCardInfoInput[todayText] = timesInputInvalidCard;
      customer.set(`blockCardInfo`, blockCardInfoInput);
      await customer.save();
      return {
        success: true,
        isBlocked: false,
      };
    }

    if (blockCardInfo && blockCardInfo.expriceDate) {
      const expriceDate = blockCardInfo.expriceDate;
      if (today.isBefore(moment(expriceDate).tz(DEFAULT_TIMEZONE))) {
        const { code, message } = Errors.CUSTOMER_ADD_CARD_BLOCKED;
        throw new Parse.Error(code, message);
      }
    }

    if (timesInputInvalidCard > MAX_INPUT_INVALID_CARD) {
      customer.set('blockCardInfo.expriceDate', today.clone().add(24, 'hours').toDate());
      await customer.save();
      const { code, message } = Errors.CUSTOMER_ADD_CARD_BLOCKED;
      throw new Parse.Error(code, message);
    }

    customer.set(`blockCardInfo.${todayText}`, timesInputInvalidCard);
    await customer.save();
    return {
      success: true,
      isBlocked: false,
    };
  },
};

module.exports = customerService;
