import Script from 'next/script'
import { FC, useEffect } from 'react'
import markdownHtml from 'zenn-markdown-html'
import 'zenn-content-css' // zennのCSSを使えるように

type Props = {
  markdown: string
}

// マークダウンのプレビューを表示
export const Preview: FC<Props> = ({ markdown }) => {
  // マークダウン記法の文字列をhtmlに変換
  const html = markdownHtml(markdown, {
    embedOrigin: 'https://embed.zenn.studio',
  })

  // 特定のマークダウン記法のプレビューに対応するライブラリのimport
  useEffect(() => {
    import('zenn-embed-elements')
  }, [])

  return (
    <div className='mx-auto break-words'>
      {/* 特定のマークダウン記法のプレビューに対応するライブラリを使えるように*/}
      <Script src='https://embed.zenn.studio/js/listen-embed-event.js' />
      <div
        // zennのCSSのクラスを指定
        className='znc'
        // パースしたhtmlを挿入
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

const markdown = `
  ![](https://storage.googleapis.com/zenn-user-upload/be4c1e2776e4-20230316.gif)

  ![](https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg)
  [![altテキスト](https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg =50x)](https://katex.org/docs/support_table.html)
  *キャプション*

  | Head | Head | Head |
  | ---- | ---- | ---- |
  | Text | Text | Text |
  | Text | Text | Text |

  \`\`\`js:ファイル名

  \`\`\`

  \`\`\`diff js:ファイル名
  + const foo = bar.baz([1, 2, 3]) + 1;
  - let foo = bar.baz([1, 2, 3]);
  \`\`\`

  数式は [KaTeX](https://katex.org/docs/support_table.html)

  $$
  e^{i\theta} = \cos\theta + i\sin\theta
  $$

  > anpan

  -----

  *イタリック*
  **太字**
  ~~打ち消し線~~
  インラインで\`code\`を挿入する

  :::message
  メッセージをここに
  :::

  :::message alert
  警告メッセージをここに
  :::

  :::details タイトル
  表示したい内容
  :::details タイトル
  :::message
  ネストされた要素
  :::

  https://zenn.dev/zenn/articles/markdown-guide

  https://twitter.com/jack/status/20

  https://www.youtube.com/watch?v=WRVsOCh907o

  https://github.com/octocat/Hello-World/blob/master/README

  @[slideshare](31056585)
  @[speakerdeck](257b95cee2394c62af3acaf7982f9263)
  [ここに書いてある](https://dev.classmethod.jp/articles/content-embedded-display-method-in-blog/)

  @[codesandbox](https://codesandbox.io/embed/next-react-md-editor-d-d-w5xtck?fontsize=14&hidenavigation=1&theme=dark)
  @[stackblitz](https://stackblitz.com/edit/stackblitz-starters-prallf?description=The%20React%20framework%20for%20production&file=README.md&title=Next.js%20Starter)
  @[figma](https://www.figma.com/file/kDrp7cpNxmXVUFGkbQQNMU/Untitled?type=whiteboard)

  \`\`\`mermaid
  graph TB
      A[Hard edge] -->|Link text| B(Round edge)
      B --> C{Decision}
      C -->|One| D[Result one]
      C -->|Two| E[Result two]
  \`\`\`
  `
