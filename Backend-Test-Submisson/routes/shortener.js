const express = require('express');
const router = express.Router();
const urlService = require('../services/urlServices');
const log = require('../../loggingMiddleware/logger');

router.post('/shorturls', async (req, res, next) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.createShortUrl(url, validity, shortcode);
    res.json(result);
  } catch (err) {
    log('backend', 'error', 'shorten', err.message);
    next(err);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const result = await urlService.handleRedirect(req);
    res.redirect(result);
  } catch (err) {
    log('backend', 'error', 'redirect', err.message);
    next(err);
  }
});

router.get('/:code', async (req, res, next) => {
  try {
    const result = await urlService.getStats(req.params.code);
    res.json(result);
  } catch (err) {
    log('backend', 'error', 'stats', err.message);
    next(err);
  }
});

module.exports = router;