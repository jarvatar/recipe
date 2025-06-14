export const categoryMappings = {
  // Base spirits
  'tequila': ['tequila', 'silver tequila', 'reposado tequila', 'blanco tequila'],
  'bourbon': ['bourbon', 'bourbon whiskey', 'kentucky bourbon'],
  
  // Cocktail types
  'margarita': ['margarita', 'spicy margarita', 'pineapple margarita', 'watermelon margarita'],
  'martini': ['martini', 'dirty martini', 'vesper martini', 'espresso martini'],
  
  // Categories
  'classic': ['classic', 'traditional', 'original'],
  'refreshing': ['refreshing', 'light', 'summer'],
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