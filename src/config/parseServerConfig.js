const path = require('path');
const parseServerConfig = {};
module.exports.default = parseServerConfig;
module.exports.parseServerConfig = parseServerConfig;

const { S3Adapter } = require('parse-server');

const s3Config = require('./s3Config').default;
const resourcePathConfig = require('./resourcePathConfig').default;
const CombinedCacheAdapter = require('../parse-adapter/cache-adapter/CombinedCacheAdapter').default;
const ParseEmailAdapter = require('../parse-adapter/email-adapter/ParseEmailAdapter').default;

// MongoDB connection string
const databaseUri = process.env.DB_URI || '';

if (!databaseUri) {
  console.log('DB_URI not specified.');
  process.exit();
}

Object.assign(parseServerConfig, {
  cloud: './src/cloud/main.js',
  mountPath: process.env.PARSE_MOUNT || '/api',
  databaseURI: databaseUri,
  appName: process.env.PARSE_SERVER_APP_NAME || 'HairlieApi',
  appId: process.env.PARSE_SERVER_APP_ID || 'fStnK7Sfr3Ms31Zorkslj3KVowHV5WJU',
  masterKey: process.env.PARSE_SERVER_MASTER_KEY || 'Mz1alyHG6eTgBUT2JogeV6k88pZidlZY',
  readOnlyMasterKey: process.env.PARSE_SERVER_READ_ONLY_MASTER_KEY || '79H9q6TmoxSGfED2zy56ao9hFvVD1dWb',
  serverURL: process.env.PARSE_SERVER_URL || 'http://localhost:1337/api', // should localhost
  publicServerURL: process.env.PARSE_PUBLIC_SERVER_URL || 'http://localhost:1337/api',
  restAPIKey: process.env.PARSE_SERVER_REST_API_KEY || 'IBAj1RT7TJsJ6GV8o1538sLtq7Bz9Y1e',
  clientKey: process.env.PARSE_SERVER_CLIENT_KEY || 'h7F5syRyXF4Rqgf9ArKMIabTQ5WhgTpt', //  Key for iOS, MacOS, tvOS clients
  javascriptKey: process.env.PARSE_SERVER_JAVASCRIPT_KEY || '93roOyLiGoaggZ3CvrifBwIH3biQplbX', // Key for the Javascript SDK
  maxUploadSize: process.env.PARSE_SERVER_MAX_UPLOAD_SIZE || '100mb',
  enableSingleSchemaCache: !!(process.env.PARSE_SERVER_ENABLE_SINGLE_SCHEMA_CACHE
    ? Number(process.env.PARSE_SERVER_ENABLE_SINGLE_SCHEMA_CACHE)
    : 1),
  schemaCacheTTL: process.env.PARSE_SERVER_SCHEMA_CACHE_TTL
    ? Number(process.env.PARSE_SERVER_SCHEMA_CACHE_TTL)
    : 24 * 60 * 60 * 1000,
  cacheTTL: process.env.PARSE_SERVER_CACHE_TTL ? Number(process.env.PARSE_SERVER_CACHE_TTL) : 60 * 1000,
  sessionLength: process.env.PARSE_SERVER_SESSION_LENGTH
    ? Number(process.env.PARSE_SERVER_SESSION_LENGTH)
    : 30 * 24 * 3600, // Defaults to 2592000 seconds (1 month)
  allowClientClassCreation: !!(process.env.PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION
    ? Number(process.env.PARSE_SERVER_ALLOW_CLIENT_CLASS_CREATION)
    : 0),
  enableAnonymousUsers: false,
  passwordPolicy: {
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@^_`{|}~\[\]]{8,}$/,
  },
  verbose: !!(process.env.PARSE_SERVER_VERBOSE ? Number(process.env.PARSE_SERVER_VERBOSE) : 1),
  logLevel: process.env.PARSE_SERVER_LOG_LEVEL || 'info', // 'info', 'error', 'warn', 'verbose', 'debug'
  allowHeaders: ['x-parse-platform'],
});

// LIVE QUERY
const enabledLiveQuery = process.env.PARSE_SERVER_ENABLED_LIVE_QUERY
  ? Number(process.env.PARSE_SERVER_ENABLED_LIVE_QUERY)
  : 0;
if (enabledLiveQuery) {
  const strLiveQueryClassNames = process.env.PARSE_SERVER_LIVE_QUERY_CLASS_NAMES;
  parseServerConfig.liveQuery = {
    // List of classes to support for query subscriptions
    classNames: (strLiveQueryClassNames ? strLiveQueryClassNames.split(',') : '') || [],
  };
}

// redis
const enabledRedis = process.env.PARSE_SERVER_ENABLED_REDIS ? Number(process.env.PARSE_SERVER_ENABLED_REDIS) : 0;
if (enabledRedis) {
  const redisOptions = { url: process.env.PARSE_SERVER_URL_CACHE_REDIS || 'redis://127.0.0.1:6379/0' };
  parseServerConfig.cacheAdapter = new CombinedCacheAdapter(
    redisOptions,
    process.env.PARSE_SERVER_REDIS_TTL ? Number(process.env.PARSE_SERVER_REDIS_TTL) : 60 * 1000,
    { schemaCacheTTL: parseServerConfig.schemaCacheTTL, cacheMaxSize: parseServerConfig.cacheMaxSize },
  );

  if (parseServerConfig.liveQuery) {
    parseServerConfig.liveQuery.redisURL = process.env.PARSE_SERVER_URL_LIVE_QUERY_REDIS || 'redis://127.0.0.1:6379/1';
  }
}

// S3 FilesAdapter
const enabledS3Adapter = process.env.PARSE_SERVER_ENABLED_S3_ADAPTER
  ? Number(process.env.PARSE_SERVER_ENABLED_S3_ADAPTER)
  : 1;
if (enabledS3Adapter) {
  parseServerConfig.filesAdapter = new S3Adapter(s3Config.accessKey, s3Config.secretKey, s3Config.bucket, {
    bucketPrefix: s3Config.bucketPrefix,
    region: s3Config.region,
    directAccess: s3Config.directAccess,
  });
}

const enabledPushNotification = process.env.PARSE_SERVER_ENABLED_PUSH
  ? Number(process.env.PARSE_SERVER_ENABLED_PUSH)
  : 0;
if (enabledPushNotification) {
  const pushConfig = {
    ios: [
      {
        pfx: path.join(__dirname, '../', 'keys', process.env.PARSE_SERVER_PUSH_IOS_PFX_PATH_CUSTOMER), // Prod PFX or P12
        bundleId: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_CUSTOMER,
        topic: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_CUSTOMER,
        passphrase: process.env.PARSE_SERVER_PUSH_IOS_PASSPHRASE_CUSTOMER, // optional password to your p12/PFX
        production: true,
      },
      {
        pfx: path.join(
          __dirname,
          '../',
          'keys',
          process.env.PARSE_SERVER_PUSH_IOS_PFX_PATH_CUSTOMER_DEV || 'customer.dev.apn.certificate.p12',
        ), // Prod PFX or P12
        bundleId: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_CUSTOMER_DEV || 'com.c2c-platform.hairlie.customer.dev1',
        topic: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_CUSTOMER_DEV || 'com.c2c-platform.hairlie.customer.dev1',
        passphrase: process.env.PARSE_SERVER_PUSH_IOS_PASSPHRASE_CUSTOMER_DEV || 'auU92wUyRdFuLRMNUDlPSm8r', // optional password to your p12/PFX
        production: false,
      },
      {
        pfx: path.join(__dirname, '../', 'keys', process.env.PARSE_SERVER_PUSH_IOS_PFX_PATH_STYLIST), // Prod PFX or P12
        bundleId: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_STYLIST,
        topic: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_STYLIST,
        passphrase: process.env.PARSE_SERVER_PUSH_IOS_PASSPHRASE_STYLIST, // optional password to your p12/PFX
        production: true,
      },
      {
        pfx: path.join(
          __dirname,
          '../',
          'keys',
          process.env.PARSE_SERVER_PUSH_IOS_PFX_PATH_STYLIST_DEV || 'stylist.dev.apn.certificate.p12',
        ), // Prod PFX or P12
        bundleId: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_STYLIST_DEV || 'com.c2c-platform.hairlie.stylist.dev',
        topic: process.env.PARSE_SERVER_PUSH_IOS_BUNDLE_ID_STYLIST_DEV || 'com.c2c-platform.hairlie.stylist.dev',
        passphrase: process.env.PARSE_SERVER_PUSH_IOS_PASSPHRASE_STYLIST_DEV || 'LGh5gRx2LD6fFCitjXLIthJB', // optional password to your p12/PFX
        production: false,
      },
    ],
  };

  if (process.env.PARSE_SERVER_PUSH_ANDROID_SENDER_ID) {
    pushConfig.android = {
      senderId: process.env.PARSE_SERVER_PUSH_ANDROID_SENDER_ID,
      apiKey: process.env.PARSE_SERVER_PUSH_ANDROID_API_KEY,
    };
  }

  parseServerConfig.push = pushConfig;
}

const enabledEmailAdapter = process.env.PARSE_SERVER_ENABLED_EMAIL_ADAPTER
  ? Number(process.env.PARSE_SERVER_ENABLED_EMAIL_ADAPTER)
  : 0;
if (enabledEmailAdapter) {
  parseServerConfig.verifyUserEmails = !!(process.env.PARSE_SERVER_VERIFY_USER_EMAILS
    ? Number(process.env.PARSE_SERVER_VERIFY_USER_EMAILS)
    : 0);
  parseServerConfig.emailVerifyTokenValidityDuration = process.env.PARSE_SERVER_EMAIL_VERIFY_TOKEN_DURATION
    ? Number(process.env.PARSE_SERVER_EMAIL_VERIFY_TOKEN_DURATION)
    : 2 * 60 * 60; // in seconds (2 hours = 7200 seconds)
  parseServerConfig.passwordPolicy.resetTokenValidityDuration = process.env.PARSE_SERVER_EMAIL_RESET_TOKEN_DURATION
    ? Number(process.env.PARSE_SERVER_EMAIL_RESET_TOKEN_DURATION)
    : 2 * 60 * 60; // in seconds (2 hours = 7200 seconds)
  parseServerConfig.preventLoginWithUnverifiedEmail = !!(process.env.PARSE_SERVER_PREVENT_LOGIN_UNVERIFIED_EMAIL
    ? Number(process.env.PARSE_SERVER_PREVENT_LOGIN_UNVERIFIED_EMAIL)
    : 0); // defaults to false

  parseServerConfig.emailAdapter = new ParseEmailAdapter({
    emailTemplatePath: resourcePathConfig.emailTemplatePath,
  });
}

parseServerConfig.customPages = {
  parseFrameURL: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/handleEmailPassword',
  choosePassword: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/resetPassword',
  invalidLink: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/invalidLink',
  passwordResetSuccess: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/passwordResetSuccess',
  invalidVerificationLink: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/invalidVerificationLink',
  verifyEmailSuccess: (process.env.PARSE_SERVER_DOMAIN_NAME || '') + '/verifyEmailSuccess',
};
