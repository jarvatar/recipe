import { describe, expect, it } from 'bun:test'
import { idToSlug, slugToID } from './slug-utils'

describe('idToSlug', () => {
  it('should convert name to lowercase and replace spaces with hyphens', () => {
    const result = idToSlug('John Doe', '123')
    expect(result).toBe('john-doe-123')
  })

  it('should remove special characters', () => {
    const result = idToSlug("John's @Character!", '456')
    expect(result).toBe('johns-character-456')
  })

  it('should handle multiple spaces', () => {
    const result = idToSlug('John    Doe', '789')
    expect(result).toBe('john-doe-789')
  })

  it('character examples', () => {
    const result = idToSlug(
      'Conservative Neighbour Janette',
      'c28d92df-1096-4f81-8f62-2f3ca8752be4',
    )
    expect(result).toBe(
      'conservative-neighbour-janette-c28d92df-1096-4f81-8f62-2f3ca8752be4',
    )
  })

  it('should simplify recipe names', () => {
    const result = idToSlug('air-fryer-salmon-with-roasted-potatoes-and-mushrooms-1', '123')
    expect(result).toBe('salmon-roasted-potatoes-mushrooms-1-123')
  })

  describe('edge cases', () => {
    const uuid = 'c28d92df-1096-4f81-8f62-2f3ca8752be4'

    it('should handle empty name by returning just the uuid', () => {
      expect(idToSlug('', uuid)).toBe(uuid)
    })

    it('should handle whitespace-only name by returning just the uuid', () => {
      expect(idToSlug('   ', uuid)).toBe(uuid)
    })

    it('should remove special characters and emojis', () => {
      expect(idToSlug("John's 👋 Character!", uuid)).toBe(
        `johns-character-${uuid}`,
      )
    })

    it('should normalize multiple spaces and tabs', () => {
      expect(idToSlug('John   Doe\t\tSmith', uuid)).toBe(
        `john-doe-smith-${uuid}`,
      )
    })

    it('should trim leading and trailing spaces', () => {
      expect(idToSlug(' John Doe ', uuid)).toBe(`john-doe-${uuid}`)
    })

    it('should handle non-English characters', () => {
      expect(idToSlug('José María García', uuid)).toBe(
        `jose-maria-garcia-${uuid}`,
      )
    })

    it('should preserve numbers but remove special characters', () => {
      expect(idToSlug('User123!@#$%', uuid)).toBe(`user123-${uuid}`)
    })

    it('should handle very long names', () => {
      expect(idToSlug('a'.repeat(100), uuid)).toBe(`${'a'.repeat(100)}-${uuid}`)
    })

    it('should normalize Unicode characters', () => {
      expect(idToSlug('château café', uuid)).toBe(`chateau-cafe-${uuid}`)
    })

    it('should handle mixed case with special characters', () => {
      expect(idToSlug('CamelCase-with_underscores', uuid)).toBe(
        `camelcase-with-underscores-${uuid}`,
      )
    })
  })
})

describe('slugToID', () => {
  it('should extract ID from slug', () => {
    const id = '123456789'
    const slug = `john-doe-${id}`
    const result = slugToID(slug)
    expect(result).toBe(id)
  })

  it('should return original slug if no ID is found', () => {
    const slug = 'john-doe'
    const result = slugToID(slug)
    expect(result).toBe(slug)
  })

  it('character examples', () => {
    const id = '987654321'
    const testCases = [
      `character/clara-${id}?tab=reviews`,
      `character/clara-girl-${id}`,
      `character/${id}`,
      `clara-${id}`,
      `clara-${id}-test`,
      `${id}`,
    ]

    testCases.forEach((slug) => {
      const result = slugToID(slug)
      expect(result).toBe(id)
    })
  })

  it('should handle edge cases', () => {
    const id = '123456789'
    // Empty string
    expect(slugToID('')).toBe('')

    // Multiple IDs (should return the last one)
    expect(slugToID(id)).toBe(id)
    expect(slugToID(`${id}-${id}`)).toBe(id)

    // ID with surrounding text
    expect(slugToID(`prefix${id}suffix`)).toBe(id)

    // Malformed URL paths
    expect(slugToID(`//character//${id}//`)).toBe(id)

    // URL encoded characters
    expect(slugToID(`character%2F${id}%3Ftab`)).toBe(id)

    // Unicode characters
    expect(slugToID(`château-${id}`)).toBe(id)
  })
})
