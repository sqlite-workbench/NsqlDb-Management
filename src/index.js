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
reportWebVitals();
// serviceWorker.register()
