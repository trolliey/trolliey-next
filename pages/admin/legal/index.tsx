import React from 'react'
import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
function Index() {
  const [editorState, setEditorState] = React.useState<any>()
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  // const handleUpload = async () => {

  // }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default Index
