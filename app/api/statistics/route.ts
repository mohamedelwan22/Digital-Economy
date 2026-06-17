import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const items = await prisma.statistic.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const body = await request.json()
  const item = await prisma.statistic.create({ data: body })
  return NextResponse.json(item)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const item = await prisma.statistic.update({ where: { id }, data })
  return NextResponse.json(item)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.statistic.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
