const envConfig = require('dotenv').config();
const { startServer, initServer } = require('./server');

(async function () {
  console.log('Env params', envConfig.parsed);
  try {
    await initServer();
    await startServer();
  } catch (error) {
    console.log('There is a error when start server: ', error);
    process.exit(1);
  }
})();
