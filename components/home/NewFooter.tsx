import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from '@/components/ui/Logo'

function SnapchatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.002 2C11.593 2.002 9.531 2.502 8.163 4.41C6.732 6.408 6.425 8.784 6.425 10.155c0 1.233.328 1.83.673 2.179.231.233.328.329.23.63-.098.3-.518 1.341-1.408 1.341-.497 0-.968-.239-1.282-.663-.263-.356-.566-.465-.89-.356-.372.124-.518.52-.395.945.283.986 1.472 2.452 2.923 2.37.135-.008.271-.035.405-.081.332-.112.518-.009.689.261.42 1.353 1.956 2.38 3.568 2.38.384 0 .768-.06 1.127-.179.362-.119.518-.024.686.257.653 1.096 1.864 1.493 2.899 1.493 1.037 0 2.248-.397 2.902-1.493.167-.281.324-.376.685-.257.359.119.743.179 1.128.179 1.612 0 3.149-1.027 3.568-2.38.171-.27.357-.373.689-.261.134.046.27.073.405.081 1.45.082 2.64-1.384 2.923-2.37.123-.425-.023-.821-.395-.945-.324-.109-.627 0-.89.356-.314.424-.785.663-1.282.663-.89 0-1.31-1.041-1.408-1.341-.098-.301 0-.397.23-.63.345-.349.673-.946.673-2.179 0-1.371-.307-3.747-1.738-5.745C14.473 2.502 12.411 2.002 12.002 2z" />
    </svg>
  )
}

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case 'snapchat':
      return <SnapchatIcon />
    case 'instagram':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="24" height="24" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
    case 'twitter':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
    case 'linkedin':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
    case 'youtube':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
    default:
      return null
  }
}

const socialTypes = ['snapchat', 'instagram', 'twitter', 'linkedin', 'youtube']
const socialLabels: Record<string, string> = {
  snapchat: 'سناب شات',
  instagram: 'انستغرام',
  twitter: 'تويتر',
  linkedin: 'لينكد إن',
  youtube: 'يوتيوب',
}

export default function NewFooter({ content = {} }: { content?: Record<string, string> }) {
  const socials = socialTypes.map((type) => ({
    type,
    href: content[`footer_${type}`] || '#',
    label: socialLabels[type],
  }))

  return (
    <footer className="bg-[#F7F1FB] border-t border-[#E8DFF2]/40 text-[#2D1955] py-10" dir="rtl">
      <div className="container-global">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">

          <div className="flex flex-col gap-4 text-right">
            <Logo dark={false}
              className="scale-95 origin-right"
              title={content.logo_title}
              subtitle={content.logo_subtitle}
              image={content.logo_image}
            />
            <p className="text-[#6B5B8A] text-[12px] font-semibold mt-1 pr-3 select-none">
              {content.footer_copyright || 'جميع الحقوق محفوظة © 2024'}
            </p>
          </div>

          <div className="text-right pr-4">
            <h3 className="font-arabic font-extrabold text-[14px] text-[#2D1955] mb-4">{content.footer_contact_title || 'معلومات التواصل'}</h3>
            <ul className="space-y-3 text-[#6B5B8A] text-[12.5px] font-arabic">
              <li className="flex items-center gap-2.5 justify-start">
                <Mail size={15} className="text-[#6B4CC1] flex-shrink-0" />
                <span className="select-all">{content.footer_email || 'info@women-services-initiative.sa'}</span>
              </li>
              <li className="flex items-center gap-2.5 justify-start">
                <Phone size={15} className="text-[#6B4CC1] flex-shrink-0" />
                <span className="font-numbers dir-ltr select-all font-semibold">{content.footer_phone || '+966 5 5555 5555'}</span>
              </li>
              <li className="flex items-center gap-2.5 justify-start">
                <MapPin size={15} className="text-[#6B4CC1] flex-shrink-0" />
                <span>{content.footer_location || 'المملكة العربية السعودية'}</span>
              </li>
            </ul>
          </div>

          <div className="text-right md:pl-4">
            <h3 className="font-arabic font-extrabold text-[14px] text-[#2D1955] mb-4">{content.footer_social_title || 'تابعينا'}</h3>
            <div className="flex gap-2.5 mt-2 justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] rounded-full bg-[#E8DFF2]/65 hover:bg-[#6B4CC1] flex items-center justify-center text-[#2D1955] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={s.label}
                >
                  <SocialIcon type={s.type} />
                </a>
              ))}
            </div>
          </div>

          <div className="text-right">
            <h3 className="font-arabic font-extrabold text-[14px] text-[#2D1955] mb-2">
              {content.footer_newsletter_title || 'اشتركي للحصول على آخر الأخبار والتقارير'}
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 items-stretch sm:items-center">
              <button className="h-[38px] px-5 bg-[#6B4CC1] hover:bg-[#5438A0] text-white rounded-[10px] text-[12.5px] font-arabic font-bold transition-colors order-2 sm:order-1 w-full sm:w-auto flex-shrink-0 shadow-sm">
                {content.footer_newsletter_btn || 'اشتركي الآن'}
              </button>
              <div className="relative flex-1 order-1 sm:order-2">
                <input
                  type="email"
                  placeholder={content.footer_newsletter_placeholder || 'أدخلي بريدك الإلكتروني'}
                  className="w-full pl-3 pr-10 h-[38px] rounded-[10px] bg-white border border-[#E8DFF2] text-[#2D1955] placeholder:text-[#9E8FB5] text-[12.5px] focus:outline-none focus:border-[#6B4CC1]"
                />
                <Mail size={15} className="absolute right-3.5 top-[11.5px] text-[#9E8FB5]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
