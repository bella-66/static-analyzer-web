type SemgrepResult = {
  id: number;
  check_id: string;
  path: string;
  start: {
    line: number;
    col: number;
  };
  end: {
    line: number;
    col: number;
  };
  extra: {
    lines: string;
    message: string;
    severity: string;
    fix?: string;
    metadata: {
      title?: string;
      vulnerability_class?: string;
      cwe?: string[];
      subcategory?: string[];
      owasp?: string[];
      references?: string[];
      confidence?: string;
      likelihood?: string;
      impact?: string;
      remediation?: string[];
    };
  };
};

type Filters = {
  severity: string;
  confidence: string | null;
  vulnClass: string | null;
};

type HeaderOption = {
  title: string;
  subtitle: string;
};

type SettingOption = "general" | "exclusions" | "reporting";

type HeaderOptions = Record<SettingOption, HeaderOption>;
