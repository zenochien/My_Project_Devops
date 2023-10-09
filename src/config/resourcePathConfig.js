const resourcePathConfig = {};
module.exports.default = resourcePathConfig;
module.exports.resourcePathConfig = resourcePathConfig;

const path = require('path');

const srcDir = path.resolve(__dirname, '../');
const rootDir = path.resolve(srcDir, '../');
const viewPath = process.env.SERVER_VIEW_PATH || path.join(rootDir, './views');

Object.assign(resourcePathConfig, {
  srcDir,
  rootDir,
  publicFolderPath: process.env.SERVER_PUBLIC_FOLDER_PATH || path.join(rootDir, './public'),
  apidocPath: process.env.SERVER_APIDOC_PATH || path.join(rootDir, './apidoc/output'),
  changelogPath: process.env.SERVER_CHANGELOG_PATH || path.join(rootDir, './changelog'),
  viewPath,
  emailTemplatePath: path.join(viewPath, './emails'),
  pagePath: path.join(viewPath, './pages'),
});

console.log('Resource path config', resourcePathConfig);
