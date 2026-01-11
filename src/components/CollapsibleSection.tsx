"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-neutral-800 ">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex items-center justify-between
          px-4 py-3 text-sm font-medium
          bg-gray-50 dark:bg-neutral-900
          hover:bg-gray-100 dark:hover:bg-neutral-800
          rounded-t-xl
        "
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
