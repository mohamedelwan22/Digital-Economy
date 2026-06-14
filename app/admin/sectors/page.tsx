'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Sector {
  id: string
  name: string
  description: string
  icon: string
  image: string
  order: number
  isActive: boolean
}

export default function AdminSectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [editing, setEditing] = useState<Sector | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/sectors').then((r) => r.json()).then(setSectors)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القطاع؟')) return
    await fetch(`/api/sectors?id=${id}`, { method: 'DELETE' })
    setSectors((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-arabic font-bold text-2xl text-text-primary">إدارة القطاعات</h1>
        <Button variant="primary" size="sm" onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus size={18} /> إضافة قطاع
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectors.map((sector) => (
          <Card key={sector.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-arabic font-bold text-text-primary">{sector.name}</h3>
              <p className="font-arabic text-sm text-text-secondary">{sector.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-primary-bg text-primary">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(sector.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
