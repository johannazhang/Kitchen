import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Header from "./../../components/header";
import Nav from "./../../components/navigation";

import { addRecipe } from "../../actions/recipe";

class NewRecipe extends React.Component {

  constructor(props) {
      super(props);
      this.props.history.push("/new-recipe");
  }

  state = {
    rname: "",
    category: "none",
    description: "",
    ingredient: "",
    ingredients: [],
    step: "",
    instructions: []
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  addIngredient = () => {
    const ingredients = this.state.ingredients
    ingredients.push(this.state.ingredient)
    this.setState({
      ingredients: ingredients
    })
    this.setState({
      ingredient: ""
    })
  }

  addStep = () => {
    const instructions = this.state.instructions
    instructions.push(this.state.step)
    this.setState({
      instructions: instructions
    })
    this.setState({
      step: ""
    })
  }

  removeIngredient = (ingredient) => {
    const filteredIngredients = this.state.ingredients.filter(i => {
      return i !== ingredient;
    });
    this.setState({
      ingredients: filteredIngredients
    });
  }

  removeStep = (step) => {
    const filteredSteps = this.state.instructions.filter(s => {
      return s !== step;
    });
    this.setState({
      instructions: filteredSteps
    });
  }

  render() {
    const { history, app } = this.props

    return (
      <div>
        <Nav app={app} history={history}/>
        <Header/>
        <form class="recipeForm">
           <h3>New Recipe</h3>
           <div class="inputs">
             <label for="rname">Recipe name:</label><br/>
             <input
               type="text"
               id="rname"
               name="rname"
               autocomplete="off"
               value={this.state.rname}
               onChange={this.handleInputChange}
             /><br/>

             <label for="categories">Category:</label>
             <select id="categories" name="category" value={this.state.category} onChange={this.handleInputChange}>
               <option value="none">None</option>
               <option value="main">Main</option>
               <option value="side">Side</option>
               <option value="dessert">Dessert</option>
               <option value="snack">Snack</option>
               <option value="drink">Drink</option>
             </select><br/>

             <label for="description">Description:</label><br/>
             <textarea
               type="text"
               id="description"
               name="description"
               rows="4"
               value={this.state.description}
               onChange={this.handleInputChange}
             /><br/>

             <label for="ingredients">Ingredients:</label><br/>
             <input
               type="text"
               id="ingredients"
               name="ingredient"
               autocomplete="off"
               value={this.state.ingredient}
               onChange={this.handleInputChange}
             /><br/>
             <input
               type="button"
               value="Add Ingredient"
               onClick={this.addIngredient}
             /><br/>

             <p className="added-ingredients">
               {this.state.ingredients.map(ingredient => (
                 <span className="ingredient">{ingredient}
                  <button className="remove" type="button" onClick={() => this.removeIngredient(ingredient)}>x</button>
                 </span>
               ))}
             </p>

             <label for="instructions">Instruction steps:</label><br/>
             <textarea
               type="text"
               id="instructions"
               name="step"
               rows="2"
               value={this.state.step}
               onChange={this.handleInputChange}
             /><br/>
             <input
              type="button"
              value="Add Step"
              onClick={this.addStep}
             /><br/>

             <p className="added-steps">
               {this.state.instructions.map((step, index) => (
                 <span className="step">{index+1}. {step}
                  <button className="remove" type="button" onClick={() => this.removeStep(step)}>x</button><br/>
                 </span>
               ))}
             </p>

             <input type="submit" value="Done" onClick={() => addRecipe(this)}/>

           </div>
        </form>
      </div>
    );
  }
}

export default NewRecipe;
