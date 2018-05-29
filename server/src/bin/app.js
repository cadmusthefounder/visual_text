// Middlewares.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const boom = require('boom');
const healthcheck = require('express-healthcheck');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup routes.
const topics = require('../routes/topics');
const questions = require('../routes/questions');

app.use('/topics', topics);
app.use('/questions', questions);
app.use('/healthcheck', healthcheck());

// Catch 404 and forward to error handler.
app.use((req, res, next) => {
  next(boom.notFound('No such path.'));
});

// Error handler.
app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    console.log(err.message);
    console.log(err.stack);
    const internal_server_error = boom.badImplementation();
    res.status(internal_server_error.output.statusCode).json(internal_server_error.output.payload);
  }
});

module.exports = app;