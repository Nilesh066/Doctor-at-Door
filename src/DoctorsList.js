import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import DoctorScreen from "./DoctorScreen";

class Doclist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
    };
  }

  //Fetching doctors detail
  componentDidMount() {
    this.setState({ doctorsList: this.props.doctorsList });
    console.log(this.props.doctorsList);
  }

  render() {
    if (this.props.sortedDoctor == false) {
      return (
        <div>
          <h3>Select doctor from list below to fix appoinment with.</h3>
          <ul class="products">
            {/* Mapping all the doctors from the database list */}
            {this.state.doctorsList.map((doctor, index) => (
              <div>
                <button key={doctor._id}>
                  <li>
                    <Link to={"/id/" + doctor._id}>
                      <div className="doc">
                        <img
                          className="doc-image"
                          src={`/images/${doctor.image}`}
                          alt="doctor"
                        />
                        <div className="doc-name">Dr.{doctor.name}</div>
                        <div className="doc-brand">
                          <h2>{doctor.spelization}</h2>
                        </div>
                        <div className="doc-rating">
                          {doctor.rating} stars (10 reviews)
                        </div>
                      </div>
                    </Link>
                  </li>
                </button>
              </div>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Select doctor from list below to fix appoinment with.</h3>
          <ul class="products">
            {/* Mapping all the doctors from the database list */}
            {this.state.doctorsList
              .filter(
                (doctor) =>
                  doctor.spelization == this.props.searchData ||
                  doctor.name == this.props.searchData
              )
              .map((doctor, index) => (
                <div>
                  <button key={doctor._id}>
                    <li>
                      <Link to={"/id/" + doctor._id}>
                        <div className="doc">
                          <img
                            className="doc-image"
                            src={`/images/${doctor.image}`}
                            alt="doctor"
                          />
                          <div className="doc-name">Dr.{doctor.name}</div>
                          <div className="doc-brand">
                            <h2>{doctor.spelization}</h2>
                          </div>
                          <div className="doc-rating">
                            {doctor.rating} stars (10 reviews)
                          </div>
                        </div>
                      </Link>
                    </li>
                  </button>
                </div>
              ))}
          </ul>
        </div>
      );
    }
  }
}

export default Doclist;
