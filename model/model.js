const { readFile, writeFile } = require('fs/promises');
exports.fetchRecipes = async () => {
  console.log('test2');
  const recipesData = await readFile('./data/data.json', 'utf8');
  const recipes = JSON.parse(recipesData);

  return recipes;
};
