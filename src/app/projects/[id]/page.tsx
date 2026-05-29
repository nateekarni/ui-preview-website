import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FolderKanban,
  ArrowLeft,
  Monitor,
  Laptop,
  Smartphone,
  Calendar,
  User,
  Layers,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getProjects, getScreens } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { PlatformScreenTable } from "./platform-screen-table";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    "in-progress": "bg-amber-50 text-amber-700 border-amber-200/60",
    "in-review": "bg-blue-50 text-blue-700 border-blue-200/60",
    review: "bg-blue-50 text-blue-700 border-blue-200/60",
    draft: "bg-slate-50 text-slate-600 border-slate-200/60",
    "need-revision": "bg-rose-50 text-rose-700 border-rose-200/60",
  };
  const cls = map[status.toLowerCase()] ?? "bg-slate-50 text-slate-600 border-slate-200/60";
  return (
    <Badge className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${cls}`}>
      {status.replace(/-/g, " ")}
    </Badge>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const [projects, allScreens] = await Promise.all([getProjects(), getScreens()]);

  const project = projects.find((p) => p.projectId === id);
  if (!project) notFound();

  const projectScreens = allScreens.filter((s) => s.projectId === id);
  const platforms = project.platforms;
  const approved = projectScreens.filter((s) => s.status === "approved").length;
  const progress = projectScreens.length === 0 ? 0 : Math.round((approved / projectScreens.length) * 100);

  return (
    <AppShell>
      {/* Breadcrumb + Header */}
      <div className="border-b border-border pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>

        <div className="mt-3 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold">
              <FolderKanban className="h-3.5 w-3.5" />
              <span>Project Detail</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-black tracking-tight text-foreground">
              {project.projectName}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Full-width stats bar */}
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            { label: "Owner", value: project.owner ?? "Product Team", icon: <User className="h-4 w-4" /> },
            { label: "Created", value: project.createdAt, icon: <Calendar className="h-4 w-4" /> },
            { label: "Platforms", value: `${platforms.length} ระบบ`, icon: <Layers className="h-4 w-4" /> },
            { label: "Total Screens", value: `${projectScreens.length} หน้าจอ`, icon: <Monitor className="h-4 w-4" /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
              <div className="text-muted-foreground shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="text-xs font-black text-foreground mt-0.5 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              ความคืบหน้าโดยรวม ({approved}/{projectScreens.length} screens approved)
            </span>
            <span className="text-foreground font-black">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Platform Category + Screen Table */}
      <section className="mt-8">
        <PlatformScreenTable platforms={platforms} projectScreens={projectScreens} />
      </section>
    </AppShell>
  );
}
