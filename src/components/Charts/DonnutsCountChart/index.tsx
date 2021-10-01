import { VegaLite, VisualizationSpec } from 'react-vega'
import * as vl from 'vega-lite-api'
import { RedcapRecord } from "../../../controllers/getData"
import { generateDonnuts } from '../../../utils/charts'


type DonnutsCountChartProps = {
  field: string,
  data: RedcapRecord[],
  filters?: any[]
}

const DonnutsCountChart = ({ field, data, filters = [] }: DonnutsCountChartProps) => {
  const usp = generateDonnuts(data, field, 'USP', [
    vl.filter({ "field": "Data Access Group", "equal": 'USP' }),
    ...filters
  ])
  const total = generateDonnuts(data, field, 'Total', [
    ...filters
  ])

  const spec: VisualizationSpec = vl.hconcat(usp, total).toObject()

  return (
    <VegaLite spec={spec} actions={{ source: false, compiled: false, editor: false }} />
  )
}

export default DonnutsCountChart
