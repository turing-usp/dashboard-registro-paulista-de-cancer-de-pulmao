import React from 'react';
import Routes from './routes';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: "#3db0fa"
    },
    secondary: {
      main: "#A2AEBB",
    },
  },
})  

function App() {
  return (
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
  )
}

export default App;
