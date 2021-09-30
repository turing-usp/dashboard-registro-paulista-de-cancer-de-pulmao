import { FunctionComponent } from "react";
import Layout from '../../components/Layout'
import Cards from "../../components/Cards";

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

const Index: FunctionComponent = () => (
    <Layout>
        <main className="flex flex-col items-center w-full flex-1 px-20">
            <h1 className="text-3xl font-bold mt-16">
                Dashboards
            </h1>

            <Cards infos={cards_data} />
        </main>

    </Layout>
)


export default Index