import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Provider} from 'react-redux'
// import ToggleModeProvider from './Utilis/ToggleColorMode'
import store from './App/store'
import ToggleColorModeProvider from './Utilis/ToggleColorMode';


 ReactDOM.createRoot(document.getElementById('root'))
 
 .render(
  <Provider store={store}>
    <ToggleColorModeProvider>
  <BrowserRouter>
      <App /> 
  </BrowserRouter>
</ToggleColorModeProvider>
  </Provider>, 
 
  );

  

