'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check, X, Eye } from 'lucide-react'

interface Business {
  id: string
  name: string
  ownerName: string
  phone: string
  email: string
  sector: string
  city: string
  status: string
  createdAt: string
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Business | null>(null)

  useEffect(() => {
    fetch('/api/businesses').then((r) => r.json()).then(setBusinesses)
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/businesses`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const filtered = filter === 'all' ? businesses : businesses.filter((b) => b.status === filter)

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">المنشآت المسجلة</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['all', 'pending', 'approved', 'rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-arabic text-sm font-bold transition-colors ${
              filter === f ? 'bg-primary text-white' : 'bg-white text-text-secondary border border-border'
            }`}
          >
            {f === 'all' ? 'الكل' : f === 'pending' ? 'معلّق' : f === 'approved' ? 'مقبول' : 'مرفوض'}
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الاسم</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">القطاع</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">المدينة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الحالة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">التاريخ</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
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
                  <td className="py-3 font-arabic text-text-secondary text-sm">
                    {new Date(b.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(b)} className="p-1.5 rounded-lg hover:bg-primary-bg text-primary">
                        <Eye size={16} />
                      </button>
                      {b.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(b.id, 'approved')} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600">
                            <Check size={16} />
                          </button>
                          <button onClick={() => updateStatus(b.id, 'rejected')} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-arabic font-bold text-xl text-text-primary mb-4">تفاصيل المنشأة</h3>
            <div className="space-y-3">
              {[
                { label: 'الاسم', value: selected.name },
                { label: 'المالكة', value: selected.ownerName },
                { label: 'الجوال', value: selected.phone },
                { label: 'البريد', value: selected.email },
                { label: 'القطاع', value: selected.sector },
                { label: 'المدينة', value: selected.city },
                { label: 'الحالة', value: selected.status },
              ].map((item) => (
                <div key={item.label} className="flex justify-between border-b border-border/50 pb-2">
                  <span className="font-arabic text-text-secondary">{item.label}</span>
                  <span className="font-arabic font-bold text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="mt-4 w-full py-2 bg-primary text-white rounded-lg font-arabic font-bold">
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
