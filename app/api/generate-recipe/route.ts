import { prisma } from '@/lib/prisma'
import { RecipeSchema } from '@/lib/recipes'
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { processRecipeWithImage } from './image-processor'

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
        Generate a detailed air fryer recipe with the following requirements:
        ${prompt}

        The recipe should include:
        - A creative and descriptive title
        - A brief description of the dish
        - A complete list of ingredients with measurements and optional emoji
        - Air fryer temperature in both Fahrenheit and Celsius
        - Cooking time in minutes
        - Clear, step-by-step instructions
        - A funny cooking-related quote
        
        Format:
        - Title should be descriptive but concise
        - Description should be appetizing and informative
        - Each ingredient should have:
          * An optional emoji
          * The ingredient name
          * Optional amount/measurement
        - Temperature should be optimized for air frying
        - Instructions should be in chronological order
        - Use clear, everyday language
        - Add a humorous quote related to cooking or the dish
      `,
      onFinish: async (event) => {
        if (!event.object) return
        const { data: recipe, error } = RecipeSchema.safeParse(event.object)

        if (!recipe) {
          console.error('Invalid recipe:', error)
          return
        }

        // Save the complete recipe with image
        const createdRecipe = await prisma.recipe.create({
          data: recipe,
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
