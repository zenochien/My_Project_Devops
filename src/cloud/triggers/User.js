const UserTriggers = {};
module.exports = UserTriggers;

const _ = require('lodash');

const { parseServerConfig } = require('../../config/index');
const BaseQuery = require('../BaseQuery');
const Validation = require('../../utils/validation');
const Helper = require('../../utils/helper');
const mongoDB = require('../../db/mongoDB');
const { USER_STATUS, USER_ROLE } = require('../../const/Constants');
const eventManager = require('../../utils/Event');
const { EVENTS } = require('../../const/Constants');

const requiredFields = ['email', 'role'];
const defaultValueMap = {};

Object.assign(UserTriggers, {
  beforeSaveUser: {
    class: Parse.User,

    /**
     * @param {Parse.Cloud.TriggerRequest} request
     * @returns {Promise<void>}
     */
    handler: async (request) => {
      const { context, object: userObject } = request;

      Validation.checkRequireFields(requiredFields, userObject);
      Helper.setDefaultValue(userObject, defaultValueMap);

      const dirtyMap = _.reduce(
        userObject.dirtyKeys(),
        (map, key) => {
          map[key] = true;
          return map;
        },
        {},
      );
      context.dirtyMap = dirtyMap;

      // User name
      if (dirtyMap.username && userObject.get('username')) {
        userObject.set('username', userObject.get('username').trim());
      }

      // Email
      if (dirtyMap.email && userObject.get('email')) {
        const email = userObject.get('email').toLowerCase().trim();
        userObject.set('email', email);
      }

      // set hasSetPassFirstTime
      if (userObject.isNew()) {
        if (!userObject.has('hasSetPassFirstTime')) {
          userObject.set('hasSetPassFirstTime', false);
        }
        if (!userObject.get('status')) {
          userObject.set('status', USER_STATUS.INVITED);
        }
      } else if (dirtyMap.password && !userObject.get('hasSetPassFirstTime')) {
        userObject.set('hasSetPassFirstTime', true);
        _.set(context, 'sendCompletionEmail', true);
        if (userObject.get('status') === USER_STATUS.INVITED) {
          userObject.set('status', USER_STATUS.ACTIVE);
        }
      }

      if (dirtyMap.emailVerified && userObject.get('emailVerified')) {
        userObject.set('status', USER_STATUS.ACTIVE);
        userObject.set('hasSetPassFirstTime', true);
        _.set(context, 'eventHasBeenVerified', true);
      }

      const userRole = userObject.get('role');
      if (userRole === USER_ROLE.STYLIST && userObject.dirtyKeys().indexOf('status') !== -1) {
        userObject.set('syncUserStatus', true);
        context.syncUserStatusToStylist = true;
      }
      if (userRole === USER_ROLE.CUSTOMER && userObject.dirtyKeys().indexOf('status') !== -1) {
        userObject.set('syncUserStatus', true);
        context.syncUserStatusToCustomer = true;
      }
    },
  },

  afterSaveUser: {
    class: Parse.User,

    /**
     * @param {Parse.Cloud.TriggerRequest} request
     * @returns {Promise<void>}
     */
    handler: async (request) => {
      const { context, object: userObject } = request;
      const userRole = userObject.get('role');

      if (context.sendCompletionEmail && userRole === USER_ROLE.SALON_OPERATOR) {
        const mailData = { user: userObject };
        if (userRole === USER_ROLE.SALON_OPERATOR && userObject.get('salon')) {
          const salonQuery = BaseQuery.getSalonQuery();
          salonQuery.select('salonName');
          const salon = await salonQuery.get(userObject.get('salon').id, { useMasterKey: true });
          mailData.salon = salon;
        }

        parseServerConfig.emailAdapter.sendMailByTemplate(
          'salon-registration-completion',
          { to: userObject.get('email') },
          mailData,
        );
      }

      // send email to stylist when he/she set password first
      if (context.sendCompletionEmail && userRole === USER_ROLE.STYLIST) {
        eventManager.emit(EVENTS.STYLIST_SET_FIRST_PASSWORD, userObject.toJSON());
      }

      // send email to customer when he/she verify email
      if (context.eventHasBeenVerified && userRole === USER_ROLE.CUSTOMER) {
        eventManager.emit(EVENTS.CUSTOMER_VERIFY_EMAIL, userObject.toJSON());
      }

      // sync user's status to stylist
      if (userRole === USER_ROLE.STYLIST && context.syncUserStatusToStylist) {
        const mongodbClient = await mongoDB.getClient();
        await Helper.executeInTransaction(async (session) => {
          const db = await mongoDB.getMongoDB();
          await db
            .collection('Stylist')
            .updateOne(
              { _id: userObject.get('stylist').id },
              { $set: { userStatus: userObject.get('status') } },
              { session },
            );
          await db
            .collection('_User')
            .updateOne({ _id: userObject.id }, { $unset: { syncUserStatus: '' } }, { session });
        }, mongodbClient);
      }

      // sync user's status to customer
      if (userRole === USER_ROLE.CUSTOMER && context.syncUserStatusToCustomer) {
        const mongodbClient = await mongoDB.getClient();
        await Helper.executeInTransaction(async (session) => {
          const db = await mongoDB.getMongoDB();
          await db
            .collection('Customer')
            .updateOne(
              { _id: userObject.get('customer').id },
              { $set: { userStatus: userObject.get('status') } },
              { session },
            );
          await db
            .collection('_User')
            .updateOne({ _id: userObject.id }, { $unset: { syncUserStatus: '' } }, { session });
        }, mongodbClient);
      }
    },
  },
});
