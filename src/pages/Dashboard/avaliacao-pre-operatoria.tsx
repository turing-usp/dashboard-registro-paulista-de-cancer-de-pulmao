import * as vl from 'vega-lite-api'
import React, { FunctionComponent } from "react"
import { useAsync } from "react-async-hook"
import DonnutsCountChart from "../../components/Charts/DonnutsCountChart"
import BarCountChart from "../../components/Charts/BarCountChart"
import Layout from "../../components/Layout"
import LoadingScreen from "../../components/LoadingScreen"
import { redcapData, RedcapRecord } from "../../data-source/redcap"

const charts_data = (data: RedcapRecord[]) => [
    {
        title: 'ECOG',
        chart: <BarCountChart field='ECOG' data={data} />
    },
    {
        title: 'ASA',
        chart: <BarCountChart field='ASA' data={data} />
    },
    {
        title: 'Charlson',
        chart: <BarCountChart field='Charlson pontuação' data={data} />
    },
    {
        title: 'TNM clínico  (7a edição)',
        chart: <DonnutsCountChart
            field='TNM clínico  (7a edição)'
            data={data}
            filters={[
                vl.filter({ field: 'TNM utilizado (choice=7a edição)', equal: '7a edição' }),
            ]}
        />
    },
    {
        title: 'TNM clínico  (8a edição)',
        chart: <DonnutsCountChart
            field='TNM clínico  (8a edição)'
            data={data}
            filters={[
                vl.filter({ field: 'TNM utilizado (choice=8a edição)', equal: '8a edição' }),
            ]}
        />
    },
]

const DashboardAvaliaçãoPreOpeatoria: FunctionComponent = () => {
    const {
        loading,
        result: data
    } = useAsync(redcapData, [])

    if (loading)
        return <LoadingScreen />

    return (
        <Layout>
            <main className="flex flex-col items-center w-full flex-1 px-20">
                <h1 className="text-2xl font-bold mt-2">
                    Dashboards - Avaliação Pré-operatoria
                </h1>

                <div className="flex flex-col">
                    {charts_data(data!).map(chart => (
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold mt-4 self-start">{chart.title}</h3>
                            {chart.chart}
                        </div>
                    ))}
                </div>
            </main>

        </Layout>
    )
}

export default DashboardAvaliaçãoPreOpeatoria