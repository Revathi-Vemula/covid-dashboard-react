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
    vaccinationData: [],
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
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  appendLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1>Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view"
        alt="failure view"
      />
    </div>
  )

  appendGraphs = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationDayWiseData={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeData={vaccinationData.vaccinationByAge}
        />
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
            alt="website logo"
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
