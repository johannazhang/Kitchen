import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link className="home-button" to={"./../home"}>
          <h1>KITCHEN</h1>
        </Link>
      </div>
    );
  }
}

export default Header;
