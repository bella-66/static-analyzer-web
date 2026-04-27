import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import Result from "./Result";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const vulnerabilityClasses = [
  { label: "Improper Input Validation", value: "injection" },
  { label: "Broken Access Control", value: "access-control" },
  { label: "Authentication & Session Issues", value: "auth" },
  { label: "Cryptographic Issues", value: "crypto" },
  { label: "Sensitive Data Exposure", value: "data-exposure" },
  { label: "Security Misconfiguration", value: "misconfiguration" },
  { label: "Logging & Monitoring Issues", value: "logging" },
  { label: "Insecure Randomness", value: "random" },
  { label: "Code Quality", value: "correctness" },
];

const confidenceLevels = [
  { label: "High Confidence", value: "high" },
  { label: "Medium Confidence", value: "medium" },
  { label: "Low Confidence", value: "low" },
];

interface ResultsListProps {
  results: SemgrepResult[];
  selected: number | null;
  onSelectResult: (id: number) => void;
  filters: Filters;
  handleChangeFilters: (value: string, key: keyof Filters) => void;
  sortOption: string;
  handleSortChange: (sort: string) => void;
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
  itemsPerPage: number;
  allResultLength: number;
}

function ResultsList({
  results,
  selected,
  onSelectResult,
  filters,
  handleChangeFilters,
  sortOption,
  handleSortChange,
  page,
  setPage,
  maxPage,
  itemsPerPage,
  allResultLength,
}: ResultsListProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="bg-card flex flex-col lg:sticky top-6 rounded-xl border flex-1 border-border">
      <div className="bg-bg-secondary flex items-center gap-4 justify-between p-6 border-b border-border rounded-t-xl">
        <div className="flex items-center flex-wrap gap-4">
          <p className="text-text-secondary font-semibold">FILTERS:</p>
          {filters.severity !== "all" && (
            <div className="bg-primary/10 flex items-center py-2 border border-primary/20 rounded-md text-primary">
              <p className="ml-3">
                Severity:{" "}
                {filters.severity === "ERROR" ? "CRITICAL" : filters.severity}
              </p>
              <button
                type="button"
                className="cursor-pointer px-3 transition-transform hover:scale-110 active:scale-90"
                onClick={() => handleChangeFilters("all", "severity")}
              >
                <IoClose />
              </button>
            </div>
          )}
          <Dropdown
            value={filters.vulnClass}
            onChange={(e) => handleChangeFilters(e.value, "vulnClass")}
            placeholder="Vulnerability Class"
            options={vulnerabilityClasses}
            showClear
            optionLabel="label"
            className="leading-0 py-2 border-border! bg-card! rounded-xl!"
          />
          <Dropdown
            value={filters.confidence}
            onChange={(e) => handleChangeFilters(e.value, "confidence")}
            placeholder="Confidence"
            options={confidenceLevels}
            showClear
            optionLabel="label"
            className="leading-0 py-2 border-border! bg-card! rounded-xl!"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`p-2 rounded-md transition-all active:scale-95 cursor-pointer hover:bg-bg-disabled ${isSortOpen ? "bg-bg-disabled text-primary" : "text-text-secondary"}`}
          >
            <TbArrowsSort size={20} />
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                <p className="px-4 py-2 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Sort By
                </p>
                {[
                  {
                    label: "Severity (High to Low)",
                    value: "severity-desc",
                  },
                  {
                    label: "Severity (Low to High)",
                    value: "severity-asc",
                  },
                  {
                    label: "Line (Ascending)",
                    value: "line-asc",
                  },
                  {
                    label: "Line (Descending)",
                    value: "line-desc",
                  },
                  { label: "File Path", value: "file-asc" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`w-full text-left cursor-pointer px-4 py-2.5 text-sm transition-colors duration-0 hover:bg-primary-light/50 flex items-center justify-between ${sortOption === opt.value ? "text-primary font-semibold bg-primary-light/30" : "text-text-body"}`}
                    onClick={() => {
                      handleSortChange(opt.value);
                      setIsSortOpen(false);
                    }}
                  >
                    {opt.label}
                    {sortOption === opt.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {results.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 mb-5 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
            <IoSearchOutline size={28} />
          </div>
          <h4 className="text-text-body mb-2">No vulnerabilities found</h4>
          <p className="text-sm text-text-secondary max-w-[320px] mx-auto leading-relaxed">
            We couldn't find any vulnerabilities matching your current filters.
            Try adjusting your criteria to see more results.
          </p>
        </div>
      ) : (
        results.map((r) => (
          <Result
            key={r.id}
            id={r.id}
            title={r.extra.metadata.title}
            cwe={r.extra.metadata.cwe}
            line={r.start.line}
            path={r.path}
            severity={r.extra.severity}
            message={r.extra.message}
            selected={selected === r.id}
            onSelect={onSelectResult}
          />
        ))
      )}

      <div className="px-6 py-4 bg-bg-secondary/30 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <LuLayoutDashboard className="w-4 h-4" />
          </div>
          <p className="text-sm text-text-secondary font-medium">
            Showing{" "}
            {allResultLength <= 0 ? (
              <span className="text-text-body font-bold">0</span>
            ) : (
              <>
                <span className="text-text-body font-bold">
                  {(page - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(page * itemsPerPage, allResultLength)}
                </span>{" "}
                of{" "}
                <span className="text-text-body font-bold">
                  {allResultLength}
                </span>
              </>
            )}{" "}
            vulnerabilities
          </p>
        </div>

        {maxPage > 1 && (
          <Pagination
            count={maxPage}
            page={page}
            onChange={(_, val) => setPage(val)}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "var(--color-text-secondary) !important",
                fontWeight: "bold",
                borderRadius: "8px",
                // boxShadow: "10px",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "var(--color-bg-secondary) !important",
                color: "var(--color-text-secondary) !important",
              },
              "& .Mui-selected": {
                backgroundColor: "var(--color-primary) !important",
                color: "var(--color-white) !important",
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: "var(--color-primary) !important",
                color: "var(--color-white) !important",
              },
            }}
          />
        )}
        {/* <button
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              1 === 1
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "hover:bg-bg-secondary text-text-secondary"
            }`}
          >
            1
          </button> */}
      </div>
    </div>
  );
}

export default ResultsList;
