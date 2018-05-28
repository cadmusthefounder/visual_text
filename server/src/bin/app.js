// Middlewares.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const boom = require('boom');

const app = express();

// Setup CORS.
app.use(cors({  
  origin: ["http://localhost"],
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup database.
const db = require('../db/database');

// Setup routes.
const questions = require('../routes/questions')(db);
app.use('/questions', questions);

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