import React from 'react';
import { render } from "react-dom";
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import App from './App';

const customTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#896beb',
    },
  },
  shape: {
    borderRadius: 12,
  }
});


const container = document.getElementById('app');

render(
  <ThemeProvider theme={customTheme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>,
  container,
);

