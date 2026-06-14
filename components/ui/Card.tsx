import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-border rounded-2xl p-6',
        hover && 'shadow-[0_2px_16px_rgba(107,79,160,0.06)] hover:shadow-[0_6px_32px_rgba(107,79,160,0.14)] transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}
