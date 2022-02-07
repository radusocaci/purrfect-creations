const app = require('express')();

const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());

const apiRouter = require('./routes/routes');

app.use('/api', apiRouter);

module.exports = app;
