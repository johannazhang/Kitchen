import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "./logo.png"

import { login } from "../../actions/user";

class Login extends React.Component {

  constructor(props) {
      super(props);
      this.props.history.push("/login");
  }

  state = {
    email: "",
    password: ""
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
      <div className="login-container">
         <div className="header">
           <h1>KITCHEN</h1>
           <p>A digital cookbook for all your go-to recipes.</p>
           <img src={logo}/>
         </div>
         <form className="login">
          <label for="email">Email:</label><br/>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          /><br/>

          <label for="password">Password:</label><br/>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          /><br/>

          <input type="submit" value="Log in" onClick={() => login(this, app)}/><br/>
          <Link class="signup-link" to={"./../signup"}>
            <p class="signup">Or sign up</p>
          </Link>
         </form>
      </div>
    );
  }
}

export default Login;
