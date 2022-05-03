import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Container } from "react-bootstrap";

//import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // adding boostrap css
ReactDOM.render(
  <React.StrictMode >
    <App />

    <div className="position-absolute h-100 w-100 mobileShow desktopHide fs-1">
      Website works on desktop only, for now...
    </div>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
