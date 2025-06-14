import { processRecipeWithImage } from '@/app/api/generate-recipe/image-processor'
import { PrismaClient } from '@prisma/client'

// Example cocktail recipe data
const exampleRecipes = [
  {
    id: 1,
    title: 'Classic Martini',
    description: 'A timeless cocktail with gin and dry vermouth, garnished with an olive or lemon twist',
    glassType: 'Martini glass',
    garnish: 'Olive or lemon twist',
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
    funnyQuote: 'Shaken, not stirred... unless you prefer it stirred! 🍸',
  },
  {
    id: 2,
    title: 'Old Fashioned',
    description: 'A classic whiskey cocktail with sugar, bitters, and orange',
    glassType: 'Rocks glass',
    garnish: 'Orange peel and cherry',
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
    funnyQuote: 'Old fashioned never goes out of style! 🥃',
  },
  {
    id: 3,
    title: 'Mojito',
    description: 'A refreshing Cuban cocktail with rum, mint, lime, and soda water',
    glassType: 'Highball glass',
    garnish: 'Fresh mint sprig and lime wheel',
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
    funnyQuote: 'Mint to be refreshing! 🌿',
  },
  {
    id: 4,
    title: 'Margarita',
    description: 'A classic tequila cocktail with lime juice and orange liqueur',
    glassType: 'Margarita glass',
    garnish: 'Lime wheel and salt rim',
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
    funnyQuote: 'Life gives you limes, make margaritas! 🍹',
  },
  {
    id: 5,
    title: 'Manhattan',
    description: 'A sophisticated whiskey cocktail with sweet vermouth and bitters',
    glassType: 'Coupe glass',
    garnish: 'Maraschino cherry',
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
    funnyQuote: 'Manhattan: the cocktail that built New York! 🏙️',
  },
  {
    id: 6,
    title: 'Whiskey Sour',
    description: 'A balanced cocktail with whiskey, lemon juice, and simple syrup',
    glassType: 'Rocks glass',
    garnish: 'Lemon wheel and cherry',
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

  console.log(
    '🍸 Seeding finished! Your cocktail recipes are ready! 🚀'
  )
}

// Run the seed script
main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect from the database
    await prisma.$disconnect()
  })
