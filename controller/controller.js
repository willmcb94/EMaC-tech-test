const { fetchRecipes, fetchRecipeById, addRecipe } = require('../model/model');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await fetchRecipes(req.query);

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
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
  }
};
exports.postRecipe = async (req, res) => {
  try {
    const newRecipeId = await addRecipe(req.body);
    res.status(201).send({ newRecipeId });
  } catch (err) {
    console.log(err);
  }
};
