# Lizzo’s Juicy Juice Bar

Lizzo’s Juicy Juice Bar, a trendy Northern Quarter juice/smoothie cafe, is only a few days from launching. Lizzo has lots of raw data to populate her digital menus, and she needs a way to build custom menu plans from this raw menu plan data.

## 1 - GET `/api/recipes`

Write a GET endpoint that responds with a list of all recipes.

Include a query (`?exclude_ingredients=apples,bananas,carrots`) to exclude recipes that contain specific ingredients.

# 2 - GET `/api/recipes/:id`

Write a GET endpoint that responds with a single recipe.

# 3 - POST `/api/recipes`

Write a POST endpoint that adds a recipe to the data.

## 4 - POST `/api/plan`

Write a POST endpoint that builds a 0-6 week menu plan from individual recipes.

### Request

Users of this endpoint should specify which ingredient plans they want to follow for each day of the week.

The post request body should match the following schema:

```json
{
  "days": [
    ["recipe-1", "recipe-2", "recipe-3", "recipe-4", "recipe-5", "recipe-6"],
    ["recipe-1"],
    ["recipe-1", "recipe-2", "recipe-3", "recipe-6"],
    [],
    ["recipe-1", "recipe-2", "recipe-3", "recipe-4", "recipe-5", "recipe-6"]
  ]
}
```

With the above plan, Monday has 6 recipes, and therefore there will be recipes for 6 Mondays. Thursday has none.

- Plan ids should always be non-empty strings, each day should have between 0 and 6 plan ids (inclusive).

- The above request would create a recipe plan that lasted 6 weeks for Monday, with the 6th Monday listing recipe-6.

- The length of the overall plan should be equivalent to the length of the day with the most recipes, up to a maximum of 6 weeks.

### Response

It’s up to you how you want to return the full recipe plan to the user. Each day needs ingredients, the associated image, and its instructions, but you can structure the data however you think is best, just be mindful of the developer that has to write the client-side code that would handle this response.

Please leave comments justifying your choices for the response.

## Tips

- We're looking for clean code that follows good practices, and we need to know that it _works_.

- Your server should follow the principles of REST, and crucially be stateless and idempotent.

- Some recipes - i.e. recipe-86, have duplicated ingredients with different weights. Is there a nicer way to handle this?

- Feel free to modify the `data.json` if you wish. If you choose to do this, do it programmatically, and we'd like to see your working out.
