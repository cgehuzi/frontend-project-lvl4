import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import { BrowserRouter } from 'react-router-dom';
import initApp from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const appInstance = await initApp();

  root.render(
    <React.StrictMode>
      <BrowserRouter>{appInstance}</BrowserRouter>
    </React.StrictMode>
  );
};
app();
