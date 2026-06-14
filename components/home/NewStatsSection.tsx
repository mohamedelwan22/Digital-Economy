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
      <div className="w-full max-w-[1100px] mx-auto bg-white rounded-[20px] shadow-[0_4px_24px_rgba(107,79,160,0.08)] -mt-12 md:-mt-14 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 divide-x divide-x-reverse divide-[#E8DFF2]">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <span className="font-numbers font-black text-[#6B4FA0] tabular-nums" style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>
                  {s.value}
                </span>
                <span className="font-arabic text-[#6B5B8A] text-[13px] mt-1">
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
