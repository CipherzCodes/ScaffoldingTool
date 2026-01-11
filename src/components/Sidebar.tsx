"use client";

import { useState } from "react";
import {
  Sparkles,
  LayoutGrid,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Tooltip from "@/components/ToolTip";
import { useRouter } from "next/navigation";

const items = [
  { name: "Overview", icon: LayoutGrid , href: "/home"},
  { name: "Documents", icon: FileText },
  { name: "Insights", icon: Sparkles },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  return (
    <aside
      className={`
        fixed left-6 top-1/2 -translate-y-1/2
        ${collapsed ? "w-16" : "w-60"}
        transition-[width] duration-300 ease-out
        rounded-2xl
        bg-white/95 dark:bg-neutral-900/95
        backdrop-blur-md
        border border-gray-200 dark:border-neutral-800
        shadow-[0_20px_40px_rgba(0,0,0,0.12)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)]
        p-4
        z-40
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-sm font-medium tracking-wide text-gray-900 dark:text-gray-100">
              Project Atlas
            </span>
          </div>
        )}

        <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              p-1.5 rounded-md
              hover:bg-gray-100
              dark:hover:bg-neutral-800
              transition
            "
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {items.map(({ name, icon: Icon, href }) => {
          const iconNode = (
            <Icon
              className={`
                ${collapsed ? "w-5 h-5" : "w-4 h-4"}
                text-gray-600 dark:text-gray-300
                transition-[width,height] duration-300 ease-out
              `}
            />
          );

          return (
            <div
              key={name}
              onClick={() =>{
                if (href) router.push(href);
              }}
              className={`
                flex items-center
                ${collapsed ? "justify-center py-3" : "gap-3 px-3 py-2"}
                rounded-lg
                text-sm
                text-gray-700 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-neutral-800;
                cursor-pointer
                transition-[padding,background-color] duration-300 ease-out
              `}
            >
              {collapsed ? (
                <Tooltip content={name} side="right">
                  {iconNode}
                </Tooltip>
              ) : (
                iconNode
              )}

              {!collapsed && (
                <span
                  className="
                    transition-[opacity,transform] duration-200 ease-out delay-75
                    opacity-100 scale-100
                  "
                >
                  {name}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
