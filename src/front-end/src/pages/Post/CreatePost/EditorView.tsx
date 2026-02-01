import { EditorContent, useCurrentEditor } from '@tiptap/react'
import './EditorView.css'
import { useEffect } from 'react'

type SendCondition = {
  send: boolean,
  add_on_db?: boolean
}


export function EditorView({ send }: SendCondition) {
  const { editor } = useCurrentEditor()




  useEffect(() => {
    if (!editor || !send) return
    const html_editor = editor.getHTML()
    const json_ditor = JSON.stringify(editor.getJSON())


    localStorage.setItem('html_editor', html_editor)
    localStorage.setItem('json_editor', json_ditor)

  }, [send, editor])

  if (!editor) return null

  if (!editor) return null

  return (
    <div className="editor-container">
      {editor && <EditorContent editor={editor} />}
    </div>
  )
}
