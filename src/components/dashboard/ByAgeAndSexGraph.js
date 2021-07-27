import { Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import {getDataByAgeAndSex} from '../../controllers/getData'
import BarChartByInstitution from './BarChartByInstitution'

function valuetext(ageRange) {
    return `${ageRange} anos`;
  }

export default function ByAgeAndSexGraph({instituicao, dataKey}){
    const classes = useStylesCreator()();
    // eslint-disable-next-line no-unused-vars
    const [params, setParams] = useState({instituicao: instituicao, dataKey: dataKey})
    const [ageRange, setAgeRange] = useState([0, 120]);
    const [lastRequestTime, setLastRequestTime] = useState(Date.now());
    const [data, setData] = useState({});
    const [sex, setSex] = useState("ambos");

    const getDataFromAgeRange = async () => {
        let dataGet = await getDataByAgeAndSex(params.dataKey, ageRange[0], ageRange[1], params.instituicao)
        console.log(dataGet)
        setData(dataGet)

    }

    const handleChangeAge = (event, newValue) => {
        setAgeRange(newValue);
        if(Date.now() - lastRequestTime > 800){
            console.log("faztempo")
            setLastRequestTime(Date.now())
            getDataFromAgeRange()
        }
      };
    


    useEffect(()=>{
        getDataFromAgeRange()
    },[])

    return(
        <Box display="inline-block" width={'100%'}>
            <Paper elevation={0} variant="outlined" >
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    {params.dataKey.toUpperCase()}
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
                <div style={{width: "90%", margin: "auto"}}>
                    <Typography color="secondary" id="ecog-age-slider" gutterBottom>
                        Idade
                    </Typography>
                    <Slider
                    value={ageRange}
                    onChange={handleChangeAge}
                    valueLabelDisplay="auto"
                    aria-labelledby="ecog-age-slider"
                    getAriaValueText={valuetext}
                    min={20}
                    max={130}
                />
                </div>
                <div style={{width: '100%', display:'flex'}}>
                    <BarChartByInstitution data={data[sex]} dataKey={params.dataKey} instituicao={params.instituicao}/>
               </div>
                <Box m={3}/>
                </Paper>
        </Box>
    )
}