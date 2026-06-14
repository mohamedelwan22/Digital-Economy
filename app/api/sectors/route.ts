import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const sectors = await prisma.sector.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(sectors)
}

export async function POST(request: Request) {
  const body = await request.json()
  const sector = await prisma.sector.create({ data: body })
  revalidatePath('/')
  return NextResponse.json(sector)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const sector = await prisma.sector.update({ where: { id }, data })
  revalidatePath('/')
  return NextResponse.json(sector)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.sector.delete({ where: { id } })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
