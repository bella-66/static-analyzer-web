import { BiWrench } from "react-icons/bi";
import { BsCaretRight } from "react-icons/bs";
import { IoShare } from "react-icons/io5";
import {
  LuBookOpen,
  LuFile,
  LuLayoutDashboard,
  LuShield,
} from "react-icons/lu";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useSettings } from "../context/SettingsProvider";

interface ResultCardProps {
  result: SemgrepResult;
}

function ResultCard({ result }: ResultCardProps) {
  const { settings } = useSettings();

  const formatPath = (path: string, depth = 3) => {
    const parts = path.split("/");
    if (parts.length <= depth) return path;
    return "…/" + parts.slice(-depth).join("/");
  };

  return (
    <div className="bg-card flex flex-col rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="relative overflow-hidden group">
        <div
          className={`absolute top-0 left-0 w-1 h-full ${
            result.extra.severity === "ERROR"
              ? "bg-error"
              : result.extra.severity === "WARNING"
                ? "bg-warning"
                : "bg-success"
          }`}
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    result.extra.severity === "ERROR"
                      ? "text-error border-error/20 bg-error/5"
                      : result.extra.severity === "WARNING"
                        ? "text-warning border-warning/20 bg-warning/5"
                        : "text-success border-success/20 bg-success/5"
                  }`}
                >
                  {result.extra.severity === "ERROR"
                    ? "CRITICAL"
                    : result.extra.severity}{" "}
                  Severity
                </span>
                {result.extra.metadata.confidence && (
                  <span className="flex items-center gap-1.5 bg-bg-secondary/50 text-text-secondary border border-border/50 rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    <span
                      className={`block w-2 h-2 rounded-full ${
                        result.extra.metadata.confidence.toUpperCase() ===
                        "HIGH"
                          ? "bg-error"
                          : result.extra.metadata.confidence.toUpperCase() ===
                              "MEDIUM"
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                    />
                    <span className="truncate">
                      {result.extra.metadata.confidence} Confidence
                    </span>
                  </span>
                )}
              </div>
              <h4 className="font-bold tracking-tight text-text-body mt-2">
                {result.extra.metadata.title || "Security Issue"}
              </h4>
              {result.extra.metadata.vulnerability_class && (
                <p className="text-sm text-text-secondary mt-2.5 flex items-center gap-1.5 font-medium">
                  <BsCaretRight className="text-primary w-3.5 h-3.5" />
                  Potentially leads to
                  <span className="text-text-body px-1.5 py-0.5 rounded border border-border/50 bg-bg-secondary/50">
                    {result.extra.metadata.vulnerability_class}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-x-6 gap-y-3 px-6 py-3 bg-bg-secondary/50 border-y border-border">
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <LuFile className="w-4 h-4 text-primary" />
          <span className="font-medium truncate max-w-50" title={result.path}>
            {result.path.split("/").pop()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <LuLayoutDashboard className="w-4 h-4 text-primary" />
          <span>
            Line {result.start.line}:{result.start.col}
          </span>
        </div>
        {result.extra.metadata.cwe?.[0] && (
          <Tooltip title={result.extra.metadata.cwe[0]} arrow placement="top">
            <div className="flex items-center gap-2 text-text-secondary text-sm cursor-help">
              <LuShield className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {result.extra.metadata.cwe[0].split(":")[0]}
              </span>
            </div>
          </Tooltip>
        )}
      </div>

      <div className="p-6 space-y-12">
        <div>
          <h6 className="font-bold text-text-body mb-3">Description</h6>
          <div className="bg-bg-secondary/50 px-4 py-3 rounded-lg border border-border">
            <p className="text-text-body leading-relaxed wrap-break-word">
              {result.extra.message}
            </p>
          </div>
        </div>

        {settings.showCodeSnippets && (
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-x-2 justify-between">
              <h6 className="font-bold text-text-body mb-3">Affected Code</h6>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl">
              <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>

                <span className="text-xs text-slate-400 font-mono ml-2 truncate">
                  {formatPath(result.path)}
                </span>
                <span className="text-xs ml-auto font-mono text-text-secondary px-2 py-0.5 bg-bg-code in-[.dark]:bg-bg-secondary rounded">
                  Lines {result.start.line}-{result.end.line}
                </span>
              </div>
              <div className="bg-[#0f172a] font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="w-max min-w-full">
                  {result.extra.lines.split("\n").map((line, i) => (
                    <div
                      key={i}
                      className="flex bg-red-400/10 border-l-4 border-red-500/50"
                    >
                      <div className="px-3 py-1.5 text-slate-500 select-none bg-slate-800/20">
                        {(result.start.line || 0) + i}
                      </div>
                      <pre className="py-1.5 px-3 text-slate-300">
                        <code>{line.trim() || " "}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {settings.showRemediation && result.extra.metadata.remediation && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border- border-border">
              <BiWrench className="text-primary text-xl" />
              <h6 className="font-bold text-text-body">Remediation Steps</h6>
            </div>
            <ul className="grid gap-3">
              {result.extra.metadata.remediation.map((step, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-text-body bg-bg-secondary/30 p-3 rounded-lg border border-border/50"
                >
                  <span className="shrink-0 w-9 h-9 sm:w-8 sm:h-8 text-sm flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold sm:text-xs">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {settings.showCodeFixes && result.extra.fix && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2">
              <MdOutlineAutoFixHigh className="text-emerald-500 text-xl" />
              <h6 className="font-bold text-text-body">Suggested Fix</h6>
            </div>

            <div className="bg-emerald-50/80 in-[.dark]:bg-emerald-950/20 border border-emerald-200 in-[.dark]:border-emerald-800/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-600 in-[.dark]:text-emerald-400 bg-emerald-100 in-[.dark]:bg-emerald-900/40 px-2 py-1 rounded">
                  Safe Sample Code
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(result.extra.fix || "")
                  }
                  className="text-xs cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700 in-[.dark]:text-emerald-400 in-[.dark]:hover:text-emerald-600 hover:underline transition-all"
                >
                  Copy Fix
                </button>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm shadow-inner overflow-x-auto">
                <code className="text-slate-200 leading-relaxed block w-max min-w-full">
                  {result.extra.fix.split("\n").map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.trim() || " "}
                    </div>
                  ))}
                </code>
              </div>
            </div>
          </div>
        )}

        {result.extra.metadata.references && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <LuBookOpen className="text-primary text-xl" />
              <h6 className="font-bold text-text-body">Quick References</h6>
            </div>
            <div className="grid gap-2">
              {result.extra.metadata.references.slice(0, 3).map((r, idx) => (
                <a
                  key={idx}
                  href={r}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm min-w-0"
                >
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded bg-bg-secondary group-hover:bg-primary/10 transition-colors">
                    <IoShare className="text-text-secondary group-hover:text-primary" />
                  </div>

                  <p className="text-text-secondary min-w-0 flex-1 group-hover:text-primary font-medium line-clamp-1">
                    {r}
                  </p>
                  <BsCaretRight className="text-text-secondary shrink-0 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
