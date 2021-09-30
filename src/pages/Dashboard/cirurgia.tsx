import React, { FunctionComponent } from "react"
import { useAsync } from "react-async-hook"
import DonnutsCountChart from "../../components/Charts/DonnutsCountChart"
import BarCountChart from "../../components/Charts/BarCountChart"
import Layout from "../../components/Layout"
import LoadingScreen from "../../components/LoadingScreen"
import redcapCachedData, { RedcapRecord } from "../../data-source/redcap"

const charts_data = (data: RedcapRecord[]) => [
    {
        title: 'Tipo de ressecção pulmonar realizada',
        chart: <BarCountChart field='Tipo de ressecção pulmonar realizada' data={data} />
    },
    {
        title: 'Acesso realizado',
        chart: <DonnutsCountChart field='Acesso realizado' data={data} />
    },
    {
        title: 'Para onde o paciente foi encaminhado?',
        chart: <DonnutsCountChart field='Para onde o paciente foi encaminhado?' data={data} />
    },
    {
        title: 'Status na alta',// 'Óbito operatório?',
        chart: <DonnutsCountChart field='Status na alta' data={data} />
    },
]

const DashboardCirurgia: FunctionComponent = () => {
    const {
        loading,
        result: data
    } = useAsync(redcapCachedData, [])

    if (loading)
        return <LoadingScreen />

    return (
        <Layout>
            <main className="flex flex-col items-center w-full flex-1 px-20">
                <h1 className="text-2xl font-bold mt-2">
                    Dashboards - Cirurgia
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

export default DashboardCirurgia