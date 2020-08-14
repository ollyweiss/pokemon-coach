import React, { useState } from 'react';
import './App.css';

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
      <header className="App-header">
        <p>
          POKEMON COACH
        </p>
        <form
          onSubmit={handleGreetingSubmit}>
          <label htmlFor="name">Enter your name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => { setName(event.target.value) }}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default App;
