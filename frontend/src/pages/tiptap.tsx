import { Button } from '@mantine/core'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { Highlight } from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useState } from 'react'

const content =
  '<h2 style="text-align: center">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap.dev</a> and supports all of its features:</p><ul><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></p><ul><li><p>Headings (h1-h6)</p><ul><li><p>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</p><ul><li><p>Ordered and bullet lists</p></li></ul></li><li><p>Text align&nbsp;</p></li></ul></li><li><p>And all <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/extensions">other extensions</a></p></li></ul></li></ul><ol><li><p><strong>aaaaa</strong></p><ol><li><p><em>iiii</em></p></li></ol></li><li><p><em><s><u>sssss</u></s></em></p></li><li><p><mark>aaaaaaaf</mark></p></li></ol><h1>h1</h1><h2>h2</h2><p style="text-align: center">aaa</p><p style="text-align: right">bbb</p><p>ccc</p><p><code>code</code></p><pre><code>code code code</code></pre>'

export default function Tiptap() {
  const [editorContent, setEditorContent] = useState('')
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  })

  if (!editor) return <>Loading...</>
  // console.log(editor?.getHTML()) // 文字列のHTML 表示するとリセットCSSかかっているから微妙に違う
  // console.log(editor.state) // 変なオブジェクト
  // console.log(editor.getJSON) // 違う
  console.log(editor.view)

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button onClick={() => setEditorContent(editor.getText())}>
        テキストを保存
      </Button>
      <Button onClick={() => setEditorContent(editor.getHTML())}>
        HTMLを保存
      </Button>
      {editorContent}
      <br />
      <br />
      {/* {editor.view} */}
      <div dangerouslySetInnerHTML={{ __html: editorContent }} />
    </>
  )
}
