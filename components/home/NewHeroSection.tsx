import Link from 'next/link'
import { ChevronLeft, Smartphone } from 'lucide-react'

interface NewHeroSectionProps {
  badge: string
  title: string
  subtitle: string
  description: string
  btn1Text: string
  btn2Text: string
  heroImage?: string
}

export default function NewHeroSection({ badge, title, subtitle, description, btn1Text, btn2Text }: NewHeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      dir="rtl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/Main-Hero.png)' }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[600px] md:min-h-[650px] lg:min-h-[680px]">
          <div className="flex flex-col justify-center max-w-[600px] mx-auto">
            <span className="font-arabic font-bold text-[#C8A96E] text-[22px] md:text-[28px] lg:text-[32px] mb-4 inline-block">
              {badge}
            </span>

            <h1 className="font-arabic font-black text-[#2D1955] leading-[1.2] text-[40px] md:text-[52px] lg:text-[62px] xl:text-[68px]">
              الاقتصاد الرقمي
            </h1>
            <h2 className="font-arabic font-black text-[#2D1955] leading-[1.2] text-[32px] md:text-[42px] lg:text-[50px] xl:text-[56px] mt-2">
              لقطاع الخدمات النسائية
            </h2>

            <p className="font-arabic text-[#4A3578] text-[16px] md:text-[17px] lg:text-[18px] font-semibold leading-[2] mt-8 max-w-[450px]">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-10">
              <Link
                href="/register"
                className="bg-[#6B4CC1] hover:bg-[#5438A0] text-white text-[14px] md:text-[15px] font-arabic font-bold h-[48px] md:h-[52px] px-[28px] md:px-[32px] rounded-[12px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(107,76,193,0.25)] hover:shadow-[0_6px_24px_rgba(107,76,193,0.35)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>{btn1Text}</span>
                <ChevronLeft size={18} className="stroke-[2.5]" />
              </Link>
              <a
                href="https://apps.apple.com/sa/app/aniqa-%D8%A3%D9%86%D9%8A%D9%82%D8%A9/id6745837233?l=ar"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#D4B26A] to-[#C9A24E] text-white text-[14px] md:text-[15px] font-arabic font-bold h-[48px] md:h-[52px] px-[28px] md:px-[32px] rounded-[12px] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(212,178,106,0.3)] hover:shadow-[0_6px_24px_rgba(212,178,106,0.45)] hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
              >
                <Smartphone size={19} className="stroke-[2.2]" />
                <span>{btn2Text}</span>
              </a>
            </div>
          </div>
      </div>
    </section>
  )
}
