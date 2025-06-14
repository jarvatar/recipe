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
  const ingredients = Prisma.parseJson<{ name: string; emoji?: string; amount?: string }[]>(
    recipe.ingredients
  )
  const instructions = Prisma.parseJson<string[]>(recipe.instructions)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: `/api/recipes/${recipeId}/image`,
    author: {
      '@type': 'Organization',
      name: 'Cocktail Recipe Generator',
      url: '/',
    },
    datePublished: new Date().toISOString(),
    prepTime: 'PT5M',
    recipeCategory: 'Cocktail',
    recipeYield: '1 cocktail',
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
    keywords: `cocktail, ${recipe.glassType}, ${recipe.garnish}, mixology`,
    recipeEquipment: recipe.glassType,
    garnish: recipe.garnish,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
