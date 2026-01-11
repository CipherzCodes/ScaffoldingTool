// src/types/template.ts
import { SchemaNode } from "@/schema/types";

export type Template = {
  id: string;
  name: string;
  description: string;
  schema: SchemaNode;
};
