'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Trash2, Save } from 'lucide-react'

interface Stat {
  id: string
  icon: string
  value: string
  label: string
  order: number
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/stats').then((r) => r.json()).then(setStats)
  }, [])

  const addRow = () => {
    setStats([...stats, { id: '', icon: 'TrendingUp', value: '', label: '', order: stats.length + 1 }])
  }

  const update = (index: number, field: keyof Stat, value: string) => {
    const updated = [...stats]
    updated[index] = { ...updated[index], [field]: value }
    setStats(updated)
  }

  const remove = async (index: number) => {
    const stat = stats[index]
    if (stat.id) {
      await fetch(`/api/stats?id=${stat.id}`, { method: 'DELETE' })
    }
    setStats(stats.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setSaving(true)
    for (const stat of stats) {
      if (stat.id) {
        await fetch('/api/stats', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stat),
        })
      } else {
        const { id, ...data } = stat
        await fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      }
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    const res = await fetch('/api/stats')
    setStats(await res.json())
  }

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-arabic font-bold text-2xl text-text-primary">إدارة الإحصائيات</h1>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ الكل'}
          </Button>
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus size={18} /> إضافة
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الأيقونة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">القيمة</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">النص</th>
                <th className="pb-3 font-arabic font-bold text-text-secondary text-sm">الترتيب</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2">
                    <input value={stat.icon} onChange={(e) => update(i, 'icon', e.target.value)} className="w-32 px-3 py-2 rounded-lg border border-border text-sm" />
                  </td>
                  <td className="py-2">
                    <input value={stat.value} onChange={(e) => update(i, 'value', e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-border text-sm" />
                  </td>
                  <td className="py-2">
                    <input value={stat.label} onChange={(e) => update(i, 'label', e.target.value)} className="w-40 px-3 py-2 rounded-lg border border-border text-sm" />
                  </td>
                  <td className="py-2">
                    <input type="number" value={stat.order} onChange={(e) => update(i, 'order', e.target.value)} className="w-16 px-3 py-2 rounded-lg border border-border text-sm" />
                  </td>
                  <td className="py-2">
                    <button onClick={() => remove(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
