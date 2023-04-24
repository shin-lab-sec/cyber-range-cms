import { NextResponse } from 'next/server'
import prisma from '../../../../src/lib/prisma'

export async function GET() {
  try {
    const relations = await prisma.courseCurriculumRelation.findMany({
      include: {
        course: true,
        curriculum: true,
      },
    })
    const resulut = relations.map(relation => ({
      courseId: relation.courseId,
      curriculumId: relation.curriculumId,
      courseName: relation.course.name,
      curriculumName: relation.curriculum.name,
    }))
    return NextResponse.json({ data: resulut }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 400 })
  }
}
