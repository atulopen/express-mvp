const express = require('express');
const planetsRouter = require('../planets/planets.router');

const api = express.Router();

api.use('/planets', planetsRouter);


module.exports = api;
