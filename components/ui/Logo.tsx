import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  dark?: boolean
  className?: string
  title?: string
  subtitle?: string
  image?: string
}

export default function Logo({ dark = true, className, title, subtitle, image }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-[8px] sm:gap-[10px] group ${className || ''}`}>
      <Image
        src={image || '/images/Logo.png'}
        alt={title || 'مبادرة الاقتصاد الرقمي'}
        width={64}
        height={64}
        priority
        className="w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] rounded-full object-contain flex-shrink-0"
      />
      <div className="leading-[1.2] flex flex-col justify-center select-none">
        <span className={`font-arabic font-bold text-[14px] sm:text-[17px] leading-tight ${dark ? 'text-white' : 'text-[#2D1955]'} tracking-wide`}>
          {title || 'مبادرة الاقتصاد الرقمي'}
        </span>
        <span className={`font-arabic font-medium text-[11px] sm:text-[13px] leading-tight ${dark ? 'text-white/80' : 'text-[#6B5B8A]'}`}>
          {subtitle || 'لقطاع الخدمات النسائية'}
        </span>
      </div>
    </Link>
  )
}
