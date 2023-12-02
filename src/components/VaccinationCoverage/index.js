// Write your code here

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {data} = props
  console.log(data)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}K`
    }
    return number.toString()
  }

  return (
    <div className="bar-chart">
      <h1 className="chart-heading"> Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{top: 20}} width={900} height={400}>
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Roboto',
              marginBottom: 15,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
          <Bar
            dataKey="dose2"
            name="Dose2"
            fill="#f54394"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
