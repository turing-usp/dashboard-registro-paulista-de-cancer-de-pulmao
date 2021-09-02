import { Box, Typography, Paper, Slider, FormControlLabel, Checkbox, FormGroup, InputLabel, Select, LinearProgress } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'
import {getDataSurgeryYear} from '../../controllers/getData'
import { rollup, sum, map } from 'd3-array';
import { RepeatRounded } from '@material-ui/icons';




export default function BySurgYearGraph({instituicao, dataKey, title}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao, dataKey: dataKey})
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dataPrepared, setDataPrepared] = useState([]);
    const [year, setYear] = useState({
                                    "2006": true, 
                                    "2007": true, 
                                    "2006": true, 
                                    "2007": true, 
                                    "2008": true, 
                                    "2009": true, 
                                    "2010": true, 
                                    "2011": true,
                                    "2012": true,
                                    "2013": true,
                                    "2014": true,
                                    "2015": true,
                                    "2016": true,
                                    "2017": true,
                                    "2018": true,
                                    "2019": true,
                                    "2020": true,
                                    "2021": true,
                                });


    const handleChangeAge = async (event) => {
        setYear({ ...year, [event.target.name]: event.target.checked });
    }

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataSurgeryYear(params.dataKey,  params.instituicao)
        console.log(dataGet)
        setData(dataGet)
        setLoaded(true)
        prepareData();

    }
    
    const isFiltered = (entry) => {
        return year[entry.ano_da_cirurgia]
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
    },[year])

//<BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
    return(
        <Box display="inline-block" width={'100%'} style={{height:'100%', flexDirection: "column"}}>
            {loaded?
            <Paper elevation={0} variant="outlined" style={{height:'100%'}} >
            <div style={{height: "30%"}}>
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    {title}
                </Typography>
                <div style={{width: "90%", margin: "auto", height: "30%"}}>
                    <Typography color="secondary" id="ecog-age-slider" gutterBottom>
                        Ano da cirurgia
                    </Typography>
                    <FormGroup row>
                        {Object.keys(year).map((y) => {
                            return(
                                <FormControlLabel
                                control={<Checkbox checked={year[y]} onChange={handleChangeAge} name={y} />}
                                label={y}
                                />
                            )
                        })}
                    </FormGroup>
                </div>
                </div>
                <div style={{width: '100%', height:'65%',  display: "flex", flexDirection: "column-reverse"}}>
                    <BarChartByInstitution data={dataPrepared} dataKey={params.dataKey} instituicao={params.instituicao}/>
                </div>
                <Box m={3}/>
                </Paper>
            :<LinearProgress/>}
        </Box>
    )
}