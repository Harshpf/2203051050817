const Url = require('../models/urlModels');
const generateCode = require('../utils/generateCode');
const dayjs = require('dayjs');

async function createShortUrl(resUrl, validity, shortCode) {
  const code = shortCode || generateCode();
  const exists = await Url.findOne({ shortCode: code });
  if (exists) throw new Error('Shortcode already exists');

  const expiry = dayjs().add(validity || 30, 'minute').toDate();

  const url = new Url({
    originalUrl: resUrl,
    shortCode: code,
    expiry
  });
  await url.save();

  return {
    shortlink: `http://localhost:3000/api/${code}`,
    expiry: expiry.toISOString()
  };
}

async function handleRedirect(req) {
  const { code } = req.params;
  const url = await Url.findOne({ shortCode: code });
  if (!url) throw new Error('Shortcode not found');
  if (new Date() > url.expiry) throw new Error('Link expired');

  url.clicks.push({
    timestamp: new Date(),
    referrer: req.get('Referrer') || 'unknown',
    geo: 'IN' // mock geo
  });
  url.clickCount++;
  await url.save();

  return url.originalUrl;
}

async function getStats(code) {
  const url = await Url.findOne({ shortCode: code });
  if (!url) throw new Error('Shortcode not found');

  return {
    originalUrl: url.originalUrl,
    createdAt: url.createdAt.toISOString(),
    expiry: url.expiry.toISOString(),
    totalClicks: url.clickCount,
    clicks: url.clicks
  };
}

module.exports = {
  createShortUrl,
  handleRedirect,
  getStats
};