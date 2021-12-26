// Functions to help with recipe actions

// environment configurations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// send GET request to get recipes
export const getRecipes = (recipeList) => {
    const url = `${API_HOST}/api/recipes`;

    fetch(url)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          } else {
              alert("Could not get recipes");
          }
      })
      .then(json => {
          recipeList.setState({ recipes: json.recipes });

          const mains = json.recipes.filter(recipe => {
            return recipe.category === "main";
          });
          recipeList.setState({ mains: mains });

          const sides = json.recipes.filter(recipe => {
            return recipe.category === "side";
          });
          recipeList.setState({ sides: sides });

          const desserts = json.recipes.filter(recipe => {
            return recipe.category === "dessert";
          });
          recipeList.setState({ desserts: desserts });

          const snacks = json.recipes.filter(recipe => {
            return recipe.category === "snack";
          });
          recipeList.setState({ snacks: snacks });

          const drinks = json.recipes.filter(recipe => {
            return recipe.category === "drink";
          });
          recipeList.setState({ drinks: drinks });

      })
      .catch(error => {
          console.log(error);
      });
};

// send POST request with a new recipe
export const addRecipe = (formComp) => {
    const url = `${API_HOST}/api/recipes`;

    const recipe = {
      name: formComp.state.rname,
      category: formComp.state.category,
      description: formComp.state.description,
      ingredients: formComp.state.ingredients,
      instructions: formComp.state.instructions
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(recipe),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
      .then(function (res) {
          if (res.status === 200) {
              return res.json()
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// delete specific recipe
export const deleteRecipe = (recipeId) => {
    const url = `${API_HOST}/api/recipes/${recipeId}`;

    fetch(url,
      {method: 'delete'}
    )
    .then((res) => { res.json(); })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => { console.log(error); });
}

export const getRecipe = (recipeComp, recipeId) => {
  const url = `${API_HOST}/api/recipes/${recipeId}`;
   fetch(url)
  .then((res) => {
      if (res.status === 200) {
          return res.json();
      } else {
          console.log('Could not get recipe');
      }
  })
  .then((json) => {
      recipeComp.setState({currentRecipe: json.recipe});
  }).catch((error) => {
      console.log(error);
  });
}
