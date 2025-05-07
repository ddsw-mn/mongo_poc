const express = require('express');

const routes = require('./router');

const app = express();

app.use(routes);

module.exports = app;
