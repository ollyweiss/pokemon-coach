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
    console.log(getMaxStrengths(['bug', 'flying']));
});


app.get('/types', (req, res) => {
    console.log("hi!!!");
    console.log(getMaxStrengths(['bug', 'flying']));
    const types = getTypes(req);
    if (types === undefined) {
        return res.status(400);
    }
    return res.status(200).send(JSON.stringify(types));
});


app.get('/weaknesses', (req, res) => {
    const type = req.query.type;
    const weaknesses = pokemonWeaknessesJson[type];
    return res.status(200).send(JSON.stringify(weaknesses));
});


app.get('/strengths', async (req, res) => {
    const type = req.query.type;
    const strengths = pokemonStrengthsJson[type];
    return res.status(200).send(JSON.stringify(strengths));
});


function getMaxStrengths(types) {
    const strengths_intersection = getTypesIntersection(types, pokemonStrengthsJson);
    const weaknesses_union = getTypesUnion(types, pokemonWeaknessesJson);
    return getDifference(strengths_intersection, weaknesses_union);
}


function getTypesUnion(types, json) {
    let a = new Set(json[types[0]]);
    let b = new Set();
    if (types.length > 1) {
        b = new Set(json[types[1]]);
    }
    return getUnion(a, b);
}


function getTypesIntersection(types, json) {
    let a = new Set(json[types[0]]);
    let b = new Set(json[types[0]]);
    if (types.length > 1) {
        b = new Set(json[types[1]]);
    }
    return getIntersection(a, b);
}


function getUnion(setA, setB) {
    return new Set([...setA, ...setB]);
}


function getIntersection(setA, setB) {
    new Set([...setA].filter(x => setB.has(x)));
}


function getDifference(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
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