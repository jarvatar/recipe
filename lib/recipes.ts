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
  // First get the current recipe to match against
  const currentRecipe = await prisma.recipe.findUnique({
    where: { id },
  })

  if (!currentRecipe) {
    return []
  }

  // Try to find recipes with same base spirit first (highest priority)
  let similarRecipes: any[] = []
  
  if (currentRecipe.baseSpirit) {
    similarRecipes = await prisma.recipe.findMany({
      where: {
        NOT: { id },
        baseSpirit: currentRecipe.baseSpirit,
      },
      take: 6,
    })
  }

  // If we don't have enough, add recipes with same cocktail type
  if (similarRecipes.length < 6 && currentRecipe.cocktailType) {
    const cocktailTypeMatches = await prisma.recipe.findMany({
      where: {
        NOT: { 
          id: {
            in: [id, ...similarRecipes.map(r => r.id)]
          }
        },
        cocktailType: currentRecipe.cocktailType,
      },
      take: 6 - similarRecipes.length,
    })
    similarRecipes.push(...cocktailTypeMatches)
  }

  // If still not enough, add recipes with same season
  if (similarRecipes.length < 6 && currentRecipe.season) {
    const seasonMatches = await prisma.recipe.findMany({
      where: {
        NOT: { 
          id: {
            in: [id, ...similarRecipes.map(r => r.id)]
          }
        },
        season: currentRecipe.season,
      },
      take: 6 - similarRecipes.length,
    })
    similarRecipes.push(...seasonMatches)
  }

  // If still not enough, add recipes with same glass type
  if (similarRecipes.length < 6) {
    const glassMatches = await prisma.recipe.findMany({
      where: {
        NOT: { 
          id: {
            in: [id, ...similarRecipes.map(r => r.id)]
          }
        },
        glassType: currentRecipe.glassType,
      },
      take: 6 - similarRecipes.length,
    })
    similarRecipes.push(...glassMatches)
  }

  // Fill remaining slots with random recipes if needed
  if (similarRecipes.length < 6) {
    const randomRecipes = await prisma.recipe.findMany({
      where: {
        NOT: { 
          id: {
            in: [id, ...similarRecipes.map(r => r.id)]
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6 - similarRecipes.length,
    })
    similarRecipes.push(...randomRecipes)
  }

  // Shuffle the results to avoid always showing same order
  return similarRecipes.sort(() => 0.5 - Math.random()).slice(0, 3)
}
