"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Monitor,
  Laptop,
  Smartphone,
  Search,
  GitFork,
  User,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  Eye,
} from "lucide-react";

import type { PreviewScreen } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ---- Helpers ----

function getPlatformLabel(platform: string): string {
  if (platform.includes("public")) return "Public Website";
  if (platform.includes("admin")) return "Admin Web";
  if (platform.includes("mobile")) return "Mobile App";
  return platform.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getPlatformIcon(platform: string) {
  if (platform.includes("mobile")) return <Smartphone className="h-3.5 w-3.5" />;
  if (platform.includes("admin")) return <Laptop className="h-3.5 w-3.5" />;
  return <Monitor className="h-3.5 w-3.5" />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    approved: { cls: "bg-emerald-50 text-emerald-700 border-emerald-200/60", icon: <CheckCircle2 className="h-3 w-3" /> },
    "in-review": { cls: "bg-blue-50 text-blue-700 border-blue-200/60", icon: <Clock className="h-3 w-3" /> },
    "need-revision": { cls: "bg-rose-50 text-rose-700 border-rose-200/60", icon: <AlertCircle className="h-3 w-3" /> },
    draft: { cls: "bg-slate-50 text-slate-600 border-slate-200/60", icon: <Circle className="h-3 w-3" /> },
  };
  const opt = map[status] ?? map.draft!;
  return (
    <Badge className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize w-fit ${opt!.cls}`}>
      {opt!.icon}
      {status.replace(/-/g, " ")}
    </Badge>
  );
}

// ---- Main Component ----
export function PlatformScreenTable({
  platforms,
  projectScreens,
}: {
  platforms: string[];
  projectScreens: PreviewScreen[];
}) {
  const router = useRouter();
  const allOption = "all";
  const [activePlatform, setActivePlatform] = useState<string>(platforms[0] ?? allOption);
  const [query, setQuery] = useState("");

  const filteredScreens = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projectScreens.filter((s) => {
      const matchPlatform = activePlatform === allOption || s.platform === activePlatform;
      const matchQuery =
        q.length === 0 ||
        [s.screenId, s.screenName, s.flowName, s.moduleName, s.featureName, s.assignee]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchPlatform && matchQuery;
    });
  }, [projectScreens, activePlatform, query]);

  return (
    <div className="space-y-4">
      {/* Toolbar: Category pills (left) + Search (right) */}
      <div className="flex items-center justify-between gap-4">
        {/* Platform Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {platforms.map((platform) => {
            const count = projectScreens.filter((s) => s.platform === platform).length;
            const isActive = activePlatform === platform;
            return (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {getPlatformIcon(platform)}
                <span>{getPlatformLabel(platform)}</span>
                <span
                  className={`ml-0.5 rounded px-1.5 py-0 text-[10px] font-black leading-4 ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อหน้า, Flow..."
            className="pl-9 h-9 rounded-xl text-sm border-border"
          />
        </div>
      </div>

      {/* Screen Table */}
      {filteredScreens.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white py-14 text-center">
          <p className="text-sm font-bold text-muted-foreground">ไม่พบหน้าจอที่ตรงกัน</p>
          <p className="text-xs text-muted-foreground mt-1">ลองเปลี่ยนตัวกรองหรือคีย์เวิร์ด</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_160px_90px_120px_120px_24px] items-center gap-4 px-5 py-2.5 bg-slate-50 border-b border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">ชื่อหน้า / Flow</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">ผู้รับผิดชอบ</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Version</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">สถานะ</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">Preview</p>
            <p />
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border/60">
            {filteredScreens.map((screen) => (
              <div
                key={screen.screenId}
                onClick={() => router.push(`/screens/${screen.screenId}`)}
                className="grid grid-cols-[1fr_160px_90px_120px_120px_24px] items-center gap-4 px-5 py-3.5 hover:bg-slate-50/70 transition-colors group cursor-pointer"
              >
                {/* Screen Name + Flow */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider shrink-0 whitespace-nowrap">
                      {screen.screenId}
                    </span>
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {screen.screenName}
                    </p>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <GitFork className="h-3 w-3 shrink-0" />
                    <span className="truncate">{screen.flowName}</span>
                  </p>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/8 text-primary text-[10px] font-black shrink-0">
                    {screen.assignee[0]?.toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-foreground truncate">{screen.assignee}</span>
                </div>

                {/* Version */}
                <span className="font-mono text-xs font-bold text-foreground whitespace-nowrap">
                  v{screen.version}
                </span>

                {/* Status */}
                <div>
                  <StatusBadge status={screen.status} />
                </div>

                {/* Preview Button */}
                <div onClick={(e) => e.stopPropagation()} className="flex justify-center shrink-0">
                  <a
                    href={`/preview/${screen.screenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 h-7 w-[90px] text-[10.5px] font-extrabold rounded-lg bg-emerald-600 hover:bg-emerald-700 !text-white hover:!text-white transition-all shadow-sm duration-150"
                  >
                    <Smartphone className="h-3.5 w-3.5 shrink-0 !text-white" />
                    <span className="!text-white">Preview</span>
                  </a>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="px-5 py-2.5 bg-slate-50/50 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground font-medium">
              แสดง <span className="font-bold text-foreground">{filteredScreens.length}</span> จาก{" "}
              <span className="font-bold text-foreground">{projectScreens.length}</span> หน้าจอ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
