import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField,FormControl, InputLabel, Input, InputAdornment,  Typography, Button, IconButton, Grid, Card, CardContent, LinearProgress  } from '@material-ui/core';
import init from '../controllers/configure'
import { firstLogin } from '../controllers/login'
import lungIcon from '../assets/lungs.png'
import { useHistory } from "react-router-dom";
import useStylesCreator from '../styles/styles'
import {Visibility, VisibilityOff} from '@material-ui/icons';


export default function FirstLogin(){
    init();
    const history = useHistory();
    const classes = useStylesCreator()();
    const [passwordValues, setPasswordValues] = React.useState({
        username: '',
        oldPassword: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        error: false,
        loading: false
      });

    const verifyPassword = () => {
        if(passwordValues.password === passwordValues.confirmPassword){
            return true
        }else{
            return false
        }
    } 

    const changePasswordValues = (key, newValue) => {
        let prevPasswordValues = {...passwordValues};
        prevPasswordValues[key] = newValue;
        setPasswordValues(prevPasswordValues);
    }

    const makeChangePassword = () => {
        changePasswordValues("loading", true)
        let verify = verifyPassword()
        if(verify){
            firstLogin(passwordValues.username, passwordValues.oldPassword, passwordValues.password, history)
        }else{
            let prevPasswordValues = {...passwordValues}
            prevPasswordValues.error = true;
            setPasswordValues(prevPasswordValues);
        }
        changePasswordValues("loading", false)
    }

    return(
        <div className={classes.mainDivLogin}>
        <Container>
            {passwordValues.loading?<LinearProgress/>:""}
            <Card className={classes.loginCard}>
                <CardContent>
                    <Grid align="center">
                        <Grid item xs={12} align="center">
                            
                                <img className={classes.lungIcon} style={{width: '70%', margin: 'auto'}} src={lungIcon}/>
                        
                            <Typography variant="h5" color="primary">
                                Registro Paulista de Câncer de Pulmão
                            </Typography>
                            <Typography variant="body2" color="secondary">
                                Esse é seu primeiro acesso! Mude sua senha!
                            </Typography>
                        </Grid> 
                        <Grid item xs={12} align="center">
                        <FormControl className={classes.confirmInput}>
                            <InputLabel htmlFor="username">Usuário</InputLabel>
                            <Input
                            id="usuário"
                            type="text"
                            value={passwordValues.username}
                            onChange={(e) => {changePasswordValues("username", e.target.value)}}
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center">
                        <FormControl className={classes.confirmInput}>
                        <InputLabel htmlFor="old-password">Senha atual</InputLabel>
                            <Input
                            id="senha-atual"
                            type="password"
                            value={passwordValues.oldPassword}
                            onChange={(e) => {changePasswordValues("oldPassword", e.target.value)}}
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center">
                        <FormControl className={classes.confirmInput}>
                            <InputLabel htmlFor="password">Nova senha</InputLabel>
                            <Input
                                id="new-password"
                                type={passwordValues.showPassword ? 'text' : 'password'}
                                value={passwordValues.password}
                                onChange={(e) => {changePasswordValues("password", e.target.value)}}
                                error={passwordValues.error}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {changePasswordValues("showPassword", !passwordValues.showPassword)}}
                                    >
                                    {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>

                        </Grid>
                        
                        <FormControl className={classes.confirmInput}>
                            <InputLabel htmlFor="confirm-password">Confirmar nova senha</InputLabel>
                            <Input
                                id="confirm-new-password"
                                type={passwordValues.showPassword ? 'text' : 'password'}
                                value={passwordValues.confirmPassword}
                                error={passwordValues.error}
                                helperText={passwordValues.error != false?"Os campos não coincidem":""}
                                onChange={(e) => {changePasswordValues("confirmPassword", e.target.value)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {changePasswordValues("showPassword", !passwordValues.showPassword)}}
                                    >
                                    {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Grid item xs={12} align="center">
                            <Button
                            className={classes.loginButton}
                            variant="outlined"
                            onClick={makeChangePassword} 
                            disable={passwordValues.loading}
                            color="primary">
                                Mudar
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    </div>
    )
}
