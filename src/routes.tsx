import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import FirstLogin from './pages/FirstLogin'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LoginHomePage from './pages/LoginHomePage'
import DashboardAvaliaçãoPreOpeatoria from './pages/Dashboard/cirurgia';
import DashboardCirurgia from './pages/Dashboard/cirurgia';
import DashboardAvaliaçãoPosOpeatoria from './pages/Dashboard/evolucao-pos-operatoria';


export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Homepage} />
            <Route path="/first-login" exact component={FirstLogin} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={LoginHomePage} />
            <Route path="/change-password" exact component={FirstLogin} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/avaliacao-pre-operatoria" exact component={DashboardAvaliaçãoPreOpeatoria} />
            <Route path="/dashboard/cirurgia" exact component={DashboardCirurgia} />
            <Route path="/dashboard/evolucao-pos-operatoria" exact component={DashboardAvaliaçãoPosOpeatoria} />
        </BrowserRouter>
    )
}