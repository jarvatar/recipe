export function SiteFooter() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-4 md:px-0">
          <a
            href="https://magicspace.co/courses/programmatic-seo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Purchase Template
          </a>
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Cocktail Magic
          </p>
        </div>
        <a
          href="https://magicspace.co"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-muted-foreground hover:text-primary"
        >
          MagicSpace SEO
        </a>
      </div>
    </footer>
  )
}