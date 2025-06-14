'use client'

import { RecipeSchema } from '@/lib/recipes'
import { experimental_useObject as useObject } from 'ai/react'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export function RecipeGenerator() {
  const [prompt, setPrompt] = useState('')
  const {
    object: recipe,
    isLoading,
    submit,
    stop,
  } = useObject({
    api: '/api/generate-recipe',
    schema: RecipeSchema,
  })

  const handleSubmit = () => {
    if (prompt.trim()) {
      submit({ prompt })
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-input/20 bg-input/20 p-4">
      <p className="text-balance text-center">
        Enter the ingredients you have and we'll tell you how to craft the perfect cocktail, or simply enter a cocktail name and we'll tell you how to make it.
      </p>

      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Enter what you'd like to mix up (e.g., maple bacon old fashioned, watermelon martini, gin and tonic)"
          value={prompt}
          className="dark:bg-zinc-900"
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          rows={6}
        />
        {isLoading ? (
          <Button onClick={stop}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Stop
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!prompt.trim()}>
            Generate Recipe
          </Button>
        )}
      </div>

      {recipe && (
        <div className="mt-6 space-y-4">
          {recipe.title && (
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
          )}

          {recipe.description && (
            <p className="text-muted-foreground">{recipe.description}</p>
          )}

          {recipe.glassType && recipe.garnish && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div>🥃 {recipe.glassType}</div>
              <div>🍋 {recipe.garnish}</div>
            </div>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h4 className="font-medium">Ingredients:</h4>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>
                    {ingredient?.emoji && (
                      <span className="mr-2">{ingredient.emoji}</span>
                    )}
                    {ingredient?.amount && `${ingredient.amount} `}
                    {ingredient?.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h4 className="font-medium">Instructions:</h4>
              <ol className="list-decimal pl-5">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="mb-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {recipe.funnyQuote && (
            <div className="mt-4 text-sm italic text-muted-foreground">
              "{recipe.funnyQuote}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
