import { z } from 'zod'
import { prisma } from './prisma'

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      emoji: z.string().optional(),
      name: z.string(),
      amount: z.string().optional(),
    })
  ),
  temperature: z.object({
    fahrenheit: z.number(),
    celsius: z.number(),
  }),
  cookingTime: z.number(),
  instructions: z.array(z.string()),
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
