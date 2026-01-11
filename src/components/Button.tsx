"use client";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  variant = "primary",
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition active:scale-[0.98]";

  const variants = {
    primary:
      "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
    secondary:
      "border border-gray-300 text-gray-700 hover:border-black hover:text-black hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-white",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed pointer-events-none active:scale-100";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={[
        base,
        variants[variant],
        disabled && disabledStyles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
