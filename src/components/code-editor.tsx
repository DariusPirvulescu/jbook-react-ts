import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string
  onChange(val: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  const editorDidMount = (getValue: () => string, mountedEditor: any) => {
    mountedEditor.onDidChangeModelContent(() => {
      onChange(getValue())
      console.log('newv', getValue())
    })
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
