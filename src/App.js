import React, { useState } from 'react';
import './App.css';
import { Button, TextField, Container } from '@material-ui/core';

function App() {
  // Pokemon name
  const [name, setName] = useState('');
  // Pokemon types for said pokemon
  const [typeOne, setTypeOne] = useState('');
  const [typeTwo, setTypeTwo] = useState('');

  const getTypes = () => {
    fetch(`/types?name=${encodeURIComponent(name)}`,)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((jsonResponse) => {
      if (jsonResponse.length === 2) {
        setTypeOne(jsonResponse[0]);
        setTypeTwo(jsonResponse[1]);
      }
      else {
        setTypeOne(jsonResponse[0]);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const getStrengths = (type) => {
    fetch(`/strengths?type=${encodeURIComponent(type)}`,)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getWeaknesses = (type) => {
    fetch(`/weaknesses?type=${encodeURIComponent(type)}`,)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
    }).catch((error) => {
      console.log(error);
    });
  }

  const showResults = async () => {
    await getTypes();
      // const typeOneStrengths = await getStrengths(typeOne);
      // const typeOneWeaknesses = await getWeaknesses(typeOne);
      // const typeTwoStrengths = await getStrengths(typeTwo);
      // const typeTwoWeaknesses = await getWeaknesses(typeTwo);
      // console.log(typeOneStrengths);
      // console.log(typeOneWeaknesses);
      // console.log(typeTwoStrengths);
      // console.log(typeTwoWeaknesses);
  }

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Raleway" rel="stylesheet">
      </link>
      <header className="header">
        <p>
          Pokemon Coach
        </p>
      </header>
      <Container fixed>
        <form>
          <label className="label" htmlFor="name">Enter the Pokemon: </label>
          <TextField
            className="input"
            id="filled-basic"
            variant="filled"
            value={name}
            onChange={(event) => { setName(event.target.value) }}
          />
        </form>
        <Button
          mt={5}
          type="submit"
          variant="contained"
          color="primary"
          onClick={showResults}
        >
          Submit
          </Button>
        <p className="type">{typeOne}</p>
        {typeOne && typeTwo && <div className="type">&</div>}
        <p className="type">{typeTwo}</p>
      </Container>
    </div>
  );
}

export default App;
