import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const userAgent1 = await prisma.userAgent.upsert({
    where: { name: 'サンプルユーザーエージェント1' },
    update: {},
    create: {
      name: 'サンプルユーザーエージェント1',
      gitHubUrl: 'https://github.com/tosssssy/kali-wetty-lesson',
    },
  })
  const userAgent2 = await prisma.userAgent.upsert({
    where: { name: 'サンプルユーザーエージェント2' },
    update: {},
    create: {
      name: 'サンプルユーザーエージェント2',
      gitHubUrl: 'https://github.com/tosssssy/kali-wetty-lesson',
    },
  })

  const curriculum1 = await prisma.curriculum.upsert({
    where: { name: 'サンプルカリキュラム-システムの基本設定の確認方法' },
    update: {},
    create: {
      name: 'サンプルカリキュラム-システムの基本設定の確認方法',
      description:
        'このカリキュラムでは、システムの基本設定を確認する方法について詳しく学びます。システムの稼働状況を正確に把握するために必要な知識が身につきます。',
      gitHubUrl: 'https://github.com/tosssssy/sample-curriculum',
      articleUrl: 'https://github.com/tosssssy/sample-curriculum',
      imageUrl: 'https://source.unsplash.com/Vp8Ep9jZ5p0',
      userAgent: { connect: { id: userAgent1.id } },
    },
  })
  const curriculum2 = await prisma.curriculum.upsert({
    where: { name: 'サンプルカリキュラム-パスワードポリシーの設定方法' },
    update: {},
    create: {
      name: 'サンプルカリキュラム-パスワードポリシーの設定方法',
      description:
        'このカリキュラムでは、パスワードポリシーの設定方法について学びます。強力なパスワードポリシーの設定により、セキュリティを強化する方法が分かります。',
      gitHubUrl: 'https://github.com/tosssssy/sample-curriculum',
      articleUrl: 'https://github.com/tosssssy/sample-curriculum',
      imageUrl: 'https://source.unsplash.com/1Y5A0cagQP8',
      userAgent: { connect: { id: userAgent1.id } },
    },
  })
  const curriculum3 = await prisma.curriculum.upsert({
    where: { name: 'サンプルカリキュラム-脆弱性の理解' },
    update: {},
    create: {
      name: 'サンプルカリキュラム-脆弱性の理解',
      description:
        'このカリキュラムでは、脆弱性の概念や種類について学びます。攻撃者が悪用する可能性がある脆弱性を把握することで、セキュリティ対策を行う方法が分かります。',
      gitHubUrl: 'https://github.com/tosssssy/sample-curriculum',
      articleUrl: 'https://github.com/tosssssy/sample-curriculum',
      imageUrl: 'https://source.unsplash.com/TLqU-IBNBGM',
      userAgent: { connect: { id: userAgent2.id } },
    },
  })
  const curriculum4 = await prisma.curriculum.upsert({
    where: { name: 'サンプルカリキュラム-セキュリティログの確認' },
    update: {},
    create: {
      name: 'サンプルカリキュラム-セキュリティログの確認',
      description:
        'のカリキュラムでは、セキュリティログの確認方法について学びます。ログの分析により、不正アクセスや攻撃の痕跡を見つける方法が分かります。',
      gitHubUrl: 'https://github.com/tosssssy/sample-curriculum',
      articleUrl: 'https://github.com/tosssssy/sample-curriculum',
      imageUrl: 'https://source.unsplash.com/QKD4Pq6UPAY',
      userAgent: { connect: { id: userAgent2.id } },
    },
  })

  const course1 = await prisma.course.upsert({
    where: { name: 'サンプルコース初級編' },
    update: {},
    create: {
      name: 'サンプルコース初級編',
      level: 1,
      description:
        'このサンプルコースは、セキュリティ演習システムの初級編にあたります。このコースを体験することで、システムの概要を学ぶことができます。',
      curriculumIds: `${curriculum1.id},${curriculum3.id},${curriculum4.id}`,
    },
  })
  const course2 = await prisma.course.upsert({
    where: { name: 'サンプルコース中級編' },
    update: {},
    create: {
      name: 'サンプルコース中級編',
      level: 2,
      description:
        'このサンプルコースは、セキュリティ演習システムの中級編にあたります。このコースは脆弱性のあるアプリケーションでの攻撃を体験学ぶことができます。',
      curriculumIds: `${curriculum3.id},${curriculum4.id}`,
    },
  })
  const course3 = await prisma.course.upsert({
    where: { name: 'サンプルコース上級編' },
    update: {},
    create: {
      name: 'サンプルコース上級編',
      level: 3,
      description:
        'このサンプルコースは、セキュリティ演習システムの上級編にあたります。このコースは攻撃者側を体験することで、攻撃の対処法を学ぶことができます。',
    },
  })

  await prisma.courseCurriculumRelation.upsert({
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
    },
  })
  await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course1.id,
        curriculumId: curriculum3.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course1.id },
      },
      curriculum: {
        connect: { id: curriculum3.id },
      },
    },
  })
  await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course1.id,
        curriculumId: curriculum4.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course1.id },
      },
      curriculum: {
        connect: { id: curriculum4.id },
      },
    },
  })

  await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course2.id,
        curriculumId: curriculum3.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course2.id },
      },
      curriculum: {
        connect: { id: curriculum3.id },
      },
    },
  })
  await prisma.courseCurriculumRelation.upsert({
    where: {
      courseId_curriculumId: {
        courseId: course2.id,
        curriculumId: curriculum4.id,
      },
    },
    update: {},
    create: {
      course: {
        connect: { id: course2.id },
      },
      curriculum: {
        connect: { id: curriculum4.id },
      },
    },
  })

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
