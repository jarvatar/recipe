import type { Metadata } from 'next'
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import type { StaticImageData } from 'next/image'

const baseURL = `https://${
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'localhost:3000'
}`
const title = 'Cocktail Recipe Generator: AI-Powered Cocktail Recipes'
const description =
  'Your AI-Powered Cocktail Recipe Generator. Smart cocktail recipes with intelligent recipe generation.'
const siteName = 'Recipe Generator'
const twitter = '@yourtwitterhandle'

export const rootOpenGraph: OpenGraph = {
  locale: 'en',
  type: 'website',
  url: baseURL,
  siteName,
  title,
  description,
}

export const rootTwitter: Twitter = {
  title,
  description,
  card: 'summary_large_image',
  creator: twitter,
  site: twitter,
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(baseURL),
  title,
  description,
  applicationName: siteName,
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/_static/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/_static/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/_static/favicons/favicon-16x16.png',
    },
    {
      rel: 'mask-icon',
      url: '/_static/favicons/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
  ],
  manifest: '/_static/favicons/site.webmanifest',
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
}

function getImage(
  image?: StaticImageData | string,
  alt?: string,
  width?: number,
  height?: number
) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      url: image,
      alt,
      width,
      height,
      type: image.endsWith('.png') ? 'image/png' : 'image/jpeg',
    }
  }

  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
    type: image.src.endsWith('.png') ? 'image/png' : 'image/jpeg',
  }
}

export function generatePageMeta({
  title = rootMetadata.title as string,
  description = rootMetadata.description as string,
  url,
  image,
  image_alt,
  image_width,
  image_height,
  publishedAt,
  updatedAt,
  siteName = rootMetadata.applicationName as string,
  authors,
  noindex,
  locale = 'en',
}: {
  title?: string
  description?: string
  url?: string
  image?: StaticImageData | string
  image_alt?: string
  image_width?: number
  image_height?: number
  publishedAt?: string
  updatedAt?: string
  authors?: string[]
  siteName?: string
  feed?: string
  noindex?: boolean
  locale?: string
} = {}): Metadata {
  const metadata = {
    ...rootMetadata,
    title,
    description,
    authors,
    alternates: url && {
      canonical: url,
    },
    openGraph: {
      ...rootOpenGraph,
      locale,
      url,
      title: title,
      description,
    } as OpenGraph,
    twitter: {
      ...rootTwitter,
      title: title,
      description,
    } as Twitter,
    publisher: siteName,
    other: {},
  } as Metadata

  if (publishedAt) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      locale: locale,
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors,
      section: siteName,
      tags: [siteName],
    }
  }

  const img = getImage(image, image_alt || title, image_width, image_height)
  const ogImage = {
    url: `${metadata.metadataBase}og?path=${url}&title=${encodeURIComponent(title)}`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/png',
  }
  metadata.openGraph!.images = img ? [img] : [ogImage]
  metadata.twitter!.images = img ? [img] : [ogImage]

  if (siteName) {
    metadata.applicationName = siteName
    metadata.openGraph!.siteName = siteName
  }

  if (noindex) {
    metadata.robots = 'noindex, nofollow'
  }
  return metadata
}
