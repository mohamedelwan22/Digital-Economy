'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Edit3,
  Store,
  BarChart3,
  Building2,
  Handshake,
  Settings,
  MessageSquare,
  ClipboardList,
  LogOut,
  Info,
  Shield,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/home', label: 'تعديل الرئيسية', icon: Edit3 },
  { href: '/admin/about', label: 'عن المبادرة', icon: Info },
  { href: '/admin/target-sectors', label: 'القطاعات المستهدفة', icon: Store },
  { href: '/admin/reports', label: 'المؤتمرات والتقارير', icon: BarChart3 },
  { href: '/admin/businesses', label: 'المنشآت المسجلة', icon: Building2 },
  { href: '/admin/registrations', label: 'التسجيلات', icon: ClipboardList },
  { href: '/admin/messages', label: 'الرسائل', icon: MessageSquare },
  { href: '/admin/partners', label: 'الشركاء', icon: Handshake },
  { href: '/admin/footer', label: 'الـ Footer', icon: Edit3 },
  { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="w-64 bg-[#2D1B4E] text-white h-screen sticky top-0 flex flex-col flex-shrink-0" dir="rtl">
      <div className="p-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light/30 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-primary-light" />
          </div>
          <div className="leading-tight min-w-0 flex-1">
            <p className="font-arabic font-bold text-sm truncate">
              {session?.user?.name || 'المشرف'}
            </p>
            <p className="font-arabic text-xs text-white/60 truncate">
              {session?.user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 sidebar-scrollbar min-h-0">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-arabic transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <link.icon size={19} className="flex-shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10 flex-shrink-0">
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-arabic text-white/70 hover:text-white hover:bg-white/10 transition-colors w-full text-right"
        >
          <LogOut size={19} className="flex-shrink-0" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}
