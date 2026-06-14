interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'center' | 'right'
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : 'text-right'}`}>
      <h2 className="font-arabic font-bold text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] text-text-primary mb-4">
        {title}
      </h2>
      <div className={`w-20 h-1 bg-accent rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="mt-4 text-text-secondary font-arabic text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
