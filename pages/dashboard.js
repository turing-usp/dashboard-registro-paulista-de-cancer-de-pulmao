import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Typography, Button, IconButton, LinearProgress  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Router from 'next/router'
import Amplify, { Auth } from 'aws-amplify';
import init from '../controllers/configure'
import getData from '../controllers/getData'
import useStylesCreator from '../styles/styles'
import ECOGGraph from '../components/dashboard/ECOGGraph'


//await Auth.currentAuthenticatedUser()

export default function Dashboard() {
  init();
  const classes = useStylesCreator()();
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [registerData, setRegisterData] = React.useState([]);

  React.useEffect(() =>{
    async function getUser(){
      let authUser = await Auth.currentUserInfo();
      let roi = await Auth.currentAuthenticatedUser();
      let registerDataget = await getData()
      console.log(registerDataget)
      setRegisterData(registerDataget)
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
        <>
        <div className={classes.mainDash}>
          <Navbar user={user}/>
          <Grid container spacing={3} className={classes.dashGrid} >
            <Grid item xs={6}>
              <ECOGGraph data={registerData} instituicao={user.attributes["custom:instituicao"]}/>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </div>
        </>
      )
    } 
  }else{
    return <LinearProgress className={classes.loading}/>;
  }
    
  
}
