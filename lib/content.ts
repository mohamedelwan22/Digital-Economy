import { prisma } from './db'

export async function getContent(
  key: string,
  defaultValue = ''
): Promise<string> {
  try {
    const item = await prisma.siteContent.findUnique({ where: { key } })
    return item?.value ?? defaultValue
  } catch {
    return defaultValue
  }
}

export async function getContentMulti(
  keys: string[]
): Promise<Record<string, string>> {
  try {
    const items = await prisma.siteContent.findMany({
      where: { key: { in: keys } },
    })
    const map: Record<string, string> = {}
    for (const item of items) {
      map[item.key] = item.value
    }
    return map
  } catch {
    return {}
  }
}
