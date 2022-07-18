import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {
    vaccinationCoverage: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getFormattedDataOfLast7Days = vaccinationData => ({
    vaccineDate: vaccinationData.vaccine_date,
    dose1: vaccinationData.dose_1,
    dose2: vaccinationData.dose_2,
  })

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const vaccinationDataRes = await response.json()
      const formattedVaccinationDetails = vaccinationDataRes.last_7_days_vaccination.map(
        eachDay => this.getFormattedDataOfLast7Days(eachDay),
      )
      this.setState({
        vaccinationCoverage: formattedVaccinationDetails,
        vaccinationByAge: vaccinationDataRes.vaccination_by_age,
        vaccinationByGender: vaccinationDataRes.vaccination_by_gender,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  appendLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  appendGraphs = () => {
    const {
      vaccinationCoverage,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state

    return (
      <>
        <div className="chart-container">
          <h1 className="heading">Vaccination Coverage</h1>
          <VaccinationCoverage vaccinationData={vaccinationCoverage} />
        </div>
        <div className="chart-container">
          <h1 className="heading">Vaccination by gender</h1>
          <VaccinationByGender vaccinationByGenderData={vaccinationByGender} />
        </div>
        <div className="chart-container">
          <h1 className="heading">Vaccination by age</h1>
          <VaccinationByAge vaccinationByAgeData={vaccinationByAge} />
        </div>
      </>
    )
  }

  appendVaccinationGraphs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.appendLoader()
      case apiStatusConstants.success:
        return this.appendGraphs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="co-win-dashboard-container">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="circle-plus-icon"
            alt="website-logo"
          />
          <h1 className="heading-nav">Co-WIN</h1>
        </nav>
        <div className="vaccination-graphs-container">
          <h1 className="heading-main">CoWIN Vaccination in India</h1>
          {this.appendVaccinationGraphs()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
