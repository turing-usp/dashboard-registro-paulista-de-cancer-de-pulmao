import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox, FormGroup, InputLabel, Select, LinearProgress } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import {getDataAge} from '../../controllers/getData'
import { rollup, sum, map } from 'd3-array';
import { TramRounded } from '@material-ui/icons';




export default function ByAgeRaceAndSexGraph({instituicao, dataKey, title}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao, dataKey: dataKey})
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dataPrepared, setDataPrepared] = useState([]);
    const [sex, setSex] = useState({feminino: true, masculino: true});
    const [race, setRace] = useState({"Parda/Mulato": true, "Asiático": true, "Branca": true, "Negra": true, "Indígena": true, "Ignorado": true});
    const [age, setAge] = useState({"0 - 40": true, "40 - 50": true, "50 - 60": true, "60 - 70": true, "70 - 80": true, "80 - 150": true});

    const handleChangeSex = (event) => {
        setSex({ ...sex, [event.target.name]: event.target.checked });

    }

    const handleChangeRace = (event) => {
        setRace({ ...race, [event.target.name]: event.target.checked });

    }

    const handleChangeAge = async (event) => {
        setAge({ ...age, [event.target.name]: event.target.checked });
    }

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataAge(params.dataKey,  params.instituicao)
        setData(dataGet)
        setLoaded(true)
        prepareData();

    }
    
    const isFiltered = (entry) => {
        return sex[entry.sexo] && age[entry.grupo_idade_na_cirurgia] && race[entry.raca]
    }

    const prepareData = () => {
        let filtered = data.filter(isFiltered);
        let dataGetReduced = rollup(
                    filtered, 
                    v => Object.fromEntries(["Todos", params.instituicao].map(col => [col, sum(v, d => +d[col])])), 
                    d => d[params.dataKey]);
        let finalRechartsData = []
        dataGetReduced.forEach((key, value) => {
            let currentEntry = Object.fromEntries(dataGetReduced)[value]
            currentEntry[params.dataKey] = value
            finalRechartsData.push(currentEntry)
        })
        setDataPrepared(finalRechartsData)
    }

    useEffect(() => {
        getDataFromAgeRange();
    },[loaded])

    useEffect(() => {
        prepareData();
    },[sex])

    useEffect(() => {
        prepareData();
    },[age])

    useEffect(() => {
        prepareData();
    },[race])

//<BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
    return(
        <Box display="inline-block" style={{height:'100%', flexDirection: "column"}} width={'100%'}>
            {loaded?
            <Paper elevation={0} variant="outlined" style={{height:'100%'}} >
            <div style={{height: "40%"}}>
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
                <div style={{width: "90%", margin: "auto"}}>
                    <Typography color="secondary" id="ecog-age-slider" gutterBottom>
                        Raça
                    </Typography>
                    <FormGroup row> 
                        <FormControlLabel
                            control={<Checkbox checked={race["Asiático"]} onChange={handleChangeRace} name="Asiático" />}
                            label="Asiático"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={race["Branca"]} onChange={handleChangeRace} name="Branca" />}
                            label="Branca"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={race["Indígena"]} onChange={handleChangeRace} name="Indígena" />}
                            label="Indígena"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={race["Ignorado"]} onChange={handleChangeRace} name="Ignorado" />}
                            label="Ignorado"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={race["Parda/Mulato"]} onChange={handleChangeRace} name="Parda/Mulato" />}
                            label="Parda/Mulato"
                        />
                    </FormGroup>
                </div>
            </div>
            <div style={{width: '100%', height:'55%',  display: "flex", flexDirection: "column-reverse"}}>
                    <BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
            </div>
                <Box m={3}/>
                </Paper>
            :<LinearProgress/>}
        </Box>
    )
}