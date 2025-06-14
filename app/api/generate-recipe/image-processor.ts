import { prisma } from '@/lib/prisma'
import { idToSlug } from '@/lib/slug-utils'
import { Recipe } from '@prisma/client'
import { put } from '@vercel/blob'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function processRecipeWithImage(recipe: Recipe) {
  try {
    // 1. Generate image with Replicate
    let ingredients = 'cocktail ingredients'
    if (recipe.ingredients) {
      ingredients = (recipe.ingredients as { name: string }[])
        .map((ingredient) => ingredient.name)
        .join(', ')
    }

    const replicateUrl = (await replicate.run(
      'black-forest-labs/flux-schnell',
      {
        input: {
          aspect_ratio: '16:9',
          go_fast: true,
          megapixels: '1',
          num_outputs: 1,
          output_format: 'jpg',
          output_quality: 95,
          prompt: `A high-resolution, photo-realistic image of a ${recipe.title} served in a ${recipe.glassType}, placed on a polished bar counter. The drink appears vibrant and visually striking, showing its distinctive color and clarity. A ${recipe.garnish} is positioned naturally — resting on the drink, skewered on a cocktail pick, or gently placed against the rim — with realistic weight, shadows, and gravity. The lighting is moody and cinematic, casting soft, directional highlights and shadows. The background shows a softly blurred upscale bar interior with shallow depth of field. Professional cocktail photography style, 8K, food blog aesthetic, appetizing presentation. No floating garnish, no surreal elements, no distortion, no CGI.
`, 
        },
      }
    )) as unknown as string

    if (!replicateUrl) return null

    // 2. Fetch the image from Replicate
    const response = await fetch(replicateUrl)
    const imageBlob = await response.blob()

    // 3. Upload to Vercel Blob Storage with unique filename
    const slug = idToSlug(recipe.title, recipe.id)
    const filename = `recipe-${slug}.jpg`
    const { url } = await put(filename, imageBlob, {
      access: 'public',
      contentType: 'image/jpeg',
    })

    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { imageUrl: url },
    })
    recipe.imageUrl = url

    return recipe
  } catch (error) {
    console.error('Failed to generate/save image:', error)
    return null
  }
}
