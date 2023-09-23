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
  await await prisma.userAgent.upsert({
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

  await prisma.course.upsert({
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
      sections: {
        create: [
          {
            name: 'lsコマンドとは',
            type: 'article',
            articles: {
              create: [
                {
                  body: '# 1ページ目\n ## h2です\n ### h3です\n 買う物\n - リンゴ\n - 牛乳\n - あんぱん\n ```jsx\n const num = 1;\n ```',
                },
                {
                  body: '# 2ページ目\n ## h2です\n ### h3です\n 買う物\n - リンゴ\n - 牛乳\n - あんぱん\n ```jsx\n const num = 1;\n ```',
                },
              ],
            },
          },
          {
            name: 'lsコマンドの演習',
            type: 'sandbox',
            scenarioGitHubUrl: 'https://github.com/tosssssy/sample-scenario',
            articles: {
              create: [
                {
                  body: '# 1ページ目\n ## h2です\n ### h3です\n 買う物\n - リンゴ\n - 牛乳\n - あんぱん\n ```jsx\n const num = 1;\n ```',
                },
                {
                  body: '# 2ページ目\n ## h2です\n ### h3です\n 買う物\n - リンゴ\n - 牛乳\n - あんぱん\n ```jsx\n const num = 1;\n ```',
                },
              ],
            },
            userAgent: { connect: { id: userAgent1.id } },
          },
          {
            name: '小テスト（lsコマンド）',
            type: 'quiz',
            quizzes: {
              create: [
                {
                  question:
                    'ディレクトリ内のファイルとディレクトリを一覧表示するためのコマンドは何でしょうか？',
                  choices: ['dir', 'ls', 'list', 'show'],
                  answers: ['ls'],
                  type: 'radio',
                  explanation:
                    '正解は2のlsです。lsコマンドは、ディレクトリ内のファイルとディレクトリを一覧表示するために使用されます。Windowsではdirコマンドが使われることもありますが、一般的にはUnix/Linux系のシステムでよく使われるのはlsコマンドです。listやshowは一般的なコマンドではありません。',
                },
                {
                  question:
                    '以下のうち、lsコマンドのオプションに関する記述で正しいもの全て答えて下さい。',
                  choices: ['-l', '-a', '-R', '-z'],
                  answers: ['-l', '-a', '-R'],
                  type: 'checkbox',
                  explanation: `
A) -l オプションは、lsコマンドの詳細な情報を表示するためのオプションです。ファイルのパーミッション、所有者、サイズなどの情報を表示します。\n
B) -a オプションは、隠しファイルを表示するためのオプションです。ファイル名がドット（.）で始まるファイルやディレクトリを表示します。\n
C) -R オプションは、再帰的にディレクトリ内のファイルを表示するためのオプションです。指定したディレクトリ内のすべてのサブディレクトリのファイルも表示します。\n
D) -z オプションは、lsコマンドに存在しません。`,
                },
                {
                  question: 'lsコマンドを使う目的を記述して下さい',
                  answers: [
                    'ファイルとディレクトリの一覧表示、詳細情報の表示、隠しファイルの表示、再帰的なリスト表示など',
                  ],
                  type: 'text',
                  explanation: '',
                },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.course.upsert({
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

  await prisma.course.upsert({
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
