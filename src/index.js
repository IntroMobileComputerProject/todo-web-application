import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/sign-in';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
  );