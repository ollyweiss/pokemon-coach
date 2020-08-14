const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());

const pokemonTypeFile = fs.readFileSync('./public/types.txt');
const pokemonTypes = pokemonTypeFile.toString().split('\n');
const pokemon = parsePokemonFile();
const pokemonWeaknesses = fs.readFileSync('./public/weaknesses.json').toString();
const pokemonWeaknessesJson = JSON.parse(pokemonWeaknesses);


function parsePokemonFile() {
    const pokemonFile = fs.readFileSync('./public/pokemon.csv').toString();
    const pokemonList = pokemonFile.split('\n');

    let pokemonMap = new Map();
    pokemonList.forEach((pokemon) => {
        const typeList = pokemon.split(',');
        pokemonMap.set(typeList[1].toLowerCase(), typeList.slice(2,4));
    })
    return pokemonMap;
}


app.get('/api/greeting', async (req, res) => {
    let type = await getType(req);
    console.log(type);
    console.log(pokemonWeaknessesJson);
    console.log(pokemonWeaknessesJson[type]);
});


app.get('/type', async (req, res) => {
    const type = await getType(req);
    if (type === undefined) {
        return res.status(400);
    }
    return res.status(200).send(type);
})


app.get('/weaknesses', async (req, res) => {
    const type = await getType(req);
    if (type === undefined) {
        return res.status(400);
    }
    const weakness = pokemonWeaknessesJson[type];
    return res.status(200).send(weakness);
});


async function getType(req) {
    const name = req.query.name.toLowerCase();
    let type = '';
    if (pokemonTypes.includes(name)) {
        type = name;
    } else if (await containsPokemon(name)) {
        const currPokemon = await getPokemon(name);
        type = pokemon.get(currPokemon)[0].toLowerCase();
    } else {
        return undefined;
    }
    return type;
}


async function containsPokemon(input) {
    const options = Array.from(pokemon.keys());
    for (let i = 0; i < options.length; i++) {
        if (options[i].includes(input)) {
            return true;
        }
    }
    return false;
}


async function getPokemon(input) {
    const options = Array.from(pokemon.keys());
    for (let i = 0; i < options.length; i++) {
        if (options[i].includes(input)) {
            return input;
        }
    }
}


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);