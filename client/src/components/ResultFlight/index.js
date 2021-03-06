import React from "react";
import "./style.css";
import moment from "moment";
import dataCodes from "./airlineCodes.json";
import API from '../utils/API';

function getHourMinute(dateString) {
  let dateUnformatted = dateString.slice(
    dateString.indexOf("T") + 1,
    dateString.length - 3
  );
  return moment(dateUnformatted, "HH:mm").format("h:mma");
}

class ResultFlight extends React.Component {
  state = {
    tripName: ''
  }

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
        [name]: value
    });
  };

  handleFormSubmit(event, index) {
    event.preventDefault();
    API.postTrip(this.state.data[index].arrivalAirport, this.state.data[index].departureTime, this.state.data[index].departureAirport, this.state.data[index].arrivalTime, localStorage.getItem('user'), this.state.tripName)
      .then(() => window.location.assign('/user'))
      .catch(() => alert('There was an error selecting your flight. Sorry! Please try again later'));
  }

  componentDidMount() {
    const {startAirport, endAirport, date} = this.props.match.params; 
    API.getFlightsData(startAirport, endAirport, date)
      .then(data => this.setState(data))
      .catch(err => console.log(err));
  }

  render() {
    return this.state.data ? (
      <form id='formContainer'>
        <h2 id='floatingH2'>
          Please name your trip
        </h2>
        <input
          id='floatingInput'
          value={this.state.tripName}
          name="tripName"
          onChange={this.handleInputChange}
          type="text"
          placeholder="My New Trip"
        />
        <div className="content">

          {this.state.data.map((flightItem, index) => (
            <div className="flightResult" key={flightItem.airlineName}>
              <div className="airlineName">{dataCodes[flightItem.airlineName]}</div>
              <div className="flightTimes">
                <div className="startTime">
                  {getHourMinute(flightItem.departureTime)}
                </div>
                - 
                <div className="endTime">
                  {getHourMinute(flightItem.arrivalTime)}
                </div>
              </div>
              <div className="airportNames">
                <div className="startAirport">{flightItem.departureAirport}</div>
                &nbsp;-&nbsp;
                <div className="endAirport">{flightItem.arrivalAirport}</div>
              </div>
              <div className="flightFare">
                {"$" + flightItem.flightFare.toFixed(0)}
              </div>
              <input type="submit" className="btn selectBtn" onClick={event => this.handleFormSubmit(event, index)} value="Select" />
            </div>
          ))}
        </div>
      </form>
    ) : (<div/>);
  }
}
export default ResultFlight;
