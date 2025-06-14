import { z } from 'zod'
import { prisma } from './prisma'

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  glassType: z.string(),
  garnish: z.string(),
  ingredients: z.array(
    z.object({
      emoji: z.string().optional(),
      name: z.string(),
      amount: z.string().optional(),
    })
  ),
  instructions: z.array(z.string()),
  baseSpirit: z.string().optional(),
  cocktailType: z.string().optional(),
  adjective: z.string().optional(),
  season: z.string().optional(),
  drinkClassification: z.string().optional(),
  alternativeIngredients: z.array(z.string()).optional(),
  bestServedWith: z.string().optional(),
  funnyQuote: z.string(),
})

export type Recipe = z.infer<typeof RecipeSchema>

export async function getRecipe(id: number) {
  return prisma.recipe.findUnique({
    where: { id },
  })
}

export async function getSimilarRecipes(id: number) {
  // Get 3 random recipes excluding the current one
  const recipes = await prisma.recipe.findMany({
    where: {
      NOT: { id },
    },
    orderBy: {
      // Random order using Postgres
      createdAt: 'desc',
    },
    take: 3,
  })

  // Additional shuffle for true randomness
  return recipes.sort(() => 0.5 - Math.random())
}
