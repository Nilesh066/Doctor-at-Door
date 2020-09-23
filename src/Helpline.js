import React from "react";
import "./App.css";

class Helpline extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Doc-at-door</h3>
        <p>
          <h2>Emergency Helpline Numbers :</h2>
          <ul>
            <li>Delhi : 080-677-4711</li>
            <li>Mumbai : 080-642-4733</li>
            <li>Kolkata : 080-653-4567</li>
            <li>Chennai : 080-097-4900</li>
            <li>Chandigarh : 080-680-4761</li>
            <li>Bangalore : 080-657-4701</li>
            <li>Hyderabad : 080-680-4754</li>
          </ul>
        </p>
        <img
          className="emergency-image"
          src="/images/Emergency.jpg"
          height="400px"
          width="400px"
        ></img>
      </div>
    );
  }
}
export default Helpline;
