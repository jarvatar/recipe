export function idToSlug(name: string, id: string | number): string {
  // Handle empty or whitespace-only names
  const trimmedName = name.trim()
  if (!trimmedName) {
    return id.toString()
  }

  // Convert name to lowercase and normalize Unicode characters
  const normalizedName = trimmedName
    .toLowerCase()
    // Normalize Unicode characters (é -> e, etc.)
    .normalize('NFKD')
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
    .replace(/[\u0300-\u036f]/g, '')
    // Remove recipe-specific words
    .replace(/-with-/g, '-')
    .replace(/-and-/g, '-')
    // Remove special characters but keep hyphens and underscores
    .replace(/[^\w\s-]/g, '')
    // Replace underscores and multiple spaces/hyphens with single hyphen
    .replace(/[-_\s]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')

  return normalizedName ? `${normalizedName}-${id}` : id.toString()
}

export function slugToID(slug: string): string {
  if (!slug) return slug
  // Decode URL-encoded characters first
  const decoded = decodeURIComponent(slug)

  // Remove query parameters if they exist
  const withoutQuery = decoded.split('?')[0]

  // First try: match number at the end, with or without hyphen
  const primaryRegex = /(?:^|.*?)(\d+)(?:-.*|$)/
  const primaryMatch = withoutQuery.match(primaryRegex)

  if (primaryMatch) {
    return primaryMatch[1]
  }

  // Fallback: extract any numbers
  const fallbackRegex = /(\d+)/
  const fallbackMatch = withoutQuery.match(fallbackRegex)
  return fallbackMatch ? fallbackMatch[0] : slug
}
