'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Save, User, Shield } from 'lucide-react'
import Image from 'next/image'

const settingsFields = [
  { key: 'site_name', label: 'اسم المبادرة', type: 'text' },
  { key: 'site_email', label: 'البريد الإلكتروني الرسمي', type: 'text' },
  { key: 'site_status', label: 'حالة الموقع', type: 'select', options: ['active', 'maintenance'] },
  { key: 'site_description', label: 'وصف الموقع (SEO)', type: 'textarea' },
  { key: 'site_keywords', label: 'الكلمات المفتاحية (SEO)', type: 'textarea' },
  { key: 'site_favicon', label: 'أيقونة الموقع (Favicon)', type: 'image' },
]

export default function AdminSettingsPage() {
  const { data: session, update: sessionUpdate } = useSession()
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminPasswordConfirm, setAdminPasswordConfirm] = useState('')
  const [adminSaving, setAdminSaving] = useState(false)
  const [adminSaved, setAdminSaved] = useState(false)
  const [adminError, setAdminError] = useState('')

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        settingsFields.forEach((f) => { if (!map[f.key]) map[f.key] = '' })
        setContent(map)
      })
  }, [])

  useEffect(() => {
    if (session?.user) {
      setAdminName(session.user.name || '')
      setAdminEmail(session.user.email || '')
    }
  }, [session])

  const handleSave = useCallback(async () => {
    setSaving(true)
    const updates = settingsFields.map((f) => ({ key: f.key, value: content[f.key] || '' }))
    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [content])

  const handleImageUpload = useCallback(async (key: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) {
      setContent((prev) => ({ ...prev, [key]: data.url }))
    }
  }, [])

  const handleAdminSave = useCallback(async () => {
    setAdminError('')
    setAdminSaving(true)

    if (adminPassword && adminPassword.length < 8) {
      setAdminError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      setAdminSaving(false)
      return
    }

    if (adminPassword && adminPassword !== adminPasswordConfirm) {
      setAdminError('كلمتا المرور غير متطابقتين')
      setAdminSaving(false)
      return
    }

    const body: Record<string, string> = {}
    if (adminName.trim()) body.name = adminName.trim()
    if (adminEmail.trim()) body.email = adminEmail.trim()
    if (adminPassword) body.newPassword = adminPassword

    const res = await fetch('/api/admin/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json()
      setAdminError(err.error || 'حدث خطأ')
      setAdminSaving(false)
      return
    }

    await sessionUpdate({ name: adminName.trim(), email: adminEmail.trim() })

    setAdminSaving(false)
    setAdminSaved(true)
    setAdminPassword('')
    setAdminPasswordConfirm('')
    setTimeout(() => setAdminSaved(false), 3000)
  }, [adminName, adminEmail, adminPassword, adminPasswordConfirm, sessionUpdate])

  return (
    <div dir="rtl">
      <h1 className="font-arabic font-bold text-2xl text-text-primary mb-6">الإعدادات</h1>

      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center">
            <User size={22} className="text-primary" />
          </div>
          <h2 className="font-arabic font-bold text-lg text-text-primary">إعدادات المدير</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-arabic text-sm font-bold text-text-primary mb-1">الاسم</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block font-arabic text-sm font-bold text-text-primary mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="اتركه فارغاً إذا لم ترد التغيير"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={adminPasswordConfirm}
                onChange={(e) => setAdminPasswordConfirm(e.target.value)}
                placeholder="أعد إدخال كلمة المرور الجديدة"
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          {adminError && (
            <p className="text-red-500 text-sm font-arabic">{adminError}</p>
          )}
          <Button variant="primary" onClick={handleAdminSave} disabled={adminSaving}>
            <Save size={18} /> {adminSaving ? 'جاري الحفظ...' : adminSaved ? 'تم الحفظ ✓' : 'حفظ بيانات المدير'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          {settingsFields.map((field) => (
            <div key={field.key}>
              <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={content[field.key] || ''}
                  onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  value={content[field.key] || ''}
                  onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt === 'active' ? 'نشط' : 'صيانة'}</option>
                  ))}
                </select>
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
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
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
            <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ الإعدادات'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
