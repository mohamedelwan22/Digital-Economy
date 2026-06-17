'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Scissors, Dumbbell, Sparkles, BookOpen, CalendarDays, X } from 'lucide-react'

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
}

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

interface NewSectorsSectionProps {
  title: string
  sectors: Sector[]
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

export default function NewSectorsSection({ title, sectors }: NewSectorsSectionProps) {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null)

  if (!sectors || sectors.length === 0) return null

  const sortedSectors = [...sectors].sort((a, b) => a.order - b.order)

  return (
    <section className="py-14 bg-white" dir="rtl">
      <div className="container-global">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-10 h-[1.2px] bg-[#D4B26A]"></div>
          <h2 className="font-arabic font-extrabold text-[22px] text-[#2D1955]">{title}</h2>
          <div className="w-10 h-[1.2px] bg-[#D4B26A]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" style={{ direction: 'ltr' }}>
          {sortedSectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Scissors
            const imgSrc = sector.image || images[sector.icon] || images.Scissors
            return (
              <div
                key={sector.id}
                className="group bg-white rounded-[20px] overflow-hidden border border-[#E8DFF2]/60 shadow-[0_4px_20px_rgba(107,76,193,0.03)] hover:shadow-[0_8px_30px_rgba(107,76,193,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[310px]"
                style={{ direction: 'rtl' }}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={sector.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                <div className="flex justify-center -mt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFF2]/50 shadow-[0_4px_12px_rgba(107,76,193,0.08)] flex items-center justify-center text-[#6B4CC1] group-hover:scale-105 transition-transform duration-300">
                    <Icon size={20} className="stroke-[1.8]" />
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-arabic font-extrabold text-[#2D1955] text-[15px] mb-1.5 leading-tight">
                      {sector.name}
                    </h3>
                    <p className="text-[#6B5B8A] font-arabic text-[12px] leading-[1.6] line-clamp-2 px-1">
                      {sector.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSector(sector)}
                    className="mt-3 mx-auto font-arabic text-[#D4B26A] text-[12px] font-extrabold hover:text-[#C9A24E] transition-colors"
                  >
                    المزيد +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedSector && (
        <SectorModal sector={selectedSector} onClose={() => setSelectedSector(null)} />
      )}
    </section>
  )
}
