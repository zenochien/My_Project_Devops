const { getLogger } = require('parse-server/lib/logger');
const winstonLogger = require('parse-server/lib/Adapters/Logger/WinstonLogger').default;

const makeMultiParamsLogger = require('./makeMultiParamsLogger').default;
const { createConsoleLogFormat } = require('./ConsoleLogger');

const removeFileTransport = () => {
  const fileInfoTransport = winstonLogger.transports.find((t) => {
    return t.name === 'parse-server';
  });
  if (fileInfoTransport) {
    winstonLogger.remove(fileInfoTransport);
  }

  const fileErrorTransport = winstonLogger.transports.find((t) => {
    return t.name === 'parse-server-error';
  });
  if (fileErrorTransport) {
    winstonLogger.remove(fileErrorTransport);
  }
};

const addTimeStampInConsoleTransport = () => {
  const consoleTransport = winstonLogger.transports.find((t) => {
    return t.name === 'console';
  });
  if (consoleTransport) {
    consoleTransport.format = createConsoleLogFormat();
  }
};

const ParseServerLogger = makeMultiParamsLogger({
  error: (...args) => {
    return getLogger().log('error', args);
  },
  warn: (...args) => {
    return getLogger().log('warn', args);
  },
  info: (...args) => {
    return getLogger().log('info', args);
  },
  debug: (...args) => {
    return getLogger().log('debug', args);
  },
  verbose: (...args) => {
    return getLogger().log('verbose', args);
  },
  silly: (...args) => {
    return getLogger().log('silly', args);
  },
});

module.exports.default = ParseServerLogger;
module.exports.ParseServerLogger = ParseServerLogger;
module.exports.addTimeStampInConsoleTransport = addTimeStampInConsoleTransport;
module.exports.removeFileTransport = removeFileTransport;
