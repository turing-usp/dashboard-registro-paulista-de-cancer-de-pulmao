import React from 'react';
import { Container, TextField, Typography, Button, Grid, Card, CardContent, LinearProgress } from '@material-ui/core';
import init from '../controllers/configure'
import { signIn } from '../controllers/login'
import lungIcon from '../assets/lungs.png'
import useStylesCreator from '../styles/styles'
import { useHistory } from "react-router-dom";


export default function Login() {
    init();
    const classes = useStylesCreator()();
    const history = useHistory();
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
        signIn(username, password, state, setState, history)
    }
    return (
        <div className={classes.mainDivLogin}>
            {state.values.loading ? <LinearProgress /> : ""}
            {!state.values.loading ?
                <Container>
                    <Card className={classes.loginCard}>
                        <CardContent>
                            <Grid align="center">
                                <Grid item xs={6} align="center">
                                    <Typography>
                                        <img width={40} height={40} className={classes.lungIcon} src={lungIcon} />
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
                                        helperText={state.values.error != false ? state.values.error : ""}
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
                : ""}
        </div>
    )
}