"use client";

import { ReactNode, useState } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({
  content,
  children,
  side = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`
            absolute z-50
            ${positionClasses[side]}
            px-3 py-1.5
            text-xs
            rounded-lg
            bg-black text-white
            dark:bg-white dark:text-black
            shadow-lg
            whitespace-nowrap
            animate-tooltip
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}
