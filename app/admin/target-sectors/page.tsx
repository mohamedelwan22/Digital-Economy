'use client'

import { useState, useEffect, useRef } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2, Save, X, Upload } from 'lucide-react'
import ContentEditor from '@/components/admin/ContentEditor'

interface Sector {
  id: string
  name: string
  description: string
  icon: string
  image: string
  fullDescription: string
  stats: string
  ctaText: string
  order: number
  isActive: boolean
}

const defaultStats = '[{"label":"","value":""}]'

const textFields = [
  { key: 'sectors_title', label: 'عنوان القطاعات', type: 'text' as const },
  { key: 'sectors_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
]

export default function AdminTargetSectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [editing, setEditing] = useState<Sector | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [saveError, setSaveError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/sectors').then((r) => r.json()).then(setSectors)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القطاع؟')) return
    await fetch(`/api/sectors?id=${id}`, { method: 'DELETE' })
    setSectors((prev) => prev.filter((s) => s.id !== id))
  }

  const openEdit = (sector: Sector) => {
    setEditing({ ...sector })
    setShowForm(true)
  }

  const openAdd = () => {
    setEditing({
      id: '', name: '', description: '', icon: 'Scissors', image: '',
      fullDescription: '', stats: defaultStats, ctaText: '',
      order: sectors.length + 1, isActive: true,
    })
    setShowForm(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    setUploadError('')
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (res.ok && data.url) {
      setEditing({ ...editing, image: data.url })
      e.target.value = ''
    } else {
      setUploadError(data.error || 'فشل رفع الصورة')
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setSaveError('')
    const body = { ...editing }
    let res
    if (body.id) {
      res = await fetch('/api/sectors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      const { id, ...data } = body
      res = await fetch('/api/sectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'فشل الحفظ' }))
      setSaveError(err.error || 'فشل الحفظ')
      setSaving(false)
      return
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setShowForm(false)
    setEditing(null)
    const sectorsRes = await fetch('/api/sectors')
    setSectors(await sectorsRes.json())
  }

  return (
    <div dir="rtl">
      <div className="mb-6">
        <ContentEditor title="القطاعات المستهدفة" fields={textFields} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-arabic font-bold text-xl text-text-primary">إدارة بطاقات القطاعات</h2>
        <Button variant="primary" size="sm" onClick={openAdd}>
          <Plus size={18} /> إضافة قطاع
        </Button>
      </div>

      {showForm && editing && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-arabic font-bold text-lg text-text-primary">
              {editing.id ? 'تعديل القطاع' : 'إضافة قطاع جديد'}
            </h3>
            <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الاسم</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الأيقونة</label>
                <input type="text" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الوصف المختصر</label>
              <textarea rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none" />
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الوصف الكامل</label>
              <textarea rows={3} value={editing.fullDescription} onChange={(e) => setEditing({ ...editing, fullDescription: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none" />
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الصورة</label>
              <div className="flex items-center gap-3">
                <input type="text" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-bg-secondary text-text-primary hover:bg-gray-100 transition-colors">
                  <Upload size={18} />
                  {uploading ? '...' : 'رفع'}
                </button>
              </div>
              {uploadError && (
                <p className="text-red-500 text-sm mt-1">{uploadError}</p>
              )}
              {editing.image && (
                <img src={editing.image} alt="معاينة" className="mt-2 h-24 w-auto rounded-lg border border-border object-cover" />
              )}
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الإحصائيات (JSON)</label>
              <textarea rows={4} value={editing.stats} onChange={(e) => setEditing({ ...editing, stats: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none font-mono text-sm" />
              <p className="text-text-muted text-xs mt-1">{String.raw`مثال: [{"label":"منشأة","value":"+25,000"},{"label":"عميل","value":"1M+"}]`}</p>
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">نص زر CTA (اختياري)</label>
              <input type="text" value={editing.ctaText} onChange={(e) => setEditing({ ...editing, ctaText: e.target.value })}
                placeholder="مثال: سجّل الآن"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الترتيب</label>
                <input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                  <span className="font-arabic text-sm font-bold text-text-primary">نشط</span>
                </label>
              </div>
            </div>
            {saveError && (
              <p className="text-red-500 text-sm">{saveError}</p>
            )}
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ'}
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectors.map((sector) => (
          <Card key={sector.id} className="flex items-center justify-between">
            <div className="min-w-0 flex-1 flex items-center gap-3">
              {sector.image && (
                <img src={sector.image} alt={sector.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="min-w-0">
                <h3 className="font-arabic font-bold text-text-primary truncate">{sector.name}</h3>
                <p className="font-arabic text-sm text-text-secondary truncate">{sector.description}</p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-arabic ${sector.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {sector.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                  <span className="text-xs text-text-muted font-arabic">ترتيب: {sector.order}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 mr-3">
              <button onClick={() => openEdit(sector)} className="p-2 rounded-lg hover:bg-primary-bg text-primary">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(sector.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
        {sectors.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="font-arabic text-text-muted">لا توجد قطاعات بعد. أضف أول قطاع بالضغط على "إضافة قطاع".</p>
          </div>
        )}
      </div>
    </div>
  )
}
