import { prisma } from './db'
import { cache } from 'react'

export const getContent = cache(async function (key: string, defaultValue: string = ''): Promise<string> {
  try {
    const item = await prisma.siteContent.findUnique({ where: { key } })
    return item?.value ?? defaultValue
  } catch {
    return defaultValue
  }
})

export const getContentMulti = cache(async function (keys: string[]): Promise<Record<string, string>> {
  const items = await prisma.siteContent.findMany({
    where: { key: { in: keys } },
  })
  const map: Record<string, string> = {}
  for (const key of keys) {
    map[key] = items.find((i) => i.key === key)?.value ?? ''
  }
  return map
})

export const getAllContent = cache(async function (): Promise<Record<string, string>> {
  const items = await prisma.siteContent.findMany()
  const map: Record<string, string> = {}
  for (const item of items) {
    map[item.key] = item.value
  }
  return map
})
