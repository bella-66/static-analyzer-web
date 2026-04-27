import SettingGroup from "./SettingGroup";
import { FiCode, FiGlobe, FiCpu } from "react-icons/fi";
import { useSettings, type Settings } from "../../context/SettingsProvider";

function Reporting() {
  // const [reportingSettings, setReportingSettings] = useState({
  //   format: "pdf",
  //   includeSnippets: true,
  //   includeRemediation: true,
  //   notifyEmail: false,
  //   notifySlack: false,
  //   reportTitle: "Vulnerability Scan",
  // });

  const { settings, toggleSettings } = useSettings();

  return (
    <div className="space-y-10 pb-6">
      <SettingGroup label="Report Customization">
        <div className="space-y-6">
          {/* <div>
            <div className="flex gap-4">
              {[
                { id: "pdf", label: "PDF Document", desc: "Best for sharing" },
                { id: "html", label: "HTML Report", desc: "Interactive web" },
                { id: "json", label: "JSON Data", desc: "For automation" },
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => changeSettings("outputFormat", fmt.id)}
                  className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all ${
                    settings.outputFormat === fmt.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-border-hover"
                  }`}
                >
                  <p
                    className={`font-medium text-sm ${settings.outputFormat === fmt.id ? "text-primary" : "text-text-body"}`}
                  >
                    {fmt.label}
                  </p>

                  <p className="text-xs text-text-secondary mt-0.5">
                    {fmt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          <div className="space-y-3">
            {[
              {
                id: "showCodeSnippets",
                label: "Include Code Snippets",
                desc: "Embed the vulnerable code lines directly in the report.",
                icon: FiCode,
              },
              {
                id: "showRemediation",
                label: "Include Remediation Steps",
                desc: "Provide step-by-step instructions on how to fix each issue.",
                icon: FiGlobe,
              },
              {
                id: "showCodeFixes",
                label: "Include Code Fixes",
                desc: "Suggest code fixes using secure coding patterns.",
                icon: FiCpu,
              },
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
        </div>
      </SettingGroup>
    </div>
  );
}

export default Reporting;
