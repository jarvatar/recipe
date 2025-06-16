import { prisma } from '@/lib/prisma'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { Recipe } from '@prisma/client'

export async function processRecipeWithIngredientExplanations(recipe: Recipe) {
  try {
    // Handle both JSON and Prisma JsonValue formats
    const ingredients = typeof recipe.ingredients === 'string' 
      ? JSON.parse(recipe.ingredients) 
      : recipe.ingredients
    
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate detailed ingredient explanations for this cocktail recipe: "${recipe.title}"

Ingredients: ${ingredients.map((i: any) => `${i.amount || ''} ${i.name}`.trim()).join(', ')}
Glass: ${recipe.glassType}
Base Spirit: ${recipe.baseSpirit}

For each key ingredient, write a detailed explanation covering:
- Why this specific ingredient was chosen
- What characteristics it brings to the cocktail
- Any specific brand/quality recommendations
- Alternative options and how they affect the drink
- Any preparation or measurement notes

Use the same tone and style as this example:
"We want the bourbon to offer a little resistance, so we most enjoyed ones that were on the spicier side of the spectrum and 45 percent or higher, like Bulleit or the Elijah Craig Small Batch..."

Format as: 
<h3 class="font-bold text-lg">Ingredient Name</h3>
<p class="font-extralight text-sm mb-4">Explanation paragraph here</p>

Focus on the 2-4 most important ingredients that define the cocktail.`
    })

    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { ingredientExplanations: text }
    })

    return text
  } catch (error) {
    console.error('Failed to generate ingredient explanations:', error)
    return null
  }
} 