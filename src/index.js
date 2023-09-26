import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextMain from './contextAPI/ContextMain';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
// import serviceWorker from "./serviceworker"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContextMain>
    <App />
      </ContextMain>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceworker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

reportWebVitals();

