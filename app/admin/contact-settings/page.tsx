'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'contact_title', label: 'العنوان', type: 'text' as const },
  { key: 'contact_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
  { key: 'contact_email', label: 'البريد الإلكتروني', type: 'text' as const },
  { key: 'contact_phone', label: 'رقم الهاتف', type: 'text' as const },
  { key: 'contact_address', label: 'العنوان', type: 'text' as const },
  { key: 'contact_form_title', label: 'عنوان النموذج', type: 'text' as const },
  { key: 'contact_name_label', label: 'تسمية حقل الاسم', type: 'text' as const },
  { key: 'contact_email_label', label: 'تسمية حقل البريد', type: 'text' as const },
  { key: 'contact_phone_label', label: 'تسمية حقل الجوال', type: 'text' as const },
  { key: 'contact_subject_label', label: 'تسمية حقل الموضوع', type: 'text' as const },
  { key: 'contact_message_label', label: 'تسمية حقل الرسالة', type: 'text' as const },
  { key: 'contact_submit_btn', label: 'نص زر الإرسال', type: 'text' as const },
  { key: 'contact_success_title', label: 'عنوان النجاح', type: 'text' as const },
  { key: 'contact_success_desc', label: 'وصف النجاح', type: 'textarea' as const },
]

export default function AdminContactSettingsPage() {
  return <ContentEditor title="التواصل معنا" fields={fields} />
}
