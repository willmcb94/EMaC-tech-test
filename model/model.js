const { readFile, writeFile } = require('fs/promises');
const { removeDuplicateIngredients } = require('../utils/utils');
exports.fetchRecipes = async () => {
  const recipesData = await readFile('./data/data.json', 'utf8');
  const unfilteredRecipes = JSON.parse(recipesData);

  const recipes = removeDuplicateIngredients(unfilteredRecipes);

  return recipes;
};
