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
  { href: '/reports', label: 'المؤتمرات والتقارير' },
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

          <div className="flex flex-1 items-center justify-center gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-arabic font-medium text-[13.5px] transition-colors relative py-1 whitespace-nowrap ${
                    isActive ? 'text-[#6B4CC1] font-bold' : 'text-[#6B5B8A] hover:text-[#6B4CC1]'
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

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/app-browse"
              className="border border-[#D4B26A] text-[#D4B26A] hover:bg-[#FAF6EE] text-[13px] font-arabic font-bold h-[40px] px-4 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all"
            >
              <Smartphone size={14} className="stroke-[2.2]" />
              <span>تصفح تطبيق آمنة</span>
            </Link>
            <Link
              href="/register"
              className="bg-[#6B4CC1] hover:bg-[#5438A0] text-white text-[13px] font-arabic font-bold h-[40px] px-4 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all shadow-sm"
            >
              <span>انضم إلى المبادرة</span>
              <ChevronLeft size={14} className="stroke-[2.5]" />
            </Link>
            <Link
              href={isAuthenticated ? '/admin' : '/login'}
              className="border border-[#6B4CC1] text-[#6B4CC1] hover:bg-[#F7F1FB] text-[13px] font-arabic font-bold h-[40px] px-4 rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap transition-all"
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
                href="/app-browse"
                className="border border-white/70 text-white text-[13px] font-arabic font-bold h-[40px] rounded-[8px] flex items-center justify-center gap-[6px] whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                <Smartphone size={14} />
                <span>تصفح تطبيق آمنة</span>
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
