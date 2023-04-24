import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../src/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id

  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ data: curriculum }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const id = params.id

  try {
    const curriculum = await prisma.curriculum.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        level: body.level,
        description: body.description,
      },
    })
    return NextResponse.json({ data: curriculum }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id

  try {
    const curriculum = await prisma.curriculum.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ data: curriculum }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}
