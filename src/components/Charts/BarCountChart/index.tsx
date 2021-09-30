import { VegaLite, VisualizationSpec } from 'react-vega'
import * as vl from 'vega-lite-api'
import { RedcapRecord } from "../../../data-source/redcap"
import { generateBars } from '../../../utils/charts'


type BarCountChartProps = {
  field: string,
  data: RedcapRecord[],
  filters?: any[]
}

const BarCountChart = ({ field, data, filters = [] }: BarCountChartProps) => {
  const usp = generateBars(data, field, 'USP', [
    vl.filter({ "field": "Data Access Group", "equal": 'USP' }),
    ...filters
  ])
  const total = generateBars(data, field, 'Total', [
    ...filters
  ])

  const spec: VisualizationSpec = vl.vconcat(usp, total).toObject()

  return (
    <VegaLite spec={spec} actions={{ source: false, compiled: false, editor: false }} />
  )
}

export default BarCountChart
