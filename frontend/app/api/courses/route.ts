import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: { curriculums: { include: { curriculum: true } } },
    })

    const result = courses.map(course => ({
      ...course,
      curriculums: course.curriculums.map(c => c.curriculum),
    }))

    return NextResponse.json({ data: result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const createCourse = await prisma.course.create({
      data: {
        name: body.name,
        url: body.url,
        article: body.article,
        imageUrl: body.imageUrl,
        description: body.description,
      },
    })

    return NextResponse.json({ data: createCourse }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}
