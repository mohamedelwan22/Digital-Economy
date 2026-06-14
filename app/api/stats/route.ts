import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(stats)
}

export async function POST(request: Request) {
  const body = await request.json()
  const stat = await prisma.stat.create({ data: body })
  revalidatePath('/')
  return NextResponse.json(stat)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const stat = await prisma.stat.update({ where: { id }, data })
  revalidatePath('/')
  return NextResponse.json(stat)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.stat.delete({ where: { id } })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
