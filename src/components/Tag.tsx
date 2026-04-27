import React from "react";

const colorStyles = {
  white: {
    base: "bg-card border-border text-text-body hover:border-primary/30",
    selected: "bg-primary/7 border-primary text-primary shadow-sm",
    dot: "bg-border",
    count:
      "bg-bg-secondary text-text-secondary group-hover:bg-primary/10 group-hover:text-primary",
  },
  red: {
    base: "bg-card border-border text-text-body hover:border-error/30",
    selected: "bg-error/7 border-error text-error shadow-sm",
    dot: "bg-error animate-pulse",
    count: "bg-error/10 text-error group-hover:bg-error/20",
  },
  orange: {
    base: "bg-card border-border text-text-body hover:border-warning/30",
    selected: "bg-warning/7 border-warning text-warning shadow-sm",
    dot: "bg-warning",
    count: "bg-warning/10 text-warning group-hover:bg-warning/20",
  },
  green: {
    base: "bg-card border-border text-text-body hover:border-success/30",
    selected: "bg-success/7 border-success text-success shadow-sm",
    dot: "bg-success",
    count: "bg-success/10 text-success group-hover:bg-success/20",
  },
} as const;

type Color = keyof typeof colorStyles;

interface TagProps {
  color: Color;
  count: number;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

function Tag({ color, count, label, selected, onClick }: TagProps) {
  const styles = colorStyles[color];
  const activeStyles = selected ? styles.selected : styles.base;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 ease-in-out cursor-pointer active:scale-95 ${activeStyles}`}
    >
      <div className="flex items-center gap-2">
        {color !== "white" && (
          <span
            className={`w-2 h-2 rounded-full ${styles.dot} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
          />
        )}
        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </div>

      <span
        className={`flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full transition-colors ${selected ? "bg-white/10" : styles.count}`}
      >
        {count}
      </span>
    </button>
  );
}

export default Tag;
