'use client'

import { useState, useEffect, useCallback } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Save } from 'lucide-react'
import Image from 'next/image'

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image'
}

interface ContentEditorProps {
  title: string
  fields: Field[]
}

export default function ContentEditor({ title, fields }: ContentEditorProps) {
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        fields.forEach((f) => { if (!map[f.key]) map[f.key] = '' })
        setContent(map)
      })
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    const updates = fields.map((f) => ({ key: f.key, value: content[f.key] || '' }))
    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [content, fields])

  const handleImageUpload = useCallback(async (key: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      setContent((prev) => ({ ...prev, [key]: data.url }))
    }
  }, [])

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">{title}</h1>
      <Card>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{field.label}</label>
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
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                      <Image src={content[field.key]} alt="" fill className="object-cover" unoptimized />
                    </div>
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
            <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
