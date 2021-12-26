import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Button from "@material-ui/core/Button";

import { deleteRecipe } from "../../actions/recipe";

class RecipeList extends React.Component {

  removeRecipe = (app, recipeList, category, recipe) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const filteredRecipes = recipeList.filter(r => {
      return r !== recipe;
      });
      deleteRecipe(recipe._id)
      app.setState({
        [category]: filteredRecipes
      });
    }
  }

  viewRecipe = (app, recipeId, category) => {
     const recipes = app.state.recipes
     const currentRecipe = recipes.filter(recipe => {
       return recipe._id === recipeId;
     });
     console.log(currentRecipe[0])
     app.setState({currentRecipe: currentRecipe[0]})
     app.setState({currentCategory: category})
     // this.props.history.push(`/recipe/${recipeId}`)
  }

  render() {
    const { app, recipeList, category, history } = this.props
    return (
      <div>
        {recipeList.map(recipe => (
          <p className="recipe">
            <Link to={`./../recipe/${recipe._id}`}>
              <button className="recipe-button" type="button" onClick={() => this.viewRecipe(app, recipe._id, category)}>
                {recipe.name}
              </button>
            </Link>
            <button className="delete" type="button" onClick={() => this.removeRecipe(app, recipeList, category, recipe)}>
              x
            </button>
          </p>
        ))}
      </div>
    );
  }
}

export default RecipeList;
