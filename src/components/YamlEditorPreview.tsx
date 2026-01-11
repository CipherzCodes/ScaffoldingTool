"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/components/Button";

type Props = {
  yaml: string;
  onChange: (value: string) => void;
};

export default function YamlEditorPreview({ yaml, onChange }: Props) {
  const [theme, setTheme] = useState<"light" | "vs-dark">("light");

  /* --------------------------------
     Sync editor theme with app theme
  --------------------------------- */
  useEffect(() => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    setTheme(isDark ? "vs-dark" : "light");
  }, []);

  const downloadYaml = () => {
    const blob = new Blob([yaml], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "scaffolding.yaml";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Generated YAML
        </h3>

        <Button variant="secondary" onClick={downloadYaml}>
          Download YAML
        </Button>
      </div>

      {/* Editor */}
      <div className="h-[420px] rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800">
        <Editor
          height="100%"
          language="yaml"
          value={yaml}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: 17,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            fontFamily: "JetBrains Mono",
          }}
          onChange={(value) => onChange(value ?? "")}
        />
      </div>
    </div>
  );
}
