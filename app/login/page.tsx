'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('بيانات الدخول غير صحيحة')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F0F8] to-[#EDE0F5] flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <h1 className="font-arabic font-bold text-2xl text-text-primary">تسجيل الدخول</h1>
          <p className="font-arabic text-text-secondary mt-1">لوحة تحكم المبادرة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-arabic text-sm font-bold text-text-primary mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block font-arabic text-sm font-bold text-text-primary mb-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-arabic">{error}</p>}

          <Button type="submit" variant="primary" className="w-full justify-center">
            دخول
          </Button>
        </form>
      </div>
    </div>
  )
}
