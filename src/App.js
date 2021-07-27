import React from 'react';
import Routes from './routes';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: "#23B5D3"
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
