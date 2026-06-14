'use client'

import ContentEditor from '@/components/admin/ContentEditor'

const fields = [
  { key: 'sectors_title', label: 'عنوان القطاعات', type: 'text' as const },
  { key: 'sectors_subtitle', label: 'العنوان الفرعي', type: 'text' as const },
]

export default function AdminTargetSectorsPage() {
  return <ContentEditor title="القطاعات المستهدفة" fields={fields} />
}
