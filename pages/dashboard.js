import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, LinearProgress  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Router from 'next/router'
import Amplify, { Auth } from 'aws-amplify';
import init from '../controllers/configure'
import useStylesCreator from '../styles/styles'


//await Auth.currentAuthenticatedUser()

export default function Dashboard() {
  init();
  const classes = useStylesCreator()();
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState(false);
  React.useEffect(() =>{
    async function getUser(){
      let authUser = await Auth.currentUserInfo();
      setUser(authUser);
      setLoaded(true);
    }
    getUser()
  }
  ,[loaded])
  ;
  
  if(loaded){
    if(user == null){
      return Router.push('/login');
    }else{
      return (
        <div className={classes.mainDash}>
          <Navbar user={user}/>
          // aqui vai o dashboard
        </div>
      )
    } 
  }else{
    return <LinearProgress className={classes.loading}/>;
  }
    
  
}
