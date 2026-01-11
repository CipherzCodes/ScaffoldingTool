"use client";

import { Template } from "@/types/template";

type TemplateGridProps = {
  templates: Template[];
  onSelect: (template: Template) => void;
  onBack: () => void;
};

export default function TemplateGrid({
  templates,
  onSelect,
}: TemplateGridProps) {
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  return (
    <div
      className="
        mt-4
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-6
      "
    >
      {templates.map((tpl) => (
        <div
          key={capitalizeWords(tpl.id)}
          onClick={() => onSelect(tpl)}
          className="
            rounded-xl
            border border-gray-200 dark:border-neutral-800
            bg-white dark:bg-neutral-900
            p-6
            cursor-pointer
            transition-all duration-200 ease-out
            hover:-translate-y-1
            hover:shadow-lg
            hover:border-black dark:hover:border-neutral-600
          "
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {tpl.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {tpl.description}
          </p>
        </div>
      ))}
    </div>
  );
}
