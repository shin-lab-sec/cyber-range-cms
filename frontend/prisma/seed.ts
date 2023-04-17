import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const course1 = await prisma.course.upsert({
    where: { name: 'コース1' },
    update: {},
    create: {
      name: 'コース1',
      // url: '',
      // article: '',
      // imageUrl: '',
      // description: '',
    },
  })
  const course2 = await prisma.course.upsert({
    where: { name: 'コース2' },
    update: {},
    create: {
      name: 'コース2',
    },
  })
  const course3 = await prisma.course.upsert({
    where: { name: 'コース3' },
    update: {},
    create: {
      name: 'コース3',
    },
  })

  const curriculum1 = await prisma.curriculum.upsert({
    where: { name: 'カリキュラム1' },
    update: {},
    create: {
      name: 'カリキュラム1',
    },
  })
  const curriculum2 = await prisma.curriculum.upsert({
    where: { name: 'カリキュラム2' },
    update: {},
    create: {
      name: 'カリキュラム2',
    },
  })
  const curriculum3 = await prisma.curriculum.upsert({
    where: { name: 'カリキュラム3' },
    update: {},
    create: {
      name: 'カリキュラム3',
    },
  })
  const relation1 = await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course1.id,
        curriculumId: curriculum1.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course1.id },
      },
      curriculum: {
        connect: { id: curriculum1.id },
      },
      // order: 0,
    },
  })
  const relation2 = await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course1.id,
        curriculumId: curriculum2.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course1.id },
      },
      curriculum: {
        connect: { id: curriculum2.id },
      },
      // order: 1,
    },
  })
  // const relation3 = await prisma.courseCurriculumRelation.upsert({
  //   where: {
  //     courseId_curriculumId: {
  //       courseId: course1.id,
  //       curriculumId: curriculum3.id,
  //     },
  //   },
  //   update: {},
  //   create: {
  //     course: {
  //       connect: { id: course1.id },
  //     },
  //     curriculum: {
  //       connect: { id: curriculum3.id },
  //     },
  //     // order: 2,
  //   },
  // })
  // await prisma.courseCurriculumRelation.delete({
  //   where: {
  //     courseId_curriculumId: {
  //       courseId: course1.id,
  //       curriculumId: curriculum3.id,
  //     },
  //   },
  // })

  // curiculumIds 追加
  await prisma.course.update({
    where: { id: course1.id },
    data: { curriculumIds: curriculum1.id },
  })
  const course11 = await prisma.course.findUnique({
    where: { name: 'コース1' },
  })
  await prisma.course.update({
    where: { id: course1.id },
    data: {
      curriculumIds: `${
        course11?.curriculumIds ? `${course11.curriculumIds},` : ''
      }${curriculum2.id}`,
    },
  })

  // console.log({ alice })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
