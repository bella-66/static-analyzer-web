import { useEffect, useState } from "react";
import Button from "../Button";
import { IoAdd, IoCheckmark, IoClose } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import { LuFolderX, LuFileX, LuLayoutList } from "react-icons/lu";
import { useSettings } from "../../context/SettingsProvider";

interface ExclusionPattern {
  id: number;
  pattern: string;
  type: "folder" | "file";
}

function Exclusions() {
  const {
    settings: { exclusions },
    changeSettings,
  } = useSettings();

  const [patterns, setPatterns] = useState<ExclusionPattern[]>([]);

  const isFolder = (pattern: string) =>
    pattern.trim().at(-1) == "/" || pattern.trim().includes("**");

  useEffect(() => {
    setPatterns(
      exclusions.map((e, idx) => ({
        id: idx,
        pattern: e,
        type: isFolder(e) ? "folder" : "file",
      })),
    );
  }, [exclusions]);

  const [isAdding, setIsAdding] = useState(false);
  const [newPattern, setNewPattern] = useState("");

  const handleAddPattern = () => {
    let pattern = newPattern.trim();
    if (pattern) {
      // pattern = isFolder(pattern) ? pattern : pattern.concat(".java"),
      changeSettings("exclusions", [...exclusions, pattern]);
      setNewPattern("");
      setIsAdding(false);
    }
  };

  const handleRemovePattern = (id: number) => {
    changeSettings(
      "exclusions",
      patterns.filter((p) => p.id !== id).map((p) => p.pattern),
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-text-secondary leading-relaxed">
          Specify files or directories to exclude from the security analysis.
          Use{" "}
          <code className="bg-bg-secondary px-1.5 py-0.5 rounded text-primary text-xs font-mono">
            glob
          </code>{" "}
          patterns for flexible matching. It uses the same syntax as gitignore,
          which is documented at{" "}
          <a
            href="https://git-scm.com/docs/gitignore#_pattern_format"
            target="_blank"
            className="underline!"
          >
            gitignore pattern format.
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between py-3.5 px-5 bg-bg-secondary/50 gap-4 border-b border-border">
          <div className="flex items-center gap-2">
            <LuLayoutList className="text-primary" size={18} />
            <p className="font-semibold text-text-body">Active Exclusions</p>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {exclusions.length}
            </span>
          </div>
          <Button
            label="Add Pattern"
            icon={<IoAdd />}
            variant="outline"
            className="py-1.5! px-3! text-sm"
            onClick={() => setIsAdding(true)}
          />
        </div>

        <div className="divide-y divide-border">
          {isAdding && (
            <div className="flex bg-primary/5 items-center justify-between gap-4 py-3 px-5 border-b border-primary/20 animate-in slide-in-from-top-1 duration-200">
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <IoAdd className="text-primary" size={18} />
                </div>
                <input
                  autoFocus
                  className="bg-transparent outline-none flex-1 min-w-0 font-medium text-text-body placeholder:text-text-secondary/40 placeholder:font-normal"
                  placeholder="Enter pattern (e.g. build/ or *.log)"
                  value={newPattern}
                  onChange={(e) => setNewPattern(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddPattern();
                    if (e.key === "Escape") setIsAdding(false);
                  }}
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleAddPattern}
                  className="text-success cursor-pointer hover:bg-success/10 p-2 rounded-lg transition-colors"
                >
                  <IoCheckmark size={20} />
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-text-secondary cursor-pointer hover:bg-bg-disabled p-2 rounded-lg transition-colors"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>
          )}

          {patterns.length === 0 && !isAdding ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-3">
                <LuLayoutList className="text-text-secondary/40" size={24} />
              </div>
              <p className="font-medium text-text-body">
                No exclusions defined
              </p>
              <p className="text-sm text-text-secondary max-w-50 mt-1">
                All files in the project will be included in the scan.
              </p>
            </div>
          ) : (
            patterns.map((item) => (
              <div
                key={item.id}
                className="flex bg-card hover:bg-bg-secondary/30 transition-colors items-center justify-between gap-4 py-3 px-5 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      item.type === "folder"
                        ? "bg-warning/10 text-warning"
                        : "bg-information/10 text-information"
                    }`}
                  >
                    {item.type === "folder" ? (
                      <LuFolderX size={16} />
                    ) : (
                      <LuFileX size={16} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-text-body font-mono text-sm break-all">
                      {item.pattern}
                    </p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-tight font-semibold">
                      {item.type} exclusion
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemovePattern(item.id)}
                  className="opacity-0 group-hover:opacity-100 text-text-secondary cursor-pointer hover:text-error hover:bg-error/10 p-2 rounded-lg transition-all"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Exclusions;
