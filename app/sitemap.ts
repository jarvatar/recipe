import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all recipes from database
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  })

  // Generate recipe URLs
  const recipeUrls = recipes.map((recipe) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cocktailmuse.com'}/recipes/${recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${recipe.id}`,
    lastModified: recipe.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static pages
  const staticPages = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cocktailmuse.com'}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cocktailmuse.com'}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cocktailmuse.com'}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...staticPages, ...recipeUrls]
} 