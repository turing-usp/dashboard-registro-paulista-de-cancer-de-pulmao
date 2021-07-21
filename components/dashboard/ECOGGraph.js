import { Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BarChartSex from './BarChartBySex'
import {prepareDataKey, isInAgeRange} from '../../controllers/reduceData'

// para aparecer o eixo x type="category" height={100} tick={{fontSize: "1vh", width: 50, wordWrap: 'break-word'}} interval={0}
function valuetext(ageRange) {
    return `${ageRange} anos`;
  }

function compareEcog( a, b ) {
    if ( a.ecog < b.ecog ){
      return -1;
    }
    if ( a.ecog > b.ecog ){
      return 1;
    }
    return 0;
  }
export default function ECOGGraph({data, instituicao}){
    const classes = useStylesCreator()();
    const [ageRange, setAgeRange] = useState([0, 120]);
    const [rawData, setRawData] = useState(data);
    const [sex, setSex] = useState("ambos");
    const [dataUserInstitute, setDataUserInstitute] = useState([]);
    const [dataNotUserInstitute, setDataNotUserInstitute] = useState([]);
    const [groupedDataUserInsitute, setGroupedDataUserInstitute] = useState([]);
    const [groupedDataNotUserInsitute, setGroupedDataNotUserInstitute] = useState([]);

    //setDataUserInstitute(rawData.filter((obj) => {return obj['data_access_group'] == "USP"}))

    const isInAgeRange = (object) => {
        return parseFloat(object.idade_na_cirurgia) > ageRange[0] && parseFloat(object.idade_na_cirurgia) < ageRange[1]
    }

    const handleChange = (event, newValue) => {
        setAgeRange(newValue);
        console.log("mudou")
        onChangeFilter()
      };
    
    const onChangeFilter = () => {
        let filtered_by_age_institution = rawData.filter(isInAgeRange);
        let updatedDataInstitution = prepareDataKey(filtered_by_age_institution, "ecog")//.sort(compareEcog)
        setGroupedDataUserInstitute(updatedDataInstitution)

        let filtered_by_age_not_institution = rawData.filter(isInAgeRange);
        let updatedDataNotInstitution = prepareDataKey(filtered_by_age_not_institution, "ecog")//.sort(compareEcog)
        setGroupedDataNotUserInstitute(updatedDataNotInstitution)
    }

    useEffect(()=>{
        onChangeFilter()
    },[])

    return(
        <Box display="inline-block" width={'100%'}>
            <Paper elevation={0} variant="outlined" >
            <Typography variant="h5" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:10, marginTop: 10,  marginBottom: 30, letterSpacing:1}}>
                <StopRoundedIcon color="primary" style={{marginRight:10}} />
                    ECOG
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
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="ecog-age-slider"
                    getAriaValueText={valuetext}
                    min={10}
                    max={130}
                />
                </div>
                <div style={{width: '100%', display:'flex'}}>
                    <div style={{width: '48%'}}>
                        <Typography variant="h6" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:30, marginTop: 10, letterSpacing:1}}>
                            Outras Instituições
                        </Typography>
                        <BarChartSex data={groupedDataNotUserInsitute} key="ecog" sex={sex}/>
                    </div>

                    <div style={{width: '48%'}}>
                        <Typography variant="h6" color="secondary" style={{alignItems:'center', display:'flex', marginLeft:30, marginTop: 10, letterSpacing:1}}>
                            {instituicao}
                        </Typography>
                        <BarChartSex data={groupedDataUserInsitute} key="ecog" sex={sex}/>
                    </div>
               </div>
                <Box m={3}/>
                </Paper>
        </Box>
    )
}