const parseDashboardConfig = {};
module.exports.default = parseDashboardConfig;
module.exports.parseDashboardConfig = parseDashboardConfig;

const parseServerConfig = require('./parseServerConfig').default;

const defaultUsers = [
  {
    user: 'hairlie_testing',
    pass: '$2y$10$24boPe2ZvgAoXX9AQZ4hcu10dwr4bIjn7dOw0ByHE8nIAEyHIhR/G', // hairlie_dev123,
    readOnly: true,
  },
  {
    user: 'hairlie_admin',
    pass: '$2y$10$ygZx/wnaoIleG4kLuKXNNuet6vCQfF9NqAWloZQL0nEGt5Cs8qc3C', // hair@admin@123
    readOnly: false,
  },
];

Object.assign(parseDashboardConfig, {
  allowInsecureHTTP: true,
  cookieSessionSecret: process.env.PARSE_DASHBOARD_COOKIE_SESSION_SECRET || '4GxQ6pXClYDbB75A9UWqs5RIrqkaCQJJ',
  mountPath: process.env.DASHBOARD_MOUNT || '/dashboard',
  apps: [
    {
      serverURL: parseServerConfig.publicServerURL,
      appId: parseServerConfig.appId,
      masterKey: parseServerConfig.masterKey,
      readOnlyMasterKey: parseServerConfig.readOnlyMasterKey,
      javascriptKey: parseServerConfig.javascriptKey,
      restKey: parseServerConfig.restAPIKey,
      clientKey: parseServerConfig.clientKey,
      appName: parseServerConfig.appName,
    },
  ],
  users: process.env.DASHBOARD_USERS ? JSON.parse(process.env.DASHBOARD_USERS) : defaultUsers,

  // @link: https://bcrypt-generator.com
  useEncryptedPasswords: !!(process.env.DASHBOARD_ENCRYPTED_PASSWORD
    ? Number(process.env.DASHBOARD_ENCRYPTED_PASSWORD)
    : 1),
});
