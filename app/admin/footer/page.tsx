'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'footer_email', label: 'البريد الإلكتروني', type: 'text' as const },
  { key: 'footer_phone', label: 'رقم الهاتف', type: 'text' as const },
  { key: 'footer_location', label: 'الموقع', type: 'text' as const },
  { key: 'footer_copyright', label: 'نص الحقوق', type: 'text' as const },
  { key: 'footer_contact_title', label: 'عنوان قسم التواصل', type: 'text' as const },
  { key: 'footer_social_title', label: 'عنوان قسم التواصل الاجتماعي', type: 'text' as const },
  { key: 'footer_newsletter_title', label: 'عنوان النشرة البريدية', type: 'text' as const },
  { key: 'footer_newsletter_placeholder', label: 'نص الحقل', type: 'text' as const },
  { key: 'footer_newsletter_btn', label: 'نص زر الاشتراك', type: 'text' as const },
  { key: 'logo_title', label: 'نص الشعار (السطر الأول)', type: 'text' as const },
  { key: 'logo_subtitle', label: 'نص الشعار (السطر الثاني)', type: 'text' as const },
  { key: 'logo_image', label: 'صورة الشعار', type: 'image' as const },
]

export default function AdminFooterPage() {
  return <ContentEditor title="الـ Footer" fields={fields} />
}
