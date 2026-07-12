interface PageHeroProps {
  title: string
  highlight?: string
  subtitle?: string
  breadcrumb?: string
}

export function PageHero({ title, highlight, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative py-24 md:py-32 bg-background text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {breadcrumb && (
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {title}{" "}
          {highlight && (
            <span className="text-primary">{highlight}</span>
          )}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
