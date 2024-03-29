import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props

  return (
    <div className="chart-container">
      <h1 className="heading">Vaccination by gender</h1>
      <PieChart width={1000} and height={300}>
        <Pie
          cx="50%"
          cy="70%"
          data={vaccinationByGenderData}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
