import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { useAsync } from "react-async-hook"
import lungIcon from '../../assets/lungs.png'
import { signOut } from '../../controllers/login'
import { useHistory } from 'react-router';
import { Auth } from 'aws-amplify';


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


const Navbar: FunctionComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)

  const { result: user } = useAsync(Auth.currentUserInfo, []);

  const logOut = async () => {
    await signOut(loading, setLoading, history);
  }


  return (
    <AppBar className={classes.appBar} color="secondary" position="relative">
      <Toolbar>
        <div style={{ height: "4vh" }}>
          <a href="/home">
            <img style={{ height: "100%" }} className={classes.lungIcon} src={lungIcon} />
          </a>
        </div>
        <Typography variant="h5" className={classes.title}>
          Registro Paulista de Câncer de Pulmão
        </Typography>
        {user && (
          <Typography align="right" variant="overline" className={classes.title}>
            {user.attributes.name} @ {user.attributes["custom:instituicao"]}
          </Typography>
        )}
        <IconButton disabled={loading} className={classes.loginButton} onClick={logOut}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar