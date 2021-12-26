import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./../../components/header";
import Nav from "./../../components/navigation";
import RecipeList from "./../../components/recipeList";

class Recipes extends React.Component {

  constructor(props) {
      super(props);
      this.props.history.push("/recipes");
  }

  render() {
    const { history, app } = this.props

    return (
      <div>
        <Nav app={app} history={history}/>
        <Header/>
        <div class="recipes">
          <Link to={"./../home"}>
            <button className="back" type="button">{"< back"}</button>
          </Link>
          <h3 class="category-name">ALL RECIPES</h3>
          <RecipeList app={app} recipeList={app.state.recipes} category={'recipes'} history={history}/>
          <Link className="add-recipe" to={"./../new-recipe"}>
            <p>Add Recipe</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Recipes;
