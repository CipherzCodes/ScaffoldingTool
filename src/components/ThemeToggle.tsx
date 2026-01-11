"use client";

export default function ThemeToggle() {
  return (
    <button
      onClick={() =>
        document.documentElement.classList.toggle("dark")
      }
      className="text-xs px-3 py-1 border rounded-md"
    >
      Toggle theme
    </button>
  );
}
