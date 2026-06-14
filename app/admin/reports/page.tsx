'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'reports_title', label: 'العنوان', type: 'text' as const },
  { key: 'reports_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
  { key: 'reports_download_btn', label: 'نص زر التحميل', type: 'text' as const },
]

export default function AdminReportsPage() {
  return <ContentEditor title="المؤتمرات والتقارير" fields={fields} />
}
