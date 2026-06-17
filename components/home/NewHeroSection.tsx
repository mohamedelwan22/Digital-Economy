import Link from 'next/link'
import Image from 'next/image'
import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays, ChevronLeft, Smartphone } from 'lucide-react'

interface NewHeroSectionProps {
  badge: string
  title: string
  subtitle: string
  description: string
  btn1Text: string
  btn2Text: string
  heroImage?: string
}

export default function NewHeroSection({ badge, title, subtitle, description, btn1Text, btn2Text, heroImage }: NewHeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-tr from-[#F3EAFA] via-[#FBF7FD] to-[#FDFBFE] py-14 overflow-hidden" dir="rtl">
      <div className="container-global">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_0.9fr] gap-6 lg:gap-0 items-center min-h-[480px]" style={{ direction: 'ltr' }}>

          <div className="flex items-center justify-center flex-shrink-0" style={{ direction: 'rtl' }}>
            <div className="w-full max-w-[360px] mx-auto h-[380px] md:h-[460px] lg:h-[560px] rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-[0_8px_40px_rgba(107,76,193,0.06)] border border-[#E8DFF2]/40">
              <Image
                src={heroImage || '/images/Hero.png'}
                alt="مبادرة الاقتصاد الرقمي لقطاع الخدمات النسائية"
                width={560}
                height={620}
                priority
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-end lg:text-right justify-center px-4 lg:px-8 py-8 lg:py-0" style={{ direction: 'rtl' }}>
            <span className="inline-block font-arabic font-medium text-[#C8A96E] text-[30px] mb-2 text-center lg:text-right w-full">
              {badge}
            </span>
            <div className="mt-2 w-full" style={{ direction: 'rtl' }}>
              <h1
                className="font-arabic font-black text-[#2D1955] leading-[1.25] sm:whitespace-nowrap"
                style={{ fontSize: 'clamp(32px, 3.5vw, 60px)' }}
              >
                الاقتصـاد الرقـمي
              </h1>
              <h2
                className="font-arabic font-black text-[#2D1955] leading-[1.25] sm:whitespace-nowrap"
                style={{ fontSize: 'clamp(26px, 2.8vw, 50px)' }}
              >
                لقطاع الخدمات النسائية
              </h2>
            </div>
            <p className="text-[#6B5B8A] font-arabic text-[14.5px] leading-[1.75] mt-5 max-w-[480px]">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
              <Link
                href="/register"
                className="bg-[#6B4CC1] hover:bg-[#5438A0] text-white text-[13px] font-arabic font-bold h-[38px] px-[22px] rounded-[10px] flex items-center justify-center gap-1.5 transition-all shadow-sm w-full sm:w-auto"
              >
                <span>{btn1Text}</span>
                <ChevronLeft size={15} className="stroke-[2.5]" />
              </Link>
              <Link
                href="/app-browse"
                className="relative bg-gradient-to-r from-[#D4B26A] to-[#C9A24E] text-white text-[13px] font-arabic font-bold h-[38px] px-[20px] rounded-[10px] flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_2px_12px_rgba(212,178,106,0.35)] hover:shadow-[0_4px_20px_rgba(212,178,106,0.5)] hover:scale-[1.04] active:scale-[0.97] w-full sm:w-auto"
              >
                <Smartphone size={17} className="stroke-[2.2]" />
                <span>{btn2Text}</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-shrink-0" style={{ direction: 'rtl' }}>
            <div className="w-[320px] h-[460px] bg-white rounded-[28px] shadow-[0_12px_45px_rgba(107,76,193,0.06)] border border-[#E8DFF2]/40 p-5 flex flex-col justify-between select-none">

              <div className="relative w-full h-[95px] flex flex-col justify-between">
                <span className="font-arabic text-[11px] text-[#6B5B8A] font-bold self-start">
                  نمو القطاع
                </span>
                <div className="w-full h-[70px] -mt-1">
                  <svg viewBox="0 0 280 70" className="w-full h-full">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6B4CC1" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#6B4CC1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10,55 C 40,48 70,12 110,24 C 150,36 190,15 230,42 L 270,28 L 270,70 L 10,70 Z"
                      fill="url(#chart-grad)"
                    />
                    <path
                      d="M 10,55 C 40,48 70,12 110,24 C 150,36 190,15 230,42 L 270,28"
                      fill="none"
                      stroke="#6B4CC1"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="270" cy="28" r="3.5" fill="#D4B26A" stroke="#FFFFFF" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 py-3 border-t border-[#E8DFF2]/40">
                <div className="w-[110px] h-[90px] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 120 100" className="w-full h-full opacity-90">
                    <path
                      d="M60 12 C72 17 77 24 82 22 C87 20 92 24 94 30 C96 36 90 42 87 47 C82 52 77 54 72 50 C67 46 62 48 57 44 C52 40 47 42 42 37 C37 32 40 27 42 22 C44 17 50 14 54 12 Z"
                      fill="#6B4CC1"
                      fillOpacity="0.08"
                      stroke="#6B4CC1"
                      strokeOpacity="0.25"
                      strokeWidth="0.8"
                    />
                    <circle cx="65" cy="25" r="2.5" fill="#D4B26A" />
                    <circle cx="78" cy="32" r="2" fill="#D4B26A" opacity="0.8" />
                    <circle cx="52" cy="34" r="2" fill="#D4B26A" opacity="0.8" />
                    <circle cx="70" cy="42" r="1.5" fill="#D4B26A" opacity="0.6" />
                  </svg>
                </div>

                <div className="flex flex-col gap-2.5 text-right flex-1">
                  <div>
                    <p className="font-arabic text-[10.5px] text-[#6B5B8A] leading-tight font-bold">المنشآت المسجلة</p>
                    <p className="font-numbers font-extrabold text-[19px] text-[#2D1955] leading-none mt-1">25,430</p>
                  </div>
                  <div>
                    <p className="font-arabic text-[10.5px] text-[#6B5B8A] leading-tight font-bold">العملاء المستفيدون</p>
                    <p className="font-numbers font-extrabold text-[19px] text-[#2D1955] leading-none mt-1">1,250,000</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8DFF2]/40 py-3.5 flex flex-col items-center">
                <div className="flex justify-between w-full px-0.5 mb-2">
                  <div className="flex flex-col items-center gap-1 w-[46px]">
                    <div className="w-8 h-8 rounded-full bg-[#F7F1FB] border border-[#E8DFF2]/40 flex items-center justify-center text-[#6B5B8A]">
                      <CalendarDays size={14} className="stroke-[1.8]" />
                    </div>
                    <span className="font-arabic text-[9.5px] text-[#6B5B8A] font-bold">المعارض</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-[46px]">
                    <div className="w-8 h-8 rounded-full bg-[#F7F1FB] border border-[#E8DFF2]/40 flex items-center justify-center text-[#6B5B8A]">
                      <BookOpen size={14} className="stroke-[1.8]" />
                    </div>
                    <span className="font-arabic text-[9.5px] text-[#6B5B8A] font-bold">التدريب</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-[46px]">
                    <div className="w-8 h-8 rounded-full bg-[#F7F1FB] border border-[#E8DFF2]/40 flex items-center justify-center text-[#6B5B8A]">
                      <Sparkles size={14} className="stroke-[1.8]" />
                    </div>
                    <span className="font-arabic text-[9.5px] text-[#6B5B8A] font-bold">التجميل</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-[46px]">
                    <div className="w-8 h-8 rounded-full bg-[#F7F1FB] border border-[#E8DFF2]/40 flex items-center justify-center text-[#6B5B8A]">
                      <Dumbbell size={14} className="stroke-[1.8]" />
                    </div>
                    <span className="font-arabic text-[9.5px] text-[#6B5B8A] font-bold">اللياقة</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-[46px]">
                    <div className="w-8 h-8 rounded-full bg-[#F7F1FB] border border-[#E8DFF2]/40 flex items-center justify-center text-[#6B5B8A]">
                      <Scissors size={14} className="stroke-[1.8]" />
                    </div>
                    <span className="font-arabic text-[9.5px] text-[#6B5B8A] font-bold">الصالونات</span>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center mt-0.5">
                  <svg viewBox="0 0 280 8" className="w-full h-1.5 text-[#C8BAD8]/70">
                    <path d="M 12,2 L 12,5 L 268,5 L 268,2" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <span className="font-arabic text-[10px] text-[#D4B26A] font-bold mt-1">فرص الاستثمار</span>
                </div>
              </div>

              <div className="border-t border-[#E8DFF2]/40 pt-2.5 w-full h-[32px]">
                <svg viewBox="0 0 280 20" className="w-full h-full opacity-60">
                  <path
                    d="M 0,10 Q 20,5 40,12 T 80,7 T 120,15 T 160,3 T 200,12 T 240,6 T 280,10"
                    fill="none"
                    stroke="#C8BAD8"
                    strokeWidth="1"
                  />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
