import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string
  onChange(val: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  const editorDidMount: EditorDidMount = (getValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getValue())
      console.log('newv', getValue())
    })

    editor.getModel()?.updateOptions({ tabSize: 2 })
  }

  return (
    <MonacoEditor
      value={initialValue}
      editorDidMount={editorDidMount}
      height="300px"
      language="javascript"
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
  );
};

export default CodeEditor;
