import { getContentMulti } from '@/lib/content'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Target, Eye, Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const content = await getContentMulti([
    'about_title', 'about_subtitle', 'about_description',
    'about_mission_title', 'about_mission_desc',
    'about_vision_title', 'about_vision_desc',
    'about_values_title', 'about_values_desc',
  ])

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.about_title || 'عن المبادرة'}
          subtitle={content.about_subtitle || 'تعرفي على مبادرة الاقتصاد الرقمي لقطاع الخدمات النسائية'}
        />

        <div className="max-w-3xl mx-auto mb-14 md:mb-16">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-arabic text-center">
            {content.about_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <div className="w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target size={32} className="text-primary" />
            </div>
            <h3 className="font-arabic font-bold text-xl text-text-primary mb-3">{content.about_mission_title || 'الرسالة'}</h3>
            <p className="text-text-secondary font-arabic text-sm leading-relaxed">
              {content.about_mission_desc}
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye size={32} className="text-primary" />
            </div>
            <h3 className="font-arabic font-bold text-xl text-text-primary mb-3">{content.about_vision_title || 'الرؤية'}</h3>
            <p className="text-text-secondary font-arabic text-sm leading-relaxed">
              {content.about_vision_desc}
            </p>
          </Card>

          <Card className="text-center">
            <div className="w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-primary" />
            </div>
            <h3 className="font-arabic font-bold text-xl text-text-primary mb-3">{content.about_values_title || 'القيم'}</h3>
            <p className="text-text-secondary font-arabic text-sm leading-relaxed">
              {content.about_values_desc}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
