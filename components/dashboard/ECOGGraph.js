import { Box, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import useStylesCreator from '../../styles/styles'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function valuetext(ageRange) {
    return `${ageRange} anos`;
  }


export default function ECOGGraph(data){
    const classes = useStylesCreator()();
    const [ageRange, setAgeRange] = useState([0, 120]);
    const [rawData, setRawData] = useState(data.data);
    const [sex, setSex] = useState("ambos");
    const [filteredbyAge, setFilteredbyAge] = useState(data.data);
    const [groupedData, setGroupedData] = useState([]);

    const isInAgeRange = (object) => {
        return parseFloat(object.idade_na_cirurgia) > ageRange[0] && parseFloat(object.idade_na_cirurgia) < ageRange[1]
    }

    const handleChange = (event, newValue) => {
        setAgeRange(newValue);
        console.log("mudou")
        onChangeFilter()
      };

    const prepareDataEcog = () => {
        if(filteredbyAge.length != 0){
            
            let dataBySexAndECOG = {}//d3.group(filtered_by_age, d => d.ecog, d => d.sexo) d3 nao funfa em next - F
            for(let i =0; i < filteredbyAge.length; i++){
                let currentRegister = filteredbyAge[i]
                if(currentRegister.ecog != null){
                    let currentEcogValue = currentRegister.ecog 
                    if(currentEcogValue in dataBySexAndECOG){
                        let currentSex = currentRegister.sexo!=null?currentRegister.sexo:"indefinido"
                        if(currentSex in dataBySexAndECOG[currentEcogValue]){
                            dataBySexAndECOG[currentEcogValue][currentSex] = dataBySexAndECOG[currentEcogValue][currentSex] + 1;
                        }else{
                            dataBySexAndECOG[currentEcogValue][currentSex] = 1
                        }
                    }else{
                        let currentSex = currentRegister.sexo!=null?currentRegister.sexo:"indefinido"
                        dataBySexAndECOG[currentEcogValue] = {}
                        dataBySexAndECOG[currentEcogValue][currentSex] = 1
                    }
                }
                
            }

            let prepared_data = [];

            Object.keys(dataBySexAndECOG).forEach((ecogClass, index) => {
                prepared_data.push(
                    {
                        'ecog': dataBySexAndECOG[ecogClass], 
                        'Feminino': dataBySexAndECOG[ecogClass]['feminino']!=null?dataBySexAndECOG[ecogClass]['feminino']:0,
                        'Masculino': dataBySexAndECOG[ecogClass]['masculino']!=null?dataBySexAndECOG[ecogClass]['masculino']:0,
                        'Indefinido': dataBySexAndECOG[ecogClass]['indefinido']!=null?dataBySexAndECOG[ecogClass]['indefinido']:0,
                    }
                    );
            });

            return prepared_data
        }else{
            return {}
        }
        
    }
    
    const onChangeFilter = () => {
        let filtered_by_age = rawData.filter(isInAgeRange);
        setFilteredbyAge(filtered_by_age)
        let updatedData = prepareDataEcog()
        setGroupedData(updatedData)
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
                    max={130}
                />
                </div>
                <ResponsiveContainer width={'99%'} height={300}>
                    <BarChart
                    width={500}
                    height={300}
                    data={groupedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ecog" tick={{ width: 75 }}  fontSize={3} interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {sex == "feminino" || sex == "ambos"?<Bar dataKey="Feminino" stackId="a" fill="#8884d8" />:""}
                    {sex == "masculino" || sex == "ambos"?<Bar dataKey="Masculino" stackId="a" fill="#82ca9d" />:""}
                    </BarChart>
                </ResponsiveContainer>
                </Paper>
        </Box>
    )
}