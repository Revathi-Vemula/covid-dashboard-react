import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationDayWiseData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="chart-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <BarChart data={vaccinationDayWiseData} width={1000} and height={300}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Consolas',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Consolas',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontSize: 12,
            fontFamily: 'Consolas',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose1"
          fill="#5a8dee"
          barSize="10%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose2"
          fill="#f54394"
          barSize="10%"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
