import { type ReactNode } from "react";

interface SettingsMenuItemProps {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}

function SettingsMenuItem({
  label,
  icon,
  active,
  onClick,
}: SettingsMenuItemProps) {
  return (
    <div
      className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer shrink-0 whitespace-nowrap transition-all active:scale-[0.98] ${active ? "bg-primary-light text-primary" : "bg-transparent text-text-secondary hover:text-text-body hover:bg-bg-disabled"}`}
      onClick={onClick}
    >
      {icon}
      <p>{label}</p>
    </div>
  );
}

export default SettingsMenuItem;
