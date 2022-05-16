exports.removeDuplicateIngredients = (recipes) => {
  const recipesCopy = JSON.parse(JSON.stringify(recipes));
  const recipesFixed = recipesCopy.map((recipe) => {
    const uniqueIngredients = [];
    const ingredientsFixed = [];

    recipe.ingredients.forEach((ingredient) => {
      const isDuplicate = uniqueIngredients.includes(ingredient.name);
      if (!isDuplicate) {
        uniqueIngredients.push(ingredient.name);
        ingredientsFixed.push({
          name: ingredient.name,
          grams: ingredient.grams,
        });
        return true;
      }
      ingredientsFixed.forEach((item) => {
        if (item.name === ingredient.name) {
          item.grams += ingredient.grams;
        }
      });
      return false;
    });
    recipe.ingredients = ingredientsFixed;
    return recipe;
  });
  return recipesFixed;
};

exports.filterRecipesByIngredients = (recipes, query) => {
  const excluded = query.split(',');

  const recipesFiltered = recipes.filter((recipe) => {
    let includes = false;

    recipe.ingredients.forEach((ingredient) => {
      if (excluded.includes(ingredient.name)) {
        includes = true;
      }
    });
    if (!includes) {
      return recipe;
    }
  });
  return recipesFiltered;
};
