const makeMultiParamsFn =
  (originFn) =>
  (...args) => {
    return originFn(
      args.reduce((template, s) => {
        if (s) {
          if (template.length > 0) {
            template += ' ';
          }
          template += '%s';
        }
        return template;
      }, ''),
      ...args,
    );
  };

module.exports.default = (logger) => {
  ['error', 'warn', 'info', 'debug', 'verbose', 'silly'].forEach((t) => {
    if (logger[t]) {
      logger['_' + t] = logger[t];
      logger[t] = makeMultiParamsFn(logger[t]);
    }
  });

  return logger;
};
