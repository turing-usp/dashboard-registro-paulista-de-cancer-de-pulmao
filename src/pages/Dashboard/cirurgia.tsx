import React, { FunctionComponent } from "react"
import { useAsync } from "react-async-hook"
import DonnutsCountChart from "../../components/Charts/DonnutsCountChart"
import { AppBar, Toolbar, Card, Typography, Button, IconButton, Box, Paper, Grid, CardContent, Divider } from '@material-ui/core';
import lungIcon from '../assets/lungs.png'
import { GridSize } from "@material-ui/core/Grid";
import BarCountChart from "../../components/Charts/BarCountChart"
import Layout from "../../components/Layout"
import LoadingScreen from "../../components/LoadingScreen"
import { redcapData, RedcapRecord } from "../../controllers/getData"

const charts_data = (data: RedcapRecord[]) => [
    {
        title: 'Tipo de ressecção pulmonar realizada',
        xs:  "full",
        chart: <BarCountChart field='Tipo de ressecção pulmonar realizada' data={data} />
    },
    {
        title: 'Acesso realizado',
        xs:  "half",
        chart: <DonnutsCountChart field='Acesso realizado' data={data} />
    },
    {
        title: 'Para onde o paciente foi encaminhado?',
        xs:  "half",
        chart: <DonnutsCountChart field='Para onde o paciente foi encaminhado?' data={data} />
    },
    {
        title: 'Status na alta',// 'Óbito operatório?',
        xs: "half",
        chart: <DonnutsCountChart field='Status na alta' data={data} />
    },
]

const DashboardCirurgia: FunctionComponent = () => {
    const {
        loading,
        result: data
    } = useAsync(redcapData, [])

    if (loading)
        return <LoadingScreen />

    return (
        <Layout>
            <main style={{width: "90%", margin: "auto"}}>
                    <Typography style={{marginTop: "2vh", marginBottom: "3vh"}} variant="h4" color="primary">
                        Dashboards - Cirurgia
                    </Typography>
                <Grid container spacing={2} alignItems="stretch">
                    {charts_data(data!).map(chart => (
                        <Grid item xs={chart.xs=="half"?6:12} style={{display: "flex"}}>
                            <Card style={{width:"100%"}}>
                                <CardContent>
                                    <Typography variant="h6" color="primary">{chart.title}</Typography>
                                    {chart.chart}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </main>

        </Layout>
    )
}

export default DashboardCirurgia