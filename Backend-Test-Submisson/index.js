const express = require('express');
const mongoose = require('mongoose');
const app = express();
const shortenerRoutes = require('./routes/shortener');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/api', shortenerRoutes);
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
  .then(() => app.listen(3000, () => console.log('Server running')))
  .catch(err => console.error('DB connection error:', err));
