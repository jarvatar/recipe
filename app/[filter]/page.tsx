import { prisma } from '@/lib/prisma'
import { RecipeCard } from '@/components/recipe-card'
import { generatePageMeta } from '@/lib/seo'
import { notFound } from 'next/navigation'

// Define the mapping of URL slugs to database fields and display names
const FILTER_CONFIG = {
  // Base Spirits
  'whiskey-cocktails': { field: 'baseSpirit', value: 'Whiskey', type: 'spirit' },
  'gin-cocktails': { field: 'baseSpirit', value: 'Gin', type: 'spirit' },
  'vodka-cocktails': { field: 'baseSpirit', value: 'Vodka', type: 'spirit' },
  'rum-cocktails': { field: 'baseSpirit', value: 'Rum', type: 'spirit' },
  'tequila-cocktails': { field: 'baseSpirit', value: 'Tequila', type: 'spirit' },
  'bourbon-cocktails': { field: 'baseSpirit', value: 'Bourbon', type: 'spirit' },
  'cognac-cocktails': { field: 'baseSpirit', value: 'Cognac', type: 'spirit' },
  'brandy-cocktails': { field: 'baseSpirit', value: 'Brandy', type: 'spirit' },
  'liqueur-cocktails': { field: 'baseSpirit', value: 'Liqueur-based', type: 'spirit' },

  
  // Cocktail Types
  'martini-cocktails': { field: 'cocktailType', value: 'Martini', type: 'cocktail' },
  'margarita-cocktails': { field: 'cocktailType', value: 'Margarita', type: 'cocktail' },
  'sour-cocktails': { field: 'cocktailType', value: 'Sour', type: 'cocktail' },
  'old-fashioned-cocktails': { field: 'cocktailType', value: 'Old Fashioned', type: 'cocktail' },
  'manhattan-cocktails': { field: 'cocktailType', value: 'Manhattan', type: 'cocktail' },
  'highball-cocktails': { field: 'cocktailType', value: 'Highball', type: 'cocktail' },
  'collins-cocktails': { field: 'cocktailType', value: 'Collins', type: 'cocktail' },
  'fizz-cocktails': { field: 'cocktailType', value: 'Fizz', type: 'cocktail' },
  'martini-family-cocktails': { field: 'cocktailType', value: 'Martini Family', type: 'cocktail' },
  'negroni-family-cocktails': { field: 'cocktailType', value: 'Negroni Family', type: 'cocktail' },
  'tiki-cocktails': { field: 'cocktailType', value: 'Tiki', type: 'cocktail' },
  'flips-cocktails': { field: 'cocktailType', value: 'Flips', type: 'cocktail' },
  'shots-cocktails': { field: 'cocktailType', value: 'Shots', type: 'cocktail' },
  
  // Seasons
  'summer-cocktails': { field: 'season', value: 'Summer', type: 'season' },
  'winter-cocktails': { field: 'season', value: 'Winter', type: 'season' },
  'spring-cocktails': { field: 'season', value: 'Spring', type: 'season' },
  'fall-cocktails': { field: 'season', value: 'Fall', type: 'season' },
  'all-year-cocktails': { field: 'season', value: 'All Year', type: 'season' },

  // Drink Classifications
  'aperitifs': { field: 'drinkClassification', value: 'Aperitifs', type: 'classification' },
  'digestifs': { field: 'drinkClassification', value: 'Digestifs', type: 'classification' },
  'brunch-cocktails': { field: 'drinkClassification', value: 'Brunch Cocktails', type: 'classification' },
  'dessert-cocktails': { field: 'drinkClassification', value: 'Dessert Cocktails', type: 'classification' },
  'party-cocktails': { field: 'drinkClassification', value: 'Party Cocktails', type: 'classification' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ filter: string }>
}) {
  const { filter } = await params
  const config = FILTER_CONFIG[filter as keyof typeof FILTER_CONFIG]
  
  if (!config) {
    return generatePageMeta({
      title: 'Not Found',
      description: 'Page not found',
    })
  }

  const typeLabel = config.type === 'spirit' ? 'Spirit' : 
                   config.type === 'cocktail' ? 'Style' : 
                   config.type === 'season' ? 'Season' : 'Classification'
  
  // Use count() instead of findMany() for better performance
  const recipeCount = await prisma.recipe.count({
    where: {
      [config.field]: config.value,
    },
  })

  return generatePageMeta({
    title: `${recipeCount} Best ${config.value} Cocktail Recipes | ${typeLabel}`,
    description: `Discover our collection of ${recipeCount} of the best ${config.value.toLowerCase()} cocktail recipes. Perfect ${config.type === 'season' ? `for ${config.value.toLowerCase()}` : `${config.value.toLowerCase()} drinks`} for any occasion.`,
    url: `/${filter}`,
  })
}

export default async function FilterPage({
  params,
}: {
  params: Promise<{ filter: string }>
}) {
  const { filter } = await params
  const config = FILTER_CONFIG[filter as keyof typeof FILTER_CONFIG]
  
  if (!config) {
    notFound()
  }
  
  const recipes = await prisma.recipe.findMany({
    where: {
      [config.field]: config.value,
    },
    orderBy: {
      title: 'asc',
    },
  })

  const typeLabel = config.type === 'spirit' ? 'Spirit' : 
                   config.type === 'cocktail' ? 'Style' : 
                   config.type === 'season' ? 'Season' : 'Classification'

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{recipes.length} Best {config.value} Recipes</h1>
          <p className="text-lg text-muted-foreground">
            {config.type === 'spirit' && `Explore our collection of cocktails made with ${config.value.toLowerCase()}. From classic recipes to modern twists, discover the perfect ${config.value.toLowerCase()} drink.`}
            {config.type === 'cocktail' && `Discover all variations of the classic ${config.value.toLowerCase()}. Each recipe brings its own unique twist to this beloved cocktail style.`}
            {config.type === 'season' && `Perfect cocktails for ${config.value.toLowerCase()}. Whether you're planning a party or just want to enjoy the season, these drinks capture the essence of ${config.value.toLowerCase()}.`}
            {config.type === 'classification' && `Discover our curated selection of ${config.value.toLowerCase()}. Perfect for ${config.value === 'Aperitifs' ? 'starting your evening' : config.value === 'Digestifs' ? 'ending your meal' : config.value === 'Brunch Cocktails' ? 'your next brunch gathering' : config.value === 'Dessert Cocktails' ? 'sweet endings' : 'entertaining groups'}.`}
          </p>
          <p className="text-sm text-muted-foreground">
            Found {recipes.length} {config.value.toLowerCase()} cocktail{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {recipes.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No {config.value.toLowerCase()} cocktails found. Be the first to <a href="/" className="text-primary hover:underline">create one</a>!
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 