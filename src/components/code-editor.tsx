import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MonacoEditor
      height="300px"
      language="javascript"
      options={{ wordWrap: "on", minimap: { enabled: false } }}
    />
  );
};

export default CodeEditor;
