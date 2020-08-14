const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());

const pokemonTypeFile = fs.readFileSync('./public/types.txt');
const pokemonTypes = pokemonTypeFile.split('\n');

const pokemonFile = fs.readFileSync('./public/pokemon.csv');


app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


app.get('/weaknesses', async (req, res) => {
    if (pokemonTypes.includes(req.body)) {
        console.log('wee');
    }

    // const test = ["hi", "truffle"]
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(test));
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);