const winston = require('winston');
const makeMultiParamsLogger = require('./makeMultiParamsLogger').default;

const logLevel = process.env.PARSE_SERVER_LOG_LEVEL || 'info';

const createConsoleLogFormat = () =>
  winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ level, message, label, timestamp, stack }) => {
      return `${timestamp} | ${level} | ${label ? '[' + label + ']: ' : ''}${message}\n${stack ? stack : ''}`;
    }),
  );

const logger = makeMultiParamsLogger(
  winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: logLevel,
        handleExceptions: true,
        format: createConsoleLogFormat(),
      }),
    ],
  }),
);

module.exports.default = logger;
module.exports.ConsoleLogger = logger;
module.exports.createConsoleLogFormat = createConsoleLogFormat;
