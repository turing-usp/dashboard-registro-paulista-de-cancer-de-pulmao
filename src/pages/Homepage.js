import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, Card, CardContent, Divider } from '@material-ui/core';
import Navbar from '../components/Navbar'
import lungIcon from '../assets/lungs.png'
import TuringIcon from '../assets/logoTuring.png'
import HCLogo from '../assets/HCUSP.png'
import EINSTEIN from '../assets/EINSTEIN.png'
import SANTAPAULA from '../assets/SANTAPAULA.png'
import SIRIO from '../assets/SIRIO.png'
import UNIFESP from '../assets/UNIFESP.png'
import USPRIBEIRAO from '../assets/USPRIBEIRAO.png'
import REDEDOR from '../assets/REDEDOR.png'
import useStylesCreator from '../styles/styles'
import { Book, LocalHospital, Dashboard } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Home() {
  const classes = useStylesCreator()();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      <div className={classes.mainDiv}>
        <Grid container justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12}>
            <div className={classes.spacing} />
          </Grid>

          <Grid align="center" item xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid align={matchesMobile ? "center" : "right"} item xs={12}>
                    <Button href='/login' size="large" variant="outlined" color="primary">
                      Login
                    </Button>
                  </Grid>
                  {matchesMobile ? <Box m={1} /> : ""}
                  <Grid item xs={12}>
                    <div style={{ height: "20vh" }}>
                      <img style={{ height: "100%" }} src={lungIcon} />
                    </div>
                    <Box m={3} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant={matchesMobile ? "h5" : "h3"} color="primary" className={classes.title}>
                      Registro Paulista de Câncer de Pulmão
                    </Typography>
                    <Box m={3} />
                    <Divider />
                    <Box m={3} />
                  </Grid>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <LocalHospital color="primary" />
                    <Box m={3} />
                    <Typography color="secondary">
                      Mais de 6 hospitais paulistas
                    </Typography>
                    {matchesMobile ? <div><Box m={3} /><Divider /><Box m={3} /></div> : ""}
                  </Grid>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <Book color="primary" />
                    <Box m={3} />
                    <Typography color="secondary">
                      Registro de mais de 1500 pacientes com câncer de pulmão
                    </Typography>
                    {matchesMobile ? <div><Box m={3} /><Divider /><Box m={3} /></div> : ""}
                  </Grid>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <Dashboard color="primary" />
                    <Box m={3} />
                    <Typography color="secondary">
                      Dashboard interativo para hospitais paulistas contribuidores
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={3} />
                <Divider />
                <Box m={3} />
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                    O que é o Registro Paulista de Câncer de Pulmão?
                  </Typography>
                  <Box m={3} />
                  <Typography color="secondary">
                    O Registro Paulista de Câncer de Pulmão (RPCP) foi criado em 2013 com o
                    objetivo de implementar um banco de dados prospectivo e multicêntrico para
                    coleta de dados dos pacientes com câncer de pulmão tratados
                    cirurgicamente.  Atualmente, em sua segunda versão (RPCP II), o registro
                    conta com a participação de 8 instituições colaboradoras e mais de 1400 casos
                    inclusos.
                  </Typography>
                  <Box m={2} />
                  <Typography color="secondary">
                    Nossa missão é mapear e estudar como está sendo feito o tratamento do
                    câncer de pulmão no Brasil, e com isso promover melhorias no rastreamento,
                    identificação precoce e assistência médica aos pacientes e sobretudo coletar
                    dados de qualidade para apoiar pesquisas científicas sobre o tema em nosso
                    país.
                  </Typography>
                  <Box m={2} />
                  <Typography color="secondary">
                    Diante desse cenário, os fundadores do registro, Dra Leticia Lauricella e Dr
                    Ricardo Terra com o apoio do Turing USP (grupo de extensão da
                    Universidade de São Paulo que se dedica a estudar, aplicar e disseminar
                    Inteligência Artificial) criaram este site como forma de aumentar a adesão dos
                    centros participantes e ampliar a representatividade do RPCP no Brasil.
                  </Typography>
                </Grid>
                <Box m={3} />
                <Divider />
                <Box m={3} />
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                    Organização
                  </Typography>
                </Grid>
                <Box m={3} />
                <Grid container>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <Typography variant="h6" color="secondary">
                      Dr. Ricardo Terra
                    </Typography>
                  </Grid>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <Typography variant="h6" color="secondary">
                      Drª. Leticia Lauricella
                    </Typography>
                  </Grid>
                  <Grid item xs={matchesMobile ? 12 : 4}>
                    <Typography variant="h6" color="secondary">
                      Drª. Paula Duarte
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={3} />
                <Divider />
                <Box m={3} />
                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                    Apoio
                  </Typography>
                  <Box m={3} />
                  <Grid container>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "15vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={TuringIcon} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={HCLogo} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={EINSTEIN} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={SANTAPAULA} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "7vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={REDEDOR} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={SANTAPAULA} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "20vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={SIRIO} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "10vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={UNIFESP} />
                      </div>
                    </Grid>
                    <Grid item xs={matchesMobile ? 12 : 3}>
                      <div style={matchesMobile ? { height: "10vh" } : { width: "10vh" }}>
                        <img style={matchesMobile ? { height: "100%" } : { width: "100%" }} src={USPRIBEIRAO} />
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