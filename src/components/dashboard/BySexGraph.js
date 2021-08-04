import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox, FormGroup, InputLabel, Select, LinearProgress } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import {getDataAge} from '../../controllers/getData'
import { rollup, sum, map } from 'd3-array';
import { syncExpression } from '@aws-amplify/datastore';




export default function BySexGraph({instituicao, dataKey, title}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao, dataKey: dataKey})
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dataPrepared, setDataPrepared] = useState([]);
    const [sex, setSex] = useState({feminino: true, masculino: true});

    const handleChangeSex = (event) => {
        setSex({ ...sex, [event.target.name]: event.target.checked });
    }

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataAge(params.dataKey,  params.instituicao)
        setData(dataGet)
        setLoaded(true)
        prepareData();

    }
    
    const isFiltered = (entry) => {
        return sex[entry.sexo]
    }

    const prepareData = () => {
        let filtered = data.filter(isFiltered);
        let dataGetReduced = rollup(
                    filtered, 
                    v => Object.fromEntries(["Outras", params.instituicao].map(col => [col, sum(v, d => +d[col])])), 
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

//<BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
    return(
        <Box display="inline-block" style={{height:'100%'}} width={'100%'}>
            {loaded?
            <Paper elevation={0} style={{height:'100%'}} variant="outlined" >
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
                <div style={{width: '100%', display:'flex'}}>
                    <BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
                </div>
                <Box m={3}/>
                </Paper>
            :<LinearProgress/>}
        </Box>
    )
}