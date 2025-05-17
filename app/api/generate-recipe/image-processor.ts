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
    let ingredients = 'kitchen stuff'
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
          prompt: `A beautiful photo of ${recipe.title} surrounded by ${ingredients} next to an air fryer, food photography, professional lighting, appetizing, food blog style, 8k`,
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
