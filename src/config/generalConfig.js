const generalConfig = {};
module.exports.default = generalConfig;
module.exports.generalConfig = generalConfig;

let rabbitmqUrl = process.env.RABBITMQ_URL_SERVER;
if (!rabbitmqUrl && process.env.RABBITMQ_URL) {
  rabbitmqUrl = process.env.RABBITMQ_URL.replace(
    '://',
    `://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@`,
  );
}
Object.assign(generalConfig, {
  adminResetPassUrl: process.env.ADMIN_DASHBOARD_RESET_PASS_URL || '',
  salonResetPassUrl: process.env.SALON_DASHBOARD_RESET_PASS_URL || '',
  customerResetPassUrl: process.env.CUSTOMER_RESET_PASS_URL || '',
  customerSetPassUrl: process.env.CUSTOMER_SET_PASS_URL || '',
  customerLoginUrl: process.env.CUSTOMER_LOGIN_URL || '',
  customerBaseUrl: process.env.CUSTOMER_BASE_URL || 'https://hairlie-dev.scrum-dev.com',
  salonBaseUrl: process.env.SALON_BASE_URL || 'https://dashboard.hairlie-dev.scrum-dev.com',
  dynamicLinkUrl: process.env.DYNAMIC_LINK_URL || 'https://devhairlie.page.link',
  iosAppId: process.env.IOS_APP_ID || '',
  iosStoreAppId: process.env.IOS_STORE_APP_ID || '',
  androidAppId: process.env.ANDROID_APP_ID || '',

  emailSecretKey: process.env.EMAIL_SECRET_KEY || '',
  maxRequestBookingDays: process.env.MAX_REQUEST_BOOKING_DAYS ? Number(process.env.MAX_REQUEST_BOOKING_DAYS) : 60, // in days (60 days)
  minRequestBookingTime: process.env.MIN_REQUEST_BOOKING_TIME ? Number(process.env.MIN_REQUEST_BOOKING_TIME) : 3600, // in seconds (1 hour)
  minConfirmBookingTime: process.env.MIN_CONFIRM_BOOKING_TIME ? Number(process.env.MIN_CONFIRM_BOOKING_TIME) : 1800, // in seconds (30 minutes)

  controllerBoardBaseUrl: process.env.CONTROLLER_BOARD_BASE_URL || '',
  controllerBoardAuthorization: process.env.CONTROLLER_BOARD_AUTHORIZATION || '',
  controllerBoardAppId: process.env.CONTROLLER_BOARD_APP_ID || '',

  enabledNotification: process.env.NOTIFICATION_ENABLED ? Number(process.env.NOTIFICATION_ENABLED) : 0,

  enabledMonitoring: process.env.ENABLE_MONITORING ? Number(process.env.ENABLE_MONITORING) : 0,
  jwtKey: process.env.JWT_KEY || 'Acsc123',
  newEmailExpiresIn: process.env.NEW_EMAIL_EXPIRES_IN || '168h',
  firebaseDynamicLinkKey: process.env.FIREBASE_DYNAMIC_LINK_KEY || 'AIzaSyBnt-HuA0pH0QS-tTBa_z_sY7mPcxR5Sz8',
  firebaseDynamicLinkIosBundleIdCustomer:
    process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_CUSTOMER || 'com.c2c-platform.hairlie.customer.dev1',
  firebaseDynamicLinkIosBundleIdStylist:
    process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_STYLIST || 'com.c2c-platform.hairlie.stylist.dev',
  firebaseDynamicLinkUriPrefixCustomer:
    process.env.FIREBASE_DYNAMIC_LINK_URI_PREFIX_CUSTOMER || 'devcustomerhairlie.page.link',
  firebaseDynamicLinkUriPrefixStylist:
    process.env.FIREBASE_DYNAMIC_LINK_URI_PREFIX_PROVIDER || 'devstylisthairlie.page.link',
  enableDeepLink: process.env.ENABLE_DEEP_LINK ? Number(process.env.ENABLE_DEEP_LINK) : 0,
  couponPrivateKey: `-----BEGIN ENCRYPTED PRIVATE KEY-----\n${process.env.COUPON_PRIVATE_KEY}\n-----END ENCRYPTED PRIVATE KEY-----`,
  couponUrl: process.env.COUPON_URL || 'https://coupon.csp-dev.scrum-dev.com',
  couponPassword: process.env.COUPON_PASSWORD,
  couponAppId: process.env.COUPON_APP_ID,
  expiredRequestDeletingAccount: process.env.EXPIRED_REQUEST_DELETEING_ACCOUNT
    ? Number(process.env.EXPIRED_REQUEST_DELETEING_ACCOUNT)
    : 24 * 30,
  rabbitmqUrl,
  payoutToken:
    process.env.PAYOUT_TOKEN ||
    'Y2wzOXdnMXk0MDBndjB1dm9nd2M0YjFoYw.e2BKkjUlaAaeYUdUif7lc4aF0vtI72fKnftuJiF9Kt6qhv-fniX7ME9pdi0z',
  payoutUrl: process.env.PAYOUT_URL || 'https://development-earnings-api.eks.csp.scrum-dev.com',
  payoutAppId: process.env.PAYOUT_APP_ID || 'cl39vzx1l00gt0uvo1uneeh9f',
});
