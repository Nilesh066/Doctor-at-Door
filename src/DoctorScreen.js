import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import axios from "axios";
import DocLogin from "./DocLogin";

class DoctorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
      doctor: {},
      patient: {},
      patients: [],
    };
  }
  componentDidMount() {
    //fetching patient data
    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          patients: data,
        });
        console.log(data);
      })
      .catch(console.log);
    //fetching doctor data
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          doctorsList: data,
        });
        console.log(data);
      })
      .catch(console.log);
    console.log(this.props);
  }
  //Adding patient details in database and tagging to the appointed doctor
  patient(event) {
    event.preventDefault();
    this.state.patient["doctor_id"] = this.props.match.params.id;
    this.state.patient["status"] = "open";
    this.state.patient["Date"] = new Date().toISOString().slice(0, 10);
    console.log(this.state.patient);
    for (let i = 0; i < this.state.patients.length; i++) {
      if (
        this.state.patients[i].hour == this.state.patient.hour &&
        this.state.patients[i].minute == this.state.patient.minute
      ) {
        window.location.reload();
        alert(
          "Doctor is unavailable at desired time!!Please find another doctor or other time"
        );
      }
    }
    axios
      .post("http://localhost:8080/addPatient", this.state.patient)
      .then((response) => {
        console.log(Response);
      })
      .catch((error) => console.log(error));
    alert("Appointment Booked");
  }

  //handeling changes in the patient form details
  handleChange(field, event) {
    let patient = this.state.patient;
    patient[field] = event.target.value;
    this.setState({ patient });
  }
  render() {
    return (
      <div>
        <h1>Book an appoinment with</h1>
        {this.state.doctorsList
          .filter((doctor) => doctor._id == this.props.match.params.id)
          .map((doctor) => (
            <div>
              <img
                className="doc-image"
                src={`/images/${doctor.image}`}
                alt="doctor"
              />
              <div>Dr.{doctor.name}</div>
              <div>{doctor.spelization}</div>
              <div>{doctor.rating} stars (10 reviews)</div>
            </div>
          ))}
        <div className="patientForm">
          <h3>Patient Details</h3>
          <tr>
            <td>
              <b>PatientName:</b>
            </td>
            <td>
              <input
                type="text"
                placeholder="enter patient name"
                onChange={this.handleChange.bind(this, "patientName")}
                value={this.state.patient["patientName"]}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Email:</b>
            </td>
            <td>
              <input
                type="text"
                placeholder="enter patient email"
                value={this.state.patient["email"]}
                onChange={this.handleChange.bind(this, "email")}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Phone:</b>
            </td>
            <td>
              <input
                type="text"
                placeholder="enter patient phone number"
                value={this.state.patient["phone"]}
                onChange={this.handleChange.bind(this, "phone")}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Time:</b>
            </td>
            <td>
              <b>Hour:</b>

              <select
                onChange={this.handleChange.bind(this, "hour")}
                value={this.state.patient["hour"]}
              >
                <option>Hour</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
              </select>
              <b>Min:</b>

              <select
                onChange={this.handleChange.bind(this, "minute")}
                value={this.state.patient["minute"]}
              >
                <option>Min</option>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button
                className="DocLogInButton"
                onClick={this.patient.bind(this)}
              >
                Book
              </button>
            </td>
          </tr>
        </div>
      </div>
    );
  }
}

export default DoctorScreen;
