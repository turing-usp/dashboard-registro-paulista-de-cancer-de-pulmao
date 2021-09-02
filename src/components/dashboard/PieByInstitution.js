import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox, FormGroup, InputLabel, Grid, LinearProgress } from '@material-ui/core';
import { rollup, sum, map } from 'd3-array';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label, Tooltip, Legend } from 'recharts';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import { getDataByAgeAndSex } from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import { getDataAge } from '../../controllers/getData'

const COLORS = ['#8884d8', "#3db0fa", "#A2AEBB", "#C5D8D1", "#06BCC1", "#F4D1AE", "#3F3047", "#A22C29", "#E1BC29", "#4D9DE0", "#B0F2B4", "#542E71", "#A0CED9", "#C47AC0", "#EF8A17", "#EF2917"]

export default function PieByInstitution({ instituicao, dataKey, title }) {
    const classes = useStylesCreator()();
    const [params, setParams] = useState({ instituicao: instituicao, dataKey: dataKey })
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dataPrepared, setDataPrepared] = useState([]);

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataAge(params.dataKey, params.instituicao)
        console.log(dataGet);
        setData(dataGet)
        setLoaded(true)
        prepareData();

    }

    const prepareData = () => {
        let filtered = data
        let totals_obj = {}
        totals_obj[params.instituicao] = rollup(filtered, v => sum(v, d => d[params.instituicao]))
        totals_obj["Todos"] = rollup(filtered, v => sum(v, d => d["Todos"]))
        let dataGetReduced = rollup(
            filtered,
            v => Object.fromEntries(["Todos", params.instituicao].map(col => [col, sum(v, d => +d[col]) / totals_obj[col]])),
            d => d[params.dataKey]);
        console.log(dataGetReduced);
        let finalRechartsData = []
        dataGetReduced.forEach((key, value) => {
            let currentEntry = Object.fromEntries(dataGetReduced)[value]
            currentEntry[params.dataKey] = value
            finalRechartsData.push(currentEntry)
        })
        console.log(finalRechartsData);

        setDataPrepared(finalRechartsData)
    }

    useEffect(() => {
        getDataFromAgeRange();
    }, [loaded])

    return (
        <Box display="inline-block" width={'100%'} style={{ height: '100%', flexDirection: "column" }}>
            {loaded ?
                <Paper elevation={0} variant="outlined" style={{ height: '100%' }} >
                    <div style={{ height: "30%" }}>
                        <Typography variant="h5" color="secondary" style={{ alignItems: 'center', display: 'flex', marginLeft: 10, marginTop: 10, marginBottom: 30, letterSpacing: 1 }}>
                            <StopRoundedIcon color="primary" style={{ marginRight: 10 }} />
                            {title}
                        </Typography>
                    </div>
                    <div style={{ width: '100%', height: '70%', display: "flex", flexDirection: "column-reverse" }}>
                        <ResponsiveContainer width="99%" height="99%">
                            <PieChart width={500}
                                height={500}>
                                <Pie
                                    data={dataPrepared}
                                    cx="25%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#3db0fa"
                                    nameKey={params.dataKey}
                                    dataKey={params.instituicao}
                                    labelLine="true"
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))
                                    }
                                </Pie>
                                <Pie
                                    data={dataPrepared}
                                    nameKey={params.dataKey}
                                    cx="75%"
                                    cy="50%"
                                    outerRadius={90}
                                    fill="#A2AEBB"
                                    dataKey={"Todos"}
                                    labelLine={true}
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))
                                    }
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <Grid container>
                            <Grid item xs={6} align="center">
                                <Typography color="secondary" variant="h6">
                                    {params.instituicao}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} align="center">
                                <Typography color="secondary" variant="h6">
                                    Todos
                                </Typography>
                            </Grid>
                        </Grid>

                    </div>
                    <Box m={3} />
                </Paper>
                : <LinearProgress />}
        </Box>
    );
}