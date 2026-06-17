import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const footerLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن المبادرة' },
  { href: '/sectors', label: 'القطاعات المستهدفة' },
  { href: '/register', label: 'التسجيل' },
  { href: '/reports', label: 'المؤشرات والتقارير' },
  { href: '/partners', label: 'الشركاء' },
  { href: '/contact', label: 'تواصل معنا' },
]

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'twitter':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'youtube':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      )
    default:
      return null
  }
}

const socialLinks = [
  { type: 'instagram', href: '#', label: 'انستغرام' },
  { type: 'twitter', href: '#', label: 'تويتر' },
  { type: 'linkedin', href: '#', label: 'لينكد إن' },
  { type: 'youtube', href: '#', label: 'يوتيوب' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2D1955] text-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div>
            <Logo dark />
            <p className="mt-5 text-white/60 text-sm leading-relaxed font-arabic">
              منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة.
            </p>
          </div>

          <div>
            <h3 className="font-arabic font-bold text-lg mb-5">روابط سريعة</h3>
            <ul className="space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent transition-colors text-sm font-arabic"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-arabic font-bold text-lg mb-5">تابعينا</h3>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
            <h3 className="font-arabic font-bold text-lg mb-4">معلومات التواصل</h3>
            <ul className="space-y-3.5 text-white/60 text-sm font-arabic">
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <span>info@women-services-initiative.sa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <span>966 5 5555 5555+</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <span>المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-arabic font-bold text-lg mb-5">النشرة البريدية</h3>
            <p className="text-white/60 text-sm mb-5 font-arabic">
              اشترك لتصلك أحدث الأخبار والفعاليات
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-3.5 rounded-r-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent"
              />
              <button className="px-5 py-3.5 bg-accent text-white rounded-l-lg hover:bg-accent-dark transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-5 text-center">
          <p className="text-white/50 text-sm font-arabic">
            مبادرة الاقتصاد الرقمي لقطاع الخدمات النسائية © {new Date().getFullYear()} — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}
