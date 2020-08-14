const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());


app.get('/hey', async (req, res) => {
    const test = ["hi", "truffle"]
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(test));
});