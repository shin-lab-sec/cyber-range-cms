import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const curriculums = await prisma.curriculum.findMany()

    return NextResponse.json({ data: curriculums }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const curriculum = await prisma.curriculum.create({
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
