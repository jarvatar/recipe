import { Breadcrumbs } from '@/components/breadcrumbs'
import { RecipeSchema } from '@/components/recipe-schema'
import { getRecipe, getSimilarRecipes } from '@/lib/recipes'
import { generatePageMeta } from '@/lib/seo'
import { slugToID, idToSlug } from '@/lib/slug-utils'
import { getGarnishEmoji } from '@/lib/garnish-utils'
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
    title: `How to make a ${recipe.title} cocktail. ${recipe.title} cocktail recipe.`,
    description: `Learn how to make a ${recipe.title} cocktail. ${recipe.title} cocktail recipe from Cocktail Muse featuring ${recipe.baseSpirit}, and ${recipe.garnish} perfect for ${recipe.season}.`,
    url: `/recipes/${slug}`,
    image: `/og?path=/recipes/${slug}&title=${encodeURIComponent(recipe.title)}&emoji=${encodeURIComponent(ingredients[0]?.emoji || '🍸')}`,
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

  const instructions = Prisma.parseJson<string[]>(recipe.instructions)

  return (
    <>
      <div className="container mx-auto px-4">
        {/* SEO: Breadcrumb navigation helps search engines understand site hierarchy */}
        <div className="py-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cocktail Recipes', href: '/recipes' },
              { 
                label: `${recipe.baseSpirit || 'Mixed'} Cocktails`, 
                href: `/${(recipe.baseSpirit || 'mixed').toLowerCase()}-cocktails` 
              },
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
              {recipe.description}.
            </p>
            {/* Only show the adjective/season description if both fields exist */}
            {/* {recipe.adjective && recipe.season && (
              <p className="text-lg text-muted-foreground">
                A {recipe.adjective.toLowerCase()} cocktail perfect for {recipe.season.toLowerCase()}.
              </p>
            )} */}
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
                🍸
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-2 text-blue-900 dark:text-blue-200">
              🥃 {recipe.glassType}
            </div>
            <div className="inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-6 py-2 text-green-900 dark:text-green-200">
              {getGarnishEmoji(recipe.garnish)} {recipe.garnish}
            </div>
            
            {recipe.baseSpirit && (
              <Link
                href={`/${recipe.baseSpirit.toLowerCase()}-cocktails`}
                className="inline-flex items-center rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-2 text-blue-900 dark:text-blue-200"
              >
                🥃 {recipe.baseSpirit}
              </Link>
            )}
            
            {recipe.cocktailType && (
              <Link
                href={`/${recipe.cocktailType.toLowerCase().replace(/\s+/g, '-')}-cocktails`}
                className="inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-6 py-2 text-green-900 dark:text-green-200"
              >
                🍸 {recipe.cocktailType}
              </Link>
            )}
          </div>

          {/* Add SEO-friendly text links */}
          <div className="text-sm text-muted-foreground">
            <p>
              Learn how to make the perfect {recipe.title} cocktail recipe at home. This {recipe.adjective?.toLowerCase() || 'classic'} {recipe.cocktailType?.toLowerCase() || 'cocktail'}{recipe.baseSpirit ? ` features ${recipe.baseSpirit.toLowerCase()} as the base spirit` : ''} and is served in a {recipe.glassType.toLowerCase()}. {recipe.drinkClassification === 'Aperitifs' ? 'Perfect as a pre-dinner aperitif' : recipe.drinkClassification === 'Digestifs' ? 'Ideal as a post-dinner digestif' : recipe.drinkClassification === 'Brunch Cocktails' ? 'Great for weekend brunch' : recipe.drinkClassification === 'Dessert Cocktails' ? 'Perfect with dessert' : recipe.drinkClassification === 'Party Cocktails' ? 'Ideal for entertaining groups' : 'A great drink anytime'}{recipe.season === 'Summer' ? ', this drink shines in the heat of summer' : recipe.season === 'Fall' ? ', this drink brings out the natural colors of autumn' : recipe.season === 'Winter' ? ', this drink warms you through the cold winter months' : recipe.season === 'Spring' ? ', this drink captures the fresh spirit of spring' : recipe.season === 'All Year' ? ', this versatile drink is perfect year-round' : ''}. Get the complete ingredient list, step-by-step mixing instructions, and expert tips.
            </p>
          </div>

          {/* SEO: Semantic sections with proper heading hierarchy */}
          <div id="ingredients" className="space-y-4">
            <h2 className="text-3xl font-bold">{recipe.title} Ingredients</h2>
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
            <h2 className="text-3xl font-bold">Mixing Instructions for {recipe.title}</h2>
            <ol className="space-y-4 text-lg">
              {instructions.map((instruction, i) => (
                <li key={i} className="flex gap-4">
                  <span className="select-none font-semibold">{`${i + 1}.`}</span>
                  <span>
                    {typeof instruction === 'string' && instruction.match(/^\d+\.\s/)
                      ? instruction.slice(2)
                      : instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>
     {/* Add this new section for ingredient explanations */}
     {recipe.ingredientExplanations && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Why These Ingredients For The Perfect {recipe.title}?</h2>
              <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div 
                  className="prose prose-lg max-w-none text-blue-900 dark:text-blue-100"
                  dangerouslySetInnerHTML={{ __html: recipe.ingredientExplanations }}
                />
              </div>
            </div>
          )}

          {/* Additional recipe information */}
          {recipe.alternativeIngredients && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Alternative Ingredients</h2>
              <div className="rounded-xl border bg-muted/20 p-6">
                <ul className="space-y-2 text-lg">
                  {(() => {
                    const altIngredients = recipe.alternativeIngredients;
                    let alternatives: string[] = [];
                    
                    if (typeof altIngredients === 'string') {
                      try {
                        alternatives = JSON.parse(altIngredients);
                      } catch {
                        alternatives = [altIngredients];
                      }
                    } else if (Array.isArray(altIngredients)) {
                      alternatives = altIngredients.filter((item): item is string => typeof item === 'string');
                    }
                    
                    return alternatives.map((alternative, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>{alternative}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
          )}

          {recipe.bestServedWith && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">A {recipe.title} is best served with</h2>
              <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-orange-50 p-6 dark:from-amber-950/20 dark:to-orange-950/20">
                <p className="text-lg text-amber-900 dark:text-amber-100">
                  🍽️ {recipe.bestServedWith}
                </p>
              </div>
            </div>
          )}
          <blockquote className="rounded-xl border bg-muted/50 p-6 text-lg italic text-muted-foreground">
            "{recipe.funnyQuote}"
          </blockquote>
          {/* SEO: Internal linking to related content improves site structure */}
          {similarRecipes.length > 0 && (
            <div className="mt-8 space-y-8 border-t pt-20 pb-20">
              <h2 className="text-2xl font-bold sm:text-4xl">More Cocktail Recipes</h2>
              <div className="grid gap-8 sm:grid-cols-3">
                {similarRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${idToSlug(recipe.title, recipe.id)}`}
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
                          🍸
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
