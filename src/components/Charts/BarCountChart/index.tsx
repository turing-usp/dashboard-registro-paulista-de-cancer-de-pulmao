import { VegaLite, VisualizationSpec } from 'react-vega'
import * as vl from 'vega-lite-api'
import { RedcapRecord } from "../../../controllers/getData"
import { generateBars } from '../../../utils/charts'
import { useTheme } from '@material-ui/core/styles';


type BarCountChartProps = {
  field: string,
  data: RedcapRecord[],
  filters?: any[]
}

const BarCountChart = ({ field, data, filters = [] }: BarCountChartProps) => {
  const theme = useTheme(); //theme.palette.primary
  const usp = generateBars(data, field, 'USP', theme.palette.primary.main, [
    vl.filter({ "field": "Data Access Group", "equal": 'USP' }),
    ...filters
  ])
  const total = generateBars(data, field, 'Total', theme.palette.primary.main, [
    ...filters
  ])

  const spec: VisualizationSpec = vl.vconcat(usp, total).toObject()

  return (
    <VegaLite spec={spec} actions={{ source: false, compiled: false, editor: false }} />
  )
}

export default BarCountChart
