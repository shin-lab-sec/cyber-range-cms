import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../../src/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; curriculumId: string } },
) {
  const { courseId, curriculumId } = params

  try {
    const res = await prisma.courseCurriculumRelation.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        curriculum: {
          connect: {
            id: curriculumId,
          },
        },
      },
    })
    return NextResponse.json({ data: res }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; curriculumId: string } },
) {
  const { courseId, curriculumId } = params

  try {
    const res = await prisma.courseCurriculumRelation.delete({
      where: {
        courseId_curriculumId: {
          courseId,
          curriculumId,
        },
      },
    })
    return NextResponse.json({ data: res }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}
