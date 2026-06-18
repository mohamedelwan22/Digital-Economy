'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronLeft, Smartphone, Shield, LayoutDashboard } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن المبادرة' },
  { href: '/sectors', label: 'القطاعات المستهدفة' },
  { href: '/reports', label: 'المؤشرات والتقارير' },
  { href: '/register', label: 'التسجيل في المبادرة' },
  { href: '/partners', label: 'الشركاء والداعمون' },
  { href: '/contact', label: 'تواصل معنا' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user

  return (
    <nav className="bg-white border-b border-[#E8DFF2]/50 sticky top-0 z-50 h-[86px] flex items-center" dir="rtl">
      <div className="w-full px-6 flex items-center justify-between">
        <div className="hidden lg:flex items-center justify-between w-full gap-4">
          <div className="flex-shrink-0">
            <Logo dark={false} />
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-3 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-arabic font-bold text-[11px] xl:text-[13.5px] whitespace-nowrap transition-colors relative py-1 ${
                    isActive ? 'text-[#6B4CC1]' : 'text-[#6B5B8A] hover:text-[#6B4CC1]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="absolute bottom-[-20px] right-0 left-0 flex items-center justify-center">
                      <div className="w-full flex items-center justify-center relative h-[8px]">
                        <div className="w-full h-[1.5px] bg-[#6B4CC1]" />
                        <div className="absolute w-[7px] h-[7px] bg-[#C8A96E] rotate-45 z-10" />
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0">
            <Link
              href="/app-browse"
              className="relative bg-gradient-to-r from-[#D4B26A] to-[#C9A24E] text-white text-[11px] xl:text-[13px] font-arabic font-bold h-[36px] xl:h-[40px] px-3 xl:px-5 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all duration-300 shadow-[0_2px_12px_rgba(212,178,106,0.35)] hover:shadow-[0_4px_20px_rgba(212,178,106,0.5)] hover:scale-[1.04] active:scale-[0.97]"
            >
              <Smartphone size={16} className="stroke-[2.2] transition-transform duration-300 group-hover:rotate-[-8deg]" />
              <span>تصفح تطبيق أنيقة</span>
              <span className="absolute inset-0 rounded-[8px] bg-white/0 hover:bg-white/10 transition-colors"></span>
            </Link>
            <Link
              href="/register"
              className="bg-[#6B4CC1] hover:bg-[#5438A0] text-white text-[11px] xl:text-[13px] font-arabic font-bold h-[36px] xl:h-[40px] px-2.5 xl:px-4 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all shadow-sm"
            >
              <span>انضم إلى المبادرة</span>
              <ChevronLeft size={14} className="stroke-[2.5]" />
            </Link>
            <Link
              href={isAuthenticated ? '/admin' : '/login'}
              className="border border-[#6B4CC1] text-[#6B4CC1] hover:bg-[#F7F1FB] text-[11px] xl:text-[13px] font-arabic font-bold h-[36px] xl:h-[40px] px-2.5 xl:px-4 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all"
            >
              {isAuthenticated
                ? <LayoutDashboard size={14} className="stroke-[2.2]" />
                : <Shield size={14} className="stroke-[2.2]" />
              }
              <span>{isAuthenticated ? 'لوحة التحكم' : 'الإدارة'}</span>
            </Link>
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-between w-full gap-2">
          <div className="flex-1 flex justify-start">
            <Logo dark={false} />
          </div>
          <button
            className="p-2 rounded-lg hover:bg-[#F0EBF8] transition-colors text-[#6B4FA0] flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-[86px] right-0 left-0 bg-[#6B4FA0] border-t border-white/10 shadow-lg">
          <div className="w-full max-w-[1320px] mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 font-arabic font-semibold text-sm rounded-lg transition-colors ${
                    isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/10">
              <Link
                href="https://apps.apple.com/sa/app/aniqa-%D8%A3%D9%86%D9%8A%D9%82%D8%A9/id6745837233?l=ar"
                className="bg-gradient-to-r from-[#D4B26A] to-[#C9A24E] text-white text-[13px] font-arabic font-bold h-[40px] rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap shadow-[0_2px_12px_rgba(212,178,106,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                <Smartphone size={16} />
                <span>تصفح تطبيق أنيقة</span>
              </Link>
              <Link
                href="/register"
                className="bg-white text-[#6B4FA0] text-[13px] font-arabic font-bold h-[40px] rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                <span>انضم إلى المبادرة</span>
                <ChevronLeft size={14} />
              </Link>
              <Link
                href={isAuthenticated ? '/admin' : '/login'}
                className="border border-white/70 text-white text-[13px] font-arabic font-bold h-[40px] rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                {isAuthenticated ? <LayoutDashboard size={14} /> : <Shield size={14} />}
                <span>{isAuthenticated ? 'لوحة التحكم' : 'الإدارة'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
