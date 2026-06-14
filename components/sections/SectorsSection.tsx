import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

interface Sector {
  id: string
  name: string
  description: string
  icon: string
  image: string
  order: number
}

const iconMap: Record<string, React.ElementType> = {
  Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays,
}

const sectorGradients = [
  'from-pink-200 via-primary/20 to-primary/10',
  'from-green-200 via-primary/20 to-primary/10',
  'from-amber-200 via-primary/20 to-primary/10',
  'from-blue-200 via-primary/20 to-primary/10',
  'from-purple-200 via-primary/20 to-primary/10',
]

interface SectorsSectionProps {
  title: string
  sectors: Sector[]
}

export default function SectorsSection({ title, sectors }: SectorsSectionProps) {
  if (!sectors || sectors.length === 0) {
    return null
  }

  return (
    <section className="py-24 md:py-28 bg-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {title && <SectionTitle title={title} />}

        <div className="flex flex-wrap justify-center gap-8">
          {sectors.map((sector, index) => {
            const Icon = iconMap[sector.icon] || Scissors

            return (
              <div
                key={sector.id}
                className="group bg-white rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgba(107,76,193,0.08)] hover:shadow-[0_12px_50px_rgba(107,76,193,0.15)] transition-all duration-400 hover:-translate-y-1.5 border border-primary-bg/50 w-[260px]"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${sectorGradients[index % sectorGradients.length]}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                </div>

                <div className="flex justify-center -mt-9 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgba(107,76,193,0.15)] flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} />
                  </div>
                </div>

                <div className="px-6 pb-8 pt-4 text-center">
                  <h3 className="font-arabic font-bold text-text-primary text-lg md:text-xl mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-text-secondary font-arabic text-base leading-relaxed line-clamp-2">
                    {sector.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
