import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState();

  const callBackend = () => {
    axios.get(`/api/greeting`)
      .then(response => setData(response.data.greeting));
  }

  callBackend();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          POKEMON COACH
        </p>
        {data}
      </header>
    </div>
  );
}

export default App;
