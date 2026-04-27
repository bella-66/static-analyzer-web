import { useState, type ReactNode } from "react";
import Button from "../Button";
import { IoClose } from "react-icons/io5";
import { FiCheck, FiLoader } from "react-icons/fi";
import { useSettings } from "../../context/SettingsProvider";

interface ModalPageContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
}

function ModalPageContent({
  title,
  subtitle,
  children,
  onClose,
}: ModalPageContentProps) {
  const { saveSettings } = useSettings();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const handleSave = async () => {
    if (saveState !== "idle") return;
    setSaveState("saving");

    await saveSettings();

    await new Promise((resolve) => setTimeout(resolve, 400));
    setSaveState("saved");

    setTimeout(() => setSaveState("idle"), 1000);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-card">
      <div className="px-6 pt-8 border-b border-border bg-bg-secondary/30">
        <div className="flex items-center justify-between gap-4">
          <h5>{title}</h5>
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
        <p className="text-text-secondary mb-6 max-w-[85%] mt-1">{subtitle}</p>
      </div>

      <div className="grow overflow-y-auto custom-scrollbar flex flex-col">
        <div className="p-8 grow">{children}</div>

        <div className="border-t border-border flex flex-col gap-">
          <div className="flex items-center self-end gap-4 px-6 pb-8 pt-6">
            <Button label="Cancel" variant="outline" onClick={onClose} />
            <Button
              label={
                saveState === "saving"
                  ? "Saving..."
                  : saveState === "saved"
                    ? "Saved!"
                    : "Save changes"
              }
              variant={saveState === "saved" ? "outline" : "primary"}
              onClick={handleSave}
              disabled={saveState === "saving"}
              icon={
                saveState === "saving" ? (
                  <FiLoader className="animate-spin" />
                ) : saveState === "saved" ? (
                  <FiCheck className="text-green-500" />
                ) : undefined
              }
              className={
                saveState === "saved"
                  ? "border-green-500! text-green-500! bg-green-500/10! pointer-events-none transition-all duration-300"
                  : "transition-all duration-300"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPageContent;
