const { readFile, writeFile } = require('fs/promises');
const {
  removeDuplicateIngredients,
  filterRecipesByIngredients,
} = require('../utils/utils');

exports.fetchRecipes = async (query) => {
  const recipesData = await readFile('./data/data.json', 'utf8');
  const unFilteredRecipes = JSON.parse(recipesData);
  const recipes = removeDuplicateIngredients(unFilteredRecipes);

  if (Object.keys(query).length === 0) {
    return recipes;
  } else {
    return filterRecipesByIngredients(recipes, query.exclude_ingredients);
  }
};

exports.fetchRecipeById = async (id) => {
  const recipesData = await readFile('./data/data.json', 'utf8');
  const recipes = JSON.parse(recipesData);
  const recipe = recipes.filter((recipe) => {
    return recipe.id === `recipe-${id}`;
  });

  if (recipe.length > 0) {
    return recipe;
  } else {
    return Promise.reject({
      status: 404,
      msg: `No recipe with ID ${id} found`,
    });
  }
};

exports.addRecipe = async (newRecipe) => {
  const recipesData = await readFile('./data/data.json', 'utf8');
  const recipes = JSON.parse(recipesData);

  newRecipe.id = `recipe-${recipes.length}`;

  recipes.push(newRecipe);

  writeFile('./data/data.json', JSON.stringify(recipes));

  return newRecipe.id;
};
