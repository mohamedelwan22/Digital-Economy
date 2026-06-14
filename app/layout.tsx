import type { Metadata } from 'next'
import { Tajawal, Cairo } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  display: 'swap',
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'مبادرة الاقتصاد الرقمي | لقطاع الخدمات النسائية',
  description: 'منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها بالعملاء وتعزيز جودة الخدمات وخلق فرص اقتصادية جديدة',
  keywords: 'الاقتصاد الرقمي, الخدمات النسائية, تمكين المرأة, المنشآت النسائية, السعودية',
  icons: {
    icon: '/images/Logo.png',
    apple: '/images/Logo.png',
  },
  openGraph: {
    title: 'مبادرة الاقتصاد الرقمي | لقطاع الخدمات النسائية',
    description: 'منظومة رقمية متكاملة لتمكين المنشآت النسائية وربطها بالعملاء',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-arabic">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
