const express = require('express');
const router = require('./routes');
const { basicErrorHandler } = require('./errorHandler');

const app = express();

const bodyParsel = express.json();
app.use(bodyParsel);

app.use('/api', router);

app.use(basicErrorHandler);

module.exports = app;