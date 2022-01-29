import { FunctionComponent } from "react";
import Layout from '../../components/Layout'
import Cards from "../../components/Cards";
import { getRedcapS3 } from "../../controllers/getData";
import { Typography, LinearProgress, Box, Grid } from '@material-ui/core';


const cards_data = [
    {
        title: 'Avaliação pré-operatória',
        description: '',
        link: '/dashboard/avaliacao-pre-operatoria'
    },
    {
        title: 'Cirurgia',
        description: '',
        link: '/dashboard/cirurgia'
    },
    {
        title: 'Evolução pós-operatoria',
        description: '',
        link: '/dashboard/evolucao-pos-operatoria'
    },
    // {
    //     title: 'Follow-up',
    //     description: '',
    //     link: '/dashboard/follow-up'
    // },
]

const Index: FunctionComponent = () => {
    getRedcapS3()
    return (
        <Layout>
            <Box m={3}>
                <Typography variant="h4" color="primary" style={{fontWeight: 800}}>
                    Dashboards
                </Typography>
            </Box>
            <Box m={3}>
                <Cards infos={cards_data} />
            </Box>
        </Layout>
    );
}


export default Index