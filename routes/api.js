const {
  getRecipes,
  getRecipe,
  postRecipe,
} = require('../controller/controller');

const apiRouter = require('express').Router();

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});
apiRouter.get('/recipes', getRecipes);
apiRouter.get('/recipes/:id', getRecipe);
apiRouter.post('/recipes', postRecipe);

module.exports = apiRouter;
