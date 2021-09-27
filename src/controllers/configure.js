import Amplify, { Auth } from 'aws-amplify';

export default function init(){
    Amplify.configure({
        Auth: {
                region: "sa-east-1",
                userPoolId: "sa-east-1_1AbQKRT1S",
                userPoolWebClientId: "2v8k236bs40rlj0t46sng39gap",
                mandatorySignIn: true,
        },
        API: {
            endpoints: [
                {
                    name: "RPCPEndpoints",
                    endpoint: process.env.API_ENDPOINT
                }
            ]
        }
    });
}
