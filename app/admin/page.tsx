import { prisma } from '@/lib/db'
import Card from '@/components/ui/Card'
import { Building2, Clock, Store, Handshake, CheckCircle2, MessageSquare } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [totalBusinesses, pendingBusinesses, approvedBusinesses, activeSectors, totalPartners, totalMessages] = await Promise.all([
    prisma.businessRegistration.count(),
    prisma.businessRegistration.count({ where: { status: 'pending' } }),
    prisma.businessRegistration.count({ where: { status: 'approved' } }),
    prisma.sector.count({ where: { isActive: true } }),
    prisma.partner.count(),
    prisma.contactMessage.count(),
  ])

  const recentBusinesses = await prisma.businessRegistration.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const cards = [
    { label: 'إجمالي المنشآت', value: totalBusinesses, icon: Building2, color: 'bg-blue-50 text-blue-600' },
    { label: 'طلبات معلّقة', value: pendingBusinesses, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'طلبات مقبولة', value: approvedBusinesses, icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
    { label: 'القطاعات النشطة', value: activeSectors, icon: Store, color: 'bg-green-50 text-green-600' },
    { label: 'الشركاء', value: totalPartners, icon: Handshake, color: 'bg-purple-50 text-purple-600' },
    { label: 'الرسائل', value: totalMessages, icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <Card key={card.label} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="font-numbers font-bold text-2xl text-text-primary">{card.value}</p>
              <p className="font-arabic text-sm text-text-secondary">{card.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-arabic font-bold text-lg text-text-primary mb-4">آخر التسجيلات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الاسم</th>
                  <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">القطاع</th>
                  <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">المدينة</th>
                  <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الحالة</th>
                  <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {recentBusinesses.map((b) => (
                  <tr key={b.id} className="border-b border-border/50">
                    <td className="py-3 font-arabic text-text-primary">{b.name}</td>
                    <td className="py-3 font-arabic text-text-secondary">{b.sector}</td>
                    <td className="py-3 font-arabic text-text-secondary">{b.city}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-arabic font-bold ${
                        b.status === 'approved' ? 'bg-green-50 text-green-600' :
                        b.status === 'rejected' ? 'bg-red-50 text-red-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {b.status === 'approved' ? 'مقبول' : b.status === 'rejected' ? 'مرفوض' : 'معلّق'}
                      </span>
                    </td>
                    <td className="py-3 font-arabic text-text-secondary text-sm">{new Date(b.createdAt).toLocaleDateString('ar-SA')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="font-arabic font-bold text-lg text-text-primary mb-4">آخر الرسائل</h2>
          <div className="space-y-3">
            {recentMessages.map((m) => (
              <div key={m.id} className="border-b border-border/50 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-arabic font-bold text-text-primary text-sm">{m.name}</span>
                  <span className="font-arabic text-text-muted text-xs">{new Date(m.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <p className="font-arabic text-text-secondary text-sm truncate">{m.subject}</p>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="font-arabic text-text-muted text-center py-4">لا توجد رسائل</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
