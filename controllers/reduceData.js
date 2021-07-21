export const prepareDataKey = (data, key) => {
    if(data.length != 0){
        let dataBySexAndKey= {}//d3.group(filtered_by_age, d => d.ecog, d => d.sexo) d3 nao funfa em next - F
        for(let i =0; i < data.length; i++){
            let currentRegister = data[i]
            if(currentRegister[key] != null){
                let currentKeyValue = currentRegister[key]
                if(currentKeyValue in dataBySexAndKey){
                    let currentSex = currentRegister.sexo!=null?currentRegister.sexo:"indefinido"
                    if(currentSex in dataBySexAndKey[currentKeyValue]){
                        dataBySexAndKey[currentKeyValue][currentSex] = dataBySexAndKey[currentKeyValue][currentSex] + 1;
                    }else{
                        dataBySexAndKey[currentKeyValue][currentSex] = 1
                    }
                }else{
                    let currentSex = currentRegister.sexo!=null?currentRegister.sexo:"indefinido"
                    dataBySexAndKey[currentKeyValue] = {}
                    dataBySexAndKey[currentKeyValue][currentSex] = 1
                }
            }
            
        }

        let prepared_data = [];

        Object.keys(dataBySexAndKey).forEach((currentKey, index) => {
            let keyGrouped = {
                    'Feminino': dataBySexAndKey[currentKey]['feminino']!=null?dataBySexAndKey[currentKey]['feminino']:0,
                    'Masculino': dataBySexAndKey[currentKey]['masculino']!=null?dataBySexAndKey[currentKey]['masculino']:0,
                    'Indefinido': dataBySexAndKey[currentKey]['indefinido']!=null?dataBySexAndKey[currentKey]['indefinido']:0,
                }
            keyGrouped[key] = currentKey;
            console.log(prepared_data)
            console.log(keyGrouped)
            prepared_data.push(keyGrouped)
        });
        return prepared_data
    }else{
        return {}
    }
    
}