import React, { FunctionComponent } from 'react';
import { Typography, LinearProgress, Box, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar'
import init from '../controllers/configure'
import { useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';
import lungIcon from '../assets/lungs.png'
import CardHomePage from '../components/CardHomePage'
import HandymanIcon from '@mui/icons-material/Handyman';
import GavelIcon from '@mui/icons-material/Gavel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useAsync } from 'react-async-hook';
import Layout from "../components/Layout"

const LoginHomePage: FunctionComponent = () => {
    const history = useHistory();
    const { loading, result: user } = useAsync(Auth.currentUserInfo, []);

    if (loading)
        return <LinearProgress />;

    if (user === null) {
        history.push('/login');
        return <div></div>
    }

    return (
        <Layout>
            <Grid spacing={2} style={{display: 'flex', justifyContent: "space-between", width: "80%", margin: "auto", marginTop: "4vw" }} container>
                <Grid item xs={4} style={{display: 'flex'}}>
                    <CardHomePage
                        name="Manual do RPCP"
                        description="Como utilizar e registrar dados no Registro Paulista de Câncer de Pulmão"
                        path="/oi"
                        Icon={HandymanIcon}
                        buttonText="Baixar PDF" />
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    <CardHomePage
                        name="Normatização do uso dos dados"
                        description="Regras para utilização do Registro Paulista de Câncer de Pulmão"
                        path="/oi"
                        Icon={GavelIcon}
                        buttonText="Baixar word" />
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    <CardHomePage
                        name="Dashboard"
                        description="Gráficos interativos sobre os dados do registro, tanto globais globais quanto da sua instituição"
                        path="/dashboard"
                        Icon={DashboardIcon}
                        buttonText="Acessar" />
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    <CardHomePage
                        name="Artigos"
                        description="Artigos científicos viabilizados pelo RPCP"
                        path="/oi"
                        Icon={FindInPageIcon}
                        buttonText="Acessar" />
                </Grid>
                <Grid item xs={4} style={{display: 'flex'}}>
                    <CardHomePage
                        name="Relatório de Qualidade"
                        description="Relatório de qualidade do RPCP"
                        path="/oi"
                        Icon={EqualizerIcon}
                        buttonText="Acessar" />
                </Grid>
            </Grid>
        </Layout>
    )
}

export default LoginHomePage