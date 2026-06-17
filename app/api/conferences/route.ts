import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const conferences = await prisma.conference.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(conferences)
}

export async function POST(request: Request) {
  const body = await request.json()
  const conference = await prisma.conference.create({ data: body })
  revalidatePath('/reports')
  return NextResponse.json(conference)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const conference = await prisma.conference.update({ where: { id }, data })
  revalidatePath('/reports')
  return NextResponse.json(conference)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.conference.delete({ where: { id } })
  revalidatePath('/reports')
  return NextResponse.json({ success: true })
}
