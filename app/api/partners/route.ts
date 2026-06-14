import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(partners)
}

export async function POST(request: Request) {
  const body = await request.json()
  const partner = await prisma.partner.create({ data: body })
  revalidatePath('/')
  return NextResponse.json(partner)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const partner = await prisma.partner.update({ where: { id }, data })
  revalidatePath('/')
  return NextResponse.json(partner)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.partner.delete({ where: { id } })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
