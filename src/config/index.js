const configMap = {};
module.exports = configMap;

configMap.resourcePathConfig = require('./resourcePathConfig').default;
configMap.s3Config = require('./s3Config').default;
configMap.parseDashboardConfig = require('./parseDashboardConfig').default;
configMap.parseServerConfig = require('./parseServerConfig').default;
configMap.generalConfig = require('./generalConfig').default;
