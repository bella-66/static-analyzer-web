import { useState } from "react";
import ModalPageContent from "./ModalPageContent";
import SettingsMenu from "./SettingsMenu";
import General from "./General";
import Exclusions from "./Exclusions";
import Reporting from "./Reporting";

const headerOptions: HeaderOptions = {
  general: {
    title: "General Settings",
    subtitle: "Manage global application preferences and behavior.",
  },
  exclusions: {
    title: "Exclusions & Ignore Lists",
    subtitle:
      "Define paths, patterns and file extensions that should be skipped during security scans. Excluded files are not analyzed for vulnerabilities.",
  },
  reporting: {
    title: "Reporting Configuration",
    subtitle: "Customize the format and content of your security scan reports.",
  },
};

interface ModalContentProps {
  onClose: () => void;
}

function ModalContent({ onClose }: ModalContentProps) {
  const [active, setActive] = useState<SettingOption>("general");

  return (
    <div className="flex flex-col md:grid md:grow md:grid-cols-[280px_1fr] bg-bg mx-4 md:mx-10 w-[95vw] md:w-[90vw] max-w-275 h-[95vh] md:h-[85vh] rounded-xl overflow-hidden border border-border">
      <SettingsMenu active={active} setActive={setActive} />

      <ModalPageContent
        title={headerOptions[active].title}
        subtitle={headerOptions[active].subtitle}
        onClose={onClose}
      >
        {active === "general" && <General />}
        {active === "exclusions" && <Exclusions />}
        {active === "reporting" && <Reporting />}
      </ModalPageContent>
    </div>
  );
}

export default ModalContent;
