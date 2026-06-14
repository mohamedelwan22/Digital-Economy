'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'register_title', label: 'العنوان', type: 'text' as const },
  { key: 'register_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
  { key: 'register_step1_title', label: 'عنوان الخطوة 1', type: 'text' as const },
  { key: 'register_step2_title', label: 'عنوان الخطوة 2', type: 'text' as const },
  { key: 'register_step3_title', label: 'عنوان الخطوة 3', type: 'text' as const },
  { key: 'register_btn_next', label: 'نص زر التالي', type: 'text' as const },
  { key: 'register_btn_prev', label: 'نص زر السابق', type: 'text' as const },
  { key: 'register_btn_submit', label: 'نص زر الإرسال', type: 'text' as const },
  { key: 'register_btn_back', label: 'نص زر العودة', type: 'text' as const },
  { key: 'register_success_title', label: 'عنوان النجاح', type: 'text' as const },
  { key: 'register_success_desc', label: 'وصف النجاح', type: 'textarea' as const },
]

export default function AdminRegisterPagePage() {
  return <ContentEditor title="التسجيل في المبادرة" fields={fields} />
}
