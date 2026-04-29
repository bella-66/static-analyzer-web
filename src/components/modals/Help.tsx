import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiBook,
  FiCommand,
  FiChevronRight,
  FiShield,
  FiAlertTriangle,
  FiLock,
  FiCode,
} from "react-icons/fi";
import { getRules } from "../../data/rulesList";

function Help() {
  const ruleCategories = [
    {
      title: "Secret Leaks",
      desc: "Finds hardcoded credentials, API keys, and tokens. Hardcoded secrets can easily leak into version control, granting attackers immediate unauthorized access.",
      icon: FiAlertTriangle,
      color: "text-amber-500",
    },
    {
      title: "Correctness Issues",
      desc: "Identifies logical programming errors and dangerous code patterns that can cause crashes or act as vectors for complex exploits.",
      icon: FiCommand,
      color: "text-primary",
    },
    {
      title: "Input Validation",
      desc: "Detects insecure handling of untrusted data leading to vulnerabilities like SQL injection, XSS, and command injection.",
      icon: FiCode,
      color: "text-information",
    },
    {
      title: "Cryptography",
      desc: "Flags weak cryptographic algorithms, insufficient key sizes, and insecure random number generators that weaken data protection.",
      icon: FiLock,
      color: "text-purple-500",
    },
  ];

  const docs = [
    {
      title: "Getting Started",
      desc: "Learn the basics of static analysis and how to run your first scan.",
      icon: FiBook,
      color: "bg-information/10 text-information",
      link: "https://github.com/bella-66/static-analyzer-web/blob/main/docs/getting-started.md",
    },
    {
      title: "Security Rules",
      desc: "Detailed documentation for all the security rules and CWEs we detect.",
      icon: FiCommand,
      color: "bg-primary/10 text-primary",
      link: "https://github.com/bella-66/static-analyzer-web/blob/main/docs/security-rules.md",
    },
  ];

  const specificRules = getRules();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const query = searchQuery.toLowerCase();

  const filteredDocs = docs.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.desc.toLowerCase().includes(query),
  );

  const filteredSpecificRules = specificRules.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.desc.toLowerCase().includes(query) ||
      r.id.toLowerCase().includes(query),
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-4">
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors text-lg" />
        <input
          type="text"
          value={searchQuery}
          ref={inputRef}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search through 100+ documentation guides and rules..."
          className="w-full bg-bg-secondary border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium placeholder:font-normal placeholder:text-text-secondary/60"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40 group-focus-within:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold border border-border px-1.5 py-0.5 rounded shadow-sm bg-card uppercase tracking-widest">
            Ctrl
          </span>
          <span className="text-[10px] font-bold border border-border px-1.5 py-0.5 rounded shadow-sm bg-card uppercase tracking-widest">
            K
          </span>
        </div>
      </div>

      {filteredDocs.length === 0 && filteredSpecificRules.length === 0 && (
        <div className="py-12 text-center text-text-secondary bg-bg-secondary/20 rounded-2xl border border-border">
          <FiSearch className="mx-auto text-3xl mb-3 opacity-20" />
          <p className="text-sm font-medium">
            No results found for "{searchQuery}"
          </p>
          <p className="text-xs mt-1 opacity-60">
            Try searching for different keywords or checking for typos.
          </p>
        </div>
      )}

      {query && filteredSpecificRules.length > 0 && (
        <div className="space-y-4">
          <h6 className="font-bold text-sm text-text-body flex items-center gap-2">
            <div className="w-1.5 h-4 bg-primary rounded-full" />
            Specific Rules
          </h6>
          <div className="flex flex-col gap-2">
            {filteredSpecificRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div
                  onClick={() =>
                    setExpandedRule(expandedRule === rule.id ? null : rule.id)
                  }
                  className="flex items-center justify-between p-3.5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-bg-secondary group-hover:bg-primary/5 transition-colors ${rule.color}`}
                    >
                      <rule.icon className="text-lg" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-text-body">
                          {rule.name}
                        </p>
                        {/* <span className="text-[10px] font-bold text-text-secondary bg-bg-secondary px-1.5 py-0.5 rounded tracking-wider uppercase">
                          security or correctness
                        </span> */}
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                  <FiChevronRight
                    className={`text-text-secondary/40 transition-transform ${expandedRule === rule.id ? "rotate-90 text-primary" : "group-hover:text-primary"}`}
                  />
                </div>

                {expandedRule === rule.id && (
                  <div className="px-3 pb-3">
                    <div className="p-3 bg-bg-secondary rounded-lg border border-border/50 space-y-3">
                      <div>
                        <p className="text-xs text-error font-medium mb-0.5 w-fit border-b border-error/20">
                          Impact
                        </p>
                        <p className="text-[11px] text-text-secondary mt-1">
                          {rule.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery.length === 0 && (
        <div className="p-5 flex flex-col md:flex-row gap-5 items-start rounded-2xl border border-primary/20 bg-primary/5">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 mt-1">
            <FiShield className="text-2xl" />
          </div>
          <div className="space-y-4 w-full">
            <div>
              <h6 className="font-bold text-text-body text-sm mb-1">
                100+ Detection Rules
              </h6>
              <p className="text-xs text-text-secondary">
                Our scanning engine actively checks your codebase against over
                100 curated security rules and logical patterns to prevent
                potential breaches and application failures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 pt-1">
              {ruleCategories.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-card border border-border shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <rule.icon className={rule.color} />
                    <p className="text-[13px] font-bold text-text-body">
                      {rule.title}
                    </p>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredDocs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((cat, i) => (
            <a
              key={i}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <div
                className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform`}
              >
                <cat.icon />
              </div>
              <h6 className="font-bold text-text-body mb-2">{cat.title}</h6>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                {cat.desc}
              </p>
              <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-widest">
                Explore Docs <FiChevronRight />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Help;
