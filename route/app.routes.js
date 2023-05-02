  // Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');
const mongoose = require('mongoose');
const axios = require('axios');
const winston = require('winston');

//  Express app
const app = express();

// Redis client
const redisClient=redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

//  Winston logger
const logger = winston.createLogger({
  transports:[
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      level:'error',
      db: process.env.MONGO_URl,
      options:{
        useUnifiedTopology: true,
      },
      collection:'errors',
    }),
  ],
});
