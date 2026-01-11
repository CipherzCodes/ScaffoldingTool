"use client";

import SchemaRenderer from "./SchemaRenderer";
import Button from "@/components/Button";

type Props = {
  label: string;
  value: any[];
  schema: any;
  onChange: (value: any[]) => void;
};

export default function ArrayObjectEditor({
  label,
  value = [],
  schema,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{label}</h3>

        <Button
          variant="secondary"
          onClick={() =>
            onChange([...value, schema.defaultItem ?? {}])
          }
        >
          + Add
        </Button>
      </div>

      {/* Items */}
      {value.length === 0 && (
        <div className="text-xs text-gray-500">
          No entries added yet
        </div>
      )}

      {value.map((item, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 space-y-4 relative"
        >
          <button
            className="absolute top-2 right-2 text-xs text-red-500"
            onClick={() =>
              onChange(value.filter((_, i) => i !== index))
            }
          >
            Remove
          </button>

          <SchemaRenderer
            schema={schema}
            value={item}
            path={[]}
            onChange={(updated) => {
              const next = [...value];
              next[index] = updated;
              onChange(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}
