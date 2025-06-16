export const categoryMappings = {
  // Base spirits
  'tequila': ['tequila', 'silver tequila', 'reposado tequila', 'blanco tequila'],
  'bourbon': ['bourbon', 'bourbon whiskey', 'kentucky bourbon'],
  'vodka': ['vodka', 'premium vodka', 'flavored vodka'],
  'rum': ['rum', 'white rum', 'dark rum', 'spiced rum', 'gold rum'],
  'gin': ['gin', 'london dry gin', 'plymouth gin'],
  'whiskey': ['whiskey', 'rye whiskey', 'irish whiskey', 'scotch'],
  'liqueur': ['amaretto', 'almond liqueur', 'sour apple liqueur'],
  
  // Cocktail types
  'margarita': ['margarita', 'spicy margarita', 'pineapple margarita', 'watermelon margarita', 'tommy\'s margarita'],
  'martini': ['martini', 'dirty martini', 'vesper martini', 'espresso martini', 'sour apple martini'],
  'highball': ['highball', 'tall drink'],
  'frozen': ['frozen', 'blended'],
  'daiquiri': ['daiquiri', 'frozen daiquiri'],
  'creamy': ['creamy', 'cream cocktail'],
  'sour': ['sour', 'whiskey sour', 'amaretto sour'],
  'layered shot': ['layered shot', 'shot', 'shooter'],
  'old fashioned': ['old fashioned', 'maple bacon old fashioned'],
  'manhattan': ['manhattan', 'perfect manhattan'],
  'hot cocktail': ['hot cocktail', 'hot drink', 'toddy'],
  
  // Categories/Adjectives
  'classic': ['classic', 'traditional', 'original'],
  'refreshing': ['refreshing', 'light', 'summer'],
  'sophisticated': ['sophisticated', 'elegant', 'upscale'],
  'tropical': ['tropical', 'tiki', 'island'],
  'energizing': ['energizing', 'caffeinated'],
  'savory': ['savory', 'salty', 'briny'],
  'tart': ['tart', 'sour', 'acidic'],
  'clean': ['clean', 'pure', 'simple'],
  'balanced': ['balanced', 'well-rounded'],
  'spicy': ['spicy', 'hot', 'fiery'],
  'rich': ['rich', 'decadent', 'indulgent'],
  'sweet': ['sweet', 'dessert-like'],
  'smooth': ['smooth', 'silky'],
  'warming': ['warming', 'cozy'],
  'strong': ['strong', 'potent', 'bold'],
  
  // Drink Classifications
  'party cocktails': ['party cocktails', 'party drinks', 'crowd pleasers'],
  'aperitifs': ['aperitifs', 'pre-dinner drinks'],
  'after dinner cocktails': ['after dinner cocktails', 'digestifs', 'nightcaps'],
  'vacation cocktails': ['vacation cocktails', 'beach drinks', 'resort cocktails'],
  'casual cocktails': ['casual cocktails', 'everyday drinks'],
  'dessert cocktails': ['dessert cocktails', 'sweet cocktails'],
  'party shots': ['party shots', 'shots', 'shooters'],
}

export function normalizeCategory(category: string): string {
  const normalized = category.toLowerCase()
  
  for (const [standard, variations] of Object.entries(categoryMappings)) {
    if (variations.includes(normalized)) {
      return standard
    }
  }
  
  return normalized
} 