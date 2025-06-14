import { RecipeCard } from '@/components/recipe-card'
import { prisma } from '@/lib/prisma'
import { generatePageMeta } from '@/lib/seo'
import Link from 'next/link'

async function getRecipes({ page }: { page: number }) {
  const itemsPerPage = 12
  const [recipes, total] = await Promise.all([
    prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.recipe.count(),
  ])

  return { recipes, totalPages: Math.ceil(total / itemsPerPage) }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const isFirstPage = currentPage === 1

  // Google recommends indexing paginated pages with query params
  // https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
  return generatePageMeta({
    title: isFirstPage
      ? 'Cocktail Recipes - Recipe Generator'
      : `Cocktail Recipes - Page ${currentPage} - Recipe Generator`,
    description: 'Browse our collection of AI-generated cocktail recipes.',
    url: isFirstPage ? '/recipes' : `/recipes?page=${currentPage}`,
  })
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const { recipes, totalPages } = await getRecipes({ page: currentPage })

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-bold sm:text-6xl">
            Cocktail Recipes
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Discover delicious cocktail recipes from our community. From classics like the Manhattan to modern creations like the Maple Bacon Old Fashioned, find your next favorite cocktail with exact instructions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p aria-label={`Showing page ${currentPage} of ${totalPages}`}>
              {recipes.length} recipes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-2 text-blue-900 transition hover:bg-blue-500/20 dark:text-blue-200"
            >
              <span>🤖</span>
              <span>Create Recipe</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="flex justify-center gap-2" aria-label="Pagination">
            {/* Add Previous link */}
            {currentPage > 1 && (
              <Link
                href={`/recipes?page=${currentPage - 1}`}
                className="rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900"
                aria-label="Go to previous page"
              >
                ←
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`/recipes?page=${pageNum}`}
                  className={`rounded px-4 py-2 ${
                    pageNum === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-100 dark:hover:bg-blue-900'
                  }`}
                  aria-current={pageNum === currentPage ? 'page' : undefined}
                  aria-label={`Go to page ${pageNum}`}
                  {...(pageNum === currentPage + 1 && { 'data-preload': true })}
                >
                  {pageNum}
                </Link>
              )
            )}

            {/* Add Next link */}
            {currentPage < totalPages && (
              <Link
                href={`/recipes?page=${currentPage + 1}`}
                className="rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900"
                aria-label="Go to next page"
              >
                →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}
