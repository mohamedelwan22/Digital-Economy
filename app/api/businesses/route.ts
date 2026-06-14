import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const businesses = await prisma.businessRegistration.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(businesses)
}

export async function POST(request: Request) {
  const body = await request.json()
  const business = await prisma.businessRegistration.create({ data: body })
  revalidatePath('/')
  return NextResponse.json(business)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, ...data } = body
  const business = await prisma.businessRegistration.update({ where: { id }, data })
  revalidatePath('/')
  return NextResponse.json(business)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await prisma.businessRegistration.delete({ where: { id } })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
