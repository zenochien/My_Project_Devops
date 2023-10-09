const cronJobModule = {};
module.exports = cronJobModule;

const schedule = require('node-schedule');

/**
 *
 * @type {{schedule: string, name: string, job: function}[]}
 */
const cronJobs = [];

cronJobModule.runCronJobs = () => {
  return cronJobs.map((jobItem) =>
    schedule.scheduleJob(jobItem.schedule, () => {
      jobItem.job();
      console.log(`CRON JOB: Run ${jobItem.name} at ${new Date()}`);
    }),
  );
};
