'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { TrendingUp, GraduationCap, MapPin, Building2, Store, Download } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, GraduationCap, MapPin, Building2, Store,
}

interface Conference {
  id: string
  title: string
  description: string
  icon: string
  value: string
  label: string
  order: number
  isActive: boolean
}

export default function ReportsPage() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [conferences, setConferences] = useState<Conference[]>([])

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        setContent(map)
      })
    fetch('/api/conferences')
      .then((r) => r.json())
      .then((data) => setConferences(data.filter((c: Conference) => c.isActive !== false)))
  }, [])

  const activeConferences = conferences.filter((c) => c.isActive !== false)

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.reports_title || 'المؤشرات والتقارير'}
          subtitle={content.reports_subtitle || 'مؤشرات الأداء الرئيسية للمبادرة'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeConferences.map((conf) => {
            const Icon = iconMap[conf.icon] || TrendingUp
            return (
              <Card key={conf.id} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-bg flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <p className="font-numbers font-black text-3xl md:text-4xl text-primary">{conf.value}</p>
                <p className="font-arabic text-text-secondary mt-2">{conf.label}</p>
                {conf.title && (
                  <h3 className="font-arabic font-bold text-text-primary mt-3">{conf.title}</h3>
                )}
                {conf.description && (
                  <p className="font-arabic text-sm text-text-secondary mt-1">{conf.description}</p>
                )}
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
