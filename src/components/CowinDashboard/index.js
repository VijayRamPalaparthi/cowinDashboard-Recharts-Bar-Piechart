// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  state = {
    apiStatus: 'initial',
    lastSevenDaysData: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount = () => {
    this.getDataFromServer()
  }

  getDataFromServer = async () => {
    this.setState({apiStatus: 'loader'})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const fetchedData = await response.json()
      const updateData = fetchedData.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      this.setState({
        lastSevenDaysData: updateData,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderSuccessPageView = () => {
    const {
      lastSevenDaysData,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    console.log(vaccinationByAge)
    console.log(vaccinationByGender)
    return (
      <>
        <VaccinationCoverage data={lastSevenDaysData} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="heading">Something went wrong</h1>
    </div>
  )

  switchByApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessPageView()
      case 'loader':
        return this.renderLoader()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="pad-container">
          <div className="logo-container">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
            />
            <h1 className="logo-name"> Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.switchByApiStatus()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
