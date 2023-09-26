require('dotenv').config()

const express = require('express');
const router = require('./routes');
const cors = require('cors');
const { basicErrorHandler } = require('./errorHandler');
const { STATIC_PATH } = require('./config/path.config')

const app = express();
app.use(cors());

const bodyParsel = express.json();
app.use(bodyParsel);

app.use(express.static(STATIC_PATH));

app.use('/api', router);

// app.use(basicErrorHandler);

module.exports = app;