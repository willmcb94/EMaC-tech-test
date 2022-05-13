const { fetchRecipes, fetchRecipeById, addRecipe } = require('../model/model');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await fetchRecipes(req.query);
    console.log('test1');
    res.status(200).send({ recipes });
  } catch (err) {
    console.log(err);
  }
};
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await fetchRecipeById(req.params.id);
    res.status(200).send({ recipe });
  } catch (err) {
    console.log(err);
  }
};
exports.postRecipe = async (req, res) => {
  console.log(req.body);
  try {
    const newRecipeId = await addRecipe(req.body);
    res.status(201).send({ newRecipeId });
  } catch (err) {
    console.log(err);
  }
};
