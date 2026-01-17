import { createEditor } from "lexical"
import { $generateHtmlFromNodes } from "@lexical/html"
import { $getRoot } from "lexical"

export function convertLexicalToHTML(payloadRichText: any): string {
  const editor = createEditor()

  let html = ""

  editor.update(() => {
    const root = $getRoot()
    root.clear()

    editor.setEditorState(editor.parseEditorState(JSON.stringify(payloadRichText)))
    // @ts-ignore
    html = $generateHtmlFromNodes(editor, null)
  })

  return html
}
