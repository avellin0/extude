import { HeadingButton } from '@/components/tiptap-ui/heading-button'
// import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button'
// import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button'
// import { ColorHighlightButton } from '@/components/tiptap-ui/color-highlight-button'
// import { ListButton } from '@/components/tiptap-ui/list-button'
// import { LinkButton } from '@/components/tiptap-ui/link-popover'
import { MarkButton } from '@/components/tiptap-ui/mark-button'
// import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'

export function Toolbar() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {/* Headings */}
      <HeadingButton level={1}>H1</HeadingButton>
      <HeadingButton level={2}>H2</HeadingButton>
      <HeadingButton level={3}>H3</HeadingButton>

      {/* Blocks */}
      {/* <BlockquoteButton /> */}
      {/* <CodeBlockButton /> */}

      {/* Marks */}
      <MarkButton type="bold" />
      <MarkButton type="italic" />
      <MarkButton type="strike" />

      {/* Highlight */}
      {/* <ColorHighlightButton /> */}

      {/* Lists */}
      {/* <ListButton
        type="bulletList"
        text="Bullet"
        hideWhenUnavailable
        showShortcut
      /> */}

      {/* <ListButton
        type="orderedList"
        text="Ordered"
        hideWhenUnavailable
        showShortcut
      /> */}

      {/* Links */}
      {/* <LinkButton /> */}
      {/* Undo / Redo */}
      {/* <UndoRedoButton action="undo" /> */}
      {/* <UndoRedoButton action="redo" /> */}
    </div>
  )
}
