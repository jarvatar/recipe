import { RecipeCard } from '@/components/recipe-card'
import { RecipeGenerator } from '@/components/recipe-generator'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { generatePageMeta } from '@/lib/seo'
import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'

export const metadata = generatePageMeta({
  title: 'Air Fryer Recipes',
  description:
    'Transform any ingredients into perfect air fryer meals with AI guidance. Photo-based instructions, precise temps & timing. Become an Air Fryer Chef.',
  url: '/',
})

export default async function AppPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 py-8 sm:py-16">
        <div className="text-center">
          <h1 className="text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            Perfect Air Fryer Recipes in Seconds
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg font-bold sm:mt-8 lg:gap-4">
            <div className="inline-flex items-center rounded-full border border-purple-500/50 bg-purple-500/10 px-6 py-2 text-purple-900 dark:text-purple-200">
              🤖 AI Powered
            </div>
            <div className="inline-flex items-center">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-6 py-2 text-green-900 dark:text-green-200">
              🧑‍🍳 Delicious Results
            </div>
          </div>
        </div>

        <RecipeGenerator />
      </div>

      {/* Features Section */}
      <section className="relative z-10 mx-auto max-w-7xl space-y-12 px-4 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why trust our recipes?
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100 transition-transform group-hover:scale-110 dark:bg-purple-900/20">
              <span className="text-3xl">🧪</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Extensively Tested</h3>
              <p className="text-muted-foreground">
                We've air fried everything. Even things that shouldn't be air
                fried. Especially those things.
              </p>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 transition-transform group-hover:scale-110 dark:bg-blue-900/20">
              <span className="text-3xl">🤖</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Our AI has analyzed over 10,000 recipes, which is about 9,950
                more ways to make chicken wings than you'll ever need.
              </p>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 transition-transform group-hover:scale-110 dark:bg-green-900/20">
              <span className="text-3xl">✨</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Hassle-Free Cooking</h3>
              <p className="text-muted-foreground">
                Zero cleanup required (from the recipes - your air fryer is your
                problem).
              </p>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 transition-transform group-hover:scale-110 dark:bg-orange-900/20">
              <span className="text-3xl">👩‍🍳</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Human-Verified</h3>
              <p className="text-muted-foreground">
                Every recipe is tested by real humans who are too lazy to use
                their actual ovens.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              Loading recipes...
            </div>
          </div>
        }
      >
        <FeaturedRecipes />
      </Suspense>
    </div>
  )
}

const FeaturedRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <section className="relative z-10 -mx-4 bg-gradient-to-b from-transparent to-zinc-200/30 px-4 py-16 dark:to-zinc-800/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Recent Air Fryer Recipes
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Discover recipes that turn your air fryer into a tiny kitchen wizard
            <br />
            (no magic wand required).
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="/recipes">View All Recipes</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
