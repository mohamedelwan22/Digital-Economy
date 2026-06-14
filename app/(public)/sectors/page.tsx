import { getContent, getContentMulti } from '@/lib/content'
import { prisma } from '@/lib/db'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, React.ElementType> = {
  Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays,
}

export default async function SectorsPage() {
  const content = await getContentMulti(['sectors_title', 'sectors_subtitle'])
  const sectors = await prisma.sector.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } })

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.sectors_title || 'قطاعاتنا المستهدفة'}
          subtitle={content.sectors_subtitle || 'اكتشفي القطاعات المستفيدة من مبادرة الاقتصاد الرقمي'}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Scissors
            return (
              <Card key={sector.id}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-arabic font-bold text-lg text-text-primary mb-2">{sector.name}</h3>
                    <p className="text-text-secondary text-sm font-arabic leading-relaxed">{sector.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-accent font-arabic font-bold text-sm">المزيد</span>
                  <ArrowLeft size={16} className="text-accent flex-shrink-0" />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
