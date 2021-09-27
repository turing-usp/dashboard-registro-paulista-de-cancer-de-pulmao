import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, LinearProgress, Box, Grid, Card, CardContent, Divider  } from '@material-ui/core';
import Navbar from '../components/Navbar'
import init from '../controllers/configure'
import useStylesCreator from '../styles/styles'
import { useHistory } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import lungIcon from '../assets/lungs.png'
import CardHomePage from '../components/CardHomePage'
import HandymanIcon from '@mui/icons-material/Handyman';
import GavelIcon from '@mui/icons-material/Gavel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EqualizerIcon from '@mui/icons-material/Equalizer';
export default function LoginHomePage(){
    init();
    const classes = useStylesCreator()();
    const [loaded, setLoaded] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const history = useHistory();

    React.useEffect(() =>{
        async function getUser(){
          let authUser = await Auth.currentUserInfo();
          setUser(authUser);
          console.log(authUser)
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
            return(
                <div style={{backgroundColor: "#f0f2f4", minHeight: "46vw"}}>
                <Navbar user={user}/>
                <Grid spacing={2} style={{width: "80%", margin: "auto",  marginTop: "4vw"}} container>
                    <Grid item xs={12}>
                    <Box m={1} display="flex" alignItems="center" flexDirection="column">
                        <img src={lungIcon} style={{height: "5vw"}}/>
                        <Typography style={{fontWeight: 800}} variant="h4" color="primary"> 
                            Registro Paulista de Câncer de Pulmão
                        </Typography>
                    </Box>
                        
                    </Grid>
                    <Grid item xs={4}>
                        <CardHomePage 
                        name="Manual do RPCP" 
                        description="Como utilizar e registrar dados no Registro Paulista de Câncer de Pulmão"
                        path="/oi"
                        Icon={HandymanIcon}
                        buttonText="Baixar PDF"/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardHomePage 
                        name="Normatização do uso dos dados" 
                        description="Regras para utilização do Registro Paulista de Câncer de Pulmão"
                        path="/oi"
                        Icon={GavelIcon}
                        buttonText="Baixar word"/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardHomePage 
                        name="Dashboard" 
                        description="Gráficos interativos sobre os dados do registro, tanto globais globais quanto da sua instituição"
                        path="/dashboard"
                        Icon={DashboardIcon}
                        buttonText="Acessar"/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardHomePage 
                        name="Artigos" 
                        description="Artigos científicos viabilizados pelo RPCP"
                        path="/oi"
                        Icon={FindInPageIcon}
                        buttonText="Acessar"/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardHomePage 
                        name="Relatório de Qualidade" 
                        description="Relatório de qualidade do RPCP"
                        path="/oi"
                        Icon={EqualizerIcon}
                        buttonText="Acessar"/>
                    </Grid>
                </Grid>
                </div>
            )
        }
    }else{
        return <LinearProgress className={classes.loading}/>;
    }
}