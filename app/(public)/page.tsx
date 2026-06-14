import { Suspense } from 'react'
import { getContent, getContentMulti } from '@/lib/content'
import NewHeroSection from '@/components/home/NewHeroSection'
import NewStatsSection from '@/components/home/NewStatsSection'
import NewSectorsSection from '@/components/home/NewSectorsSection'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const fallbackSectors = [
  { id: '1', name: 'الصالونات النسائية', description: 'خدمات التجميل والعناية بالشعر والبشرة والأظافر', icon: 'Scissors', image: '', order: 1, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', name: 'مراكز اللياقة النسائية', description: 'برامج رياضية متخصصة لصحة ولياقة المرأة', icon: 'Dumbbell', image: '', order: 2, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', name: 'عيادات ومراكز التجميل', description: 'خدمات تجميلية مرخصة وعناية متخصصة', icon: 'Sparkles', image: '', order: 3, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', name: 'الدورات التدريبية', description: 'تأهيل وتنمية المهارات للكوادر النسائية', icon: 'BookOpen', image: '', order: 4, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', name: 'المؤتمرات والمعارض', description: 'فعاليات ومعارض متخصصة للقطاع النسائي', icon: 'CalendarDays', image: '', order: 5, isActive: true, createdAt: new Date(), updatedAt: new Date() },
]

export default async function HomePage() {
  const content = await getContentMulti([
    'hero_title', 'hero_subtitle', 'hero_badge', 'hero_description',
    'hero_btn1_text', 'hero_btn2_text', 'hero_image',
    'sectors_title', 'stats_title', 'stats_subtitle',
  ])

  let sectors = await prisma.sector.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  if (!sectors || sectors.length === 0) {
    sectors = fallbackSectors
  }

  return (
    <>
      <NewHeroSection
        badge={content.hero_badge || 'مبادرة'}
        title={content.hero_title || 'الاقتصاد الرقمي'}
        subtitle={content.hero_subtitle || 'لقطاع الخدمات النسائية'}
        description={content.hero_description || ''}
        btn1Text={content.hero_btn1_text || 'انضم إلى المبادرة'}
        btn2Text={content.hero_btn2_text || 'تصفح تطبيق آمنة'}
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
