'use client'
import { cn } from '@/lib/utils'
import { CookingPot } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-1 lg:mr-6">
        <CookingPot className="size-5" />
        <span className="hidden font-bold lg:inline-block">Mix It Up</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          App
        </Link>
        <Link
          href="/recipes"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/recipes' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Recipes
        </Link>
      </nav>
    </div>
  )
}
