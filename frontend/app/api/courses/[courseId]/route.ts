import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../src/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  const id = params.courseId

  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        curriculums: {
          include: {
            curriculum: true,
          },
        },
      },
    })
    // courseがnullならnullを返す
    const result = course && {
      ...course,
      curriculums: course?.curriculums.map(ccr => ccr.curriculum),
    }

    return NextResponse.json({ data: result }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  const body = await request.json()
  const id = params.courseId

  try {
    const course = await prisma.course.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        url: body.url,
        article: body.article,
        imageUrl: body.imageUrl,
        description: body.description,
        curriculumIds: body.curriculumIds,
      },
    })
    return NextResponse.json({ data: course }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  const id = params.courseId

  try {
    const course = await prisma.course.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json({ data: course }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}
