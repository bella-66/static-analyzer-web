import { IoHelpCircleOutline, IoSettingsOutline } from "react-icons/io5";
import Button from "./Button";

interface NavbarProps {
  onSettingsClick: () => void;
  onHelpClick: () => void;
}

function Navbar({ onSettingsClick, onHelpClick }: NavbarProps) {
  return (
    <div className="border-b border-border">
      <div className="container py-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-x-3 gap-y-4">
        <div>
          <p className="font-semibold text-2xl">Java Vulnerability Scanner</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            label="Settings"
            icon={<IoSettingsOutline />}
            variant="outline"
            onClick={onSettingsClick}
          />
          <Button
            label="Help"
            icon={<IoHelpCircleOutline />}
            variant="outline"
            onClick={onHelpClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
