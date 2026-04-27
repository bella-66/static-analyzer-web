import { IoClose } from "react-icons/io5";
import Help from "./Help";

interface HelpModalContentProps {
  onClose: () => void;
}

function HelpModalContent({ onClose }: HelpModalContentProps) {
  return (
    <div className="bg-card w-[90vw] max-w-225 h-[85vh] rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl">
      <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-bg-secondary/30 sticky top-0">
        <div>
          <h4 className="font-bold tracking-tight text-text-body">
            Help & Resources
          </h4>
          <p className="text-text-secondary text-sm">
            Everything you need to know about using SecureScan.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 cursor-pointer rounded-full border border-border flex items-center justify-center transition-all active:scale-95 group shadow-sm bg-card"
        >
          <IoClose
            size={24}
            className="text-text-secondary group-hover:text-text-body transition-colors"
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-8">
          <Help />
        </div>
      </div>

      <div className="px-8 py-4 bg-bg-secondary/50 border-t border-border flex items-center justify-between text-xs text-text-secondary">
        <p>© 2026 Java Vulnerability Scanner. All rights reserved.</p>
        {/* <div className="flex items-center gap-6">
          <a
            href="#"
            className="hover:text-primary transition-colors font-medium"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors font-medium"
          >
            Terms of Service
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default HelpModalContent;
