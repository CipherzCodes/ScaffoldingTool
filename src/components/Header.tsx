"use client";

import ThemeToggle from "@/components/ThemeToggle";

const languages = ["Python", "C#"] as const;

type HeaderProps = {
  language: "Python" | "C#";
  setLanguage: (lang: "Python" | "C#") => void;
  step: number;
  title?: string;
};

export default function Header({ language, setLanguage, step, title }: HeaderProps) {
  const isLanguageLocked = step >= 2;

  return (
    <header
      className="
        sticky top-4 z-40
        mx-auto
        w-full
        max-w-7xl
        h-16 px-8
        flex items-center justify-between
        rounded-full
        bg-white/90 dark:bg-neutral-900/90
        backdrop-blur-md
        border border-gray-200 dark:border-neutral-800
        shadow-[0_12px_32px_rgba(0,0,0,0.08)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)]
        shrink-0
      "
    >
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Scaffolding Tool - {title ? title : language}
      </div>

      <div className="flex items-center gap-4">
        {languages.map((lang) => {
          const isActive = language === lang;

          return (
            <button
              key={lang}
              disabled={isLanguageLocked}
              onClick={() => {
                if (!isLanguageLocked) {
                  setLanguage(lang);
                }
              }}
              className={[
                "px-3 py-1 text-sm rounded-md transition",
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800",
                isLanguageLocked &&
                  "opacity-50 cursor-not-allowed pointer-events-none",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {lang}
            </button>
          );
        })}

        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
}
