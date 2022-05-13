const { getRecipes } = require('../controller/controller');

const apiRouter = require('express').Router();

apiRouter.get('/', (_, res) => {
  res.json({ message: 'ok' });
});
apiRouter.get('/recipes', getRecipes);

module.exports = apiRouter;
