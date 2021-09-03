import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox, FormGroup, InputLabel, Select, LinearProgress } from '@material-ui/core';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import {getComorbidades} from '../../controllers/getData'
import { rollup, sum, map } from 'd3-array';
import { toPercentage } from "./PieByInstitution";


export default function ComorbidadesChart({instituicao, title}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao})
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dataPrepared, setDataPrepared] = useState([]);
    const [sex, setSex] = useState({feminino: true, masculino: true});
    const [age, setAge] = useState({"0 - 40": true, "40 - 50": true, "50 - 60": true, "60 - 70": true, "70 - 80": true, "80 - 150": true});

    const handleChangeSex = (event) => {
        setSex({ ...sex, [event.target.name]: event.target.checked });

    }

    const handleChangeAge = async (event) => {
        setAge({ ...age, [event.target.name]: event.target.checked });
    }

    const getDataComorbidades= async () => {
        let dataGet = await getComorbidades(params.instituicao)
        setData(dataGet)
        setLoaded(true)
        prepareData();

    }
    
    const isFiltered = (entry) => {
        return sex[entry.sexo] && age[entry.grupo_idade_na_cirurgia]
    }

    const prepareData = () => {
        console.log(data)
        let filtered = data.filter(isFiltered);
        
        let dataGetReduced = rollup(
                    filtered, 
                    v => Object.fromEntries(["Todos", params.instituicao].map(col => [col, sum(v, d => +d[col])])), 
                    d => d["comorbidade"]);
        console.log(dataGetReduced)
        let finalRechartsData = []
        dataGetReduced.forEach((key, value) => {
            let currentEntry = Object.fromEntries(dataGetReduced)[value]
            currentEntry["comorbidade"] = value
            finalRechartsData.push(currentEntry)
        })
        console.log(finalRechartsData)
        setDataPrepared(finalRechartsData)
    }

    useEffect(() => {
        getDataComorbidades();
    },[loaded])

    useEffect(() => {
        prepareData();
    },[sex])

    useEffect(() => {
        prepareData();
    },[age])

//<BarChartByInstitution data={dataPrepared} dataKey={"comorbidade"} instituicao={params.instituicao}/>
    return(
        <Box display="inline-block" width={'100%'} style={{height:'100%', flexDirection: "column"}}>
            {loaded?
            <Paper elevation={0} variant="outlined" style={{height:'100%'}} >
            <div style={{height: "30%"}}>
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    {title}
                </Typography>
                <div style={{width: "90%", margin: "auto"}}>
                    <Typography color="secondary" id="ecog-age-slider" gutterBottom>
                        Sexo
                    </Typography>
                    <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={sex.feminino} onChange={handleChangeSex} name="feminino" />}
                        label="Feminino"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={sex.masculino} onChange={handleChangeSex} name="masculino" />}
                        label="Masculino"
                    />
                    </FormGroup>
                </div>
                <div style={{width: "90%", margin: "auto"}}>
                    <Typography color="secondary" id="ecog-age-slider" gutterBottom>
                        Idade
                    </Typography>
                    <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={age["0 - 40"]} onChange={handleChangeAge} name="0 - 40" />}
                        label="40<"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={age["40 - 50"]} onChange={handleChangeAge} name="40 - 50" />}
                        label="40 - 50"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={age["50 - 60"]} onChange={handleChangeAge} name="50 - 60" />}
                        label="50 - 60"
                    />
                <FormControlLabel
                        control={<Checkbox checked={age["60 - 70"]} onChange={handleChangeAge} name="60 - 70" />}
                        label="60 - 70"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={age["70 - 80"]} onChange={handleChangeAge} name="70 - 80" />}
                        label="70 - 80"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={age["80 - 150"]} onChange={handleChangeAge} name="80 - 150" />}
                        label=">80"
                    />
                    </FormGroup>
                </div>
                </div>
                <div style={{width: '100%', height:'65%',  display: "flex", flexDirection: "column-reverse"}}>
                <ResponsiveContainer width={'99%'} height={'99%'}>
                    <BarChart
                        width={500}
                        height={300}
                        data={dataPrepared}
                        isAnimationActive={true}
                        animationDuration={1}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="comorbidade" tick={false}/>
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Todos" fill="#464F51" />
                        <Bar dataKey={instituicao} stackId="a" fill="#3db0fa" />
                    </BarChart>
                </ResponsiveContainer>
                </div>
                <Box m={3}/>
                </Paper>
            :<LinearProgress/>}
        </Box>
    )
}