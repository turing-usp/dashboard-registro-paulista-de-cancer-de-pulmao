import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox,Grid, FormControl, MenuItem, InputLabel, Select, LinearProgress } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getSurvivalGlobal} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import {getDataAge} from '../../controllers/getData'

const COLORS = ['#8884d8', "#3db0fa", "#A2AEBB", "#C5D8D1", "#06BCC1", "#F4D1AE", "#3F3047", "#A22C29", "#E1BC29", "#4D9DE0", "#B0F2B4", "#542E71", "#A0CED9", "#C47AC0", "#EF8A17", "#EF2917"]


export default function KMGraph({instituicao, title}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao})
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState("tnm_patologico__8a_edicao");

    const getDataSurvival = async () => {
        let cats = ["sexo","tnm_patologico__8a_edicao","tnm_clinico___8a_edicao"]
        let records = {'instituicao': {}, 'todos': {}}
        for(var i =0; i < cats.length; i++){
            let dataGet = await getSurvivalGlobal(params.instituicao, cats[i])
            records['instituicao'][cats[i]] = dataGet['instituicao'][cats[i]]
            records['todos'][cats[i]] = dataGet['todos'][cats[i]]

            
        }
        setData(records)
        setLoaded(true)
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
      };

    useEffect(() => {
        getDataSurvival()
    }, [loaded])

    return(
        <Box display="inline-block" width={'100%'} style={{height:'100%', flexDirection: "column"}}>
            {loaded?
            <Paper elevation={0} variant="outlined" style={{height:'100%'}} >
            <div style={{height: "30%"}}>
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    {title}
                </Typography>
                <div style={{width: "80%", margin: "auto"}}> 
                    <FormControl className={classes.formControl}>
                        <InputLabel id="filter-km">Filtro</InputLabel>
                        <Select
                        labelId="filter-km"
                        id="filter-km-id"
                        value={filter}
                        onChange={handleChange}
                        >
                        <MenuItem value={"sexo"}>Sexo</MenuItem>
                        <MenuItem value={"tnm_patologico__8a_edicao"}>Estadio patológico (8ª edição)</MenuItem>
                        <MenuItem value={"tnm_clinico___8a_edicao"}>Estadio clínico (8ª edição)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                </div>
                <div style={{width: '100%', height:'65%',  display: "flex", flexDirection: "column-reverse"}}>
                <div style={{width: '100%', height:'100%',  display: "flex"}}>
                <ResponsiveContainer width={'48%'} height={'85%'}>
                    <LineChart width={200} height={200} data={data['instituicao'][filter]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="timeline" label={{ value: "Meses",  dy: 20}} />
                        <YAxis  label={{ value: "KM estimate", angle: -90, dx: -20}}/>
                        <Tooltip />
                        <Legend wrapperStyle={{ position: 'relative' }}/>
                        {Object.keys(data['instituicao'][filter][0]).map((category, index) => {
                            if(category != "timeline"){
                                return(
                                    <Line type="monotone" dataKey={category} stroke={COLORS[index]}/>
                                )
                            }
                        })}
                    </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer width={'48%'} height={'85%'}>
                    <LineChart width={200} height={200} data={data['todos'][filter]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="timeline" label={{ value: "Meses",  dy: 20}} />
                        <YAxis  label={{ value: "KM estimate", angle: -90, dx: -20}}/>
                        <Tooltip />
                        <Legend wrapperStyle={{ position: 'relative' }} />
                        {Object.keys(data['todos'][filter][0]).map((category, index) => {
                            if(category != "timeline"){
                                return(
                                    <Line type="monotone" dataKey={category} stroke={COLORS[index]}/>
                                )
                            }
                        })}
                    </LineChart>
                </ResponsiveContainer>
                </div>
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
                <Box m={3}/>
                </Paper>
            :<LinearProgress/>}
        </Box>
    )
}
