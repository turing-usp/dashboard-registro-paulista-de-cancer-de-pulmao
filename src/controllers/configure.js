import Amplify, { Auth } from 'aws-amplify';

export default function init(){
    Amplify.configure({
        Auth: {
                region: "sa-east-1",
                userPoolId: "sa-east-1_1AbQKRT1S",
                userPoolWebClientId: "2v8k236bs40rlj0t46sng39gap",
                identityPoolId: "sa-east-1:370ba47b-eaee-474d-8048-06af214e1aa6",
                mandatorySignIn: true,
        },
        API: {
            endpoints: [
                {
                    name: "RPCPEndpoints",
                    endpoint: "https://5yr718co0f.execute-api.sa-east-1.amazonaws.com/prod/"//process.env.API_ENDPOINT
                }
            ]
        },
        Storage: {
            AWSS3: {
                bucket: 'turing-redcap-data', 
                region: 'sa-east-1', 
            }
        }});
    }
