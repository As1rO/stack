const express = require('express');
const cors = require('cors');
const corsOptions = require('../config/cors');
const errorMiddleware = require('./errorsMiddleware');

const applyMiddlewares = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(errorMiddleware);
};

module.exports = applyMiddlewares;
