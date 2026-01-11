// src/types/config.ts
export type ConfigRow = {
  id: string;
  user_id: string;
  name: string;
  language: "Python" | "C#";
  template: string;
  yaml: any;
  created_at: string;
  updated_at: string;
};
