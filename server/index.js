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
const pokemonStrengths = fs.readFileSync('./public/strengths.json').toString();
const pokemonStrengthsJson = JSON.parse(pokemonStrengths);


function parsePokemonFile() {
    const pokemonFile = fs.readFileSync('./public/pokemon.csv').toString();
    const pokemonList = pokemonFile.split('\n');

    let pokemonMap = new Map();
    pokemonList.forEach((pokemon) => {
        const typeList = pokemon.split(',');
        pokemonMap.set(typeList[1].toLowerCase(), typeList.slice(2,4).map((x) => x.toLowerCase()));
    })
    return pokemonMap;
}


app.get('/api/greeting', (req, res) => {
    let types = getTypes(req);
    console.log(types);
});


app.get('/type', (req, res) => {
    const type = getType(req);
    if (type === undefined) {
        return res.status(400);
    }
    return res.status(200).send(JSON.stringify(type));
})


app.get('/weaknesses', (req, res) => {
    const type = getType(req);
    if (type === undefined) {
        return res.status(400);
    }
    const weaknesses = pokemonWeaknessesJson[type];
    return res.status(200).send(JSON.stringify(weaknesses));
});


app.get('/strengths', async (req, res) => {
    const type = await getType(req);
    if (type === undefined) {
        return res.status(400);
    }
    const strengths = pokemonStrengthsJson[type];
    return res.status(200).send(JSON.stringify(strengths));
});


function getType(req) {
    const name = req.query.name.toLowerCase();
    let type = '';
    if (pokemonTypes.includes(name)) {
        type = name;
    } else if (containsPokemon(name)) {
        const currPokemon = getPokemon(name);
        type = pokemon.get(currPokemon)[0].toLowerCase();
    } else {
        return undefined;
    }
    return type;
}


function getTypes(req) {
    const name = req.query.name.toLowerCase();
    let types = [];
    if (pokemonTypes.includes(name)) {
        types = [name];
    } else if (containsPokemon(name)) {
        const currPokemon = getPokemon(name);
        types = pokemon.get(currPokemon);
        console.log(types);
        if (types[1] === '') {
            types = types.splice(0,1);
        }
    } else {
        return undefined;
    }
    return types;
}


function containsPokemon(input) {
    const options = Array.from(pokemon.keys());
    for (let i = 0; i < options.length; i++) {
        if (options[i].includes(input)) {
            return true;
        }
    }
    return false;
}


function getPokemon(input) {
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