import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string
  onChange(val: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const editorDidMount: EditorDidMount = (getValue, editor) => {
    console.log('editor', editor)
    editorRef.current = editor
    editor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    editor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const onClickFormat = () => {
    const unformatted = editorRef.current.getModel().getValue()
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser]
    })
    console.log(formatted)
  editorRef.current.setValue(formatted)
  }

  return (
    <>
      <button onClick={onClickFormat}>Format</button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={editorDidMount}
        height="300px"
        language="javascript"
        theme="dark"
        options={{ 
          wordWrap: "on", 
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </>
  );
};

export default CodeEditor;
