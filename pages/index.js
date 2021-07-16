import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import lungIcon from '../assets/lungs.png'
import useStylesCreator from '../styles/styles'



export default function Home() {
  const classes = useStylesCreator()();
  return (
    <>
    <Head>
    <title>
      RPCP
    </title>
    </Head>
    <div className={classes.mainDiv}>
      <Grid container justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className={classes.spacing}/>
        </Grid>
        <Grid align="center" item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>
                <Image width={40} height={40}  className={classes.lungIcon}  src={lungIcon}/>
              </Typography>
              <Typography variant="h3" color="primary" className={classes.title}>
                Registro Paulista de Câncer de Pulmão
              </Typography>
              <Button href='/login' size="large" variant="outlined" color="primary">
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </>
  )
}
