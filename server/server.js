const express = require('express');

const app = express();
const api = require('./api/api');
const config = require('./config/config');
require('mongoose').connect(config.db.url, { useNewUrlParser: true });

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);

module.exports = app;
