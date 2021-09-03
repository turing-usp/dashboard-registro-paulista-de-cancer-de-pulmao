import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Typography, Button, IconButton, LinearProgress  } from '@material-ui/core';
import { ExitToApp} from '@material-ui/icons';
import Navbar from '../components/Navbar'
import Amplify, { Auth } from 'aws-amplify';
import init from '../controllers/configure'
import getData from '../controllers/getData'
import useStylesCreator from '../styles/styles'
import { useHistory } from "react-router-dom";
import { rollup, sum } from 'd3-array';
import { getDataAge } from '../controllers/getData'
import ByAgeAndSexGraph from '../components/dashboard/ByAgeAndSexGraph'
import BySexGraph from '../components/dashboard/BySexGraph'
import ByAgeRaceAndSexGraph from '../components/dashboard/ByAgeRaceAndSexGraph'
import BySurgYearGraph from '../components/dashboard/BySurgYearGraph'
import PieByInstitution from '../components/dashboard/PieByInstitution'
import KMGraph from '../components/dashboard/KMGraph'
import ComorbidadesChart from '../components/dashboard/ComorbidadesChart'

//await Auth.currentAuthenticatedUser()   <ComorbidadesChart instituicao={user.attributes['custom:instituicao']} title="Comorbidades"/>
 
export default function Dashboard() {
  init();
  const classes = useStylesCreator()();
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const history = useHistory();

  React.useEffect(() =>{
    async function getUser(){
      let authUser = await Auth.currentUserInfo();
      setUser(authUser);
      setLoaded(true);
    }
    getUser()
  }
  ,[loaded])
  ;
  if(loaded){
    if(user == null){
      return history.push('/login');
    }else{
      return (
        <>
        <Navbar user={user}/>
        <div className={classes.mainDash}>
          <Grid container spacing={3} className={classes.dashGrid} >
            <Grid item xs={6}>
              <ByAgeAndSexGraph instituicao={user.attributes['custom:instituicao']} dataKey="ecog" title="ECOG"/>
            </Grid>
            <Grid item xs={6}>
              <ByAgeAndSexGraph instituicao={user.attributes['custom:instituicao']} dataKey="asa" title="ASA"/>
            </Grid>
            <Grid item xs={6}>
              <BySexGraph instituicao={user.attributes['custom:instituicao']} dataKey="charlson_pontuacao" title="Charlson pontuação"/>
            </Grid>
            <Grid item xs={6}>
              <PieByInstitution instituicao={user.attributes['custom:instituicao']} dataKey="tnm_clinico___8a_edicao" title="TNM clínico  (8a edição)"/>
            </Grid>
            <Grid item xs={6}>
              <PieByInstitution instituicao={user.attributes['custom:instituicao']} dataKey="tnm_clinico___7a_edicao" title="TNM clínico  (7a edição)"/>
            </Grid>
            <Grid item xs={6}>
              <PieByInstitution instituicao={user.attributes['custom:instituicao']} dataKey="acesso_realizado" title="Acesso realizado"/>
            </Grid>
            <Grid item xs={6}>
              <PieByInstitution instituicao={user.attributes['custom:instituicao']} dataKey="para_onde_o_paciente_foi_encaminhado" title="Encaminhamento no pós-operatório"/>
            </Grid>
            <Grid item xs={6}>
              <PieByInstitution instituicao={user.attributes['custom:instituicao']} dataKey="readmissao_em_qualquer_hospital_em_30_dias_apos_a_alta" title="Readmissão em 30 dias"/>
            </Grid>
            <Grid item xs={12}>
              <KMGraph instituicao={user.attributes['custom:instituicao']} title="Sobrevida global (Kaplan Meier)"/>
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </div>
        </>
      )
    } 
  }else{
    return <LinearProgress className={classes.loading}/>;
  }
    
  
}
