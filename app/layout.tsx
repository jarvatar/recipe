import { ThemeProvider } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Toaster } from '@/components/ui/sonner'
import { META_THEME_COLORS } from '@/hooks/use-meta-color'
import { generatePageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  display: 'swap',
  preload: true,
})

export const metadata = generatePageMeta()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: META_THEME_COLORS.light },
    { media: '(prefers-color-scheme: dark)', color: META_THEME_COLORS.dark },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/_static/favicons/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/_static/favicons/favicon.svg"
        />
        <link rel="shortcut icon" href="/_static/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/_static/favicons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Recipe Generator" />
        <link rel="manifest" href="/_static/favicons/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try {
              if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
              }
            } catch (_) {}
          `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
        <meta
          name="color-scheme"
          content="light dark"
          suppressHydrationWarning
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          sans.variable,
          serif.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </div>
          <TailwindIndicator />
          <ThemeSwitcher />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
