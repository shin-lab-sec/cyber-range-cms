import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const userAgent1 = await prisma.userAgent.upsert({
    where: {
      name_author_organization: {
        name: 'サンプルユーザーエージェント1',
        author: '冠城俊樹',
        organization: '東京大学',
      },
    },
    update: {},
    create: {
      name: 'サンプルユーザーエージェント1',
      gitHubUrl: 'https://github.com/tosssssy/kali-wetty-lesson',
      type: 'terminal',
      author: '冠城俊樹',
      organization: '東京大学',
    },
  })
  const userAgent2 = await await prisma.userAgent.upsert({
    where: {
      name_author_organization: {
        name: 'サンプルユーザーエージェント2',
        author: '冠城俊樹',
        organization: '東京大学',
      },
    },
    update: {},
    create: {
      name: 'サンプルユーザーエージェント2',
      gitHubUrl: 'https://github.com/tosssssy/kali-wetty-lesson',
      type: 'terminal',
      author: '冠城俊樹',
      organization: '東京大学',
    },
  })

  const course1 = await prisma.course.upsert({
    where: {
      name_author_organization: {
        name: 'lsコマンド、マスターコース',
        author: 'akio',
        organization: '東海大学',
      },
    },
    update: {},
    create: {
      name: 'lsコマンド、マスターコース',
      description:
        'このコースは、lsコマンドを実行することでlsコマンドの概要を学ぶことができます。',
      level: 1,
      imageUrl:
        'https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg',
      author: 'akio',
      organization: '東海大学',
      sectionIds: [],
    },
  })
  const course2 = await prisma.course.upsert({
    where: {
      name_author_organization: {
        name: 'サンプルコース中級編',
        author: 'tanaka',
        organization: '東海大学',
      },
    },
    update: {},
    create: {
      name: 'サンプルコース中級編',
      description:
        'このサンプルコースは、セキュリティ演習システムの中級編にあたります。このコースは脆弱性のあるアプリケーションでの攻撃を体験学ぶことができます。',
      level: 1,
      imageUrl:
        'https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg',
      author: 'tanaka',
      organization: '東海大学',
      sectionIds: [],
    },
  })
  const course3 = await prisma.course.upsert({
    where: {
      name_author_organization: {
        name: 'サンプルコース上級編',
        author: 'tanaka',
        organization: '東海大学',
      },
    },
    update: {},
    create: {
      name: 'サンプルコース上級編',
      description:
        'このサンプルコースは、セキュリティ演習システムの上級編にあたります。このコースは攻撃者側を体験することで、攻撃の対処法を学ぶことができます。',
      level: 1,
      imageUrl:
        'https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg',
      author: 'tanaka',
      organization: '東海大学',
      sectionIds: [],
    },
  })

  const section1 = await prisma.section.upsert({
    where: {
      name_courseId: {
        name: 'lsコマンドとは',
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      name: 'lsコマンドとは',
      type: 'article',
      articleIds: [],
      course: { connect: { id: course1.id } },
    },
  })
  const section2 = await prisma.section.upsert({
    where: {
      name_courseId: {
        name: 'lsコマンドの演習',
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      name: 'lsコマンドの演習',
      type: 'sandbox',
      scenarioGitHubUrl: 'https://github.com/tosssssy/sample-scenario',
      course: { connect: { id: course1.id } },
      userAgent: { connect: { id: userAgent1.id } },
    },
  })
  const section3 = await prisma.section.upsert({
    where: {
      name_courseId: {
        name: '小テスト（lsコマンド）',
        courseId: course1.id,
      },
    },
    update: {},
    create: {
      name: '小テスト（lsコマンド）',
      type: 'quiz',
      quizIds: [],
      course: { connect: { id: course1.id } },
    },
  })

  const quiz1 = await prisma.quiz.upsert({
    where: {
      question_sectionId: {
        question:
          'ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？',
        sectionId: section3.id,
      },
    },
    update: {},
    create: {
      question:
        'ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？',
      choices: ['dir', 'ls', 'list', 'show'],
      answer: '2',
      explanation:
        '正解は2のlsです。lsコマンドは、ディレクトリ内のファイルとディレクトリを一覧表示するために使用されます。Windowsではdirコマンドが使われることもありますが、一般的にはUnix/Linux系のシステムでよく使われるのはlsコマンドです。listやshowは一般的なコマンドではありません。',
      section: { connect: { id: section3.id } },
    },
  })
  const quiz2 = await prisma.quiz.upsert({
    where: {
      question_sectionId: {
        question:
          'lsコマンドのオプションのうち、ファイルの詳細情報（パーミッション、所有者、サイズなど）を表示するためのオプションはどれでしょうか？',
        sectionId: section3.id,
      },
    },
    update: {},
    create: {
      question:
        'lsコマンドのオプションのうち、ファイルの詳細情報（パーミッション、所有者、サイズなど）を表示するためのオプションはどれでしょうか？',
      choices: ['-l', '-a', '-h', '-R'],
      answer: '1',
      explanation:
        '正解は1の-lです。-lオプションを使用すると、ファイルの詳細情報が表示されます。具体的には、パーミッション、所有者、グループ、ファイルサイズ、更新日時などが表示されます。',
      section: { connect: { id: section3.id } },
    },
  })
  const quiz3 = await prisma.quiz.upsert({
    where: {
      question_sectionId: {
        question: '長いクイズ',
        sectionId: section3.id,
      },
    },
    update: {},
    create: {
      question: '長いクイズ',
      choices: ['dir', 'ls', 'list', 'show'],
      answer:
        'ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？',
      explanation:
        '正解は2のlsです。lsコマンドは、ディレクトリ内のファイルとディレクトリを一覧表示するために使用されます。Windowsではdirコマンドが使われることもありますが、一般的にはUnix/Linux系のシステムでよく使われるのはlsコマンドです。listやshowは一般的なコマンドではありません。',
      section: { connect: { id: section3.id } },
    },
  })

  // quizIds 追加
  await prisma.section.update({
    where: { id: section3.id },
    data: { quizIds: [quiz1.id, quiz2.id] },
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
