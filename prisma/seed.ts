import { processRecipeWithImage } from '@/app/api/generate-recipe/image-processor'
import { PrismaClient } from '@prisma/client'

// Example recipe data
const exampleRecipes = [
  {
    id: 1,
    title: 'Air Fryer Crispy Chicken Tenders',
    description: 'Perfectly crispy chicken tenders with a golden crust',
    ingredients: [
      { emoji: '🍗', name: 'chicken tenders', amount: '1 pound' },
      { emoji: '🥚', name: 'eggs', amount: '2 large' },
      { emoji: '🥖', name: 'breadcrumbs', amount: '1 cup' },
      { emoji: '🧂', name: 'seasoning mix', amount: '2 tbsp' },
    ],
    temperature: {
      fahrenheit: 400,
      celsius: 200,
    },
    cookingTime: 12,
    instructions: [
      'Pat chicken tenders dry with paper towels',
      'Dip each tender in beaten egg, then coat in seasoned breadcrumbs',
      'Place in air fryer basket in single layer',
      'Cook for 6 minutes, flip, then 6 more minutes',
      'Let rest 2 minutes before serving',
    ],
    funnyQuote: 'These tenders are anything but chicken! 🐔',
  },
  {
    id: 2,
    title: 'Air Fryer Crispy Potato Wedges',
    description: 'Perfectly seasoned potato wedges with a fluffy center',
    ingredients: [
      { emoji: '🥔', name: 'russet potatoes', amount: '2 large' },
      { emoji: '🫒', name: 'olive oil', amount: '2 tbsp' },
      { emoji: '🧄', name: 'garlic powder', amount: '1 tsp' },
      { emoji: '🌿', name: 'dried herbs', amount: '1 tsp' },
    ],
    temperature: {
      fahrenheit: 380,
      celsius: 193,
    },
    cookingTime: 20,
    instructions: [
      'Cut potatoes into even wedges',
      'Soak in cold water for 30 minutes, then dry thoroughly',
      'Toss with oil and seasonings',
      'Air fry for 10 minutes, flip, then 10 more minutes',
      'Season with extra salt while hot',
    ],
    funnyQuote: 'Wedge you like to try these amazing potatoes! 🥔',
  },
  {
    id: 3,
    title: 'Crispy Air Fryer Wings',
    description: 'Extra crispy chicken wings with a perfect crunch',
    ingredients: [
      { emoji: '🍗', name: 'chicken wings', amount: '2 lbs' },
      { emoji: '🧂', name: 'salt', amount: '1 tsp' },
      { emoji: '🌶️', name: 'black pepper', amount: '1/2 tsp' },
      { emoji: '🧄', name: 'garlic powder', amount: '1 tsp' },
    ],
    temperature: {
      fahrenheit: 400,
      celsius: 200,
    },
    cookingTime: 20,
    instructions: [
      'Pat wings dry with paper towels',
      'Season with salt, pepper and garlic powder',
      'Place in air fryer basket in single layer',
      'Cook for 10 minutes, flip, cook 10 more minutes',
      'Let rest 5 minutes before serving',
    ],
    funnyQuote: 'These wings will make you fly high! ✈️',
  },
  {
    id: 4,
    title: 'Air Fryer Sweet Potato Fries',
    description: 'Perfectly crispy sweet potato fries without the oil',
    ingredients: [
      { emoji: '🍠', name: 'sweet potatoes', amount: '2 large' },
      { emoji: '🫒', name: 'olive oil', amount: '1 tbsp' },
      { emoji: '🧂', name: 'sea salt', amount: '1 tsp' },
      { emoji: '🌿', name: 'paprika', amount: '1/2 tsp' },
    ],
    temperature: {
      fahrenheit: 380,
      celsius: 193,
    },
    cookingTime: 15,
    instructions: [
      'Cut sweet potatoes into even fries',
      'Toss with oil and seasonings',
      'Arrange in single layer in air fryer',
      'Cook for 8 minutes, shake basket',
      'Cook additional 7 minutes until crispy',
    ],
    funnyQuote: 'Sweet dreams are made of these fries! 🎵',
  },
  {
    id: 5,
    title: 'Air Fryer Coconut Shrimp',
    description: 'Crispy coconut-crusted shrimp with tropical flavor',
    ingredients: [
      { emoji: '🦐', name: 'large shrimp', amount: '1 pound' },
      { emoji: '🥥', name: 'shredded coconut', amount: '1 cup' },
      { emoji: '🥚', name: 'egg', amount: '2 large' },
      { emoji: '🥖', name: 'panko breadcrumbs', amount: '1/2 cup' },
    ],
    temperature: {
      fahrenheit: 375,
      celsius: 190,
    },
    cookingTime: 8,
    instructions: [
      'Peel and devein shrimp, leaving tails on',
      'Dip in egg, then coat in coconut-panko mixture',
      'Place in single layer in air fryer basket',
      'Cook for 4 minutes, flip, then 4 more minutes',
      'Serve with sweet chili sauce',
    ],
    funnyQuote: 'Shell-ebrate good times with these shrimp! 🎉',
  },
  {
    id: 6,
    title: 'Air Fryer Garlic Parmesan Brussels Sprouts',
    description:
      'Crispy, cheesy Brussels sprouts that will convert any veggie skeptic',
    ingredients: [
      { emoji: '🥬', name: 'Brussels sprouts', amount: '1 pound' },
      { emoji: '🧄', name: 'garlic cloves', amount: '4 minced' },
      { emoji: '🧀', name: 'parmesan cheese', amount: '1/2 cup grated' },
      { emoji: '🫒', name: 'olive oil', amount: '2 tbsp' },
      { emoji: '🧂', name: 'salt and pepper', amount: 'to taste' },
    ],
    temperature: {
      fahrenheit: 375,
      celsius: 190,
    },
    cookingTime: 15,
    instructions: [
      'Trim and halve Brussels sprouts',
      'Toss with olive oil, garlic, salt, and pepper',
      'Place in air fryer basket in single layer',
      'Cook for 10 minutes, shaking halfway',
      'Sprinkle with parmesan and cook 5 more minutes',
      'Serve immediately while hot and crispy',
    ],
    funnyQuote:
      "These aren't your grandmother's Brussels sprouts... they're better! 👵",
  },
]

// Initialize our database client
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting to seed the database with SEO-optimized content...')

  // Clear existing data
  await prisma.recipe.deleteMany()
  console.log('Cleared existing recipes')

  // Create recipes one by one
  for (const recipe of exampleRecipes) {
    const { id, ...recipeData } = recipe

    // Create the recipe with SEO optimizations
    const createdRecipe = await prisma.recipe.create({
      data: recipeData,
    })
    console.log(`Created SEO-optimized recipe: ${recipe.title}`)
    await processRecipeWithImage(createdRecipe)
    console.log(`Processed image for recipe: ${recipe.title}`)
  }

  console.log(
    '🌱 Seeding finished! Your recipes are ready for search engines 🚀'
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
