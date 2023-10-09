const ParseConfig = {};
module.exports = ParseConfig;

const { ParseServerLogger } = require('../logger');
const Helper = require('../utils/helper');

const CONFIG_KEY = {
  CUSTOMER_ANDROID_VERSION: 'customerAndroidVersion',
  CUSTOMER_IOS_VERSION: 'customerIOSVersion',
  STYLIST_ANDROID_VERSION: 'stylistAndroidVersion',
  STYLIST_IOS_VERSION: 'stylistIOSVersion',
};
const hostName = process.env.HOSTNAME || Helper.randomString(10);

Object.assign(ParseConfig, {
  CONFIG_KEY,

  get: (key) => Parse.Config.current().get(key),
  getCurrentParseConfig: Parse.Config.current,
  refreshParseConfig: async () => {
    const result = Object.assign(
      {
        hostName,
      },
      await Parse.Config.get(),
    );
    ParseServerLogger.info('refreshParseConfig', JSON.stringify(result));

    return result;
  },
});
