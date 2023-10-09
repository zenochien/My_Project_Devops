const middleware = {};
module.exports = middleware;

middleware.addClientIp = require('./addClientIp').default;
middleware.setResponseHeader = require('./setResponseHeader').default;
