const axios = require('axios');

const LOG_API = 'http://20.244.56.144/evaluation-service/logs';

function log(stack, level, pkg, message) {
  return axios.post(LOG_API, {
    stack,
    level,
    package: pkg,
    message,
  }).catch(err => {
    console.error('Logging failed', err.message);
  });
}

module.exports = log;
