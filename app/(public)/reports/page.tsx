import { getContentMulti } from '@/lib/content'
import { prisma } from '@/lib/db'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { TrendingUp, GraduationCap, MapPin, Building2, Store, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, GraduationCap, MapPin, Building2, Store,
}

export default async function ReportsPage() {
  const content = await getContentMulti(['reports_title', 'reports_subtitle', 'reports_download_btn'])
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.reports_title || 'المؤشرات والتقارير'}
          subtitle={content.reports_subtitle || 'مؤشرات الأداء الرئيسية للمبادرة'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || TrendingUp
            return (
              <Card key={stat.id} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-bg flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <p className="font-numbers font-black text-3xl md:text-4xl text-primary">{stat.value}</p>
                <p className="font-arabic text-text-secondary mt-2">{stat.label}</p>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-arabic font-bold hover:bg-primary-dark transition-colors">
            <Download size={20} />
            {content.reports_download_btn || 'تحميل التقرير الكامل (PDF)'}
          </button>
        </div>
      </div>
    </div>
  )
}
