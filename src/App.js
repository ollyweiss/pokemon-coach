import React, { useState } from 'react';
import './App.css';
import { Button, TextField, Container } from '@material-ui/core';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGreetingSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(state => setGreeting(state.greeting));
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
            onClick={handleGreetingSubmit}
          >
            Submit
          </Button>
        <p>{greeting}</p>
      </Container>
    </div>
  );
}

export default App;
