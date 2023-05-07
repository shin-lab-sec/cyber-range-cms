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
      <div dangerouslySetInnerHTML={{ __html: editorContent }} />

      <style jsx global>{`
        .ProseMirror h1 {
          margin: 1.5rem 0 1rem;
          font-size: 2rem;
          font-weight: bold;
          line-height: 1.2;
        }
        .ProseMirror h2 {
          margin: 1.5rem 0 1rem;
          font-size: 1.5rem;
          font-weight: bold;
          line-height: 1.2;
        }
        .ProseMirror h3 {
          margin: 1.5rem 0 1rem;
          font-size: 1.17rem;
          font-weight: bold;
          line-height: 1.2;
        }
        .ProseMirror h4 {
          margin: 1.5rem 0 1rem;
          font-size: 1rem;
          font-weight: bold;
          line-height: 1.2;
        }
        .ProseMirror h5 {
          margin: 1.5rem 0 1rem;
          font-size: 0.83rem;
          font-weight: bold;
          line-height: 1.2;
        }
        .ProseMirror h6 {
          margin: 1.5rem 0 1rem;
          font-size: 0.67rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          margin: 0;
          padding-left: 1.5rem;
        }
        .ProseMirror ul {
          list-style: disc;
        }
        .ProseMirror ol {
          list-style: decimal;
        }
        .ProseMirror li p {
          margin: 0.5rem 0;
        }

        .ProseMirror code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          background-color: #f5f5f5;
          padding: 0.2rem 0.4rem;
          font-size: 0.75rem;
          border-radius: 0.2rem;
          border: 1px solid #ccc;
        }
        .ProseMirror pre {
          display: block;
          background-color: #f5f5f5;
          padding: 1rem;
          overflow: auto;
          border-radius: 0.2rem;
          border: 1px solid #ccc;
          white-space: pre-wrap;
        }
        .ProseMirror pre code {
          display: block;
          padding: 0;
          font-size: 0.875rem;
          border: none;
        }

        .ProseMirror a {
          color: #228be6;
        }
        .ProseMirror a:hover {
          text-decoration: underline;
        }

        .ProseMirror p {
          font-size: 1rem;
          line-height: 1.5;
          margin: 1rem 0;
        }

        .ProseMirror hr {
          border: none;
          height: 1px;
          background-color: #ccc;
          margin: 1rem 0;
        }

        .ProseMirror blockquote {
          border-left: 0.25rem solid #ccc;
          color: #555;
          font-style: italic;
          margin: 0;
          padding: 1rem;
        }
        .ProseMirror blockquote p {
          margin: 0;
        }
        .ProseMirror sup,
        .ProseMirror sub {
          font-size: 0.8rem;
          position: relative;
          vertical-align: baseline;
        }
        .ProseMirror sup {
          top: -0.5rem;
        }
        .ProseMirror sub {
          bottom: -0.25rem;
        }

        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror s {
          text-decoration: line-through;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror mark {
          background-color: yellow;
        }
      `}</style>
    </>
  )
}
