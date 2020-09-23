import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import axios from "axios";
import ReactToPrint from "react-to-print";
import LoggedInPage from "./LoggedInPage";

class DocLogin extends React.Component {
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

  componentDidMount() {
    //fetching patients data
    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          patients: data,
        });
        console.log(data);
      })
      .catch(console.log);
    //fetching doctors data
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

  //handling change in the doctors login form
  handleChange(field, event) {
    let docLogin = this.state.docLogin;
    docLogin[field] = event.target.value;
    this.setState({ docLogin });
  }

  //condition for login if credential matches
  loginDoc(event) {
    let doctor = this.state.doctorsList.find((x) => {
      if (
        x.userName == this.state.docLogin.userName &&
        x.password == this.state.docLogin.password
      ) {
        console.log("datamatched");
        this.setState({ loginvalue: true });
        this.setState({ doctorLoggedIn: x });
      } else {
        this.setState({ error: "Username or password not matched" });
      }
    });
  }

  render() {
    //rendering doctors login form
    if (this.state.loginvalue === false) {
      return (
        <div className="docLogInForm">
          <h3>Doctor's Login</h3>
          <tr>
            <td>
              <b>UserName:</b>
            </td>
            <td>
              <input
                type="text"
                placeholder="enter username"
                onChange={this.handleChange.bind(this, "userName")}
                value={this.state.docLogin["userName"]}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Password:</b>
            </td>
            <td>
              <input
                type="password"
                placeholder="enter password"
                value={this.state.docLogin["password"]}
                onChange={this.handleChange.bind(this, "password")}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td className="error">{this.state.error}</td>
          </tr>
          <tr>
            <td />
            <td>
              <button
                className="DocLogInButton"
                onClick={this.loginDoc.bind(this)}
              >
                LOG IN
              </button>
            </td>
          </tr>
        </div>
      );
    } else {
      //rendering logged in data if credientials matches
      return (
        <div>
          <LoggedInPage
            ref={(el) => (this.componentRef = el)}
            doctorLoggedIn={this.state.doctorLoggedIn}
          ></LoggedInPage>
          {/* triggering download */}
          <ReactToPrint
            trigger={() => {
              return (
                <a href="#">
                  <div className="download-pdf">
                    <button>Download PDF</button>
                  </div>
                </a>
              );
            }}
            content={() => this.componentRef}
          />
        </div>
      );
    }
  }
}

export default DocLogin;
