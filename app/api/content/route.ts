import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const allPaths = ['/', '/about', '/sectors', '/reports', '/partners', '/contact', '/register']

export async function GET() {
  const content = await prisma.siteContent.findMany()
  return NextResponse.json(content)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { updates } = body as { updates: { key: string; value: string }[] }

  for (const { key, value } of updates) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value, type: 'text', section: 'general' },
    })
  }

  for (const path of allPaths) {
    revalidatePath(path)
  }

  return NextResponse.json({ success: true })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { key, value, type, section } = body as { key: string; value: string; type?: string; section?: string }

  await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value, type: type || 'text', section: section || 'general' },
  })

  for (const path of allPaths) {
    revalidatePath(path)
  }

  return NextResponse.json({ success: true })
}
