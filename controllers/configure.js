import Amplify, { Auth } from 'aws-amplify';

export default function init(){
    Amplify.configure({
        Auth: {
                region: process.env.COGNITO_REGION,
                userPoolId: process.env.COGNITO_USER_POOL_ID,
                userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
                mandatorySignIn: true,
        },
        API: {
            endpoints: [
                {
                    name: "RPCPEndpoints",
                    endpoint: "https://d0ajslo74a.execute-api.sa-east-1.amazonaws.com/dev/"
                }
            ]
        }
    });
}