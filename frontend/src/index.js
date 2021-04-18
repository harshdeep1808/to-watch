import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App';
import store from './store.js'

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

