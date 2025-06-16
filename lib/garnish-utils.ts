export function getGarnishEmoji(garnish: string): string {
  const lower = garnish.toLowerCase()
  
  // Check for specific garnish types
  if (lower.includes('lemon')) return '🍋'
  if (lower.includes('lime')) return '🟢'
  if (lower.includes('orange')) return '🍊'
  if (lower.includes('cherry')) return '🍒'
  if (lower.includes('olive')) return '🌿'
  if (lower.includes('mint')) return '🌿'
  if (lower.includes('bacon')) return '🥓'
  if (lower.includes('watermelon')) return '🍉'
  if (lower.includes('cinnamon')) return '🥄'
  if (lower.includes('salt')) return '🧂'
  if (lower.includes('twist') || lower.includes('peel')) return '🍋'
  
  // Default garnish emoji
  return '🌿'
} 