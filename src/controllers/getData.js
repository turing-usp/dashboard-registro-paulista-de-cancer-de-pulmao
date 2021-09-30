import Amplify, { Auth, API, Storage } from 'aws-amplify';
import init from './configure';

export async function getDataAge(dataKey, instituicao){
    init();

    let registers_get = []
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        queryStringParameters: { 
            instituicao: instituicao,
            key: dataKey
        }
    }
    await API.get("RPCPEndpoints", 'pacientes/getDataIdadeSexoRaca', myInit).then(response => {
        registers_get = response
        }).catch(error => {
        console.log(JSON.stringify(error))
        return {}
    });
    return registers_get.items
}

export async function getDataSurgeryYear(dataKey, instituicao){
    init();

    let registers_get = []
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        queryStringParameters: { 
            instituicao: instituicao,
            key: dataKey
        }
    }
    await API.get("RPCPEndpoints", 'pacientes/getDataAnoCirurgiaSexo', myInit).then(response => {
        registers_get = response
        }).catch(error => {
        console.log(JSON.stringify(error))
        return {}
    });
    return registers_get.items
}

export async function getSurvivalGlobal(instituicao, FilterKey){
    init();

    let registers_get = []
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        queryStringParameters: { 
            instituicao: instituicao,
            FilterKey: FilterKey
        }
    }
    await API.get("RPCPEndpoints", 'pacientes/getSurvivalGlobal', myInit).then(response => {
        registers_get = response
        }).catch(error => {
        console.log(JSON.stringify(error))
        return {}
    });
    return registers_get
}

export async function getComorbidades(instituicao){
    init();

    let registers_get = []
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        queryStringParameters: { 
            instituicao: instituicao
        }
    }
    await API.get("RPCPEndpoints", 'pacientes/getDataComorbidades', myInit).then(response => {
        registers_get = response
        }).catch(error => {
        console.log(JSON.stringify(error))
        return {}
    });
    return registers_get.items
}

export async function getRedCapData(){
    init();
    const signedURL = await Storage.get("redcap.csv", { download: true});
    console.log(signedURL)
    return signedURL
}