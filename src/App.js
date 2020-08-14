import React, { useState } from 'react';
import './App.css';
import { Button, TextField, Container } from '@material-ui/core';

function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const getType = () => {
    fetch(`/type?name=${encodeURIComponent(name)}`,)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((jsonResponse) => {
      setType(jsonResponse);
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
          onClick={getType}
        >
          Submit
          </Button>
        <p className="type">{type}</p>
      </Container>
    </div>
  );
}

export default App;
