import { Store, Building2, MapPin, GraduationCap, TrendingUp } from 'lucide-react'

const defaultStats = [
  { icon: Store, value: '+25,000', label: 'منشأة مستفيدة' },
  { icon: Building2, value: '+15', label: 'قطاع خدمي' },
  { icon: MapPin, value: '+50', label: 'مدينة مستهدفة' },
  { icon: GraduationCap, value: '+10,000', label: 'فرصة تدريبية' },
  { icon: TrendingUp, value: '+300', label: 'فرصة استثمارية' },
]

export default function StatsBar() {
  return (
    <section className="relative z-10" dir="rtl">
      <div className="w-[90%] mx-auto max-w-[1440px] -mt-14">
        <div className="bg-white rounded-3xl shadow-[0_8px_60px_rgba(107,76,193,0.12)] px-10 md:px-16 flex items-center h-[140px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 w-full">
            {defaultStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-5 p-3 md:p-0">
                <div className="w-14 h-14 rounded-2xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                  <stat.icon size={26} className="text-primary" />
                </div>
                <div>
                  <p className="font-numbers font-black text-2xl md:text-3xl text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="font-arabic text-sm md:text-base text-text-secondary mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
