import React from "react";
import "./App.css";
import DocLogin from "./DocLogin";
import Doclist from "./DoctorsList";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import DoctorScreen from "./DoctorScreen";
import About from "./About";
import Helpline from "./Helpline";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
      searchValue: {},
      sortedDoctor: false,
    };
  }

  //fetching doctors data
  componentDidMount() {
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

  //handling changes in search value bar
  handleChange(field, event) {
    let searchValue = this.state.searchValue;
    searchValue[field] = event.target.value;
    this.setState({ searchValue });
  }

  //event on clicking search
  search(event) {
    event.preventDefault();
    if (this.state.searchValue.value) {
      this.state.sortedDoctor = true;
    } else {
      this.state.sortedDoctor = false;
      window.location.reload();
    }
  }

  //sorting doctors data to none
  initialState(event) {
    event.preventDefault();
    this.state.sortedDoctor = false;
    window.location.reload();
  }
  render() {
    return (
      <div className="main">
        <BrowserRouter>
          {/* header */}
          <div className="header">
            <h1>
              <Link to="/home" className="headLink">
                <header>
                  <span onClick={this.initialState.bind(this)}>
                    Doc-At-Door
                  </span>
                </header>
              </Link>
            </h1>
            <div className="search-bar">
              <input
                className="search-text"
                type="text"
                placeholder="enter type of doctor to book an appoinment"
                onChange={this.handleChange.bind(this, "value")}
                value={this.state.searchValue["value"]}
              />
              <button
                className="search-button"
                onClick={this.search.bind(this)}
              >
                <Link to="/home">Search</Link>
              </button>
            </div>
            <Link to={"/docLogin"}>
              <h3 className="doctorLogin">Doctor's Login</h3>
            </Link>
            <h3>
              {/* navigation bar */}
              <nav>
                <ul>
                  <Link to="/home">
                    <li>HOME</li>
                  </Link>
                  <Link to="/about">
                    <li>ABOUT</li>
                  </Link>
                  <Link to="/helplines">
                    <li>HELPLINE</li>
                  </Link>
                </ul>
              </nav>
            </h3>
          </div>
          <div className="body">
            {/* Routing all the components */}
            <Route path="/home">
              <Doclist
                doctorsList={this.state.doctorsList}
                searchData={this.state.searchValue.value}
                sortedDoctor={this.state.sortedDoctor}
                initialState={this.initialState}
              />
            </Route>
            <Route path="/about" component={About}></Route>
            <Route path="/helplines" component={Helpline}></Route>
            <Route path="/docLogin" component={DocLogin}></Route>
            <Route path="/id/:id" component={DoctorScreen}></Route>
          </div>
          {/* footer */}
          <div className="footer">
            <p>Copywrite Doc-at-door @2020</p>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;
