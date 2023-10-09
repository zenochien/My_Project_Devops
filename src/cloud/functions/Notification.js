const NotificationFunctions = {};
module.exports = NotificationFunctions;

const yup = require('yup');

const Validation = require('../../utils/validation');
const { NotificationModel } = require('../models');
const { USER_ROLE, DEVICE_TYPE } = require('../../const/Constants');

Object.assign(NotificationFunctions, {
  registerDevice: (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER, USER_ROLE.STYLIST]);
    const payload = Validation.checkRequestParams(request, {
      appIdentifier: yup.string().trim().lowercase().required(),
      deviceType: yup.string().trim().oneOf([DEVICE_TYPE.iOS, DEVICE_TYPE.ANDROID]).required(),
      deviceToken: yup.string().trim().required(),
      appVersion: yup.string().trim().required(),
      timeZone: yup.string().trim().required(),
      channels: yup.array().of(yup.string().trim()).min(1).optional().uniqueValue('Channel must be unique'),
    });

    return NotificationModel.registerDevice(payload, request);
  },

  getNotificationList: (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST, USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      page: yup.number(),
      limit: yup.number(),
    });

    return NotificationModel.getNotificationList(payload, request);
  },

  getNumOfNewNotifications: (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST, USER_ROLE.CUSTOMER]);
    return NotificationModel.getNumOfNewNotifications(request);
  },

  markNotificationIsRead: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST, USER_ROLE.CUSTOMER]);
    const { notificationId } = Validation.checkRequestParams(request, {
      notificationId: yup.string().required(),
    });

    await NotificationModel.markNotificationIsRead(notificationId, request);
    return true;
  },

  markAllNewNotification: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST, USER_ROLE.CUSTOMER]);

    await NotificationModel.markAllNewNotification(request);
    return true;
  },

  markAllNotificationsAsReadByCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    return NotificationModel.markAllNotificationsAsReadByCustomer(request.user);
  },

  markAllNotificationsAsReadByStylist: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.STYLIST]);
    return NotificationModel.markAllNotificationsAsReadByStylist(request.user);
  },
});
