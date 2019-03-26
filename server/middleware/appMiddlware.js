const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');

module.exports = function middleware(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(config.static));
};
