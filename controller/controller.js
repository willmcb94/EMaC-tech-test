const { fetchRecipes } = require('../model/model');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await fetchRecipes();
    console.log('test1');
    res.status(200).send({ recipes });
  } catch (err) {
    console.log(err);
  }
};
