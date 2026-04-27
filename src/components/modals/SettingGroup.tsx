import { type ReactNode } from "react";

interface SettingGroupProps {
  label: string;
  description?: string;
  children: ReactNode;
}

function SettingGroup({ label, description, children }: SettingGroupProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold mb-0.5">{label}</p>
        {description && (
          <p className="text-sm text-text-secondary font-medi">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export default SettingGroup;
