const mongoDB = {};
module.exports = mongoDB;

const _ = require('lodash');
const { AppCache } = require('parse-server/lib/cache');
const { parseServerConfig } = require('../config/index');

let app = undefined;
let adapter = undefined;

/**
 * Get MongoStorageAdapter
 * @return {undefined|MongoStorageAdapter}
 */
const getAdapter = () => {
  if (adapter) {
    return adapter;
  }

  app = app || AppCache.get(parseServerConfig.appId);
  adapter = _.get(app, 'databaseController.adapter');
  return adapter;
};

/**
 * Get MongoClient
 * @return {Promise<MongoClient>}
 */
mongoDB.getClient = () => {
  const adapter = getAdapter();
  return adapter.connect().then(() => adapter.client);
};

/**
 * Get mongo DB
 * @return {Promise<Db>}
 */
mongoDB.getMongoDB = () => {
  const adapter = getAdapter();
  return adapter.connect().then(() => adapter.database);
};
