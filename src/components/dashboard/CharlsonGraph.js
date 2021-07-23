import { Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'


export default function CharlsonGraph({instituicao}){
    const classes = useStylesCreator()();
    const [params, setParams] = useState({instituicao: instituicao, dataKey: "charlson_pontuacao"})
    const [data, setData] = useState({});
    const [sex, setSex] = useState("ambos");

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataByAgeAndSex(params.dataKey,0, 150, params.instituicao)
        console.log(dataGet)
        setData(dataGet)

    }

    useEffect(()=>{
        getDataFromAgeRange()
    },[])

    return(
        <Box display="inline-block" width={'100%'}>
            <Paper elevation={0} variant="outlined" >
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    CHARLSON
                </Typography>
                <div style={{width: "90%", margin: "auto"}}>
                <FormControl className={classes.formControl}>
                    <InputLabel color="secondary" htmlFor="ecog-sex-selector">Sexo</InputLabel>
                    <Select
                    labelId="ecog-sex-selector"
                    value={sex}
                    onChange={(e) => {setSex(e.target.value)}}
                    >
                    <MenuItem value={"feminino"}>Faminino</MenuItem>
                    <MenuItem value={"masculino"}>Masculino</MenuItem>
                    <MenuItem value={"ambos"}>Ambos</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div style={{width: '100%', display:'flex'}}>
                    <BarChartByInstitution data={data[sex]} dataKey={params.dataKey} instituicao={params.instituicao}/>
               </div>
                <Box m={3}/>
                </Paper>
        </Box>
    )
}