import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import lungIcon from '../assets/lungs.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    color: "#ffffff"
  },
  lungIcon: {
    align: "center",
    margin: 'auto'
  }
}));


export default function Navbar() {
  const classes = useStyles();
  return (
      <AppBar position="static">
        <Toolbar>
          <Image width={40} height={40}  className={classes.lungIcon}  src={lungIcon}/>
          <Typography align="center"  variant="h5" className={classes.title}>
            Registro Paulista de Câncer de Pulmão
          </Typography>
          <IconButton align="right" className={classes.loginButton}>
              <ExitToApp/>
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}