const express = require('express');
const router = require('./routes');

const app = express();

const bodyParsel = express.json();
app.use(bodyParsel);

app.use('/api', router);

module.exports = app;