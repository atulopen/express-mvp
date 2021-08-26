const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./routes/V1/api');


const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;