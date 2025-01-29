import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { editorConfig } from "./EditorConfig";
import styles from "./CodeEditor.module.css";

const CodeEditor = ({
  initialValue = "",
  language = "javascript",
  onChange,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialValue);

  const handleEditorChange = (value) => {
    setCode(value);
    onChange?.(value);
  };

  return (
    <div className={styles.editorContainer}>
      <MonacoEditor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          ...editorConfig,
          readOnly,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
