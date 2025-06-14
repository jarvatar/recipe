import { prisma } from '@/lib/prisma'
import { RecipeSchema } from '@/lib/recipes'
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { processRecipeWithImage } from './image-processor'
import { normalizeCategory } from '@/lib/category-mappings'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    if (!prompt) {
      return new Response('Recipe prompt is required', { status: 400 })
    }

    const stream = streamObject({
      model: openai('gpt-4o-mini'),
      schema: RecipeSchema,
      output: 'object',
      prompt: `
        Generate a detailed cocktail recipe with the following requirements:
        ${prompt}

        The recipe should include:
        - A creative and descriptive title
        - A brief description of the cocktail
        - The specific type of glass the cocktail should be served in (e.g., "Martini glass", "Rocks glass", "Highball glass", "Coupe glass", "Margarita glass")
        - The garnish that should be used (e.g., "Lemon twist", "Olive", "Mint sprig", "Orange peel", "Cherry", "Lime wheel")
        - A complete list of ingredients with measurements and optional emoji
        - Clear, step-by-step mixing instructions
        - A funny cocktail-related quote
        
        Format:
        - Title should be descriptive but concise
        - Description should be appetizing and informative
        - Glass type should be specific (Martini glass, Rocks glass, Highball glass, etc.)
        - Garnish should be realistic and appropriate for the cocktail
        - Each ingredient should have:
          * An optional emoji
          * The ingredient name
          * Specific amount/measurement
        - Instructions should be in chronological order for mixing
        - Add a list of alternative ingredients that can be used to make the cocktail
        - Include a description of what the cocktail is best served with.  Mention how the flavor profile of the cocktail pairs with the food.
        - Use clear, everyday language
        - Add a humorous quote related to cocktails or drinking
        
        Additionally, classify the cocktail with:
        - Base spirit (e.g., Gin, Tequila, Bourbon)
        - Cocktail type (e.g., Martini, Margarita, Sour)
        - Adjective (e.g., Refreshing, Strong, Sweet)
        - Season (e.g., Summer, Winter, All Year)
        - Drink classification (e.g., Aperitifs, Digestifs, Brunch Cocktails, Dessert Cocktails, Party Cocktails)
        
        Also include:
        - Alternative ingredients that can be used
        - What the cocktail pairs well with (food pairings)
        
        For categorization:
        - Base spirit should be the primary alcohol
        - Cocktail type should be the classic style it's based on
        - Adjective should describe the main characteristic
        - Season should indicate when it's best served
        - Drink classification should indicate when/how the cocktail is typically enjoyed (pre-dinner aperitif, post-dinner digestif, brunch drink, dessert pairing, or party/group serving)
      `,
      onFinish: async (event) => {
        if (!event.object) return
        const { data: recipe, error } = RecipeSchema.safeParse(event.object)

        if (!recipe) {
          console.error('Invalid recipe:', error)
          return
        }

        const createdRecipe = await prisma.recipe.create({
          data: recipe as any,
        })

        await processRecipeWithImage(createdRecipe)
      },
    })

    return new Response(stream.textStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API route error:', error)
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
