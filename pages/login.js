import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, TextField, Typography, Button, IconButton, Grid, Card, CardContent, LinearProgress  } from '@material-ui/core';
import Image from 'next/image'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import init from '../controllers/configure'
import Head from 'next/head'
import { signIn } from '../controllers/login'
import lungIcon from '../assets/lungs.png'
import Router from 'next/router'
import useStylesCreator from '../styles/styles'

export default function Login(){
    init();
    const classes = useStylesCreator()();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [state, setState] = React.useState({
        values: {
          loading: false,
          error: false
        }
      });
      console.log(state)
    const makeLogin = () => {
        signIn(username, password, state, setState)
    }
    return(
        <div className={classes.mainDivLogin}>
        <Head>
            <title>
                RPCP - Login
            </title>
        </Head>
        <Container>
            {state.values.loading?<LinearProgress/>:""}
            <Card className={classes.loginCard}>
                <CardContent>
                    <Grid align="center">
                        <Grid item xs={6} align="center">
                            <Typography>
                                <Image width={40} height={40}  className={classes.lungIcon}  src={lungIcon}/>
                            </Typography>
                            <Typography variant="h5" color="primary">
                                Registro Paulista de Câncer de Pulmão
                            </Typography>
                        </Grid> 
                        <Grid item xs={12} align="center">
                            <TextField
                            error={state.values.error}
                            label="Usuário"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <TextField
                            error={state.values.error}
                            helperText={state.values.error != false?state.values.error:""}
                            label="Senha"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button
                            className={classes.loginButton}
                            variant="outlined"
                            onClick={makeLogin} 
                            disabled={state.values.loading}
                            color="primary">
                                Entrar
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    </div>
    )
}