import Amplify, { Auth } from 'aws-amplify';

export default function init(){
    console.log(process.env)
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
                    endpoint: "https://3ffyl14toa.execute-api.sa-east-1.amazonaws.com/dev/" //process.env.API_ENDPOINT
                }
            ]
        }
    });
}
