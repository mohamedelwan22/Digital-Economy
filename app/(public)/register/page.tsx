'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'

const step1Schema = z.object({
  name: z.string().min(1, 'اسم المنشأة مطلوب'),
  sector: z.string().min(1, 'القطاع مطلوب'),
  city: z.string().min(1, 'المدينة مطلوبة'),
  address: z.string().optional(),
})

const step2Schema = z.object({
  ownerName: z.string().min(1, 'اسم المالكة مطلوب'),
  phone: z.string().min(1, 'رقم الجوال مطلوب'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  commercialRegister: z.string().optional(),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>

const defaultSteps = ['معلومات المنشأة', 'معلومات المالكة', 'الوثائق']

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [submitted, setSubmitted] = useState(false)
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

  const steps = [
    content.register_step1_title || defaultSteps[0],
    content.register_step2_title || defaultSteps[1],
    content.register_step3_title || defaultSteps[2],
  ]

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema) })
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema) })

  const handleStep1 = (data: Step1Data) => {
    setStep1Data(data)
    setStep(2)
  }

  const handleStep2 = async (data: Step2Data) => {
    const payload = { ...step1Data, ...data }
    await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-20" dir="rtl">
        <div className="container-global max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="font-arabic font-bold text-2xl md:text-3xl text-text-primary mb-3">{content.register_success_title || 'تم التسجيل بنجاح!'}</h2>
          <p className="text-text-secondary font-arabic text-base md:text-lg mb-6 leading-relaxed">
            {content.register_success_desc || 'شكراً لتسجيلك في مبادرة الاقتصاد الرقمي. سيتم مراجعة طلبك والتواصل معك قريباً.'}
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            {content.register_btn_back || 'العودة للرئيسية'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 md:py-20 bg-bg-secondary" dir="rtl">
      <div className="container-global max-w-2xl">
        <SectionTitle
          title={content.register_title || 'التسجيل في المبادرة'}
          subtitle={content.register_subtitle || 'انضمي إلى منظومة الاقتصاد الرقمي للخدمات النسائية'}
        />

        <div className="flex items-center gap-2 mb-8 justify-center flex-wrap">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-arabic font-bold flex-shrink-0 ${
                step > i + 1 ? 'bg-green-500 text-white' :
                step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`font-arabic text-sm ${step === i + 1 ? 'font-bold text-primary' : 'text-text-secondary'}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="w-6 md:w-8 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        <Card>
          {step === 1 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1)} className="space-y-4">
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">اسم المنشأة *</label>
                <input {...step1Form.register('name')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                {step1Form.formState.errors.name && <p className="text-red-500 text-sm mt-1 font-arabic">{step1Form.formState.errors.name.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">القطاع *</label>
                <select {...step1Form.register('sector')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary">
                  <option value="">اختر القطاع</option>
                  <option value="الصالونات النسائية">الصالونات النسائية</option>
                  <option value="مراكز اللياقة النسائية">مراكز اللياقة النسائية</option>
                  <option value="عيادات ومراكز التجميل">عيادات ومراكز التجميل</option>
                  <option value="الدورات التدريبية">الدورات التدريبية</option>
                  <option value="المؤتمرات والمعارض">المؤتمرات والمعارض</option>
                </select>
                {step1Form.formState.errors.sector && <p className="text-red-500 text-sm mt-1 font-arabic">{step1Form.formState.errors.sector.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">المدينة *</label>
                <input {...step1Form.register('city')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                {step1Form.formState.errors.city && <p className="text-red-500 text-sm mt-1 font-arabic">{step1Form.formState.errors.city.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">العنوان</label>
                <input {...step1Form.register('address')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div />
                <Button type="submit" variant="primary">{content.register_btn_next || 'التالي'}</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={step2Form.handleSubmit(handleStep2)} className="space-y-4">
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">اسم المالكة *</label>
                <input {...step2Form.register('ownerName')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                {step2Form.formState.errors.ownerName && <p className="text-red-500 text-sm mt-1 font-arabic">{step2Form.formState.errors.ownerName.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">رقم الجوال *</label>
                <input {...step2Form.register('phone')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                {step2Form.formState.errors.phone && <p className="text-red-500 text-sm mt-1 font-arabic">{step2Form.formState.errors.phone.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">البريد الإلكتروني *</label>
                <input type="email" {...step2Form.register('email')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
                {step2Form.formState.errors.email && <p className="text-red-500 text-sm mt-1 font-arabic">{step2Form.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="block font-arabic text-sm font-bold text-text-primary mb-1">رقم السجل التجاري</label>
                <input {...step2Form.register('commercialRegister')} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:border-primary" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <Button type="button" variant="ghost" className="text-primary" onClick={() => setStep(1)}>{content.register_btn_prev || 'السابق'}</Button>
                <Button type="submit" variant="primary">{content.register_btn_submit || 'إرسال الطلب'}</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
