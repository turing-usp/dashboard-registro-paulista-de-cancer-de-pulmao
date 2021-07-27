import { Auth, API } from 'aws-amplify';
import init from './configure';

export async function getDataByAgeAndSex(dataKey, lowerbound, upperbound, instituicao){
    init();

    let registers_get = []
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        queryStringParameters: { 
            lowerbound: lowerbound,
            upperbound: upperbound, 
            instituicao: instituicao,
            key: dataKey
        }
    }
    await API.get("RPCPEndpoints", 'pacientes/getGroupedData', myInit).then(response => {
        registers_get = response
        console.log(response)
        }).catch(error => {
        console.log(JSON.stringify(error))
    });
    return registers_get.items
}