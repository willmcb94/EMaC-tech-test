const {
  removeDuplicateIngredients,
  filterRecipesByIngredients,
} = require('../utils/utils.js');

describe('removeDuplicateIngredients', () => {
  const recipes = [
    {
      id: 'recipe-59',
      imageUrl: 'http://www.images.com/18',
      instructions:
        '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
      ingredients: [
        { name: 'demerara sugar', grams: 25 },
        { name: 'flax', grams: 66 },
        { name: 'flax', grams: 47 },
      ],
    },
    {
      id: 'recipe-31',
      imageUrl: 'http://www.images.com/21',
      instructions: 'spin it, twist it, pull it, flick it... bop it!',
      ingredients: [
        { name: 'strawberries', grams: 187 },
        { name: 'kale', grams: 41 },
        { name: 'kale', grams: 45 },
      ],
    },
  ];
  test('should return a new array', () => {
    expect(Array.isArray(removeDuplicateIngredients(recipes))).toBe(true);
    expect(removeDuplicateIngredients(recipes)).not.toBe(recipes);
  });
  test('should return empty array if passed an empty array', () => {
    expect(removeDuplicateIngredients([])).toEqual([]);
  });
  test('orginal input should not be mutated', () => {
    const recipesCopy = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 66 },
          { name: 'flax', grams: 47 },
        ],
      },
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 41 },
          { name: 'kale', grams: 45 },
        ],
      },
    ];
    removeDuplicateIngredients(recipes);
    expect(recipes).toEqual(recipesCopy);
  });
  test('should remove duplicate ingredients', () => {
    const removeDuplicates = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 113 },
        ],
      },
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 86 },
        ],
      },
    ];
    expect(removeDuplicateIngredients(recipes)).toEqual(removeDuplicates);
  });
  // the test above now actually checks the same as below, as after completing the below test it began to fail. I have left it in to show my thought process. Originally the test above would just check that duplicates have been removed not that the grams had been added together
  test('should add grams together of any duplicates', () => {
    const removeDuplicates = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 113 },
        ],
      },
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 86 },
        ],
      },
    ];
    expect(removeDuplicateIngredients(recipes)).toEqual(removeDuplicates);
  });
});

describe('filterRecipesByIngredients', () => {
  const queryOne = 'sugar';
  const queryTwo = 'sugar,flax';
  const recipes = [
    {
      id: 'recipe-59',
      imageUrl: 'http://www.images.com/18',
      instructions:
        '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
      ingredients: [
        { name: 'demerara sugar', grams: 25 },
        { name: 'flax', grams: 113 },
      ],
    },
    {
      id: 'recipe-31',
      imageUrl: 'http://www.images.com/21',
      instructions: 'spin it, twist it, pull it, flick it... bop it!',
      ingredients: [
        { name: 'strawberries', grams: 187 },
        { name: 'kale', grams: 86 },
      ],
    },
    {
      id: 'recipe-77',
      imageUrl: 'http://www.images.com/25',
      instructions: 'blend with oat milk and ice, sprinkle with salt',
      ingredients: [
        { name: 'coconut', grams: 71 },
        { name: 'lime', grams: 153 },
        { name: 'oat milk', grams: 31 },
      ],
    },
    {
      id: 'recipe-65',
      imageUrl: 'http://www.images.com/5',
      instructions: 'spin it, twist it, pull it, flick it... bop it!',
      ingredients: [
        { name: 'double cream', grams: 144 },
        { name: 'sugar', grams: 153 },
      ],
    },
  ];
  test('should return a new array', () => {
    expect(Array.isArray(filterRecipesByIngredients(recipes, queryOne))).toBe(
      true
    );
    expect(filterRecipesByIngredients(recipes, queryOne)).not.toBe(recipes);
  });
  test('should return empty array if empty array passed', () => {
    expect(filterRecipesByIngredients([], queryOne)).toEqual([]);
  });
  test('orginal input should not be mutated', () => {
    const recipesCopy = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 113 },
        ],
      },
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 86 },
        ],
      },
      {
        id: 'recipe-77',
        imageUrl: 'http://www.images.com/25',
        instructions: 'blend with oat milk and ice, sprinkle with salt',
        ingredients: [
          { name: 'coconut', grams: 71 },
          { name: 'lime', grams: 153 },
          { name: 'oat milk', grams: 31 },
        ],
      },
      {
        id: 'recipe-65',
        imageUrl: 'http://www.images.com/5',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'double cream', grams: 144 },
          { name: 'sugar', grams: 153 },
        ],
      },
    ];
    filterRecipesByIngredients(recipes, queryOne);
    expect(recipes).toEqual(recipesCopy);
  });
  test('should exclude any recipes which include items from the query', () => {
    const filteredRecipesOne = [
      {
        id: 'recipe-59',
        imageUrl: 'http://www.images.com/18',
        instructions:
          '60 seconds on the highest setting your blender has, or until a smooth paste has formed',
        ingredients: [
          { name: 'demerara sugar', grams: 25 },
          { name: 'flax', grams: 113 },
        ],
      },
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 86 },
        ],
      },
      {
        id: 'recipe-77',
        imageUrl: 'http://www.images.com/25',
        instructions: 'blend with oat milk and ice, sprinkle with salt',
        ingredients: [
          { name: 'coconut', grams: 71 },
          { name: 'lime', grams: 153 },
          { name: 'oat milk', grams: 31 },
        ],
      },
    ];
    const filteredRecipesTwo = [
      {
        id: 'recipe-31',
        imageUrl: 'http://www.images.com/21',
        instructions: 'spin it, twist it, pull it, flick it... bop it!',
        ingredients: [
          { name: 'strawberries', grams: 187 },
          { name: 'kale', grams: 86 },
        ],
      },
      {
        id: 'recipe-77',
        imageUrl: 'http://www.images.com/25',
        instructions: 'blend with oat milk and ice, sprinkle with salt',
        ingredients: [
          { name: 'coconut', grams: 71 },
          { name: 'lime', grams: 153 },
          { name: 'oat milk', grams: 31 },
        ],
      },
    ];
    expect(filterRecipesByIngredients(recipes, queryOne)).toEqual(
      filteredRecipesOne
    );
    expect(filterRecipesByIngredients(recipes, queryTwo)).toEqual(
      filteredRecipesTwo
    );
  });
});
