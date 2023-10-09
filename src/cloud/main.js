const triggers = require('./triggers');
const functions = require('./functions');
const jobs = require('./jobs');
const { runCronJobs } = require('./cronJobs');

// Mapping triggers
Object.keys(triggers).forEach((triggerName) => {
  if (triggerName.startsWith('beforeSave')) {
    Parse.Cloud.beforeSave(triggers[triggerName]['class'], triggers[triggerName]['handler']);
  }
  if (triggerName.startsWith('afterSave')) {
    Parse.Cloud.afterSave(triggers[triggerName]['class'], triggers[triggerName]['handler']);
  }
  if (triggerName.startsWith('beforeDelete')) {
    Parse.Cloud.beforeDelete(triggers[triggerName]['class'], triggers[triggerName]['handler']);
  }
  if (triggerName.startsWith('afterDelete')) {
    Parse.Cloud.afterDelete(triggers[triggerName]['class'], triggers[triggerName]['handler']);
  }
});

// Mapping Cloud functions
for (const cloudFunctionName in functions) {
  Parse.Cloud.define(cloudFunctionName, functions[cloudFunctionName]);
}

// Define cloud jobs
for (const job in jobs) {
  Parse.Cloud.job(job, jobs[job]);
}

// Run cron jobs
runCronJobs();
