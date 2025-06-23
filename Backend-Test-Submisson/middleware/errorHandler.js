const log = require('../../loggingMiddleware/logger');

module.exports = (err, req, res, next) => {
  log('backend', 'error', 'handler', err.message);
  res.status(400).json({ error: err.message });
};