import Image from 'next/image'
import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays } from 'lucide-react'

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

const images: Record<string, string> = {
  Scissors: '/images/sectors/salon.jpg',
  Dumbbell: '/images/sectors/fitness.jpg',
  Sparkles: '/images/sectors/beauty.jpg',
  BookOpen: '/images/sectors/training.jpg',
  CalendarDays: '/images/sectors/events.jpg',
}

interface NewSectorsSectionProps {
  title: string
  sectors: Sector[]
}

export default function NewSectorsSection({ title, sectors }: NewSectorsSectionProps) {
  if (!sectors || sectors.length === 0) return null

  // Ensure sectors are sorted by order
  const sortedSectors = [...sectors].sort((a, b) => a.order - b.order)

  return (
    <section className="py-14 bg-white" dir="rtl">
      <div className="container-global">
        
        {/* Section Header with Left & Right decorative gold lines */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-10 h-[1.2px] bg-[#D4B26A]"></div>
          <h2 className="font-arabic font-extrabold text-[22px] text-[#2D1955]">{title}</h2>
          <div className="w-10 h-[1.2px] bg-[#D4B26A]"></div>
        </div>

        {/* 5-Column Grid, ordered Left-to-Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" style={{ direction: 'ltr' }}>
          {sortedSectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Scissors
            const imgSrc = images[sector.icon] || images.Scissors
            return (
              <div
                key={sector.id}
                className="group bg-white rounded-[20px] overflow-hidden border border-[#E8DFF2]/60 shadow-[0_4px_20px_rgba(107,76,193,0.03)] hover:shadow-[0_8px_30px_rgba(107,76,193,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[280px]"
                style={{ direction: 'rtl' }}
              >
                {/* Sector Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={sector.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Overlapping Centered Icon */}
                <div className="flex justify-center -mt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFF2]/50 shadow-[0_4px_12px_rgba(107,76,193,0.08)] flex items-center justify-center text-[#6B4CC1] group-hover:scale-105 transition-transform duration-300">
                    <Icon size={20} className="stroke-[1.8]" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-4 pb-6 pt-3 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-arabic font-extrabold text-[#2D1955] text-[15px] mb-1.5 leading-tight">
                      {sector.name}
                    </h3>
                    <p className="text-[#6B5B8A] font-arabic text-[12px] leading-[1.6] line-clamp-2 px-1">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
