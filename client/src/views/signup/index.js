import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "./logo.png"

import { signup } from "../../actions/user";

class Signup extends React.Component {

  constructor(props) {
      super(props);
      this.props.history.push("/signup");
  }

  state = {
    name: "",
    email: "",
    password: "",
    success: false
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { app } = this.props

    return (
      <div className="signup-container">
         <div className="header">
           <h1>KITCHEN</h1>
           <p>A digital cookbook for all your go-to recipes.</p>
           <img src={logo}/>
         </div>
         <form class="signup">
            <label for="name">Name:</label><br/>
            <input
              type="text"
              id="name"
              name="name"
              autocomplete="off"
              value={this.state.name}
              onChange={this.handleInputChange}
            /><br/>

            <label for="email">Email:</label><br/>
            <input
              type="text"
              id="email"
              name="email"
              autocomplete="off"
              value={this.state.email}
              onChange={this.handleInputChange}
            /><br/>

            <label for="password">Password:</label><br/>
            <input
              type="password"
              id="password"
              name="password"
              autocomplete="off"
              value={this.state.password}
              onChange={this.handleInputChange}
            /><br/>
            <p className="message">{"Minimum 6 characters"}</p>

            <Link  to={"./../login"}>
              <input type="submit" value="Sign up" onClick={() => signup(this)}/>
            </Link>
            <p> {"Already have an account? "}
            <Link class="login-link" to={"./../login"}>
              <span class="login">Log in</span>
            </Link>
            </p>
         </form>
      </div>
    );
  }
}

export default Signup;
