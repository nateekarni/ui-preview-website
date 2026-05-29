"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Search,
  MonitorPlay,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  FolderKanban,
  Cpu,
  Monitor,
  Laptop,
  Smartphone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

type ProjectWithStats = {
  projectId: string;
  projectName: string;
  description: string;
  status: string;
  owner: string;
  platforms: string[];
  createdAt: string;
  updatedAt: string;
  screenCount: number;
  approvedCount: number;
  progress: number;
  logoPath?: string;
};

type GlobalStats = {
  total: number;
  approved: number;
  inReview: number;
  progress: number;
};

function getPlatformIcon(platform: string) {
  if (platform.includes("mobile"))
    return <Smartphone className="h-3.5 w-3.5" />;
  if (platform.includes("admin")) return <Laptop className="h-3.5 w-3.5" />;
  return <Monitor className="h-3.5 w-3.5" />;
}

function getPlatformLabel(p: string) {
  if (p.includes("public")) return "Public Web";
  if (p.includes("admin")) return "Admin Web";
  if (p.includes("mobile")) return "Mobile";
  return p.replace(/-/g, " ");
}

function statusConfig(status: string) {
  switch (status) {
    case "approved":
      return {
        cls: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
        dot: "bg-emerald-500",
      };
    case "in-progress":
      return {
        cls: "bg-amber-50 text-amber-700 border-amber-200/70",
        dot: "bg-amber-500",
      };
    case "in-review":
      return {
        cls: "bg-blue-50 text-blue-700 border-blue-200/70",
        dot: "bg-blue-500",
      };
    default:
      return {
        cls: "bg-slate-50 text-slate-600 border-slate-200/70",
        dot: "bg-slate-400",
      };
  }
}

export function ProjectList({
  projects,
  globalStats,
}: {
  projects: ProjectWithStats[];
  globalStats: GlobalStats;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.projectName.toLowerCase().includes(q) ||
        p.projectId.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.platforms.some((pl) => pl.includes(q)),
    );
  }, [projects, query]);

  return (
    <div className="space-y-0">
      {/* ── Header ── */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-bold">
          <FolderKanban className="h-3.5 w-3.5" />
          <span>Workspace</span>
        </div>
        <h1 className="mt-1.5 text-2xl font-black tracking-tight text-foreground">
          UX/UI Projects
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          รายชื่อโปรเจกต์งานออกแบบทั้งหมด — เลือกดูรายการหน้าจอแยกตาม Platform
          ได้ทันที
        </p>

        {/* Global stats row */}
        <div className="mt-5 flex items-center gap-4">
          {[
            {
              icon: <MonitorPlay className="h-3.5 w-3.5 text-primary" />,
              label: "Screens",
              value: globalStats.total,
            },
            {
              icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
              label: "Approved",
              value: globalStats.approved,
            },
            {
              icon: <Clock className="h-3.5 w-3.5 text-blue-500" />,
              label: "In Review",
              value: globalStats.inReview,
            },
            {
              icon: <TrendingUp className="h-3.5 w-3.5 text-violet-500" />,
              label: "Progress",
              value: `${globalStats.progress}%`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-xl bg-white border border-border px-4 py-2.5 shadow-sm"
            >
              {stat.icon}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide leading-none">
                  {stat.label}
                </p>
                <p className="text-base font-black text-foreground leading-tight mt-0.5">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="pt-6 pb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-foreground">
          Projects{" "}
          <span className="text-muted-foreground font-normal">
            ({filtered.length}
            {query ? ` of ${projects.length}` : ""})
          </span>
        </h2>

        <div className="relative w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อโปรเจกต์, ID, Platform..."
            className="w-full pl-9 pr-4 h-9 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* ── Project Table / List ── */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white py-16 text-center">
          <Cpu className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm font-bold text-muted-foreground">
            ไม่พบโปรเจกต์ที่ตรงกับคำค้นหา
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-2 text-xs font-bold text-primary hover:underline"
          >
            ล้างการค้นหา
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_280px_200px_130px_24px] items-center gap-4 px-5 py-2.5 bg-slate-50 border-b border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              โปรเจกต์
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Platforms
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Progress
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <p />
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/60">
            {filtered.map((project) => {
              const sc = statusConfig(project.status);
              return (
                <Link
                  key={project.projectId}
                  href={`/projects/${project.projectId}`}
                  className="grid grid-cols-[1fr_280px_200px_130px_24px] items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  {/* Project name + meta */}
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary transition-colors duration-200 overflow-hidden">
                      {project.logoPath ? (
                        <Image
                          src={project.logoPath}
                          alt={project.projectName}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain rounded-xl"
                        />
                      ) : (
                        <Cpu className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug truncate">
                        {project.projectName}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                        {project.projectId}
                      </p>
                    </div>
                  </div>

                  {/* Platforms — w matches header */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.platforms.map((pl) => (
                      <span
                        key={pl}
                        className="flex items-center gap-1 rounded-md bg-muted/50 border border-border/60 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground whitespace-nowrap"
                      >
                        {getPlatformIcon(pl)}
                        {getPlatformLabel(pl)}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-muted-foreground">
                        {project.approvedCount}/{project.screenCount} approved
                      </span>
                      <span className="text-foreground font-bold">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Status badge */}
                  <div>
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize whitespace-nowrap w-fit ${sc.cls}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${sc.dot}`}
                      />
                      {project.status.replace(/-/g, " ")}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 bg-slate-50/50 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground font-medium">
              {filtered.length} โปรเจกต์ · คลิกแถวเพื่อดูรายการหน้าจอ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
