"use client";

import { SchemaNode } from "@/schema/types";
import { setValueAtPath } from "@/utils/schemaPath";
import ArrayObjectEditor from "./ArrayObjectEditor";
import CollapsibleSection from "./CollapsibleSection";


type Props = {
  schema: SchemaNode;
  value: any;
  onChange: (value: any) => void;
  path?: string[];
  rootValue?: any; // 👈 NEW
};

export default function SchemaRenderer({
  schema,
  value,
  onChange,
  path = [],
  rootValue,
}: Props) {
  // Root value is set ONLY once at top level
  const canonicalRoot = rootValue ?? value ?? {};

  /* --------------------------------------------
     OBJECT
  --------------------------------------------- */
  if (schema.type === "object") {
    return (
      <div className="space-y-4">
        {Object.entries(schema.properties).map(([key, child]) => (
          <CollapsibleSection
            key={key}
            title={child.label ?? key}
            defaultOpen={false}
            // open top-level only
          >
            <SchemaRenderer
              schema={child}
              value={value?.[key]}
              path={[...path, key]}
              rootValue={canonicalRoot}
              onChange={onChange}
            />
          </CollapsibleSection>
        ))}
      </div>
    );
  }


  /* --------------------------------------------
     STRING
  --------------------------------------------- */
  if (schema.type === "string") {
    return (
      <input
        className="w-full border rounded px-3 py-2"
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            setValueAtPath(
              canonicalRoot,
              path,
              e.target.value
            )
          )
        }
      />
    );
  }

  /* --------------------------------------------
     NUMBER
  --------------------------------------------- */
  if (schema.type === "number") {
    return (
      <input
        type="number"
        className="w-full border rounded px-3 py-2"
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            setValueAtPath(
              canonicalRoot,
              path,
              e.target.value === ""
                ? undefined
                : Number(e.target.value)
            )
          )
        }
      />
    );
  }

  /* --------------------------------------------
     BOOLEAN
  --------------------------------------------- */
  if (schema.type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) =>
          onChange(
            setValueAtPath(
              canonicalRoot,
              path,
              e.target.checked
            )
          )
        }
      />
    );
  }

  /* --------------------------------------------
     LIST
  --------------------------------------------- */
  if (schema.type === "list") {
    return (
      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="One value per line"
        value={(value ?? []).join("\n")}
        onChange={(e) =>
          onChange(
            setValueAtPath(
              canonicalRoot,
              path,
              e.target.value
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean)
            )
          )
        }
      />
    );
  }

  /* --------------------------------------------
     ARRAY
  --------------------------------------------- */
  if (schema.type === "array") {
    return (
      <ArrayObjectEditor
        label={schema.label ?? "Items"}
        value={value ?? []}
        schema={schema.item}
        onChange={(next) =>
          onChange(
            setValueAtPath(
              canonicalRoot,
              path,
              next
            )
          )
        }
      />
    );
  }

  return null;
}
