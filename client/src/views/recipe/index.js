import React from "react";
import { Link } from "react-router-dom";
import Header from "./../../components/header";
import Nav from "./../../components/navigation";
import RecipeInfo from "./../../components/recipe";

class Recipe extends React.Component {

  constructor(props) {
      super(props);
      this.props.history.push(`/recipe/${this.props.match.params.id}`);
      console.log(this.props.app.state)
  }

  render() {
    const { app, history } = this.props
    return (
      <div>
        <Nav app={app} history={history}/>
        <Header/>
        <RecipeInfo recipe={app.state.currentRecipe} category={app.state.currentCategory} />
      </div>
    );
  }
}

export default Recipe;
