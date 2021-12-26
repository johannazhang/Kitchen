import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

class RecipeInfo extends React.Component {

  render() {
    const { recipe, category } = this.props
    return (
      <div className="recipe-info">
        <Link to={`./../${category}`}>
          <button className="back-recipe" type="button">{"< back"}</button>
        </Link>
       <div className="info">
         <h3 className="name">{recipe.name}</h3>
         <p>{recipe.description}</p>
         <h4>Ingredients</h4>

         <ul>
           {recipe.ingredients.map(ingredient => (
             <li>{ingredient}</li>
           ))}
         </ul>
         <h4>Instructions</h4>
         <ol>
           {recipe.instructions.map(step => (
             <li>{step}</li>
           ))}
         </ol>
       </div>
      </div>
    );
  }
}

export default RecipeInfo;
