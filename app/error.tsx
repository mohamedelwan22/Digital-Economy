'use client'

import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.068 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="font-arabic font-bold text-2xl text-text-primary mb-2">حدث خطأ</h2>
        <p className="font-arabic text-text-secondary mb-6">عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</p>
        <Button variant="primary" onClick={reset}>
          إعادة المحاولة
        </Button>
      </div>
    </div>
  )
}
