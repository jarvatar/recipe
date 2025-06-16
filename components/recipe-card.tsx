import { idToSlug } from '@/lib/slug-utils'
import { getGarnishEmoji } from '@/lib/garnish-utils'
import { Recipe } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const slug = idToSlug(recipe.title, recipe.id)

  return (
    <Link
      href={`/recipes/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            🍸
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h2 className="line-clamp-1 text-xl font-semibold">{recipe.title}</h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span>🥃 {recipe.baseSpirit}</span>
          <span> + </span>
          <span>{getGarnishEmoji(recipe.garnish)} {recipe.garnish}</span>
        </div>

      </div>
    </Link>
  )
}
