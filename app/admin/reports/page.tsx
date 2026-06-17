'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'
import ContentEditor from '@/components/admin/ContentEditor'

interface Conference {
  id: string
  title: string
  description: string
  icon: string
  image: string
  value: string
  label: string
  order: number
  isActive: boolean
}

const textFields = [
  { key: 'reports_title', label: 'العنوان', type: 'text' as const },
  { key: 'reports_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
]

export default function AdminReportsPage() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [editing, setEditing] = useState<Conference | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/conferences').then((r) => r.json()).then(setConferences)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    await fetch(`/api/conferences?id=${id}`, { method: 'DELETE' })
    setConferences((prev) => prev.filter((c) => c.id !== id))
  }

  const openEdit = (conference: Conference) => {
    setEditing(conference)
    setShowForm(true)
  }

  const openAdd = () => {
    setEditing({ id: '', title: '', description: '', icon: 'TrendingUp', image: '', value: '', label: '', order: conferences.length + 1, isActive: true })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const body = { ...editing }
    if (body.id) {
      await fetch('/api/conferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      const { id, ...data } = body
      await fetch('/api/conferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setShowForm(false)
    setEditing(null)
    const res = await fetch('/api/conferences')
    setConferences(await res.json())
  }

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">المؤشرات والتقارير</h1>

      <div className="mb-6">
        <ContentEditor title="" fields={textFields} />
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-arabic font-bold text-lg text-text-primary">إدارة المؤشرات</h2>
          <Button variant="primary" size="sm" onClick={openAdd}>
            <Plus size={18} /> إضافة مؤتمر
          </Button>
        </div>

        {showForm && editing && (
          <div className="mb-4 p-4 border border-border rounded-lg bg-bg-secondary">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-arabic font-bold text-text-primary">{editing.id ? 'تعديل' : 'إضافة'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">العنوان</label>
                  <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الأيقونة</label>
                  <input type="text" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm" />
                </div>
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الوصف</label>
                <textarea rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">القيمة</label>
                  <input type="text" value={editing.value} onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">النص</label>
                  <input type="text" value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الترتيب</label>
                  <input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
                    <span className="font-arabic text-sm font-bold text-text-primary">نشط</span>
                  </label>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
                <Save size={16} /> {saving ? '...' : saved ? '✓' : 'حفظ'}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {conferences.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="font-arabic font-bold text-text-primary text-sm">{c.title}</p>
                <p className="font-arabic text-xs text-text-secondary">{c.label}: {c.value}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-primary-bg text-primary">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {conferences.length === 0 && (
            <p className="font-arabic text-text-muted text-center py-4">لا توجد مؤتمرات بعد</p>
          )}
        </div>
      </Card>
    </div>
  )
}
