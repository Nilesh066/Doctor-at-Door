import React from "react";
import "./App.css";

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Doc-at-door</h3>
        <p>
          This website is developed in 2020.The motive behind developing this
          website is to book an appoinment with doctors with different
          specilization.This also helps the the doctors to keep the records of
          the patient on daily basis.
        </p>
        <p>
          Stressed lifestyle due to overwork or work pressure may lead to the
          inability to manage time for daily workouts, and variation in eating
          routines which will have a major impact on your health. It is said
          that “Health is wealth”, maintaining good health is very important for
          every individual. Keeping this in mind, Sakra offers various health
          check-up packages that defines the particular health problems of
          professionals and executives. Theses health packages include a
          comprehensive array of various tests, and general health check-ups.
          <b>Doc-At-Door</b> is dedicated to providing a tailor-made health
          package to everyone who is looking for complete body check-up and
          general health check-up services offered at an affordable cost
        </p>
      </div>
    );
  }
}
export default About;
