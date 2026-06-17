'use client'

import { useState, useEffect } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays, ArrowLeft, X } from 'lucide-react'
import Image from 'next/image'

const iconMap: Record<string, React.ElementType> = {
  Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays,
}

const images: Record<string, string> = {
  Scissors: '/images/sectors/salon.jpg',
  Dumbbell: '/images/sectors/fitness.jpg',
  Sparkles: '/images/sectors/beauty.jpg',
  BookOpen: '/images/sectors/training.jpg',
  CalendarDays: '/images/sectors/events.jpg',
}

interface Sector {
  id: string
  name: string
  description: string
  icon: string
  image: string
  fullDescription: string
  stats: string
  ctaText: string
  order: number
  isActive: boolean
}

function SectorModal({ sector, onClose }: { sector: Sector; onClose: () => void }) {
  const Icon = iconMap[sector.icon] || Scissors
  const imgSrc = sector.image || images[sector.icon] || images.Scissors
  let statsList: { label: string; value: string }[] = []
  try {
    const parsed = JSON.parse(sector.stats)
    if (Array.isArray(parsed)) statsList = parsed
  } catch {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()} dir="rtl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[24px]">
          <Image src={imgSrc} alt={sector.name} width={800} height={450} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button onClick={onClose} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors">
            <X size={18} className="text-[#2D1955]" />
          </button>
          <div className="absolute bottom-4 right-4">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#6B4CC1] shadow-lg">
              <Icon size={22} className="stroke-[1.8]" />
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-arabic font-extrabold text-[22px] text-[#2D1955]">{sector.name}</h3>
            <p className="font-arabic text-[14px] text-[#6B5B8A] mt-2 leading-[1.8]">
              {sector.fullDescription || sector.description}
            </p>
          </div>
          {statsList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {statsList.map((stat, i) => (
                <div key={i} className="bg-[#F7F1FB] rounded-[12px] p-4 text-center">
                  <p className="font-numbers font-black text-[22px] text-[#6B4FA0]">{stat.value}</p>
                  <p className="font-arabic text-[12px] text-[#6B5B8A] font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          {sector.ctaText && (
            <div className="text-center pt-2">
              <button className="bg-gradient-to-r from-[#D4B26A] to-[#C9A24E] text-white text-[14px] font-arabic font-bold h-[44px] px-8 rounded-[10px] shadow-[0_2px_12px_rgba(212,178,106,0.35)] hover:shadow-[0_4px_20px_rgba(212,178,106,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                {sector.ctaText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SectorsPage() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [sectors, setSectors] = useState<Sector[]>([])
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value })
        setContent(map)
      })
    fetch('/api/sectors')
      .then((r) => r.json())
      .then((data) => setSectors(data.filter((s: Sector) => s.isActive !== false)))
  }, [])

  const activeSectors = sectors.filter((s) => s.isActive !== false)

  return (
    <div className="py-16 md:py-20" dir="rtl">
      <div className="container-global">
        <SectionTitle
          title={content.sectors_title || 'قطاعاتنا المستهدفة'}
          subtitle={content.sectors_subtitle || 'اكتشفي القطاعات المستفيدة من مبادرة الاقتصاد الرقمي'}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Scissors
            return (
              <Card key={sector.id}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-bg flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-arabic font-bold text-lg text-text-primary mb-2">{sector.name}</h3>
                    <p className="text-text-secondary text-sm font-arabic leading-relaxed">{sector.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSector(sector)}
                  className="mt-4 pt-3 border-t border-border flex items-center justify-between w-full cursor-pointer"
                >
                  <span className="text-accent font-arabic font-bold text-sm">المزيد</span>
                  <ArrowLeft size={16} className="text-accent flex-shrink-0" />
                </button>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedSector && (
        <SectorModal sector={selectedSector} onClose={() => setSelectedSector(null)} />
      )}
    </div>
  )
}
