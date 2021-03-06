import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

import './code-editor.css'

interface CodeEditorProps {
  initialValue: string
  onChange(val: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const editorDidMount: EditorDidMount = (getValue, editor) => {
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
    }).replace(/\n$/, '')
  editorRef.current.setValue(formatted)
  }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onClickFormat}>Format</button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={editorDidMount}
        height="100%"
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
    </div>
  );
};

export default CodeEditor;
