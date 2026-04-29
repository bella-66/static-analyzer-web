import { IoSearch, IoShieldCheckmark, IoClose } from "react-icons/io5";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { BsCaretRight } from "react-icons/bs";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Tag from "../components/Tag";
import { LuCode, LuFile } from "react-icons/lu";
import { BiWrench } from "react-icons/bi";
import Modal from "@mui/material/Modal";
import ModalContent from "../components/modals/ModalContent";
import HelpModalContent from "../components/modals/HelpModalContent";
import ResultCard from "../components/ResultCard";
import ResultsList from "../components/ResultsList";
import { useSettings } from "../context/SettingsProvider";

const scanProfile = [
  // { name: "Security Scan (Default)", code: "security" },
  { name: "Student Best Practices (Default)", code: "student" },
  { name: "Deep Security Scan", code: "deep" },
  // { name: "OWASP Top 10 Compliance", code: "owasp" },
];

function Home() {
  const { settings } = useSettings();

  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState<number>(1);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SemgrepResult[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("severity-desc");
  const [selectedScanProfile, setSelectedScanProfile] = useState(
    scanProfile[0],
  );
  const [filters, setFilters] = useState<Filters>({
    severity: "all",
    confidence: null,
    vulnClass: null,
  });
  const [activeModal, setActiveModal] = useState<"settings" | "help" | null>(
    null,
  );
  const [errorToast, setErrorToast] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const getNumOfResults = (severity: string) => {
    return results?.filter((r) => r.extra.severity === severity).length || 0;
  };

  const getNumOfRules = () => {
    let total = 0;
    if (settings.secretDetection) total += 10;
    if (settings.correctnessIssues) total += 5;
    if (settings.deepAnalysis) total += 142;
    else total += 87;
    return total;
  };

  const handleFileChange = (file: File[] | File) => {
    let files = Array.isArray(file) ? file : [file];
    const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB
    const MAX_PART_COUNT = 500;

    files = files.filter((file) => {
      const path = file.webkitRelativePath || file.name;
      const pathParts = path.split("/");
      return !pathParts.some(
        (part) => part === ".git" || part === "node_modules",
      );
    });

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);

    if (files.length === 0) {
      handleError(
        "No valid files selected for analysis (excluded .git and node_modules).",
      );
      return;
    }

    if (files.length > MAX_PART_COUNT) {
      handleError(
        `Selection exceeds maximum limit of ${MAX_PART_COUNT} files. Please select a smaller target.`,
      );
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      const sizeInMB = (totalSize / (1024 * 1024)).toFixed(1);
      handleError(
        `Total selection size (${sizeInMB}MB) exceeds the 200MB limit. Please ensure your project is within the allowed size.`,
      );
      return;
    }
    // console.log(files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const items = e.dataTransfer.items;
    if (!items) return;

    const files: File[] = [];

    const traverseFileTree = (entry: any, path = ""): Promise<void> => {
      return new Promise((resolve) => {
        if (entry.isFile) {
          entry.file((file: File) => {
            file = new File([file], path + file.name);
            files.push(file);
            resolve();
          });
        } else if (entry.isDirectory) {
          const reader = entry.createReader();
          reader.readEntries(async (entries: any[]) => {
            await Promise.all(
              entries.map((ent) =>
                traverseFileTree(ent, path + entry.name + "/"),
              ),
            );
            resolve();
          });
        }
      });
    };

    await Promise.all(
      Array.from(items).map((item: any) => {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          return traverseFileTree(entry);
        }
        return Promise.resolve();
      }),
    );
    handleFileChange(files);
  };

  const handleChangeFilters = (value: string, key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectResult = (id: number) => {
    setSelectedResult(id);
  };

  const handleError = (message: string) => {
    setErrorToast({
      open: true,
      message,
    });
  };

  const sortResults = useCallback(
    (arr: SemgrepResult[]) => {
      const severityMap: Record<string, number> = {
        ERROR: 3,
        WARNING: 2,
        INFO: 1,
      };

      return arr.sort((a, b) => {
        switch (sortOption) {
          case "severity-desc":
            return (
              (severityMap[b.extra.severity] || 0) -
              (severityMap[a.extra.severity] || 0)
            );
          case "severity-asc":
            return (
              (severityMap[a.extra.severity] || 0) -
              (severityMap[b.extra.severity] || 0)
            );
          case "line-asc":
            return a.start.line - b.start.line;
          case "line-desc":
            return b.start.line - a.start.line;
          case "file-asc":
            return a.path.localeCompare(b.path);
          default:
            return 0;
        }
      });
    },
    [sortOption],
  );

  const filteredResults = useMemo(() => {
    if (!results) return [];

    let filtered =
      filters.severity === "all"
        ? results
        : results.filter((r) => r.extra.severity === filters.severity);

    filtered = filtered.filter((r) => {
      if (
        filters.confidence &&
        r.extra?.metadata?.confidence?.toLowerCase() !== filters.confidence
      )
        return false;

      if (
        filters.vulnClass &&
        !r.extra?.metadata?.subcategory?.includes(filters.vulnClass)
      )
        return false;
      return true;
    });

    filtered = sortResults(filtered);

    if (filtered.length > 0) {
      const idx = filtered[0].id;
      setSelectedResult(idx);
    } else {
      setSelectedResult(null);
    }

    return filtered;
  }, [results, filters, sortResults]);

  const maxPage = Math.ceil(filteredResults.length / ITEMS_PER_PAGE) || 1;

  const finalResults = useMemo(() => {
    if (!filteredResults) return [];
    const res = filteredResults.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    );
    return res;
  }, [filteredResults, page, ITEMS_PER_PAGE]);

  const handleScan = () => {
    if (!selectedFiles) {
      handleError("No file is selected. Please select a target to scan.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((f) => formData.append("file", f));
    formData.append("settings", JSON.stringify(settings));
    formData.append("scanProfile", selectedScanProfile.code);

    setIsLoading(true);
    axios
      .post("https://194.182.80.146:8081/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log("res", res);
        let results: any = res.data.results;
        if (!results) {
          handleError("An unexpected error occurred. Please try again.");
          return;
        }
        if (settings.minConfidence === "high") {
          results = results.filter(
            (r: any) => r.extra.metadata.confidence === "HIGH",
          );
        } else if (settings.minConfidence === "medium") {
          results = results.filter(
            (r: any) =>
              r.extra.metadata.confidence === "HIGH" ||
              r.extra.metadata.confidence === "MEDIUM",
          );
        }
        setResults(
          results.map((r: any, idx: number) => ({
            ...r,
            id: idx,
            path: r.path.replace(/^\/src\//, ""),
          })),
        );
        setSelectedResult(0);
      })
      .catch((err) => {
        // console.log("err", err);
        const baseMessage =
          err?.response?.data ||
          err?.message ||
          "An unexpected error occurred during the analysis.";
        handleError(`${baseMessage}. Please try again.`);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (results) {
      setPage(1);
      // if (filteredResults.length > 0) {
      //   const idx = filteredResults[0].id;
      //   setSelectedResult(idx);
      // } else {
      //   setSelectedResult(null);
      // }
    }
  }, [filteredResults]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setActiveModal("help");
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <div>
      <Snackbar
        open={errorToast.open}
        autoHideDuration={4000}
        onClose={() => setErrorToast({ ...errorToast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setErrorToast({ ...errorToast, open: false })}
          severity="error"
          className="bg-error/10! text-error! border! border-error/20! shadow-lg! shadow-error/10! rounded-2xl! backdrop-blur-md!"
          sx={{
            width: "350px",
            fontFamily: "inherit",
            "& .MuiAlert-icon": { color: "inherit", mt: 0.5 },
          }}
        >
          <AlertTitle className="font-bold! tracking-tight! mb-1! text-base!">
            Error
          </AlertTitle>
          <p className="text-sm font-medium opacity-90 leading-relaxed">
            {errorToast.message}
          </p>
        </Alert>
      </Snackbar>
      <Navbar
        onSettingsClick={() => setActiveModal("settings")}
        onHelpClick={() => setActiveModal("help")}
      />

      <Modal
        open={activeModal !== null}
        onClose={() => setActiveModal(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="items-center justify-center flex"
      >
        <div className="outline-none">
          {activeModal === "settings" && (
            <ModalContent onClose={() => setActiveModal(null)} />
          )}
          {activeModal === "help" && (
            <HelpModalContent onClose={() => setActiveModal(null)} />
          )}
        </div>
      </Modal>

      <div className="p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-text-body tracking-tight">
              Security Dashboard
            </h2>
            <p className="text-text-secondary mt-1">
              Configure your scan parameters and analyze your code for
              vulnerabilities.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
              <div
                className={`p-8 space-y-4 col-span-3 relative transition-all duration-200 ${isDragging ? "bg-primary/5" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <LuFile className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-text-body">Select Target</h5>
                </div>

                <p className="text-sm text-text-secondary">
                  Choose a file, an entire directory, or drag & drop them here
                  to begin the static analysis process.
                </p>

                <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <div className="flex flex-1 min-w-fit items-center flex-wrap gap-3">
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          handleFileChange(files);
                        }
                      }}
                      onError={() =>
                        handleError(
                          "An error occurred while selecting files. Please try again.",
                        )
                      }
                    />
                    <label
                      htmlFor="file-input"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          document.getElementById("file-input")?.click();
                        }
                      }}
                      className="flex flex-1 min-w-fit justify-center items-center outline-none focus:shadow-[0_0_0_0.2rem_#bfdbfe] gap-2 border border-bg-secondary bg-bg-secondary hover:bg-bg-disabled in-[.dark]:hover:bg-bg-secondary/65 in-[.dark]:active:bg-bg-secondary/65 hover:border-transparent py-2 px-6 rounded-lg transition-all active:scale-[0.98] cursor-pointer text-text-body font-medium"
                    >
                      <GoFile className="text-xl" />
                      Select Files
                    </label>

                    <input
                      type="file"
                      id="folder-input"
                      className="hidden"
                      {...({
                        webkitdirectory: "",
                        directory: "",
                      } as React.InputHTMLAttributes<HTMLInputElement> & {
                        webkitdirectory?: string;
                        directory?: string;
                      })}
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          handleFileChange(files);
                        }
                      }}
                      onError={() =>
                        handleError(
                          "An error occurred while selecting files. Please try again.",
                        )
                      }
                    />
                    <label
                      htmlFor="folder-input"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          document.getElementById("folder-input")?.click();
                        }
                      }}
                      className="flex flex-1 min-w-fit justify-center items-center outline-none focus:shadow-[0_0_0_0.2rem_#bfdbfe] gap-2 border border-bg-secondary bg-bg-secondary hover:bg-bg-disabled in-[.dark]:hover:bg-bg-secondary/65 in-[.dark]:active:bg-bg-secondary/65 hover:border-transparent py-2 px-6 rounded-lg transition-all active:scale-[0.98] cursor-pointer text-text-body font-medium"
                    >
                      <GoFileDirectory className="text-xl" />
                      Select Folder
                    </label>
                  </div>

                  <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-bg-secondary/50 rounded-xl border border-border/50 min-h-11 max-w-full md:min-w-56">
                    {selectedFiles ? (
                      <>
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                        <p className="text-sm font-medium text-text-body flex-1 truncate">
                          {selectedFiles[0]?.webkitRelativePath !== ""
                            ? selectedFiles[0]?.webkitRelativePath.split(
                                "/",
                              )[0] + "/"
                            : selectedFiles.map((f) => f.name).join(", ")}
                        </p>
                        <div className="text-xs font-semibold text-text-secondary whitespace-nowrap bg-bg-secondary border border-border px-2 py-0.5 rounded-md shrink-0">
                          {selectedFiles.length} file
                          {selectedFiles.length !== 1 && "s"}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFiles(null);
                            const fileInput = document.getElementById(
                              "file-input",
                            ) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                            const folderInput = document.getElementById(
                              "folder-input",
                            ) as HTMLInputElement;
                            if (folderInput) folderInput.value = "";
                          }}
                          className="p-1 cursor-pointer flex items-center justify-center text-text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors outline-none focus:ring-2 focus:ring-error/20"
                          title="Clear selection"
                        >
                          <IoClose size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 rounded-full bg-border" />
                        <p className="text-sm text-text-secondary italic">
                          No target selected
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {!selectedFiles && (
                  <div
                    className={`hidden lg:flex flex-col items-center justify-center py-8 mt-6 border-2 border-dashed rounded-xl transition-all duration-200 pointer-events-none ${
                      isDragging
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-text-secondary/60 bg-bg-secondary/30"
                    }`}
                  >
                    <LuFile
                      className={`w-8 h-8 mb-3 ${isDragging ? "opacity-100" : "opacity-50"}`}
                    />
                    <p className="font-medium text-sm">
                      Drag and drop files or folders here
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-bg/30 space-y-4 col-span-2 flex flex-col">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <BiWrench className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-text-body">Scan Profile</h5>
                  </div>

                  <p className="text-sm text-text-secondary">
                    Select the ruleset that best matches your security
                    requirements.
                  </p>

                  <Dropdown
                    value={selectedScanProfile}
                    onChange={(e) => setSelectedScanProfile(e.value)}
                    placeholder="Select Profile"
                    options={scanProfile}
                    optionLabel="name"
                    panelClassName="scan-dropdown-panel"
                    className="w-full border-border! bg-card! rounded-xl! py-1! text-error!"
                  />
                </div>

                <div className="pt-7.5">
                  <Button
                    label={isLoading ? "Analyzing..." : "Run Security Scan"}
                    variant="primary"
                    icon={
                      !isLoading ? (
                        <BsCaretRight className="ml-1" />
                      ) : (
                        <ProgressSpinner
                          style={{ width: "18px", height: "18px" }}
                          strokeWidth="8"
                          className="btn-spinner"
                        />
                      )
                    }
                    disabled={selectedFiles === null || isLoading}
                    className="w-full! py-4! duration-250 rounded-xl! text-lg font-semibold tracking-wide transition-all hover:shadow-sm active:shadow-inner hover:scale-[1.02] shadow-md"
                    onClick={handleScan}
                  />
                  {!selectedFiles && !isLoading && (
                    <p className="mt-4 text-center text-xs text-text-secondary/50 font-medium">
                      Waiting for target selection...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {results === null ? (
            <div className="bg-card rounded-2xl border border-border px-6 py-32 mt-6 overflow-hidden relative shadow-sm">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative flex flex-col text-center items-center gap-6 z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary animate-float border border-primary/20 shadow-xl shadow-primary/5">
                  <IoSearch size={36} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-text-body tracking-tight">
                    Ready to Scan
                  </h3>
                  <p className="text-text-secondary max-w-lg mx-auto leading-relaxed text-lg">
                    Select a file or folder above to begin static analysis. This
                    tool will detect security vulnerabilities and code quality
                    issues.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <div className="mb-8 flex items-center flex-wrap gap-4 justify-between">
                <div className="flex items-center flex-wrap gap-x-10 gap-y-4">
                  <p className="text-xl font-semibold">Scan Results</p>

                  <div className="flex items-center gap-4 flex-wrap">
                    <Tag
                      color="white"
                      selected={filters.severity === "all"}
                      onClick={() => handleChangeFilters("all", "severity")}
                      count={results?.length}
                      label="All Issues"
                    />
                    <Tag
                      color="red"
                      selected={filters.severity === "ERROR"}
                      onClick={() =>
                        handleChangeFilters(
                          filters.severity === "ERROR" ? "all" : "ERROR",
                          "severity",
                        )
                      }
                      count={getNumOfResults("ERROR")}
                      label="Critical"
                    />
                    <Tag
                      color="orange"
                      selected={filters.severity === "WARNING"}
                      onClick={() =>
                        handleChangeFilters(
                          filters.severity === "WARNING" ? "all" : "WARNING",
                          "severity",
                        )
                      }
                      count={getNumOfResults("WARNING")}
                      label="Warning"
                    />
                    <Tag
                      color="green"
                      selected={filters.severity === "INFO"}
                      onClick={() =>
                        handleChangeFilters(
                          filters.severity === "INFO" ? "all" : "INFO",
                          "severity",
                        )
                      }
                      count={getNumOfResults("INFO")}
                      label="Info"
                    />
                  </div>
                </div>
              </div>
              {results.length <= 0 ? (
                <div className="bg-card rounded-2xl border border-border px-6 py-20 mt-6 overflow-hidden relative shadow-sm">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-success/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative flex flex-col text-center items-center gap-6 z-10">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-success/20 rounded-2xl blur-xl animate-slow-pulse group-hover:bg-success/30 transition-all duration-700" />
                      <div className="relative w-24 h-24 bg-success/10 rounded-2xl flex items-center justify-center text-success transform rotate-6 border border-success/20 shadow-2xl group-hover:rotate-0 transition-transform duration-500 ease-out animate-float">
                        <IoShieldCheckmark
                          size={48}
                          className="-rotate-6 group-hover:rotate-0 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-text-body tracking-tight">
                        Codebase Secure
                      </h3>
                      <p className="text-text-secondary max-w-lg mx-auto leading-relaxed text-lg">
                        Excellent! Our comprehensive security analysis found
                        <span className="text-success font-semibold px-1">
                          no vulnerabilities
                        </span>
                        or high-risk code patterns in the scanned files.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-2">
                      <div className="flex items-center gap-2.5 px-6 py-3 bg-success/5 rounded-full border border-success/10 text-success text-sm font-bold uppercase tracking-wider">
                        <div className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
                        All Security Checks Passed
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-bg-secondary/60 rounded-md border border-border/50 text-text-secondary text-xs font-medium">
                          <LuCode className="w-3.5 h-3.5 text-primary/80" />
                          {getNumOfRules()} rules evaluated
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <p className="text-xs text-text-secondary italic">
                          Last scan at {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-x-4 gap-y-8 mt-6">
                  <ResultsList
                    results={finalResults}
                    selected={selectedResult}
                    onSelectResult={handleSelectResult}
                    filters={filters}
                    handleChangeFilters={handleChangeFilters}
                    sortOption={sortOption}
                    handleSortChange={setSortOption}
                    page={page}
                    setPage={setPage}
                    maxPage={maxPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    allResultLength={filteredResults.length}
                  />

                  <div className="flex-1 self-start max-w-full">
                    {selectedResult != null && (
                      <ResultCard result={results[selectedResult]} />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
