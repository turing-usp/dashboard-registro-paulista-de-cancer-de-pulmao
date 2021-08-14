import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, Card, CardContent, Divider  } from '@material-ui/core';
import Navbar from '../components/Navbar'
import lungIcon from '../assets/lungs.png'
import TuringIcon from '../assets/logoTuring.png'
import HCLogo from '../assets/HCUSP.png'
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
              <Grid container>
                <Grid align="right" item xs={12}>
                  <Button href='/login' size="large" variant="outlined" color="primary">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                <div style={{height: "20vh"}}>
                  <img style={{height: "100%"}}  src={lungIcon}/>
                </div>
                <Box m={3}/>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h3" color="primary" className={classes.title}>
                  Registro Paulista de Câncer de Pulmão
                </Typography>
                <Box m={3}/>
                <Divider/>
                <Box m={3}/>  
                </Grid>
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
                      Dashboard interativo para hospitais paulistas contribuidores
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={3}/>
                <Divider/>
                <Box m={3}/>
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                      O que é o Registro Paulista de Câncer de Pulmão?
                    </Typography>
                    <Box m={3}/>
                    <Typography color="secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
                    </Typography>
                </Grid>
                <Box m={3}/>
                <Divider/>
                <Box m={3}/>
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                      Organização
                    </Typography>
                </Grid>
                <Box m={3}/>
                <Grid container>
                  <Grid item xs={6}>
                  <Typography variant="h6" color="secondary">
                    Dr Ricardo Terra
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="secondary">
                    Dra Leticia Lauricella
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={3}/>
                <Divider/>
                <Box m={3}/>
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                    Apoio
                  </Typography>
                  <Box m={3}/>
                  <Grid container>
                    <Grid item xs={6}>
                    <div style={{height: "10vh"}}>
                      <img style={{height: "100%"}}  src={TuringIcon}/>
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                    <div style={{height: "10vh"}}>
                      <img style={{height: "100%"}}  src={HCLogo}/>
                    </div>
                    </Grid>
                    </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      </>
    )
  }