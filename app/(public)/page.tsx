import { Suspense } from 'react'
import { getContentMulti } from '@/lib/content'
import NewHeroSection from '@/components/home/NewHeroSection'
import NewStatsSection from '@/components/home/NewStatsSection'
import NewSectorsSection from '@/components/home/NewSectorsSection'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const content = await getContentMulti([
    'hero_title', 'hero_subtitle', 'hero_badge', 'hero_description',
    'hero_btn1_text', 'hero_btn2_text', 'hero_image',
    'sectors_title', 'stats_title', 'stats_subtitle',
  ])

  const sectors = await prisma.sector.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <>
      <NewHeroSection
        badge={content.hero_badge || 'مبادرة'}
        title={content.hero_title || 'الاقتصاد الرقمي'}
        subtitle={content.hero_subtitle || 'لقطاع الخدمات النسائية'}
        description={content.hero_description || ''}
        btn1Text={content.hero_btn1_text || 'انضم إلى المبادرة'}
        btn2Text={content.hero_btn2_text || 'تصفح تطبيق أنيقة'}
        heroImage={content.hero_image || '/images/Hero.png'}
      />
      <NewStatsSection title={content.stats_title || 'مؤشرات المبادرة'} />
      <Suspense fallback={
        <div className="h-[400px] bg-[#F7F0F8] animate-pulse rounded-2xl mx-6" />
      }>
        <NewSectorsSection title={content.sectors_title || 'قطاعاتنا المستهدفة'} sectors={sectors} />
      </Suspense>
    </>
  )
}
