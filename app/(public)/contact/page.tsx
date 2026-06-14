'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [content, setContent] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        setContent(map)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSent(true)
  }

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.contact_title || 'تواصل معنا'}
          subtitle={content.contact_subtitle || 'يسعدنا تواصلك مع فريق المبادرة'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-arabic font-bold text-text-primary">{content.contact_email_label || 'البريد الإلكتروني'}</p>
                  <p className="text-text-secondary text-sm font-arabic truncate">{content.contact_email || 'info@women-services-initiative.sa'}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-arabic font-bold text-text-primary">{content.contact_phone_label || 'رقم الهاتف'}</p>
                  <p className="text-text-secondary text-sm font-arabic">{content.contact_phone || '966 5 5555 5555+'}</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-arabic font-bold text-text-primary">الموقع</p>
                  <p className="text-text-secondary text-sm font-arabic">{content.contact_address || 'المملكة العربية السعودية'}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-arabic font-bold text-2xl text-text-primary mb-2">{content.contact_success_title || 'شكراً لتواصلك'}</h3>
                <p className="text-text-secondary font-arabic">{content.contact_success_desc || 'سيتم الرد عليك في أقرب وقت ممكن'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{content.contact_name_label || 'الاسم'}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{content.contact_email_label || 'البريد الإلكتروني'}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{content.contact_phone_label || 'رقم الجوال'}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{content.contact_subject_label || 'الموضوع'}</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block font-arabic text-sm font-bold text-text-primary mb-1">{content.contact_message_label || 'الرسالة'}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full justify-center">
                  <Send size={18} />
                  {content.contact_submit_btn || 'إرسال'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
