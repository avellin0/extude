// deno-lint-ignore-file
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './PostRender.css'

type Props = {
  content: any // JSON vindo do banco
}

export function PostRenderer({ content }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false
  }, [content])

  if (!editor) return null

  return (
    <div id='teste'>
      <EditorContent editor={editor} />
    </div>
  )
}
