const express = require('express');
const http = require('http');
const helmet = require('helmet');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const { getInstance } = require('./utils/Rabbitmq');
const { parseServerConfig, parseDashboardConfig, resourcePathConfig, generalConfig } = require('./config');
const { addClientIp, setResponseHeader } = require('./middleware');
const { emailPasswordRouter, uploadRouter, exportBookingRouter, dowloadCSVRouter } = require('./router');
const { ParseServerLogger, addTimeStampInConsoleTransport, removeFileTransport } = require('./logger');
const ParseConfig = require('./cloud/ParseConfig');
const { NewNotificationMongoRepository } = require('./repositories/Notification');
const { NewInstallationMongoRepository } = require('./repositories/Installation');
const mongoDB = require('./db/mongoDB');
const { newNotificationService } = require('./services/NotifcationService');
const { NotificationModel, BookingModel, PostModel, ReviewModel } = require('./cloud/models');
const { NewReviewMongoRepository } = require('./repositories/Review');
const { NewBookingMongoRepository } = require('./repositories/Booking');
const { newReviewService } = require('./services/ReviewService');
const { NewStylistMongoRepository } = require('./repositories/Stylist');
const { newBookingService } = require('./services/BookingService');
const { metricMiddleware } = require('./utils/monitoring');
const couponService = require('./services/CouponService');
const payoutService = require('./services/PayoutService');

const app = express();
app.use(helmet());
if (generalConfig.enabledMonitoring) {
  app.use(metricMiddleware());
}
// middlewares
app.use(addClientIp());
app.all('/*', setResponseHeader());

// Host Parse API through Express.
const api = new ParseServer(parseServerConfig);
app.use(parseServerConfig.mountPath, uploadRouter(), api);

// Server dashboard
const dashboard = new ParseDashboard(parseDashboardConfig, {
  allowInsecureHTTP: parseDashboardConfig.allowInsecureHTTP,
  cookieSessionSecret: parseDashboardConfig.cookieSessionSecret,
});
app.use(parseDashboardConfig.mountPath, dashboard);

// Non-Parse web routes
app.get('/', function (req, res) {
  res.status(200).send('Oops! This is not the web page you are looking for.');
});
app.get('/health', (req, res) => res.status(200).send('Hello.'));

// Serve static assets from the /public folder
app.use('/public', express.static(resourcePathConfig.publicFolderPath));
app.use('/apidoc', express.static(resourcePathConfig.apidocPath));
app.use('/changelog', express.static(resourcePathConfig.changelogPath));

app.set('views', resourcePathConfig.viewPath);
app.set('view engine', 'pug');

// add routers
app.use('/', emailPasswordRouter());
app.use('/', exportBookingRouter());
app.use('/', dowloadCSVRouter());

// Attach function to app for starting the server.
const httpServer = http.createServer(app);
const port = process.env.PORT ? Number(process.env.PORT) : 1337;
addTimeStampInConsoleTransport();
removeFileTransport();

const initRepositories = async (mongoClient) => {
  return {
    notificationRepository: NewNotificationMongoRepository(ParseServerLogger, mongoClient),
    installationRepository: NewInstallationMongoRepository(ParseServerLogger, mongoClient),
    bookingRepository: NewBookingMongoRepository(ParseServerLogger, mongoClient),
    reviewRepository: NewReviewMongoRepository(ParseServerLogger, mongoClient),
    stylistRepository: NewStylistMongoRepository(ParseServerLogger, mongoClient),
  };
};

const initParseTrigger = (notificationService) => {
  if (!notificationService) {
    return;
  }

  Parse.Cloud.afterLogout(async (request) => {
    const { object: session } = request;
    const user = session.get('user');
    await user.fetch({ useMasterKey: true });
    const installationId = session.get('installationId');
    const installation = await new Parse.Query(Parse.Installation)
      .equalTo('installationId', installationId)
      .first({ useMasterKey: true });
    const deviceToken = installation ? installation.get('deviceToken') : undefined;
    await notificationService.removeDevice(
      { user: { id: user.id, role: user.get('role') } },
      installationId,
      deviceToken,
    );
  });
};

const initNotificationService = async ({ notificationRepository, installationRepository }) => {
  ParseServerLogger.info(`Init NotificationService ...`);

  let notificationService;
  {
    notificationService = newNotificationService(ParseServerLogger, notificationRepository, installationRepository);

    return notificationService;
  }
};

const initReviewService = async ({ reviewRepository, bookingRepository, stylistRepository }, mongoClient) => {
  ParseServerLogger.info(`Init ReviewService ...`);

  let reviewService;
  {
    reviewService = newReviewService(
      mongoClient,
      ParseServerLogger,
      reviewRepository,
      bookingRepository,
      stylistRepository,
    );

    return reviewService;
  }
};

const initBookingService = async ({ bookingRepository }, mongoClient) => {
  ParseServerLogger.info(`Init BookingService ...`);

  let bookingService;
  {
    bookingService = newBookingService(mongoClient, ParseServerLogger, bookingRepository);

    return bookingService;
  }
};

const initServer = async () => {
  ParseServerLogger.info(`Init server ...`);

  const mongoClient = await mongoDB.getClient();
  const repositories = await initRepositories(mongoClient);

  const notificationService = await initNotificationService(repositories);
  const reviewService = await initReviewService(repositories, mongoClient);
  const bookingService = await initBookingService(repositories, mongoClient);

  await initParseTrigger(notificationService);

  NotificationModel.init(notificationService);
  BookingModel.init(notificationService, bookingService);
  PostModel.init(notificationService);
  ReviewModel.init(reviewService, notificationService);
  couponService.init({
    privateKey: generalConfig.couponPrivateKey,
    urlServer: generalConfig.couponUrl,
    appId: generalConfig.couponAppId,
    passphrase: generalConfig.couponPassword,
  });
  payoutService.init({
    token: generalConfig.payoutToken,
    urlServer: generalConfig.payoutUrl,
    appId: generalConfig.payoutAppId,
  });
  // init rabbitmq
  const rabbitmqManager = getInstance();
  rabbitmqManager.initConnection({
    connectionName: 'publisher',
    url: generalConfig.rabbitmqUrl,
  });
  rabbitmqManager.initConnection({
    connectionName: 'consumer',
    url: generalConfig.rabbitmqUrl,
  });
  require('./listeners');
  return Promise.resolve();
};

const startServer = () => {
  return new Promise((resolve) => {
    ParseServerLogger.info(`Starting server on ${port} ...`);

    httpServer.listen(port, async () => {
      ParseServerLogger.info(`API Server running on ${parseServerConfig.publicServerURL}`);

      await ParseConfig.refreshParseConfig();

      resolve();
    });

    // live query & redis
    if (parseServerConfig.liveQuery) {
      const enabledRedis = process.env.PARSE_SERVER_ENABLED_REDIS ? Number(process.env.PARSE_SERVER_ENABLED_REDIS) : 0;
      if (enabledRedis) {
        ParseServer.createLiveQueryServer(httpServer, {
          redisURL: process.env.PARSE_SERVER_URL_LIVE_QUERY_REDIS || 'redis://127.0.0.1:6379/1',
        });
      } else {
        ParseServer.createLiveQueryServer(httpServer);
      }
    }
  });
};

module.exports = { httpServer, app, startServer, initServer };
