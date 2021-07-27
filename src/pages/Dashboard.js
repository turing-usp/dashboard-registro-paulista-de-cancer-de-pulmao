import React from 'react';
import { Grid, LinearProgress  } from '@material-ui/core';
import Navbar from '../components/Navbar'
import { Auth } from 'aws-amplify';
import init from '../controllers/configure'
import useStylesCreator from '../styles/styles'
import { useHistory } from "react-router-dom";
import ByAgeAndSexGraph from '../components/dashboard/ByAgeAndSexGraph'
import CharlsonGraph from '../components/dashboard/CharlsonGraph'


//await Auth.currentAuthenticatedUser()

export default function Dashboard() {
  init();
  const classes = useStylesCreator()();
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const history = useHistory();

  React.useEffect(() =>{
    async function getUser(){
      let authUser = await Auth.currentUserInfo();
      console.log(authUser)
      setUser(authUser);
      setLoaded(true);
    }
    getUser()
  }
  ,[loaded])
  ;
  if(loaded){
    if(user == null){
      return history.push('/login');
    }else{
      return (
        <>
        <div className={classes.mainDash}>
          <Navbar user={user}/>
          <Grid container spacing={3} className={classes.dashGrid} >
            <Grid item xs={6}>
              <ByAgeAndSexGraph instituicao={user.attributes['custom:instituicao']} dataKey="ecog"/>
            </Grid>
            <Grid item xs={6}>
              <ByAgeAndSexGraph instituicao={user.attributes['custom:instituicao']} dataKey="asa"/>
            </Grid>
            <Grid item xs={6}>
              <CharlsonGraph instituicao={user.attributes['custom:instituicao']}/>
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
