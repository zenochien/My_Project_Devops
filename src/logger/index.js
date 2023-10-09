const logger = {};
module.exports = logger;

const ConsoleLogger = require('./ConsoleLogger').default;
const { ParseServerLogger, addTimeStampInConsoleTransport, removeFileTransport } = require('./ParseServerLogger');

logger.ConsoleLogger = ConsoleLogger;
logger.ParseServerLogger = ParseServerLogger;
logger.addTimeStampInConsoleTransport = addTimeStampInConsoleTransport;
logger.removeFileTransport = removeFileTransport;
