import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, Card, CardContent, Divider  } from '@material-ui/core';
import Navbar from '../components/Navbar'
import lungIcon from '../assets/lungs.png'
import useStylesCreator from '../styles/styles'
import { Book, LocalHospital, Dashboard } from '@material-ui/icons';


export default function Home() {
    const classes = useStylesCreator()();
    return (
      <>
      <div className={classes.mainDiv}>
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12}>
            <div className={classes.spacing}/>
          </Grid>
          <Grid align="center" item xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div style={{height: "10vh"}}>
                  <img style={{height: "100%"}} className={classes.lungIcon}  src={lungIcon}/>
                </div>
                <Typography variant="h3" color="primary" className={classes.title}>
                  Registro Paulista de Câncer de Pulmão
                </Typography>
                <Button href='/login' size="large" variant="outlined" color="primary">
                  Login
                </Button>
                <Box m={3}/>
                
                <Box m={3}/>
                <Grid container>
                  <Grid item xs={4}>
                    <LocalHospital color="primary"/>
                    <Box m={3}/>
                    <Typography color="secondary">
                      Mais de 6 hospitais paulistas
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Book color="primary"/>
                    <Box m={3}/>
                    <Typography color="secondary">
                      Registro de mais de 1500 pacientes com câncer de pulmão
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Dashboard color="primary"/>
                    <Box m={3}/>
                    <Typography color="secondary">
                      Dashboard interativos para hospitais paulistas contribuidores
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={3}/>
                <Divider/>
                <Box m={10}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      </>
    )
  }