import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";

class LoggedInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
      docLogin: {},
      loginvalue: false,
      doctorLoggedIn: {},
      patients: [],
      error: "",
      forParams: "",
    };
  }
  //fetching all the datas of patient as well as doctors
  componentDidMount() {
    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          patients: data,
        });
        console.log(data);
      })
      .catch(console.log);
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          doctorsList: data,
        });
        console.log(data);
      })
      .catch(console.log);
  }
  handleChange(field, event) {
    let docLogin = this.state.docLogin;
    docLogin[field] = event.target.value;
    this.setState({ docLogin });
  }
  //for updating the status of patient to cancelled by doctor on button click
  cancel(patient, event) {
    event.preventDefault();
    let query = { phone: patient.phone };
    alert("cancelled");
    axios
      .put("http://localhost:8080/patient/status/cancelled", query)
      .then((response) => {
        console.log(Response);
      })
      .catch((error) => console.log(error));
    window.location.reload();
  }
  //for updating the status of patient to closed by doctor on button click
  close(patient, event) {
    event.preventDefault();
    alert("closed");
    console.log(patient);
    let query = { phone: patient.phone };
    axios
      .put("http://localhost:8080/patient/status/closed", query)
      .then((response) => {
        console.log(Response);
      })
      .catch((error) => console.log(error));
    window.location.reload();
  }
  //for deleting patient record by doctor
  deletePatient(patient, event) {
    event.preventDefault();
    alert(patient.patientName + " record got deleted");
    axios
      .delete("http://localhost:8080/patient/status/delete", patient.phone)
      .then((res) => console.log(res))
      .catch(console.log);
  }
  render() {
    //rendering the patients whoever had booked appoinment
    return (
      <div>
        <h1>Good Day! {this.props.doctorLoggedIn.name}</h1>
        <p>
          We have scheduled appoinment with below patients for you today.Your
          appoinment will be tagged to your{" "}
          <b>id {this.props.doctorLoggedIn._id}</b>
        </p>
        <div className="patient-lists">
          <th>
            <td className="patient-detail-head">Date</td>

            <td className="patient-detail-id">Patient_id</td>
            <td className="patient-detail-head">Patient_name</td>
            <td className="patient-detail-head">Patient_mobile</td>
            <td className="patient-detail-head">Time</td>
          </th>
          {this.state.patients
            .filter(
              (patient) => patient.doctor_id == this.props.doctorLoggedIn._id
            )
            .map((patient) => (
              <div>
                <tr>
                  <span
                    className="delete-patient"
                    onClick={this.deletePatient.bind(this, patient)}
                  >
                    X
                  </span>
                  <td className="patient-detail-head">{patient.Date}</td>

                  <td className="patient-detail-id">{patient._id}</td>
                  <td className="patient-detail-head">{patient.patientName}</td>
                  <td className="patient-detail-head">{patient.phone}</td>
                  <td className="patient-detail-head">
                    {patient.hour}:{patient.minute}
                  </td>
                  <td className="patient-detail-head">
                    <button onClick={this.cancel.bind(this, patient)}>
                      Cancel
                    </button>
                    <button onClick={this.close.bind(this, patient)}>
                      Close
                    </button>
                    <span>Status:{patient.status}</span>
                  </td>
                </tr>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default LoggedInPage;
