import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, TextField, Container } from '@material-ui/core';

function App() {
  // Pokemon name
  const [name, setName] = useState('');
  // Type one - strengths and weaknesses
  const [typeOne, setTypeOne] = useState('');
  // Type two - strengths and weaknesses (may be undefined)
  const [typeTwo, setTypeTwo] = useState('');

  const getTypes = () => {
    fetch(`/types?name=${encodeURIComponent(name)}`)
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

  const getInfo = (types) => {
    fetch(`/info?types=${encodeURIComponent(JSON.stringify(types))}`)
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
          onClick={getTypes}
        >
          Submit
          </Button>
        <p className="type">{typeOne}</p>
        {getInfo([typeOne, typeTwo])}
        <p className="type">{typeTwo}</p>
      </Container>
    </div>
  );
}

export default App;
