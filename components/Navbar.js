import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import lungIcon from '../assets/lungs.png'
import {signOut} from '../controllers/login'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: "#ffffff",
    fontWeight: 800,
    marginLeft: theme.spacing(3)
  },
  loginButton: {
    color: "#ffffff"
  },
  lungIcon: {
    align: "center",
    margin: 'auto'
  },
  appBar: {
    width: "100%"
  }
}));


export default function Navbar({user}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)
  const logOut = async () => {
    await signOut(loading, setLoading);
  }
  console.log(Object.keys(user.attributes))
  return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Image width={40} height={40}  className={classes.lungIcon}  src={lungIcon}/>
          <Typography   variant="h5" className={classes.title}>
            Registro Paulista de Câncer de Pulmão
          </Typography>
          <Typography align="right"  variant="overline" className={classes.title}>
            {user.attributes.name} @ {user.attributes["custom:instituicao"]}
          </Typography>
          <IconButton disabled={loading} align="right" className={classes.loginButton} onClick={logOut}>
              <ExitToApp/>
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}