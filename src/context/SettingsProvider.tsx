import React, { createContext, useContext, useEffect, useState } from "react";

export interface Settings {
  deepAnalysis: boolean;
  minSeverity: string;
  minConfidence: string;
  secretDetection: boolean;
  dependencyCheck: boolean;
  correctnessIssues: boolean;
  showCodeFixes: boolean;
  exclusions: string[];
  outputFormat: string;
  showCodeSnippets: boolean;
  showRemediation: boolean;
}

interface SettingsContextType {
  settings: Settings;
  changeSettings: (key: keyof Settings, value: any) => void;
  toggleSettings: (key: keyof Settings) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("settings");
    if (saved) return JSON.parse(saved) as Settings;
    return {
      deepAnalysis: true,
      minSeverity: "info",
      minConfidence: "low",
      secretDetection: true,
      dependencyCheck: true,
      correctnessIssues: true,
      showCodeFixes: true,
      exclusions: ["test/"],
      // exclusions: [],
      outputFormat: "pdf",
      showCodeSnippets: true,
      showRemediation: true,
    };
  });

  const changeSettings = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSettings = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        changeSettings,
        toggleSettings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
