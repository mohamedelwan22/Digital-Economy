import Button from '@/components/ui/Button'
import { TrendingUp, Store, MapPin } from 'lucide-react'

interface HeroSectionProps {
  badge: string
  title: string
  subtitle: string
  description: string
  btn1Text: string
  btn2Text: string
}

export default function HeroSection({ badge, title, subtitle, description, btn1Text, btn2Text }: HeroSectionProps) {
  return (
    <section className="relative z-0 bg-bg-secondary overflow-hidden" dir="rtl">
      <div className="mx-auto relative z-10 max-w-[1600px] min-h-[760px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_0.9fr] w-full h-full">

          {/* LEFT COLUMN — Image */}
          <div className="relative h-full min-h-[560px]">
            <div className="relative w-[620px] h-[560px] overflow-hidden">
              <img
                src="/images/Hero.png"
                alt="المرأة السعودية"
                className="w-full h-full object-cover rounded-l-none rounded-r-[32px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent rounded-r-[32px]" />
            </div>
          </div>

          {/* CENTER COLUMN — Text */}
          <div className="flex flex-col justify-center px-10 xl:px-14 py-16">
            <span className="self-start inline-block px-6 py-2.5 bg-accent/15 text-accent-dark font-arabic font-bold text-base rounded-full mb-6">
              {badge}
            </span>
            <h1 className="font-arabic font-extrabold text-4xl md:text-5xl lg:text-7xl leading-tight text-text-primary">
              {title}
              <br />
              <span className="text-text-primary">{subtitle}</span>
            </h1>
            <p className="mt-6 text-text-primary/80 font-arabic text-lg leading-relaxed max-w-md">
              {description}
            </p>
            <div className="flex flex-wrap gap-5 mt-12">
              <Button variant="primary" size="lg" className="w-[220px]">{btn1Text}</Button>
              <Button variant="secondary" size="lg" className="w-[220px]">{btn2Text}</Button>
            </div>
          </div>

          {/* RIGHT COLUMN — Analytics Card */}
          <div className="flex items-start justify-center xl:justify-end pt-16 pb-8 px-4 xl:px-0">
            <div
              className="bg-white/70 backdrop-blur-xl rounded-[32px] shadow-[0_8px_50px_rgba(107,76,193,0.15)] p-8 border border-white/20 flex flex-col w-[320px]"
              style={{ height: '520px' }}
            >
              <h4 className="font-arabic font-bold text-text-primary text-lg mb-5">مؤشرات المبادرة</h4>

              <div className="mb-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={15} className="text-primary" />
                  <span className="font-arabic text-sm text-text-secondary">المملكة العربية السعودية</span>
                </div>
                <svg viewBox="0 0 80 60" className="w-full h-14">
                  <path d="M40 5 Q45 8 48 12 Q50 15 52 14 Q55 13 56 16 Q57 19 55 22 Q53 25 50 26 Q47 27 45 25 Q43 23 40 24 Q37 25 35 23 Q33 21 30 22 Q27 23 25 20 Q23 17 24 14 Q25 11 28 10 Q30 9 32 7 Q35 5 40 5Z" fill="#6B4CC1" opacity="0.12" stroke="#6B4CC1" strokeWidth="0.8" />
                  <circle cx="40" cy="14" r="2" fill="#D4B26A" opacity="0.6" />
                  <circle cx="48" cy="18" r="1.5" fill="#D4B26A" opacity="0.4" />
                  <circle cx="32" cy="19" r="1.5" fill="#D4B26A" opacity="0.4" />
                </svg>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-arabic text-sm text-text-secondary">المنشآت المسجلة</span>
                    <span className="font-numbers font-bold text-base text-primary">25,430</span>
                  </div>
                  <div className="h-2.5 bg-primary-bg rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-primary rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-arabic text-sm text-text-secondary">العملاء المستفيدون</span>
                    <span className="font-numbers font-bold text-base text-primary">1.2M</span>
                  </div>
                  <div className="h-2.5 bg-primary-bg rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-accent rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-arabic text-sm text-text-secondary">نمو القطاع</span>
                    <span className="font-numbers font-bold text-base text-green-600">+23%</span>
                  </div>
                  <svg viewBox="0 0 100 20" className="w-full h-7">
                    <polyline points="0,18 15,14 30,16 45,8 60,10 75,4 100,6" fill="none" stroke="#6B4CC1" strokeWidth="1.5" />
                    <polyline points="0,18 15,14 30,16 45,8 60,10 75,4 100,6" fill="none" stroke="#6B4CC1" opacity="0.1" strokeWidth="5" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Store size={15} className="text-primary" />
                  <span className="font-numbers font-bold text-base text-primary">15</span>
                  <span className="font-arabic text-sm text-text-secondary">قطاع</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={15} className="text-green-500" />
                  <span className="font-numbers font-bold text-base text-green-600">+156%</span>
                  <span className="font-arabic text-sm text-text-secondary">نمو</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
