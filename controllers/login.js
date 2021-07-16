import Amplify, { Auth } from 'aws-amplify';
import init from './configure';
import Router from 'next/router';

export async function signIn(username, password, state, setState) {
    init();
    let prevState = {...state};
    prevState.values.loading = true;
    await setState({...prevState});
    try {
        const user = await Auth.signIn(username, password);
        console.log(user)
        return Router.push("/dashboard")
    } catch (error) {
        console.log('error signing in', error);
        if (error.code === 'UserNotConfirmedException') {
            prevState.values.error = "Usuário não confirmado, verifique seu email";
        } else if (error.code === 'PasswordResetRequiredException') {
            prevState.values.error = "Necessário mudança de senha";
        } else if (error.code === 'NotAuthorizedException') {
            prevState.values.error = "Usuário ou senha inválidos";
        } else if (error.code === 'UserNotFoundException') {
            prevState.values.error = "Usuário ou senha inválidos";
        } else {
            prevState.values.error = "Usuário ou senha inválidos";
        }
        prevState.values.loading = false;
        return setState({...prevState});
    }

    
}

export async function signOut(loading, setLoading) {
    init();
    await setLoading(true);
    try {
        await Auth.signOut({ global: true });
        return Router.push("/")
    } catch (error) {
        console.log('error signing out: ', error);
        alert("erro ao fazer logout!")
        return ssetLoading(false);
    }
}


