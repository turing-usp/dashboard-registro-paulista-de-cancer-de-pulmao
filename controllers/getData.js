import Amplify, { Auth, API } from 'aws-amplify';
import init from './configure';

export default async function getData(){
    init();
    let registers_get = []
    let userInfo = await Auth.currentUserInfo()
    let myInit = { 
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
    }
    //userInfo.attributes["custom:instituicao"]
    await API.get("RPCPEndpoints", 'pacientes/getData/USP', myInit).then(response => {
        registers_get = response
        }).catch(error => {
        console.log(JSON.stringify(error))
    });
    return registers_get.items
}