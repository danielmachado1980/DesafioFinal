// Start Redis worker
const kue = require('kue');

const Queue = kue.createQueue();
const nodemailer = require('./nodemailer');

Queue.process('sendEmail', async (job, done) => {
  const { data } = job;
  console.log(`Imprimindo os dados do job ${data.email}`);
  await nodemailer.send(data);
  done();
});
