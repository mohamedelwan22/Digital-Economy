import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, phone, email, subject, message } = body
  const contact = await prisma.contactMessage.create({
    data: { name, phone, email, subject, message },
  })
  revalidatePath('/')
  return NextResponse.json(contact)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.contactMessage.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
