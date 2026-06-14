'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2, Handshake, X } from 'lucide-react'

interface Partner {
  id: string
  name: string
  logo: string
  url: string | null
  isActive: boolean
  order: number
}

const defaultPartner: Partial<Partner> = { name: '', logo: '', url: '', isActive: true, order: 0 }

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Partial<Partner>>(defaultPartner)
  const [activeTab, setActiveTab] = useState<'crud' | 'content'>('crud')
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/partners').then((r) => r.json()).then(setPartners)
    fetch('/api/content').then((r) => r.json()).then((data) => {
      const map: Record<string, string> = {}
      data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
      setContent(map)
    })
  }, [])

  const handleSave = async () => {
    if (!editing.name) return
    const method = editing.id ? 'PUT' : 'POST'
    await fetch('/api/partners', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setShowForm(false)
    setEditing(defaultPartner)
    const res = await fetch('/api/partners')
    setPartners(await res.json())
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الشريك؟')) return
    await fetch(`/api/partners?id=${id}`, { method: 'DELETE' })
    setPartners((prev) => prev.filter((p) => p.id !== id))
  }

  const handleContentSave = async () => {
    setSaving(true)
    const contentFields = [
      { key: 'partners_title', value: content.partners_title || '' },
      { key: 'partners_subtitle', value: content.partners_subtitle || '' },
    ]
    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates: contentFields }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-arabic font-bold text-2xl text-text-primary">إدارة الشركاء</h1>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('crud')}
          className={`px-5 py-2 rounded-lg font-arabic font-bold text-sm transition-colors ${activeTab === 'crud' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary-bg'}`}
        >
          قائمة الشركاء
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-5 py-2 rounded-lg font-arabic font-bold text-sm transition-colors ${activeTab === 'content' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary-bg'}`}
        >
          محتوى القسم
        </button>
      </div>

      {activeTab === 'crud' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div />
            <Button variant="primary" size="sm" onClick={() => { setEditing(defaultPartner); setShowForm(true) }}>
              <Plus size={18} /> إضافة شريك
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p) => (
              <Card key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center">
                    <Handshake size={24} className="text-primary" />
                  </div>
                  <div>
                    <span className="font-arabic font-bold text-text-primary">{p.name}</span>
                    {p.url && <p className="font-arabic text-xs text-text-muted mt-0.5">{p.url}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(p); setShowForm(true) }} className="p-1.5 rounded-lg hover:bg-primary-bg text-primary">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            ))}
            {partners.length === 0 && (
              <div className="col-span-full text-center py-12 font-arabic text-text-muted">لا يوجد شركاء بعد</div>
            )}
          </div>
        </>
      )}

      {activeTab === 'content' && (
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">عنوان القسم</label>
              <input
                type="text"
                value={content.partners_title || ''}
                onChange={(e) => setContent({ ...content, partners_title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">العنوان الفرعي</label>
              <input
                type="text"
                value={content.partners_subtitle || ''}
                onChange={(e) => setContent({ ...content, partners_subtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <Button variant="primary" onClick={handleContentSave} disabled={saving}>
              {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
            </Button>
          </div>
        </Card>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-arabic font-bold text-xl text-text-primary">{editing.id ? 'تعديل شريك' : 'إضافة شريك'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-primary-bg text-text-secondary">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الاسم</label>
                <input type="text" value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الرابط</label>
                <input type="url" value={editing.url || ''} onChange={(e) => setEditing({ ...editing, url: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={editing.isActive ?? true} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4 rounded border-border text-primary" />
                <label htmlFor="isActive" className="font-arabic text-sm text-text-primary">نشط</label>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1 justify-center" onClick={handleSave}>حفظ</Button>
                <Button variant="ghost" className="flex-1 justify-center" onClick={() => setShowForm(false)}>إلغاء</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
