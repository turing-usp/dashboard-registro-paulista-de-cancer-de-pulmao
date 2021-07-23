import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import FirstLogin from './pages/FirstLogin'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Homepage}/>
            <Route path="/first-login" exact component={FirstLogin}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashboard" exact component={Dashboard}/>
        </BrowserRouter>
    )
}