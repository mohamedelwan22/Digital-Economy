import { TrendingUp, Building2, MapPin, GraduationCap, Users } from 'lucide-react'
import { prisma } from '@/lib/db'

const defaultStats = [
  { icon: Users, value: '+300', label: 'فرصة استثمارية' },
  { icon: GraduationCap, value: '+10,000', label: 'فرصة تدريبية' },
  { icon: MapPin, value: '+50', label: 'مدينة مستهدفة' },
  { icon: Building2, value: '+15', label: 'قطاع خدمي' },
  { icon: TrendingUp, value: '+25,000', label: 'منشأة مستهدفة' },
]

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Building2, MapPin, GraduationCap, Users,
}

interface NewStatsSectionProps {
  title: string
}

export default async function NewStatsSection({ title }: NewStatsSectionProps) {
  const dbStats = await prisma.stat.findMany({ orderBy: { order: 'asc' } }).catch(() => [])

  const stats = dbStats.length > 0
    ? dbStats.map((s) => ({
        icon: iconMap[s.icon] || TrendingUp,
        value: s.value,
        label: s.label,
      }))
    : defaultStats

  return (
    <section className="relative z-20" dir="rtl">
      <div className="w-full max-w-[1320px] mx-auto px-6 -mt-[45px]">
        <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(107,76,193,0.06)] border border-[#E8DFF2]/40 px-4 sm:px-6 py-6 lg:py-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3.5 justify-center lg:flex-1 min-w-0 ${
                    i < stats.length - 1 ? 'lg:border-l border-[#E8DFF2]/50' : ''
                  }`}
                >
                  <div className="text-right flex flex-col justify-center">
                    <span className="font-numbers font-black text-[28px] md:text-[32px] lg:text-[36px] text-[#6B4FA0] leading-none tabular-nums">
                      {s.value}
                    </span>
                    <span className="font-arabic text-[12px] text-[#6B5B8A] font-bold mt-1.5 leading-none">
                      {s.label}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-[#C8BAD8]">
                    <Icon size={24} className="stroke-[1.8]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
