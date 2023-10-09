const FIELD_CLIENT_IP = 'client-ip';

module.exports.FIELD_CLIENT_IP = FIELD_CLIENT_IP;

module.exports.default = function (options = {}) {
  const fieldClientIp = options.fieldName || FIELD_CLIENT_IP;

  return function (req, res, next) {
    if ('x-real-ip' in req.headers) {
      req.headers[fieldClientIp] = req.headers['x-real-ip'];
    } else if ('x-forwarded-for' in req.headers) {
      req.headers[fieldClientIp] = req.headers['x-forwarded-for'];
    } else {
      const ipParts = (':' + req.ip).split(':');
      req.headers[fieldClientIp] = ipParts[ipParts.length - 1];
    }

    next();
  };
};
