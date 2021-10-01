import React, { FunctionComponent } from "react"
import { useAsync } from "react-async-hook"
import DonnutsCountChart from "../../components/Charts/DonnutsCountChart"
import Layout from "../../components/Layout"
import LoadingScreen from "../../components/LoadingScreen"
import { redcapData, RedcapRecord } from "../../controllers/getData"

const charts_data = (data: RedcapRecord[]) => [
    // {
    //     title: 'Tempo de internação',
    //     chart: <BarCountChart field='Tempo de internação' data={data} />
    // },
    {
        title: 'Readmissão em qualquer hospital em 30 dias após a alta?',
        chart: <DonnutsCountChart
            field='Readmissão em qualquer hospital em 30 dias após a alta?'
            data={data}
        />
    },
]

const DashboardAvaliaçãoPosOpeatoria: FunctionComponent = () => {
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
                    Dashboards - Evolução Pós-operatoria
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

export default DashboardAvaliaçãoPosOpeatoria