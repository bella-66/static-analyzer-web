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
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="text-card">
            <svg
              width={48}
              height={48}
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="navbarlogo"
              aria-label="SAST Analyzer"
            >
              <rect width="256" height="256" rx="48" fill="none" />
              <path
                d="M128 40L200 72V124C200 176 167 219 128 232C89 219 56 176 56 124V72L128 40Z"
                fill="#1E293B"
                stroke="#38BDF8"
                strokeWidth="8"
              />
              <path
                d="M102 98L78 128L102 158"
                stroke="#38BDF8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M154 98L178 128L154 158"
                stroke="#38BDF8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="128" cy="128" r="18" fill="#22C55E" />
              <path
                d="M128 104V152"
                stroke="#0F172A"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M104 128H152"
                stroke="#0F172A"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
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
