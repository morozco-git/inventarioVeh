import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


axios.defaults.baseURL = 'https://inventarioveh.000webhostapp.com/Apis';
//axios.defaults.baseURL = 'http://localhost:8000/';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);
reportWebVitals();
