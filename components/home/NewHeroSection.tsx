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
          <div className="flex flex-col items-center justify-center">
            <span
              className="font-semibold text-[#C7A04E] text-[24px] mb-[18px]"
              style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif' }}
            >
              {badge}
            </span>

            <h1
              className="font-bold text-[#2E1463] text-[68px] max-w-[820px] text-center"
              style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif', lineHeight: '1.15', letterSpacing: '-0.5px' }}
            >
              الاقتصاد الرقمي<br />
              لقطاع الخدمات النسائية
            </h1>

            <p
              className="text-[#5E4E7A] text-[22px] font-medium max-w-[760px] text-center"
              style={{ fontFamily: '"IBM Plex Sans Arabic", "Tajawal", sans-serif', lineHeight: '1.9' }}
            >
              منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها<br />
              بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mt-[10px]">
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
