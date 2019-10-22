let kue = require('kue');

let Queue = kue.createQueue();

const scheduleJob = (data) => {
  Queue.createJob(data.jobName, data.params)
    .attempts(3)
    .delay(data.time - Date.now())
    .save();
};

module.exports = {
  scheduleJob,
};
