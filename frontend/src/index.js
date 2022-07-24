import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import { BrowserRouter } from 'react-router-dom';
import initApp from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>{initApp()}</BrowserRouter>
  </React.StrictMode>
);
