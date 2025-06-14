import { processRecipeWithImage } from '@/app/api/generate-recipe/image-processor'
import { PrismaClient } from '@prisma/client'

// Example cocktail recipe data
const exampleRecipes = [
  {
    title: 'Classic Martini',
    description: 'A timeless cocktail with gin and dry vermouth, garnished with an olive or lemon twist',
    glassType: 'Martini glass',
    garnish: 'Olive or lemon twist',
    baseSpirit: 'Gin',
    cocktailType: 'Martini',
    adjective: 'Strong',
    season: 'All Year',
    ingredients: [
      { emoji: '🍸', name: 'gin', amount: '2.5 oz' },
      { emoji: '🍷', name: 'dry vermouth', amount: '0.5 oz' },
      { emoji: '🫒', name: 'olive or lemon', amount: 'for garnish' },
    ],
    instructions: [
      'Add gin and vermouth to a mixing glass filled with ice',
      'Stir well for 30 seconds',
      'Strain into a chilled martini glass',
      'Garnish with an olive or lemon twist',
    ],
    alternativeIngredients: [
      'Vodka can be used instead of gin for a Vodka Martini',
      'Try different vermouth ratios for a wetter or drier martini',
      'Experiment with different garnishes like orange peel or cocktail onions',
    ],
    bestServedWith: 'Light appetizers like olives, nuts, or cheese. The strong, clean flavors pair well with salty snacks.',
    funnyQuote: 'Shaken, not stirred... unless you prefer it stirred! 🍸',
  },
  {
    title: 'Watermelon Margarita',
    description: 'A refreshing twist on the classic margarita with fresh watermelon',
    glassType: 'Margarita glass',
    garnish: 'Watermelon wedge and salt rim',
    baseSpirit: 'Tequila',
    cocktailType: 'Margarita',
    adjective: 'Refreshing',
    season: 'Summer',
    ingredients: [
      { emoji: '🌵', name: 'silver tequila', amount: '2 oz' },
      { emoji: '🍉', name: 'fresh watermelon juice', amount: '2 oz' },
      { emoji: '🍊', name: 'triple sec', amount: '1 oz' },
      { emoji: '🍋', name: 'fresh lime juice', amount: '1 oz' },
      { emoji: '🧂', name: 'coarse salt', amount: 'for rim' },
    ],
    instructions: [
      'Rim glass with salt using a lime wedge',
      'Add all ingredients to a shaker with ice',
      'Shake vigorously for 15 seconds',
      'Strain into the salt-rimmed glass over fresh ice',
      'Garnish with a watermelon wedge',
    ],
    alternativeIngredients: [
      'Use mezcal instead of tequila for a smokier flavor',
      'Try honey instead of triple sec for a different sweetness',
      'Add fresh mint for an extra refreshing twist',
    ],
    bestServedWith: 'Mexican cuisine, grilled seafood, or fresh summer salads. The refreshing watermelon pairs perfectly with spicy foods.',
    funnyQuote: 'When life gives you watermelons, make margaritas! 🍹',
  },
  {
    title: 'Hot Toddy',
    description: 'A warming winter cocktail with whiskey, honey, and spices',
    glassType: 'Mug',
    garnish: 'Cinnamon stick and lemon wheel',
    baseSpirit: 'Whiskey',
    cocktailType: 'Hot Cocktail',
    adjective: 'Warming',
    season: 'Winter',
    ingredients: [
      { emoji: '🥃', name: 'bourbon whiskey', amount: '2 oz' },
      { emoji: '🍯', name: 'honey', amount: '1 oz' },
      { emoji: '🍋', name: 'fresh lemon juice', amount: '0.5 oz' },
      { emoji: '☕', name: 'hot water', amount: '4 oz' },
      { emoji: '🫖', name: 'cinnamon stick', amount: '1' },
    ],
    instructions: [
      'Heat water until hot but not boiling',
      'Add whiskey, honey, and lemon juice to a mug',
      'Pour in hot water and stir until honey is dissolved',
      'Garnish with cinnamon stick and lemon wheel',
    ],
    alternativeIngredients: [
      'Try different whiskeys like Irish or Scotch',
      'Maple syrup can be used instead of honey',
      'Add fresh ginger for extra warmth',
    ],
    bestServedWith: 'Comfort foods like roasted meats, hearty soups, or chocolate desserts. The warming spices complement rich winter dishes.',
    funnyQuote: 'The only good thing about winter is hot toddies! 🥃',
  },
  {
    title: 'Old Fashioned',
    description: 'A classic whiskey cocktail with sugar, bitters, and orange',
    glassType: 'Rocks glass',
    garnish: 'Orange peel and cherry',
    baseSpirit: 'Bourbon',
    cocktailType: 'Old Fashioned',
    adjective: 'Strong',
    season: 'All Year',
    ingredients: [
      { emoji: '🥃', name: 'bourbon whiskey', amount: '2 oz' },
      { emoji: '🍯', name: 'simple syrup', amount: '0.25 oz' },
      { emoji: '💧', name: 'Angostura bitters', amount: '2-3 dashes' },
      { emoji: '🍊', name: 'orange peel', amount: 'for garnish' },
      { emoji: '🍒', name: 'cherry', amount: 'for garnish' },
    ],
    instructions: [
      'Add simple syrup and bitters to a rocks glass',
      'Add a large ice cube',
      'Pour in the bourbon and stir gently',
      'Express orange peel oils over the drink and drop in',
      'Garnish with a cherry',
    ],
    alternativeIngredients: [
      'Try different whiskeys like rye or Tennessee',
      'Use maple syrup instead of simple syrup',
      'Experiment with different bitters like orange or chocolate',
    ],
    bestServedWith: 'Rich foods like steak, chocolate desserts, or aged cheeses. The strong whiskey flavors complement bold dishes.',
    funnyQuote: 'Old fashioned never goes out of style! 🥃',
  },
  {
    title: 'Mojito',
    description: 'A refreshing Cuban cocktail with rum, mint, lime, and soda water',
    glassType: 'Highball glass',
    garnish: 'Fresh mint sprig and lime wheel',
    baseSpirit: 'Rum',
    cocktailType: 'Highball',
    adjective: 'Refreshing',
    season: 'Summer',
    ingredients: [
      { emoji: '🥃', name: 'white rum', amount: '2 oz' },
      { emoji: '🌿', name: 'fresh mint leaves', amount: '8-10 leaves' },
      { emoji: '🍋', name: 'fresh lime juice', amount: '1 oz' },
      { emoji: '🍯', name: 'simple syrup', amount: '0.5 oz' },
      { emoji: '💧', name: 'soda water', amount: 'to top' },
    ],
    instructions: [
      'Muddle mint leaves gently in the bottom of a highball glass',
      'Add lime juice and simple syrup',
      'Fill glass with ice',
      'Add rum and stir',
      'Top with soda water',
      'Garnish with mint sprig and lime wheel',
    ],
    alternativeIngredients: [
      'Try different rums like gold or spiced',
      'Add fresh fruit like strawberries or mango',
      'Use honey instead of simple syrup',
    ],
    bestServedWith: 'Light seafood dishes, tropical cuisine, or fresh salads. The refreshing mint pairs well with light, summery foods.',
    funnyQuote: 'Mint to be refreshing! 🌿',
  },
  {
    id: 4,
    title: 'Margarita',
    description: 'A classic tequila cocktail with lime juice and orange liqueur',
    glassType: 'Margarita glass',
    garnish: 'Lime wheel and salt rim',
    baseSpirit: 'Tequila',
    cocktailType: 'Margarita',
    adjective: 'Refreshing',
    season: 'Summer',
    ingredients: [
      { emoji: '🌵', name: 'silver tequila', amount: '2 oz' },
      { emoji: '🍊', name: 'triple sec', amount: '1 oz' },
      { emoji: '🍋', name: 'fresh lime juice', amount: '1 oz' },
      { emoji: '🧂', name: 'coarse salt', amount: 'for rim' },
    ],
    instructions: [
      'Rim glass with salt using a lime wedge',
      'Add all ingredients to a shaker with ice',
      'Shake vigorously for 15 seconds',
      'Strain into the salt-rimmed glass over fresh ice',
      'Garnish with a lime wheel',
    ],
    alternativeIngredients: [
      'Use mezcal instead of tequila for a smokier flavor',
      'Try Cointreau instead of triple sec for premium taste',
      'Add fresh jalapeño for a spicy kick',
    ],
    bestServedWith: 'Mexican cuisine, spicy foods, or chips and guacamole. The citrus cuts through rich, fatty foods perfectly.',
    funnyQuote: 'Life gives you limes, make margaritas! ��',
  },
  {
    id: 5,
    title: 'Manhattan',
    description: 'A sophisticated whiskey cocktail with sweet vermouth and bitters',
    glassType: 'Coupe glass',
    garnish: 'Maraschino cherry',
    baseSpirit: 'Whiskey',
    cocktailType: 'Manhattan',
    adjective: 'Sophisticated',
    season: 'All Year',
    ingredients: [
      { emoji: '🥃', name: 'rye whiskey', amount: '2 oz' },
      { emoji: '🍷', name: 'sweet vermouth', amount: '1 oz' },
      { emoji: '💧', name: 'Angostura bitters', amount: '2 dashes' },
      { emoji: '🍒', name: 'maraschino cherry', amount: 'for garnish' },
    ],
    instructions: [
      'Add whiskey, vermouth, and bitters to a mixing glass with ice',
      'Stir for 30 seconds',
      'Strain into a chilled coupe glass',
      'Garnish with a maraschino cherry',
    ],
    alternativeIngredients: [
      'Try bourbon instead of rye for a sweeter profile',
      'Use dry vermouth for a Perfect Manhattan',
      'Experiment with different bitters like orange or chocolate',
    ],
    bestServedWith: 'Rich foods like steak, dark chocolate, or aged cheeses. The bold whiskey flavors complement hearty dishes.',
    funnyQuote: 'Manhattan: the cocktail that built New York! 🏙️',
  },
  {
    id: 6,
    title: 'Whiskey Sour',
    description: 'A balanced cocktail with whiskey, lemon juice, and simple syrup',
    glassType: 'Rocks glass',
    garnish: 'Lemon wheel and cherry',
    baseSpirit: 'Whiskey',
    cocktailType: 'Sour',
    adjective: 'Balanced',
    season: 'All Year',
    ingredients: [
      { emoji: '🥃', name: 'bourbon whiskey', amount: '2 oz' },
      { emoji: '🍋', name: 'fresh lemon juice', amount: '0.75 oz' },
      { emoji: '🍯', name: 'simple syrup', amount: '0.75 oz' },
      { emoji: '🥚', name: 'egg white', amount: '1 (optional)' },
    ],
    instructions: [
      'Add all ingredients to a shaker',
      'Dry shake (without ice) if using egg white',
      'Add ice and shake vigorously',
      'Strain into a rocks glass over fresh ice',
      'Garnish with lemon wheel and cherry',
    ],
    alternativeIngredients: [
      'Try rye whiskey for a spicier profile',
      'Use honey syrup instead of simple syrup',
      'Add fresh herbs like thyme or rosemary',
    ],
    bestServedWith: 'Light appetizers, seafood, or lemon desserts. The citrus brightens rich or fatty foods.',
    funnyQuote: 'Sweet, sour, and everything in between! 🍋',
  },
]

// Initialize our database client
const prisma = new PrismaClient()

async function main() {
  console.log('🍸 Starting to seed the database with cocktail recipes...')

  // Clear existing data
  await prisma.recipe.deleteMany()
  console.log('Cleared existing recipes')

  // Create recipes one by one
  for (const recipe of exampleRecipes) {
    const { id, ...recipeData } = recipe

    // Create the recipe with cocktail data
    const createdRecipe = await prisma.recipe.create({
      data: recipeData,
    })
    console.log(`Created cocktail recipe: ${recipe.title}`)
    await processRecipeWithImage(createdRecipe)
    console.log(`Processed image for recipe: ${recipe.title}`)
  }

  console.log('🍸 Seeding finished! Your cocktail recipes are ready! 🚀')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
