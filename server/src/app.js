const express = require('express');
const cors = require('cors');
const api = require('./routes/V1/api');


const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/v1', api);


module.exports = app;