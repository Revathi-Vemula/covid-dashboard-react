import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props

  return (
    <div className="chart-container">
      <h1 className="heading">Vaccination by age</h1>
      <PieChart width={1000} and height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationByAgeData}
          startAngle={0}
          endAngle={360}
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Consolas'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
