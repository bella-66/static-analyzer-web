import SettingsMenuItem from "./SettingsMenuItem";
import { LuLayoutGrid, LuFileText, LuShieldOff } from "react-icons/lu";

interface SettingsMenuProps {
  active: SettingOption;
  setActive: (activeItem: SettingOption) => void;
}

function SettingsMenu({ active, setActive }: SettingsMenuProps) {
  return (
    <div className="bg-bg-secondary p-4 md:px-6 md:py-8 border-b md:border-b-0 md:border-r border-border md:h-full shrink-0">
      <h6 className="hidden md:block">Settings</h6>

      <div className="md:mt-8 flex flex-row overflow-x-auto space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <SettingsMenuItem
          icon={<LuLayoutGrid size={18} />}
          label="General"
          active={active === "general"}
          onClick={() => setActive("general")}
        />
        <SettingsMenuItem
          icon={<LuShieldOff size={18} />}
          label="Exclusions"
          active={active === "exclusions"}
          onClick={() => setActive("exclusions")}
        />
        <SettingsMenuItem
          icon={<LuFileText size={18} />}
          label="Reporting"
          active={active === "reporting"}
          onClick={() => setActive("reporting")}
        />
      </div>
    </div>
  );
}

export default SettingsMenu;
