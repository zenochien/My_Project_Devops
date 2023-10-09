const ParseConfig = require('../ParseConfig');

const jobs = {};
module.exports = jobs;

Object.assign(jobs, {
  refreshParseConfigJob: ParseConfig.refreshParseConfig,
});
