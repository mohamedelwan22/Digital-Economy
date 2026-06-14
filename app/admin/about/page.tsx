'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'about_title', label: 'العنوان', type: 'text' as const },
  { key: 'about_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
  { key: 'about_description', label: 'الوصف', type: 'textarea' as const },
  { key: 'about_mission_title', label: 'عنوان الرسالة', type: 'text' as const },
  { key: 'about_mission_desc', label: 'نص الرسالة', type: 'textarea' as const },
  { key: 'about_vision_title', label: 'عنوان الرؤية', type: 'text' as const },
  { key: 'about_vision_desc', label: 'نص الرؤية', type: 'textarea' as const },
  { key: 'about_values_title', label: 'عنوان القيم', type: 'text' as const },
  { key: 'about_values_desc', label: 'نص القيم', type: 'textarea' as const },
]

export default function AdminAboutPage() {
  return <ContentEditor title="عن المبادرة" fields={fields} />
}
