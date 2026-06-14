import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, email, newPassword } = body as {
    name?: string
    email?: string
    newPassword?: string
  }

  const updateData: Record<string, string> = {}

  if (name && name.trim()) {
    updateData.name = name.trim()
  }

  if (email && email.trim()) {
    updateData.email = email.trim()
  }

  if (newPassword) {
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }, { status: 400 })
    }
    updateData.password = await bcrypt.hash(newPassword, 12)
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No data to update' }, { status: 400 })
  }

  const updated = await prisma.adminUser.update({
    where: { email: session.user.email },
    data: updateData,
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(updated)
}
