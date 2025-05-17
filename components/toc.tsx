interface TocItem {
  label: string
  href: string
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  return (
    <nav className={`space-y-1 text-sm ${className}`}>
      <p className="font-medium mb-2">On this page</p>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="block text-muted-foreground hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
