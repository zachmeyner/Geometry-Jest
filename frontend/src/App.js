import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect } from "react";

function App() {
  const getData = async () => {
    const response = await axios("http://localhost:8000/myrocket");
  console.log(response.data);
};
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Geometry Jest with Rust and React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
