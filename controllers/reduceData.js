import { group } from "d3-array";

export const prepareDataKey = (data, key) => {
    if(data.length != 0){
        return group(data, d => d.ecog, d => d.sexo)
    }else{
        return {}
    }
    
}