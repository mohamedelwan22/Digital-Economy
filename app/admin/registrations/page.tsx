'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Search, Trash2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Registration {
  id: string
  name: string
  ownerName: string
  phone: string
  email: string
  sector: string
  city: string
  address?: string
  commercialRegister?: string
  status: string
  createdAt: string
}

const PAGE_SIZE = 10

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Registration | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/businesses').then((r) => r.json()).then(setRegistrations)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التسجيل؟')) return
    await fetch(`/api/businesses?id=${id}`, { method: 'DELETE' })
    setRegistrations((prev) => prev.filter((r) => r.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = registrations.filter((r) =>
    r.name.includes(search) || r.ownerName.includes(search) || r.email.includes(search) || r.sector.includes(search) || r.city.includes(search) || (r.address && r.address.includes(search))
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [search])

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">التسجيلات</h1>

      <div className="relative mb-6 max-w-sm">
        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث في التسجيلات..."
          className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الاسم</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">المالكة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">القطاع</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">المدينة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الحالة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">التاريخ</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map((r) => (
                <tr key={r.id} className="border-b border-border/50">
                  <td className="py-3 font-arabic text-text-primary">{r.name}</td>
                  <td className="py-3 font-arabic text-text-secondary">{r.ownerName}</td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{r.sector}</td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{r.city}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-arabic font-bold ${
                      r.status === 'approved' ? 'bg-green-50 text-green-600' :
                      r.status === 'rejected' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {r.status === 'approved' ? 'مقبول' : r.status === 'rejected' ? 'مرفوض' : 'معلّق'}
                    </span>
                  </td>
                  <td className="py-3 font-arabic text-text-secondary text-sm">{new Date(r.createdAt).toLocaleDateString('ar-SA')}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(r)} className="p-1.5 rounded-lg hover:bg-primary-bg text-primary">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center font-arabic text-text-muted">لا توجد تسجيلات</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-primary-bg disabled:opacity-30 disabled:cursor-not-allowed text-primary"
            >
              <ChevronRight size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-arabic font-bold transition-colors ${
                  page === p ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary-bg'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-primary-bg disabled:opacity-30 disabled:cursor-not-allowed text-primary"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
      </Card>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-arabic font-bold text-xl text-text-primary">تفاصيل التسجيل</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-primary-bg text-text-secondary">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'اسم المنشأة', value: selected.name },
                { label: 'المالكة', value: selected.ownerName },
                { label: 'الجوال', value: selected.phone },
                { label: 'البريد', value: selected.email },
                { label: 'القطاع', value: selected.sector },
                { label: 'المدينة', value: selected.city },
                ...(selected.address ? [{ label: 'العنوان', value: selected.address }] : []),
                ...(selected.commercialRegister ? [{ label: 'السجل التجاري', value: selected.commercialRegister }] : []),
                { label: 'الحالة', value: selected.status === 'approved' ? 'مقبول' : selected.status === 'rejected' ? 'مرفوض' : 'معلّق' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between border-b border-border/50 pb-2">
                  <span className="font-arabic text-text-secondary">{item.label}</span>
                  <span className="font-arabic font-bold text-text-primary">{item.value}</span>
                </div>
              ))}
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
