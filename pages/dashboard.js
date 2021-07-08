import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import Navbar from '../components/Navbar'

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


export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar/>
    </div>
  )
}
