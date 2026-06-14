import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <h1 className="font-numbers font-black text-8xl text-primary mb-4">404</h1>
        <h2 className="font-arabic font-bold text-2xl text-text-primary mb-2">الصفحة غير موجودة</h2>
        <p className="font-arabic text-text-secondary mb-6">عذراً، الصفحة التي تبحث عنها غير متوفرة.</p>
        <Link href="/">
          <Button variant="primary">العودة للرئيسية</Button>
        </Link>
      </div>
    </div>
  )
}
