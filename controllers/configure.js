import Amplify, { Auth } from 'aws-amplify';

export default function init(){
    Amplify.configure({
        Auth: {
                region: process.env.COGNITO_REGION,
                userPoolId: process.env.COGNITO_USER_POOL_ID,
                userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
                mandatorySignIn: true,
        }
    });
}