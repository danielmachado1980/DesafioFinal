import app from './app';
import redisConfig from './config/redis';

const redis = require('redis');

const redisClient = redis.createClient({ host: redisConfig.host, port: redisConfig.port });

redisClient.on('ready', () => {
  console.log('Redis is ready');
});

redisClient.on('error', () => {
  console.log('Error in Redis');
});

app.listen(3333, () => {
  console.log('Listening on Port 3333...');
});
