import app from './app';
import redisConfig from './config/redis';
import mailConfig from './config/mail';

const redis = require('redis');

const redisClient = redis.createClient({ host: redisConfig.host, port: redisConfig.port });

const nodemailer = require('nodemailer');

const {
  host, port, secure, auth,
} = mailConfig;

redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.on('error', () => {
  console.log('Error in Redis');
});

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: 'danielgoncalves.machado@gmail.com',
    pass: 'dagomaeh@5300',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.listen(3333, () => {
  console.log('Listening on Port 3333...');
});
