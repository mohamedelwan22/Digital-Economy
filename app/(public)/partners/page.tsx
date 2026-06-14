import { getContentMulti } from '@/lib/content'
import { prisma } from '@/lib/db'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Handshake } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PartnersPage() {
  const content = await getContentMulti(['partners_title', 'partners_subtitle'])
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.partners_title || 'الشركاء والداعمون'}
          subtitle={content.partners_subtitle || 'شركاء النجاح والداعمون للمبادرة'}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary-bg flex items-center justify-center mx-auto mb-4">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
                ) : (
                  <Handshake size={40} className="text-primary" />
                )}
              </div>
              <h3 className="font-arabic font-bold text-lg text-text-primary">{partner.name}</h3>
              {partner.url && (
                <a href={partner.url} target="_blank" rel="noopener noreferrer" className="font-arabic text-sm text-primary hover:underline mt-2 inline-block">
                  {partner.url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </Card>
          ))}
          {partners.length === 0 && (
            <div className="col-span-full text-center py-12 font-arabic text-text-muted">لا يوجد شركاء بعد</div>
          )}
        </div>
      </div>
    </div>
  )
}
