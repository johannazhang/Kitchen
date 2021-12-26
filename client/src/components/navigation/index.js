import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "./logo.png"

import { logout } from "./../../actions/user";

class Nav extends React.Component {

  logoutUser = (app) => {
      this.props.history.push("/login");
      logout(app);
  };

  render() {
    const { app, history } = this.props
    return (
      <div className="nav">
        <Link to={"./../home"}>
          <img src={logo}/>
        </Link>
        <h3>{app.state.currentUser.name}</h3>
        <Link to={"./../home"}>
          <button className="nav-button">My Recipes</button><br/>
        </Link>
        <Link to={"./../new-recipe"}>
          <button className="nav-button">+ New Recipe</button><br/>
        </Link>
        <button className="logout" onClick={() => this.logoutUser(app)}>Log out</button>
      </div>
    );
  }
}

export default Nav;
