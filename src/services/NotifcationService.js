const NotificationService = {};
module.exports = NotificationService;

const { USER_ROLE, NOTIFICATION_TEMPLATES, STYLIST_APP_SCREENS, DEFAULT_TIMEZONE } = require('../const/Constants');
const _ = require('lodash');
const Errors = require('../const/Errors');
const Helper = require('../utils/helper');
const moment = require('moment');
const { ParseServerLogger } = require('../logger');

function toLocalDateTime(serviceDateTime, timeZone) {
  return moment(serviceDateTime).locale('ja').tz(timeZone).format('YYYY年MM月DD日(dd) HH:mm');
}

function toLocalDate(serviceDateTime, timeZone) {
  return moment(serviceDateTime).tz(timeZone).format('MM/DD');
}

/*
 * Notification templates
 */
const NOTIFICATION_TEMPLATE_SPECS = {
  [NOTIFICATION_TEMPLATES.BOOKING_REQUESTED_BY_CUSTOMER]: {
    title: '新しい予約リクエストが入りました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が<%- $customerNickName %>よりリクエストされました`,
    preRender: (params) => {
      return {
        ...params,
        $customerId: params['booking'].get('customer').id,
        $customerNickName: params['booking'].get('customer').get('fullName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_CUSTOMER_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約リクエストがキャンセルされました',
    inAppTitle: '予約リクエストをキャンセルしました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約リクエストをキャンセルしました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
        $customerId: params['booking'].get('customer').id,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_CUSTOMER_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約がキャンセルされました',
    inAppTitle: '予約をキャンセルしました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約をキャンセルしました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
        $customerId: params['booking'].get('customer').id,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_CUSTOMER_FOR_STYLIST]: {
    title: '予約リクエストがキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約リクエストが<%- $customerNickName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $customerId: params['booking'].get('customer').id,
        $customerNickName: params['booking'].get('customer').get('fullName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_CUSTOMER_FOR_STYLIST]: {
    title: '予約がキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が<%- $customerNickName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $customerId: params['booking'].get('customer').id,
        $customerNickName: params['booking'].get('customer').get('fullName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_STYLIST_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約リクエストがキャンセルされました',
    inAppTitle: '予約リクエストがキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約リクエストが<%- $stylistNickName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $stylistId: params['booking'].get('stylist').id,
        $stylistNickName: params['booking'].get('stylist').get('nickName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $stylistProfileImage: params['booking'].get('stylist').get('profileImages'),
        $createdBy: USER_ROLE.STYLIST,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.REQUESTED_BOOKING_CANCELED_BY_STYLIST_FOR_STYLIST]: {
    title: '予約リクエストをキャンセルしました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約リクエストをキャンセルしました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $stylistProfileImage: params['booking'].get('stylist').get('profileImages'),
        $createdBy: USER_ROLE.STYLIST,
        $stylistId: params['booking'].get('stylist').id,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_STYLIST_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約がキャンセルされました',
    inAppTitle: '予約がキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が<%- $stylistNickName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $stylistId: params['booking'].get('stylist').id,
        $stylistNickName: params['booking'].get('stylist').get('nickName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $stylistProfileImage: params['booking'].get('stylist').get('profileImages'),
        $createdBy: USER_ROLE.STYLIST,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.CONFIRMED_BOOKING_CANCELED_BY_STYLIST_FOR_STYLIST]: {
    title: '予約をキャンセルしました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約をキャンセルしました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $stylistProfileImage: params['booking'].get('stylist').get('profileImages'),
        $createdBy: USER_ROLE.STYLIST,
        $stylistId: params['booking'].get('stylist').id,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SALON_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約がサロンによりキャンセルされました',
    inAppTitle: 'サロンにより予約がキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が<%- $salonName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $salonId: params['booking'].get('salon').id,
        $salonName: params['booking'].get('salon').get('salonName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $salonImage: Helper.getSalonImage(params['booking'].get('salon')),
        $createdBy: USER_ROLE.SALON_OPERATOR,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SALON_FOR_STYLIST]: {
    title: 'サロンにより予約がキャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が<%- $salonName %>よりキャンセルされました`,
    preRender: (params) => {
      return {
        ...params,
        $salonId: params['booking'].get('salon').id,
        $salonName: params['booking'].get('salon').get('salonName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $salonImage: Helper.getSalonImage(params['booking'].get('salon')),
        $createdBy: USER_ROLE.SALON_OPERATOR,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SYSTEM_FOR_CUSTOMER]: {
    title: '<%- $stylingDate %>の予約リクエストがキャンセルされました',
    inAppTitle: '予約が自動キャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約はHAIRLIEにより自動キャンセルとなりました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.ADMIN,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CANCELED_BY_SYSTEM_FOR_STYLIST]: {
    title: '予約リクエストがキャンセルされました',
    inAppTitle: '予約が自動キャンセルされました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約はHAIRLIEにより自動キャンセルとなりましたした`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.ADMIN,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CONFIRMED_BY_STYLIST]: {
    title: '<%- $stylingDate %>の予約が確定しました',
    inAppTitle: '予約が確定しました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が確定しました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $stylistProfileImage: params['booking'].get('stylist').get('profileImages'),
        $createdBy: USER_ROLE.STYLIST,
        $stylistId: params['booking'].get('stylist').id,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.BOOKING_CONFIRMED_BY_SALON]: {
    title: '<%- $stylingDate %>の予約が確定しました',
    inAppTitle: '予約が確定しました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の予約が確定しました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $stylingDate: toLocalDate(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        // consider: $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $salonImage: Helper.getSalonImage(params['booking'].get('salon')),
        $createdBy: USER_ROLE.SALON_OPERATOR,
        $salonId: params['booking'].get('salon').id,
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, inAppTitle, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_STYLIST]: {
    title: '決済が完了しました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の決済が完了しました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
        $customerId: params['booking'].get('customer').id,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.PAYMENT_COMPLETED_FOR_CUSTOMER]: {
    title: '決済が完了しました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の決済が完了しました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
        $customerId: params['booking'].get('customer').id,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.PAYMENT_ERROR]: {
    title: '決済エラーが発生しました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>の決済エラーが発生しました`,
    preRender: (params) => {
      return {
        ...params,
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
        $customerId: params['booking'].get('customer').id,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },
  [NOTIFICATION_TEMPLATES.REVIEWED_BY_CUSTOMER_FOR_STYLIST]: {
    title: 'レビューが投稿されました',
    body: `予約ID#<%- $bookingId %> <%- $stylingDateTime %>のレビューが<%- $customerNickName %>より投稿されました`,
    preRender: (params) => {
      return {
        ...params,
        $customerId: params['booking'].get('customer').id,
        $customerNickName: params['booking'].get('customer').get('fullName'),
        $stylingDateTime: toLocalDateTime(params['booking'].get('serviceDateTime'), params['timeZone']),
        $bookingId: params['booking'].id,
        $bookingStatus: params['booking'].get('bookingStatus'),
        $bookingServiceDateTime: params['booking'].get('serviceDateTime'),
        $link: `${STYLIST_APP_SCREENS.BOOKING_DETAIL_SCREEN}:${params['booking'].id}`,
        $customerProfileImage: params['booking'].get('customer').get('profileImages'),
        $createdBy: USER_ROLE.CUSTOMER,
      };
    },
    postRender: (params, title, body) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, body, params: publicParams };
    },
  },

  // stylist notification case 12
  [NOTIFICATION_TEMPLATES.POST_CHANGE_TO_UNPUBLISHED_BY_CHANGE_MENU]: {
    title: 'スタイル投稿が非公開になりました',
    inAppTitle: 'スタイル投稿が非公開になりました',
    body: `サロンまたはアドミンによりメニューが変更されたため、自動的に非公開となりました\nスタイル投稿を更新する`,
    preRender: (params) => {
      return {
        ...params,
        $link: `${STYLIST_APP_SCREENS.POST_LIST}:Unpublish`,
        $extraText: 'スタイル投稿を更新する',
      };
    },
    postRender: (params, title, body, inAppTitle) => {
      const publicParams = {
        ...Object.keys(params).reduce(function (res, key) {
          if (_.startsWith(key, '$')) {
            res[key.slice(1)] = params[key];
          }
          return res;
        }, {}),
      };

      return { title, inAppTitle, body, params: publicParams };
    },
  },
};

_.forEach(NOTIFICATION_TEMPLATE_SPECS, (spec) => {
  spec.titleCompiled = _.template(spec.title.trim());
  spec.bodyCompiled = _.template(spec.body.trim());
  if (spec.inAppTitle) {
    spec.inAppTitleCompiled = _.template(spec.inAppTitle.trim());
  }
});

const renderer = function (templateName, params = {}) {
  const template = NOTIFICATION_TEMPLATE_SPECS[templateName];
  params = template.preRender(params);
  params = {
    $type: templateName, // public param, will include in notification body
    ...params,
  };

  if (!template.titleCompiled || !template.bodyCompiled) {
    throw new Error();
  }

  const title = template.titleCompiled(params);
  const body = template.bodyCompiled(params);

  let inAppTitle;
  if (template.inAppTitle) {
    inAppTitle = template.inAppTitleCompiled(params);
  }

  const postRenderResult = template.postRender(params, title, body, inAppTitle);

  // return result and params that used to render
  return { ...postRenderResult };
};

function buildDataNotification(notificationId, templateName, params) {
  let result;

  try {
    params['$notificationId'] = notificationId;
    params['timeZone'] = DEFAULT_TIMEZONE;

    result = renderer(templateName, params);
  } catch (e) {
    ParseServerLogger.error(
      `saveAndSendNotificationWithTemplate(NotificationService): notification render failed\n${e}`,
    );
    return { error: 'true' };
  }

  return {
    pushNotificationData: {
      ..._.pick(result.params, ['link', 'type', 'notificationId']),
      params: JSON.stringify(_.pick(result.params, ['bookingStatus', 'bookingId'])),
    },
    inAppNotificationData: {
      template: _.pick(NOTIFICATION_TEMPLATE_SPECS[templateName], ['title', 'body', 'inAppTitle']),
      ..._.omit(result.params, 'notificationId'),
    },
    ...result,
  };
}

class NotificationServiceV1 {
  constructor(logger, notificationRepository, installationRepository) {
    this.__logger = logger;
    this.__notificationRepository = notificationRepository;
    this.__installationRepository = installationRepository;
  }

  async sendNotification(context, receivers, title, body, data, badge = 1) {
    this.__logger.info(`sendNotification(NotificationService):
        title=${title}
        body=${body}
        data=${data && JSON.stringify(data)}
        badge=${badge}
    `);

    // Parse server push
    const listUserId = _.map(receivers, (receiver) => Helper.getPointerValue('_User', receiver['id']));
    try {
      const query = new Parse.Query(Parse.Installation);
      query.containedIn('user', listUserId);
      await Parse.Push.send({
        where: query, // Set our Installation query
        data: {
          alert: title,
          ...data,
          badge,
          sound: 'default',
        },
      });
    } catch (error) {
      this.__logger.error(`sendNotification(NotificationSerivce): ${error}`);
    }
    return Promise.resolve({ result: true });
  }

  saveAndSendNotificationWithTemplate(
    context,
    receivers,
    templateName,
    params,
    options = { isPush: true, isSave: true },
  ) {
    _.each(receivers, (receiver) => {
      if (!receiver['id'] || !receiver['role']) {
        this.__logger.error(`sendNotification(service): receiver id and role is required.`, context, receiver);
        return Promise.resolve({ error: Errors.INVALID_PARAMS });
      }
    });

    _.each(receivers, async (receiver) => {
      try {
        const notificationId = Helper.randomString();
        const { pushNotificationData, inAppNotificationData, title, inAppTitle, body } = buildDataNotification(
          notificationId,
          templateName,
          params,
        );
        if (options.isSave) {
          await this.__notificationRepository
            .insert(context, notificationId, receiver['id'], new Date(), title, inAppTitle, body, inAppNotificationData)
            .catch((e) => {
              const contextError = {
                context,
                receiver,
                templateName,
                bookingId: params.booking ? params.booking.id : undefined,
              };
              this.__logger.error(
                'saveAndSendNotificationWithTemplate notificationRepository.insert error',
                JSON.stringify(contextError),
                e,
              );
            });
        }

        if (options.isPush) {
          const countResult = await this.__notificationRepository.countUnread(context, receiver['id']);
          this.sendNotification(context, [receiver], title, '' /*body*/, pushNotificationData, countResult['result']);
        }
      } catch (e) {
        const contextError = {
          context,
          receivers,
          templateName,
          bookingId: params.booking ? params.booking.id : undefined,
        };
        this.__logger.error('saveAndSendNotificationWithTemplate error', JSON.stringify(contextError), e);
      }
    });

    return Promise.resolve({ result: true });
  }

  async registerDevice(
    context,
    appIdentifier,
    deviceToken,
    deviceType,
    installationId,
    appVersion,
    timeZone,
    channels,
  ) {
    const userId = context['user']['id'];

    await this.__installationRepository.upsert(
      context,
      installationId,
      userId,
      appIdentifier,
      deviceToken,
      deviceType,
      appVersion,
      timeZone,
    );

    return { result: true };
  }

  async removeDevice(context, installationId, deviceToken) {
    await this.__installationRepository.delete(context, installationId);
    return { result: true };
  }
}

NotificationService.newNotificationService = (logger, notificationRepository, installationRepository) => {
  return new NotificationServiceV1(logger, notificationRepository, installationRepository);
};
