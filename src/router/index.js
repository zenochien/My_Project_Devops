const routers = {};
module.exports = routers;

routers.emailPasswordRouter = require('./emailPasswordRouter').default;
routers.uploadRouter = require('./uploadRouter').default;
routers.exportBookingRouter = require('./exportBookingRouter').default;
routers.dowloadCSVRouter = require('./dowloadCSVRouter').default;
