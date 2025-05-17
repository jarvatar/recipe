import { slugToID } from '@/lib/slug-utils'
import { Prisma, Recipe } from '@prisma/client'

export function RecipeSchema({
  recipe,
  slug,
}: {
  recipe: Recipe
  slug: string
}) {
  const recipeId = Number(slugToID(slug))
  const ingredients = Prisma.parseJson<{ name: string; emoji?: string }[]>(
    recipe.ingredients
  )
  const temperature = Prisma.parseJson<{ fahrenheit: number }>(
    recipe.temperature
  )
  const instructions = Prisma.parseJson<string[]>(recipe.instructions)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Recipe Generator',
    description: recipe.description,
    image: `/api/recipes/${recipeId}/image`,
    author: {
      '@type': 'Organization',
      name: 'Recipe Generator',
      url: '/',
    },
    datePublished: new Date().toISOString(),
    prepTime: 'PT5M',
    cookTime: `PT${recipe.cookingTime}M`,
    totalTime: `PT${recipe.cookingTime + 5}M`,
    recipeYield: '2 servings',
    recipeIngredient: ingredients.map(
      (ing: { name: string; emoji?: string; amount?: string }) =>
        `${ing.amount || ''} ${ing.name}`.trim()
    ),
    recipeInstructions: instructions.map(
      (instruction: string, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: instruction,
      })
    ),
    cookingMethod: 'Air Frying',
    temperature: temperature.fahrenheit,
    nutrition: {
      '@type': 'NutritionInformation',
      cookingMethod: 'Air Frying',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
