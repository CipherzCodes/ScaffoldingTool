"use client";

import { Template } from "@/types/template";
import Button from "@/components/Button";
import SchemaRenderer from "@/components/SchemaRenderer";
import YamlPreview from "@/components/YamlPreview";

type Props = {
  template: Template;
  values: any;
  onChange: (values: any) => void;
  onGenerate: () => void;
  onBack: () => void;
};

export function ConfigForm({
  template,
  values,
  onChange,
  onGenerate,
  onBack,
}: Props) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_420px] gap-10 mt-2">
      {/* ================= FORM ================= */}
      <div className="card p-8 border border-gray-200 dark:border-neutral-800 rounded-xl p-6">
        <h2 className="text-sm font-medium mb-6 text-gray-900 dark:text-gray-100">
          Configure {template.name}
        </h2>

        <SchemaRenderer
          schema={template.schema}
          value={values}
          onChange={onChange}
        />

        {/* Actions */}
        <div className="mt-10 flex items-center gap-3">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>

          <Button onClick={onGenerate}>
            Generate
          </Button>
        </div>
      </div>

      {/* ================= STICKY YAML PREVIEW ================= */}
      <div className="sticky top-24 h-fit">
        <YamlPreview data={values} />
      </div>
    </div>
  );
}
