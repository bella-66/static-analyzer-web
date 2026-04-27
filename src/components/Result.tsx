import { MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { PiWarningBold } from "react-icons/pi";

interface ResultProps {
  id: number;
  title?: string;
  cwe?: string[];
  message: string;
  line: number;
  path: string;
  severity: string;
}

interface ResultComponentProps extends ResultProps {
  onSelect: (id: number) => void;
  selected: boolean;
}

function Result({
  id,
  title,
  line,
  path,
  severity,
  selected,
  onSelect,
}: ResultComponentProps) {
  const formatPath = (path: string, depth = 3) => {
    const parts = path.split("/");
    if (parts.length <= depth) return path;
    return "…/" + parts.slice(-depth).join("/");
  };

  return (
    <div
      className={`group cursor-pointer duration-75 ease-in-out relative 
        border-border flex flex-wrap flex-col sm:flex-row items-start justify-between gap-4 sm:items-center py-5 px-8 not-last:border-b border-b-border ${
          selected
            ? "bg-primary/5 border-primary shadow-inner border-l-3"
            : "border-transparent hover:bg-bg-secondary/50"
        }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div
          className={`p-2.5 rounded-xl transition-colors ${
            severity === "ERROR"
              ? selected
                ? "bg-error/20 text-error"
                : "bg-error/10 group-hover:bg-error/20 text-error"
              : severity === "WARNING"
                ? selected
                  ? "bg-warning/20 text-warning"
                  : "bg-warning/10 group-hover:bg-warning/20 text-warning"
                : selected
                  ? "bg-success/20 text-success"
                  : "bg-success/10 group-hover:bg-success/20 text-success"
          }`}
        >
          {severity === "ERROR" ? (
            <MdErrorOutline size={22} />
          ) : severity === "WARNING" ? (
            <PiWarningBold size={22} />
          ) : (
            <MdInfoOutline size={22} />
          )}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <p
              className={`text-xl font-bold duration-75 transition-colors ${selected ? "text-primary" : "text-text-body"}`}
            >
              {title || "Security Issue"}
            </p>
            {selected && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          {/* <div className="text-xs font-medium text-text-secondary">
            <p>{cwe?.[0]}</p>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p
          title={`${path}:${line}`}
          className="text-sm font-mono text-text-secondary group-hover:text-text-body duration-75 transition-colors"
        >
          {formatPath(path)}:{line}
        </p>
      </div>
    </div>
  );
}

export default Result;
