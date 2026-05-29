"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  LayoutGrid,
  Table2,
  ExternalLink,
  Code,
  User,
  FilterX,
  Monitor,
} from "lucide-react";

import type { PreviewScreen } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FilterOptions = {
  projects: string[];
  platforms: string[];
  modules: string[];
  features: string[];
  statuses: string[];
  assignees: string[];
};

type FilterKey = "platform" | "moduleName" | "status" | "assignee";

const filterConfig: Array<{ label: string; key: FilterKey; optionsKey: keyof FilterOptions }> = [
  { label: "Platform", key: "platform", optionsKey: "platforms" },
  { label: "Module", key: "moduleName", optionsKey: "modules" },
  { label: "Status", key: "status", optionsKey: "statuses" },
  { label: "Assignee", key: "assignee", optionsKey: "assignees" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    "in-progress": "bg-amber-50 text-amber-700 border-amber-200/60",
    "in-review": "bg-blue-50 text-blue-700 border-blue-200/60",
    draft: "bg-slate-50 text-slate-600 border-slate-200/60",
    "need-revision": "bg-rose-50 text-rose-700 border-rose-200/60",
  };
  const cls = map[status.toLowerCase()] ?? "bg-slate-50 text-slate-600 border-slate-200/60";
  return (
    <Badge className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize whitespace-nowrap ${cls}`}>
      {status.replace(/-/g, " ")}
    </Badge>
  );
}

export function ScreenLibrary({
  screens,
  filterOptions,
}: {
  screens: PreviewScreen[];
  filterOptions: FilterOptions;
}) {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    platform: "",
    moduleName: "",
    status: "",
    assignee: "",
  });

  const visibleScreens = useMemo(() => {
    const q = query.trim().toLowerCase();
    return screens.filter((screen) => {
      const matchQ =
        q.length === 0 ||
        [screen.screenId, screen.screenName, screen.projectName, screen.moduleName, screen.featureName, screen.flowName]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchF = filterConfig.every((f) => {
        const sel = filters[f.key];
        return sel.length === 0 || screen[f.key] === sel;
      });
      return matchQ && matchF;
    });
  }, [filters, query, screens]);

  const handleReset = () => {
    setQuery("");
    setFilters({ platform: "", moduleName: "", status: "", assignee: "" });
  };

  return (
    <section className="mt-6 space-y-5">
      {/* Filter Panel */}
      <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
        {/* Row 1: Search + Controls */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อหน้าจอ, Module, Flow..."
              className="pl-9 h-9 rounded-lg text-sm"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-9 px-3 rounded-lg text-xs font-bold text-muted-foreground flex items-center gap-1.5 shrink-0"
          >
            <FilterX className="h-3.5 w-3.5" />
            Reset
          </Button>

          <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5 border border-border shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Table2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Dropdown filters */}
        <div className="mt-3 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {filterConfig.map((filter) => (
            <div key={filter.key}>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                {filter.label}
              </label>
              <select
                value={filters[filter.key]}
                onChange={(e) => setFilters((c) => ({ ...c, [filter.key]: e.target.value }))}
                className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground outline-none focus:border-primary/50 transition-colors"
              >
                <option value="">ทั้งหมด</option>
                {filterOptions[filter.optionsKey].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs font-semibold text-muted-foreground px-0.5">
        พบ <span className="text-foreground font-bold">{visibleScreens.length}</span> รายการ
      </p>

      {/* Grid View */}
      {viewMode === "grid" && visibleScreens.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleScreens.map((screen) => (
            <Card key={screen.screenId} className="hover:shadow-sm hover:border-primary/20 transition-all duration-200 flex flex-col">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{screen.screenId}</span>
                    <CardTitle className="text-sm font-bold text-foreground mt-0.5 leading-snug">{screen.screenName}</CardTitle>
                  </div>
                  <StatusBadge status={screen.status} />
                </div>
                <CardDescription className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                  {screen.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 pb-3 flex-1">
                <div className="space-y-1.5 text-xs border-t border-border/40 pt-3 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Project</span>
                    <span className="text-foreground font-semibold truncate max-w-[60%] text-right">{screen.projectName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Platform</span>
                    <Badge variant="secondary" className="text-[10px] capitalize bg-slate-100 text-slate-600 border-none px-1.5 py-0 rounded">
                      {screen.platform.replace(/-/g, " ")}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Module</span>
                    <span className="text-foreground font-semibold">{screen.moduleName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Assignee</span>
                    <span className="text-foreground font-semibold flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />{screen.assignee}
                    </span>
                  </div>
                </div>
              </CardContent>

              <div className="px-4 py-3 border-t border-border/40 bg-muted/10 flex items-center justify-between mt-auto">
                <Link href={`/screens/${screen.screenId}`}>
                  <Button size="sm" className="h-7 text-[11px] font-bold rounded-lg px-3 gap-1.5">
                    <Code className="h-3.5 w-3.5" />
                    <span>Task Detail</span>
                  </Button>
                </Link>
                <a
                  href={`/preview/${screen.screenId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && visibleScreens.length > 0 && (
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <Table className="w-full table-fixed">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[22%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Screen</TableHead>
                <TableHead className="w-[18%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Project</TableHead>
                <TableHead className="w-[15%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Platform</TableHead>
                <TableHead className="w-[15%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Module</TableHead>
                <TableHead className="w-[10%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Assignee</TableHead>
                <TableHead className="w-[10%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</TableHead>
                <TableHead className="w-[10%] text-xs font-bold uppercase tracking-wider text-muted-foreground px-4 py-3 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleScreens.map((screen) => (
                <TableRow key={screen.screenId} className="hover:bg-slate-50/60">
                  <TableCell className="px-4 py-3">
                    <p className="font-bold text-xs text-foreground truncate">{screen.screenName}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{screen.screenId}</p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-muted-foreground font-medium truncate">{screen.projectName}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="secondary" className="text-[10px] capitalize bg-slate-100 text-slate-600 border-none px-1.5 rounded">
                      {screen.platform.replace(/-/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-foreground font-medium truncate">{screen.moduleName}</TableCell>
                  <TableCell className="px-4 py-3 text-xs font-semibold text-foreground truncate">{screen.assignee}</TableCell>
                  <TableCell className="px-4 py-3"><StatusBadge status={screen.status} /></TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/screens/${screen.screenId}`}>
                        <Button size="sm" variant="outline" className="h-7 text-[11px] font-bold rounded-lg px-2.5">
                          Task
                        </Button>
                      </Link>
                      <a
                        href={`/preview/${screen.screenId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Empty */}
      {visibleScreens.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-white py-16 text-center">
          <FilterX className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground">ไม่พบผลลัพธ์</p>
          <p className="text-xs text-muted-foreground mt-1">ลองปรับตัวกรองหรือคีย์เวิร์ดใหม่</p>
          <Button onClick={handleReset} variant="link" className="mt-3 text-xs font-bold">
            ล้างตัวกรองทั้งหมด
          </Button>
        </div>
      )}
    </section>
  );
}
