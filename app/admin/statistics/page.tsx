'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react'

interface Statistic {
  id: string
  title: string
  value: string
  order: number
  isActive: boolean
}

export default function AdminStatisticsPage() {
  const [items, setItems] = useState<Statistic[]>([])
  const [editing, setEditing] = useState<Statistic | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/statistics').then((r) => r.json()).then(setItems)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return
    await fetch(`/api/statistics?id=${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((s) => s.id !== id))
  }

  const openEdit = (item: Statistic) => {
    setEditing({ ...item })
    setShowForm(true)
  }

  const openAdd = () => {
    setEditing({ id: '', title: '', value: '', order: items.length + 1, isActive: true })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const body = { ...editing }
    if (body.id) {
      await fetch('/api/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      const { id, ...data } = body
      await fetch('/api/statistics', {
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
    const res = await fetch('/api/statistics')
    setItems(await res.json())
  }

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-arabic font-bold text-2xl text-text-primary">الإحصائيات</h1>
        <Button variant="primary" size="sm" onClick={openAdd}>
          <Plus size={18} /> إضافة
        </Button>
      </div>

      {showForm && editing && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-arabic font-bold text-lg text-text-primary">
              {editing.id ? 'تعديل' : 'إضافة'}
            </h3>
            <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">العنوان</label>
              <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">القيمة / الرقم</label>
              <input type="text" value={editing.value} onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                placeholder="مثال: 25,000+"
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
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ'}
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div className="min-w-0 flex-1 flex items-center gap-4">
              <div className="text-right min-w-0">
                <h3 className="font-arabic font-bold text-text-primary">{item.title}</h3>
                <p className="font-numbers font-black text-lg text-primary">{item.value}</p>
              </div>
              <div className="flex gap-2 mr-auto">
                <span className={`text-xs px-2 py-0.5 rounded-full font-arabic ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {item.isActive ? 'نشط' : 'غير نشط'}
                </span>
                <span className="text-xs text-text-muted font-arabic">ترتيب: {item.order}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 mr-3">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-primary-bg text-primary">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="font-arabic text-text-muted">لا توجد إحصائيات بعد. أضف أول إحصائية.</p>
          </div>
        )}
      </div>
    </div>
  )
}
