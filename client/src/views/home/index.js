import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./../../components/header";
import Nav from "./../../components/navigation";

import { getRecipes } from "../../actions/recipe";

class Home extends React.Component {
  constructor(props) {
      super(props);
      this.props.history.push("/home");
  }

  render() {
    const { history, app } = this.props
    return (
      <div>
        <Nav app={app} history={history}/>
        <Header/>
        <div className="categories">
          <Link to={"./../recipes"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>ALL RECIPES <span>&#128466;</span></button>
          </Link>
          <Link to={"./../mains"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>MAINS <span>&#127869;</span> </button>
          </Link>
          <Link to={"./../sides"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>SIDES <span>&#129367;</span> </button>
          </Link>
          <Link to={"./../desserts"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>DESSERTS <span>&#129473;</span> </button>
          </Link>
          <Link to={"./../snacks"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>SNACKS <span>&#127818;</span> </button>
          </Link>
          <Link to={"./../drinks"}>
           <button type="button" className="category" onClick={() => getRecipes(app)}>DRINKS <span>&#127864;</span> </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
