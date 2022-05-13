const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
  const { body } = await request.get('/api').expect(200);
  expect(body.message).toBe('ok');
});

describe('GET /api/recipes', () => {
  test('200 OK - Should return an array of recipes', () => {
    return supertest(server)
      .get('/api/recipes')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response._body.recipes)).toBe(true);
        expect(response._body.recipes.length).toBeGreaterThan(0);
      });
  });
  test('200 OK - Returned array should have objects with correct properties', () => {
    return supertest(server)
      .get('/api/recipes')
      .expect(200)
      .then((response) => {
        response._body.recipes.forEach((recipe) => {
          expect(recipe).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              imageUrl: expect.any(String),
              instructions: expect.any(String),
              ingredients: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                  grams: expect.any(Number),
                }),
              ]),
            })
          );
        });
      });
  });
  test('200 OK - If query given, shouldnt include any recipes with ingredients from query', () => {
    return supertest(server)
      .get('/api/recipes?exclude_ingredients=flax,kale')
      .expect(200)
      .then((response) => {
        response._body.recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            expect(ingredient.name).not.toBe('flax');
            expect(ingredient.name).not.toBe('kale');
          });
        });
      });
  });
  test('200 OK - If query ingredient has a space in it, should still remove any recipes which its in', () => {
    return supertest(server)
      .get('/api/recipes?exclude_ingredients=apple juice')
      .expect(200)
      .then((response) => {
        response._body.recipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            expect(ingredient.name).not.toBe('apple juice');
          });
        });
      });
  });
});

describe('GET /api/recipes/:id', () => {
  test('200 OK - Should return a recipe array with just 1 recipe in it', () => {
    return supertest(server)
      .get('/api/recipes/36')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response._body.recipe)).toBe(true);
        expect(response._body.recipe.length).toBe(1);
      });
  });
  test('200 OK - Returned array should have the correct recipe object', () => {
    return supertest(server)
      .get('/api/recipes/36')
      .expect(200)
      .then((response) => {
        expect(response._body.recipe[0]).toEqual(
          expect.objectContaining({
            id: 'recipe-36',
            imageUrl: 'http://www.images.com/21',
            ingredients: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                grams: expect.any(Number),
              }),
            ]),
          })
        );
      });
  });
});
