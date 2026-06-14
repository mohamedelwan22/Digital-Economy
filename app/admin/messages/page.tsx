'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Search, Trash2, Eye, X } from 'lucide-react'

interface Message {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    fetch('/api/contact').then((r) => r.json()).then(setMessages)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return
    await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = messages.filter((m) =>
    m.name.includes(search) || m.email.includes(search) || m.subject.includes(search) || m.message.includes(search)
  )

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">الرسائل</h1>

      <div className="relative mb-6 max-w-sm">
        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث في الرسائل..."
          className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الاسم</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">البريد</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الموضوع</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">التاريخ</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border/50">
                  <td className="py-3 font-arabic text-text-primary">{m.name}</td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{m.email}</td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{m.subject}</td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{new Date(m.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(m)} className="p-1.5 rounded-lg hover:bg-primary-bg text-primary">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center font-arabic text-text-muted">لا توجد رسائل</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-arabic font-bold text-xl text-text-primary">تفاصيل الرسالة</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-primary-bg text-text-secondary">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="font-arabic text-text-secondary">الاسم</span>
                <span className="font-arabic font-bold text-text-primary">{selected.name}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="font-arabic text-text-secondary">البريد</span>
                <span className="font-arabic text-text-primary">{selected.email}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="font-arabic text-text-secondary">الجوال</span>
                <span className="font-arabic text-text-primary">{selected.phone}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="font-arabic text-text-secondary">الموضوع</span>
                <span className="font-arabic font-bold text-text-primary">{selected.subject}</span>
              </div>
              <div className="border-b border-border/50 pb-2">
                <span className="block font-arabic text-text-secondary mb-1">الرسالة</span>
                <p className="font-arabic text-text-primary leading-relaxed">{selected.message}</p>
              </div>
              <div className="flex justify-between">
                <span className="font-arabic text-text-secondary">التاريخ</span>
                <span className="font-arabic text-text-secondary text-sm">{new Date(selected.createdAt).toLocaleString('ar-SA')}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" className="flex-1 justify-center" onClick={() => setSelected(null)}>إغلاق</Button>
              <Button variant="ghost" className="flex-1 justify-center text-red-500 border border-red-200 hover:bg-red-50" onClick={() => { handleDelete(selected.id); setSelected(null) }}>
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
