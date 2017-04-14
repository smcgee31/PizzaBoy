'use strict';

const keys = require('../secretKeys');

module.exports = {
  PORT: keys.PORT,
  MONGO_URI: keys.MONGO_URI,
  SESSION_SECRET: keys.SESSION_SECRET
};
