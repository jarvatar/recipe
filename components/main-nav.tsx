'use client'
import { cn } from '@/lib/utils'
import { Martini } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainNav() {
  return (
    <div className="flex w-full items-center">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-lg font-extralight">
          🍸 Cocktail Muse
        </Link>
      </div>
      
      {/* Center - Create Recipe Button (absolutely centered) */}
      <div className="flex-1 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-sm text-blue-900 transition hover:bg-blue-500/20 dark:text-blue-200"
        >
          <span>🤖</span>
          <span>Create Recipe</span>
        </Link>
      </div>
      
      {/* Right side - Navigation Links */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/recipes"
            className="text-sm font-extralight transition-colors hover:text-primary"
          >
            All Recipes
          </Link>
          
          {/* Base Spirit Dropdown */}
          <div className="relative group">
            <button className="text-sm font-extralight transition-colors hover:text-primary">
              By Spirit
            </button>
            <div className="absolute right-0 top-full hidden w-48 rounded-md border bg-background p-2 shadow-lg group-hover:block">
              <Link
                href="/whiskey-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Whiskey
              </Link>
              <Link
                href="/gin-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Gin
              </Link>
              <Link
                href="/vodka-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Vodka
              </Link>
              <Link
                href="/rum-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Rum
              </Link>
              <Link
                href="/tequila-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Tequila
              </Link>
              <Link
                href="/bourbon-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Bourbon
              </Link>
              <Link
                href="/cognac-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Cognac
              </Link>
              <Link
                href="/brandy-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Brandy
              </Link>
            </div>
          </div>

          {/* Cocktail Type Dropdown */}
          <div className="relative group">
            <button className="text-sm font-extralight transition-colors hover:text-primary">
              By Type
            </button>  
            <div className="absolute right-0 top-full hidden w-48 rounded-md border bg-background p-2 shadow-lg group-hover:block">
              <Link
                href="/martini-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Martini
              </Link>
              <Link
                href="/margarita-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Margarita
              </Link>
              <Link
                href="/sour-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Sour
              </Link>
              <Link
                href="/old-fashioned-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Old Fashioned
              </Link>
              <Link
                href="/manhattan-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Manhattan
              </Link>
            </div>
          </div>

          {/* Season Dropdown */}
          <div className="relative group">
              <button className="text-sm font-extralight transition-colors hover:text-primary">
              By Season
            </button>
            <div className="absolute right-0 top-full hidden w-48 rounded-md border bg-background p-2 shadow-lg group-hover:block">
              <Link
                href="/all-year-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                All Year
              </Link>
              <Link
                href="/summer-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Summer
              </Link>
              <Link
                href="/winter-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Winter
              </Link>
              <Link
                href="/spring-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Spring
              </Link>
              <Link
                href="/fall-cocktails"
                className="block rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                Fall
              </Link>
            </div>
          </div>

          {/* About Link - at the end */}
          <Link
            href="/about"
            className="text-sm font-extralight transition-colors hover:text-primary"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  )
}
