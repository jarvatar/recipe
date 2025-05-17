import { Breadcrumbs } from '@/components/breadcrumbs'
import { RecipeSchema } from '@/components/recipe-schema'
import { getRecipe, getSimilarRecipes } from '@/lib/recipes'
import { generatePageMeta } from '@/lib/seo'
import { slugToID } from '@/lib/slug-utils'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const id = Number(slugToID(slug))
  const recipe = await getRecipe(id)

  // SEO: Prevent indexing of non-existent recipes with noindex
  if (!recipe) {
    return generatePageMeta({
      title: 'Recipe not found',
      description: 'Recipe not found',
      noindex: true,
    })
  }

  const ingredients = Prisma.parseJson<
    { name: string; emoji?: string; amount?: string }[]
  >(recipe.ingredients)

  // SEO: Generate unique metadata for each recipe
  // Including Open Graph image for better social sharing
  return generatePageMeta({
    title: recipe.title,
    description: recipe.description,
    url: `/recipes/${slug}`,
    image: `/og?path=/recipes/${slug}&title=${encodeURIComponent(recipe.title)}&emoji=${encodeURIComponent(ingredients[0]?.emoji || '🍳')}`,
    image_alt: recipe.title,
    image_width: 1200,
    image_height: 630,
  })
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const id = Number(slugToID(slug))
  const recipe = await getRecipe(id)
  const similarRecipes = await getSimilarRecipes(id)

  if (!recipe) {
    return null
  }

  const ingredients = Prisma.parseJson<
    { name: string; emoji?: string; amount?: string }[]
  >(recipe.ingredients)

  const temperature = Prisma.parseJson<{ fahrenheit: number; celsius: number }>(
    recipe.temperature
  )

  const instructions = Prisma.parseJson<string[]>(recipe.instructions)

  return (
    <>
      <div className="container mx-auto px-4">
        {/* SEO: Breadcrumb navigation helps search engines understand site hierarchy */}
        <div className="py-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Recipes', href: '/recipes' },
              { label: recipe.title },
            ]}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* SEO: Structured data helps search engines understand content and enables rich results */}
          <RecipeSchema recipe={recipe} slug={slug} />

          {/* SEO: Proper heading hierarchy with descriptive h1 title */}
          <div className="space-y-4">
            <h1 className="text-balance text-center text-4xl font-bold sm:text-6xl">
              {recipe.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {recipe.description}
            </p>
          </div>

          {/* SEO: Image with descriptive alt text and dimensions */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-4 border-black/10 bg-muted shadow-xl dark:border-white/10 dark:shadow-yellow-400/10">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl">
                🍳
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-orange-500/50 bg-orange-500/10 px-6 py-2 text-orange-900 dark:text-orange-200">
              ⏲️ {recipe.cookingTime} minutes
            </div>
            <div className="inline-flex items-center rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-2 text-blue-900 dark:text-blue-200">
              🌡️ {temperature.fahrenheit}°F ({temperature.celsius}°C)
            </div>
          </div>

          {/* SEO: Semantic sections with proper heading hierarchy */}
          <div id="ingredients" className="space-y-4">
            <h2 className="text-3xl font-bold">Ingredients</h2>
            <ul className="grid gap-2 text-lg">
              {ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span>{ingredient.emoji}</span>
                  <span>{ingredient.name}</span>
                  {ingredient.amount && (
                    <span className="text-muted-foreground">
                      ({ingredient.amount})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div id="instructions" className="space-y-4">
            <h2 className="text-3xl font-bold">Instructions</h2>
            <ol className="space-y-4 text-lg">
              {instructions.map((instruction, i) => (
                <li key={i} className="flex gap-4">
                  <span className="select-none font-semibold">{`${i + 1}.`}</span>
                  <span>
                    {instruction.match(/^\d+\.\s/)
                      ? instruction.slice(2)
                      : instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <blockquote className="rounded-xl border bg-muted/50 p-6 text-lg italic text-muted-foreground">
            "{recipe.funnyQuote}"
          </blockquote>

          {/* SEO: Internal linking to related content improves site structure */}
          {similarRecipes.length > 0 && (
            <div className="mt-8 space-y-8 border-t pt-8">
              <h2 className="text-2xl font-bold sm:text-4xl">More Recipes</h2>
              <div className="grid gap-8 sm:grid-cols-3">
                {similarRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.id}`}
                    className="group space-y-2"
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-black/5 bg-muted shadow-lg dark:border-white/5 dark:shadow-yellow-400/5">
                      {recipe.imageUrl ? (
                        <Image
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          width={1920}
                          height={1080}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">
                          🍳
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {recipe.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {recipe.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
