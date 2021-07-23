import Amplify, { Auth } from 'aws-amplify';
import init from './configure';

export async function signIn(username, password, state, setState, history) {
    init();
    let prevState = {...state};
    prevState.values.loading = true;
    await setState({...prevState}); 
        try {
            const user = await Auth.signIn(username, password);
            console.log(user)

            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                return history.push("/change-password")
            } else {
                return history.push("/dashboard")
            } 
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

export async function firstLogin(username, password, newPassword, history){
    init();
    Auth.signIn(username, password)
    .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            Auth.completeNewPassword(
                user,               
                newPassword)      
                .then(user => {
                    console.log(user);
                    return history.push("/dashboard")
            }).catch(e => {
              console.log(e);
              return alert(e)
            });
        } else {
            return history.push("/login")
        }
    }).catch(e => {
        console.log(e);
    });
}

export async function signOut(loading, setLoading, history) {
    init();
    await setLoading(true);
    try {
        await Auth.signOut({ global: true });
        return history.push("/")
    } catch (error) {
        console.log('error signing out: ', error);
        alert("erro ao fazer logout!")
        return setLoading(false);
    }
}




