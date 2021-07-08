import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid, Card, CardContent  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Image from 'next/image'
import Navbar from '../components/Navbar'
import lung from '../assets/lungPicture.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,    
  },
  title: {
    flexGrow: 1,
    fontWeight: 1000,
    marginBottom: theme.spacing(3)
  },
  card: {
    margin: "auto",
    width: "60%"
  },
  spacing: {
    marginTop: theme.spacing(5)
  },
  cardContent: {
    align: "center"
  }
}));


export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid alignContent="center" alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <div className={classes.spacing}/>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h3" color="primary" className={classes.title}>
                Registro Paulista de Câncer de Pulmão
              </Typography>
              <Button size="large" variant="outlined" color="primary">
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
