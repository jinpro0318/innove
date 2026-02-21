"use client";

import { motion } from "framer-motion";

export interface SelectorOption {
  value: string;
  label: string;
  icon?: string;
  sub?: string;
}

interface OptionSelectorProps {
  options: SelectorOption[];
  onSelect: (value: string, label: string) => void;
  layout?: "grid-2" | "grid-4" | "buttons";
}

export default function OptionSelector({
  options,
  onSelect,
  layout = "buttons",
}: OptionSelectorProps) {
  const gridClass =
    layout === "grid-4"
      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
      : layout === "grid-2"
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5"
        : "flex flex-wrap gap-2.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={gridClass}
    >
      {options.map((opt, i) => (
        <motion.button
          key={opt.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          onClick={() => onSelect(opt.value, opt.label)}
          className={`group text-left rounded-xl border border-primary/20 bg-white/5 px-4 py-3 text-sm transition-all hover:border-primary/50 hover:bg-primary/10 active:scale-[0.97] ${
            layout === "buttons" ? "flex-1 min-w-[140px]" : ""
          }`}
        >
          {opt.icon && (
            <span className={layout === "buttons" ? "mr-2" : "block text-2xl mb-1.5"}>
              {opt.icon}
            </span>
          )}
          <span className={layout === "buttons" ? "" : "block"}>
            <span className="text-gray-200 group-hover:text-white">
              {opt.label}
            </span>
            {opt.sub && (
              <span className="block text-xs text-gray-500 mt-0.5">{opt.sub}</span>
            )}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
