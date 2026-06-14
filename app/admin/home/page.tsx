'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const tabs = ['hero', 'stats', 'sectors']

const tabLabels: Record<string, string> = {
  hero: 'Hero',
  stats: 'الإحصائيات',
  sectors: 'القطاعات',
}

const heroFields = [
  { key: 'hero_title', label: 'العنوان الرئيسي', type: 'text' },
  { key: 'hero_subtitle', label: 'العنوان الثانوي', type: 'text' },
  { key: 'hero_badge', label: 'الوسام (Badge)', type: 'text' },
  { key: 'hero_description', label: 'الوصف', type: 'textarea' },
  { key: 'hero_btn1_text', label: 'نص الزر الأول', type: 'text' },
  { key: 'hero_btn2_text', label: 'نص الزر الثاني', type: 'text' },
  { key: 'hero_image', label: 'صورة الهيرو', type: 'image' },
]

const statsFields = [
  { key: 'stats_title', label: 'عنوان قسم الإحصائيات', type: 'text' },
  { key: 'stats_subtitle', label: 'العنوان الفرعي للإحصائيات', type: 'text' },
]

const sectorsFields = [
  { key: 'sectors_title', label: 'عنوان قسم القطاعات', type: 'text' },
  { key: 'sectors_subtitle', label: 'العنوان الفرعي للقطاعات', type: 'text' },
]

const tabFields: Record<string, { key: string; label: string; type: string }[]> = {
  hero: heroFields,
  stats: statsFields,
  sectors: sectorsFields,
}

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState('hero')
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        setContent(map)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const fields = tabFields[activeTab]
    const updates = fields.map((f) => ({ key: f.key, value: content[f.key] || '' }))

    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    })

    setSaving(false)
  }

  const handleImageUpload = async (key: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      setContent({ ...content, [key]: data.url })
    }
  }

  const fields = tabFields[activeTab]

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-arabic font-bold text-2xl text-text-primary">تعديل الرئيسية</h1>
        <Button variant="secondary" size="sm" onClick={() => window.open('/', '_blank')}>
          معاينة الموقع
        </Button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-arabic font-bold text-sm transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-primary-bg'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <Card>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={content[field.key] || ''}
                  onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none"
                />
              ) : field.type === 'image' ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content[field.key] || ''}
                    onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                    placeholder="رابط الصورة"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(field.key, file)
                    }}
                    className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-bg file:text-primary file:font-arabic file:font-bold hover:file:bg-primary/10"
                  />
                  {content[field.key] && (
                    <img src={content[field.key]} alt="" className="w-32 h-32 object-cover rounded-lg border border-border" />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={content[field.key] || ''}
                  onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                />
              )}
            </div>
          ))}
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
