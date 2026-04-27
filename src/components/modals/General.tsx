import SettingGroup from "./SettingGroup";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import { useTheme } from "../../context/ThemeProvider";
import { useSettings } from "../../context/SettingsProvider";
import type { Settings } from "../../context/SettingsProvider";

function General() {
  const { theme, setTheme } = useTheme();
  const { settings, changeSettings, toggleSettings } = useSettings();

  // const handleSelect = (key: keyof typeof securitySettings, value: string) => {
  //   setSecuritySettings((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  return (
    <div className="space-y-10 pb-6 overflow-y-auto custom-scrollbar">
      <SettingGroup
        label="Appearance"
        description="Customize how the static analyzer interface looks on your device."
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
          {[
            {
              id: "light",
              label: "Light",
              color: "bg-white border-gray-200",
            },
            {
              id: "dark",
              label: "Dark",
              color: "bg-gray-900 border-gray-800",
            },
            {
              id: "system",
              label: "System",
              color: "bg-gradient-to-br from-white to-gray-900 border-gray-400",
            },
          ].map((opt) => (
            <div
              key={opt.id}
              className={`p-3 cursor-pointer flex-1 text-center rounded-xl border transition-all duration-200 group ${
                theme !== opt.id
                  ? "border-border bg-card hover:border-border-hover"
                  : "border-primary bg-primary/5 ring-1 ring-primary"
              }`}
              onClick={() => setTheme(opt.id as "light" | "dark" | "system")}
            >
              <div
                className={`mb-3 w-full h-24 rounded-lg border ${opt.color} shadow-sm group-hover:scale-[1.02] transition-transform`}
              />
              <p
                className={`text-sm font-medium ${theme === opt.id ? "text-primary" : "text-text-primary"}`}
              >
                {opt.label}
              </p>
            </div>
          ))}
        </div>
      </SettingGroup>

      <SettingGroup label="Security Engine">
        <div className="mt-6 space-y-4">
          <div>
            <label className="font-medium mb-2 block">
              Minimum Severity Level
            </label>
            <div className="flex p-1 bg-bg-secondary rounded-lg border border-border">
              {["info", "warning", "error"].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => changeSettings("minSeverity", sev)}
                  className={`flex-1 cursor-pointer py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                    settings.minSeverity === sev
                      ? "bg-card text-primary shadow-sm border border-border"
                      : "text-text-secondary hover:text-text-body"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium mb-2 block">
              Confidence Threshold
            </label>
            <div className="flex p-1 bg-bg-secondary rounded-lg border border-border">
              {["low", "medium", "high"].map((conf) => (
                <button
                  key={conf}
                  type="button"
                  onClick={() => changeSettings("minConfidence", conf)}
                  className={`flex-1 cursor-pointer py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                    settings.minConfidence === conf
                      ? "bg-card text-primary shadow-sm border border-border"
                      : "text-text-secondary hover:text-text-body"
                  }`}
                >
                  {conf}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-text-secondary mt-1.5 px-1">
              Higher threshold reduces false positives but might miss subtle
              issues.
            </p>
          </div>
        </div>
      </SettingGroup>

      <SettingGroup label="Vulnerability Categories">
        <div className="space-y-3">
          {[
            {
              id: "secretDetection",
              label: "Secret Detection",
              desc: "Scan for hardcoded API keys, passwords, and tokens.",
              icon: FiLock,
            },
            {
              id: "correctnessIssues",
              label: "Correctness Issues",
              desc: "Scan for logical programming errors.",
              icon: FiCheckCircle,
            },
            // {
            //   id: "dependencyCheck",
            //   label: "Dependency Audit",
            //   desc: "Check package.json for known vulnerable packages (CVEs).",
            //   icon: FiPackage,
            // },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleSettings(item.id as keyof Settings)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-border-hover transition-all cursor-pointer group gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="shrink-0 p-2.5 rounded-xl bg-bg-secondary text-primary group-hover:bg-primary/10 transition-colors mt-0.5 sm:mt-0">
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{item.label}</p>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="flex justify-end w-full sm:w-auto pr-1 sm:pr-0">
                <div
                  className={`shrink-0 w-10 h-6 rounded-full transition-all flex items-center px-1 ${settings[item.id as keyof Settings] ? "bg-primary" : "bg-border-disabled"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all ${settings[item.id as keyof Settings] ? "translate-x-4" : "translate-x-0"}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SettingGroup>
    </div>
  );
}

export default General;
