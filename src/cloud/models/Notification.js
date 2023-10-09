const NotificationModel = {};
module.exports = NotificationModel;

const _template = require('lodash/template');
const _ = require('lodash');
const Errors = require('../../const/Errors');
const Helper = require('../../utils/helper');
const BaseQuery = require('../BaseQuery');
const mongoDB = require('../../db/mongoDB');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const { ParseServerLogger } = require('../../logger');
const { USER_ROLE } = require('../../const/Constants');

let notificationService;
NotificationModel.init = (_notificationService) => {
  notificationService = _notificationService;
};

const getNotificationIcon = (data) => {
  let icon = '';
  switch (data.createdBy) {
    case USER_ROLE.CUSTOMER:
      icon = _.get(data, 'customerProfileImage.[0].thumbSmall');
      break;
    case USER_ROLE.STYLIST:
      icon = _.get(data, 'stylistProfileImage.[0].thumbSmall');
      break;
    case USER_ROLE.SALON_OPERATOR:
      icon = _.get(data, 'salonImage.thumbSmall');
      break;
  }
  return icon;
};

const buildNotificationListInfo = (notificationListParse, selectedFields) => {
  return notificationListParse.map((parseObject) => {
    const result = Helper.convertParseObjectToJson(parseObject, selectedFields);
    if (result.data.isToRecompile) {
      const bodyTemplate = result.data.template.body.replace(/\$/g, '');
      const bodyCompiled = _template(bodyTemplate);
      result.body = bodyCompiled({ ...result.data });
    }
    result.icon = getNotificationIcon(result.data);
    return result;
  });
};

const getNotification = async (notificationId, request) => {
  const query = BaseQuery.getNotificationQuery();

  const userRole = request.user.get('role');
  if (userRole === USER_ROLE.SALON_OPERATOR) {
    query.equalTo('receiverId', request.user.get('salon').id);
  } else if (userRole === USER_ROLE.STYLIST) {
    const stylistUserParse = await Helper.getStylistUser(request.user.get('stylist').id);
    query.equalTo('receiver', stylistUserParse);
  } else if (userRole === USER_ROLE.CUSTOMER) {
    const customerUserParse = await Helper.getCustomerUser(request.user.get('customer').id);
    query.equalTo('receiver', customerUserParse);
  }
  return query.get(notificationId, { useMasterKey: true });
};

NotificationModel.saveNotification = async (data) => {
  const notification = new Parse.Object('Notification', { ...data, isRead: false, isDeleted: false, isNew: true });
  return notification.save();
};

NotificationModel.getNotificationList = async (data, request) => {
  const query = BaseQuery.getNotificationQuery();
  query.equalTo('isDeleted', false);

  const userRole = request.user.get('role');
  let selectedFields;
  if (userRole === USER_ROLE.SALON_OPERATOR) {
    query.equalTo('receiverId', request.user.get('salon').id);
    selectedFields = DefaultSelectFields.NOTIFICATION;
  } else if (userRole === USER_ROLE.STYLIST) {
    const stylistUserParse = await Helper.getStylistUser(request.user.get('stylist').id);
    query.equalTo('receiver', stylistUserParse);
    selectedFields = DefaultSelectFields.APP_NOTIFICATION;
  } else if (userRole === USER_ROLE.CUSTOMER) {
    const customerUserParse = await Helper.getCustomerUser(request.user.get('customer').id);
    query.equalTo('receiver', customerUserParse);
    selectedFields = DefaultSelectFields.APP_NOTIFICATION;
  }
  query.select(selectedFields);
  Helper.queryPagingHandler(query, data);
  const result = await query.find();

  return buildNotificationListInfo(result, selectedFields);
};

NotificationModel.getNumOfNewNotifications = async (request) => {
  const query = BaseQuery.getNotificationQuery();

  const userRole = request.user.get('role');
  if (userRole === USER_ROLE.SALON_OPERATOR) {
    query.equalTo('receiverId', request.user.get('salon').id);
  } else if (userRole === USER_ROLE.STYLIST) {
    const stylistUserParse = await Helper.getStylistUser(request.user.get('stylist').id);
    query.equalTo('receiver', stylistUserParse);
  } else if (userRole === USER_ROLE.CUSTOMER) {
    const customerUserParse = await Helper.getCustomerUser(request.user.get('customer').id);
    query.equalTo('receiver', customerUserParse);
  }
  query.equalTo('isNew', true);
  query.equalTo('isDeleted', false);
  return query.count();
};

NotificationModel.markNotificationIsRead = async (notificationId, request) => {
  let parseObj;

  try {
    parseObj = await getNotification(notificationId, request);
  } catch (error) {
    ParseServerLogger.error(error);

    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  parseObj.set('isRead', true);
  parseObj.set('isNew', false);
  await parseObj.save();
};

NotificationModel.markAllNewNotification = async (request) => {
  try {
    let filter;
    const userRole = request.user.get('role');
    if (userRole === USER_ROLE.SALON_OPERATOR) {
      filter = {
        receiverId: request.user.get('salon').id,
        isNew: true,
      };
    } else if (userRole === USER_ROLE.STYLIST) {
      const stylistUserParse = await Helper.getStylistUser(request.user.get('stylist').id);
      filter = {
        _p_receiver: `_User$${stylistUserParse.id}`,
        isNew: true,
      };
    } else if (userRole === USER_ROLE.CUSTOMER) {
      const customerUserParse = await Helper.getCustomerUser(request.user.get('customer').id);
      filter = {
        _p_receiver: `_User$${customerUserParse.id}`,
        isNew: true,
      };
    }
    const db = await mongoDB.getMongoDB();
    await db.collection('Notification').updateMany(filter, {
      $set: { isNew: false },
    });
  } catch (error) {
    ParseServerLogger.error(error);
    throw new Parse.Error(Parse.Error.OTHER_CAUSE, error.message);
  }
};

NotificationModel.registerDevice = async (payload, request) => {
  if (!notificationService) {
    return false;
  }

  const ctx = Helper.createContextFromRequest(request);
  let installationId;
  {
    const sessionToken = request.user.getSessionToken() || request.headers['x-parse-session-token'];
    const session = await new Parse.Query(Parse.Session)
      .equalTo('sessionToken', sessionToken)
      .first({ useMasterKey: true });

    installationId = session ? session.get('installationId') : undefined;
  }

  try {
    await notificationService.registerDevice(
      ctx,
      payload.appIdentifier,
      payload.deviceToken,
      payload.deviceType,
      installationId,
      payload.appVersion,
      payload.timeZone,
      payload.channels ? payload.channels : [''],
    );
  } catch (error) {
    ParseServerLogger.error('deviceRegister error', error);
    throw error;
  }
  return true;
};

NotificationModel.markAllNotificationsAsReadByUserId = async (userId) => {
  const filter = {
    _p_receiver: `_User$${userId}`,
    isRead: false,
  };
  const db = await mongoDB.getMongoDB();
  const result = await db.collection('Notification').updateMany(filter, {
    $set: { isNew: false, isRead: true },
  });
  if (result.modifiedCount === 0) {
    const { code, message } = Errors.MARK_ALL_NOTIFICATION_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return {
    success: true,
  };
};

NotificationModel.markAllNotificationsAsReadByCustomer = async (requestUser) => {
  const customerUserParse = await Helper.getCustomerUser(requestUser.get('customer').id);
  return NotificationModel.markAllNotificationsAsReadByUserId(customerUserParse.id);
};

NotificationModel.markAllNotificationsAsReadByStylist = async (requestUser) => {
  const stylistUserParse = await Helper.getStylistUser(requestUser.get('stylist').id);
  return NotificationModel.markAllNotificationsAsReadByUserId(stylistUserParse.id);
};
