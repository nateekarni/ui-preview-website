import Link from "next/link";
import { Users, ArrowRight, CheckCircle2, Clock, User, Layers, Circle } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getScreens } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <Badge className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${cls}`}>
      {status.replace(/-/g, " ")}
    </Badge>
  );
}

export default async function AssigneesPage() {
  const screens = await getScreens();

  const assigneeMap = new Map<string, typeof screens>();
  screens.forEach((screen) => {
    const name = screen.assignee || "Unassigned";
    const existing = assigneeMap.get(name);
    if (existing) existing.push(screen);
    else assigneeMap.set(name, [screen]);
  });

  const developers = Array.from(assigneeMap.entries()).map(([name, devScreens]) => {
    const total = devScreens.length;
    const approved = devScreens.filter((s) => s.status === "approved").length;
    const inReview = devScreens.filter((s) => s.status === "in-review").length;
    const inProgress = devScreens.filter((s) => s.status === "draft").length;
    const progress = total === 0 ? 0 : Math.round((approved / total) * 100);
    return {
      name,
      screens: devScreens.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
      stats: { total, approved, inReview, inProgress, progress },
    };
  });

  return (
    <AppShell>
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-bold">
          <Users className="h-3.5 w-3.5" />
          <span>Team Board</span>
        </div>
        <h1 className="mt-1.5 text-2xl font-black tracking-tight text-foreground">Assignee Board</h1>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          ติดตามรายการหน้าจอแยกตามผู้รับผิดชอบ พร้อมสถิติความคืบหน้าของแต่ละนักพัฒนา
        </p>
      </div>

      <section className="mt-8 space-y-6">
        {developers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
            ไม่พบข้อมูลผู้รับผิดชอบ
          </div>
        ) : (
          developers.map((dev) => (
            <div key={dev.name} className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
              {/* Developer Header */}
              <div className="px-6 py-4 bg-slate-50/70 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 text-primary border border-primary/15 shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-foreground">{dev.name}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{dev.stats.total} screens assigned</p>
                    </div>
                  </div>

                  {/* Stats pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{dev.stats.approved} Approved</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200/60 px-3 py-1.5 text-xs font-bold text-blue-700">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{dev.stats.inReview} In Review</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-muted border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground">
                      <Circle className="h-3.5 w-3.5" />
                      <span>{dev.stats.inProgress} Remaining</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="text-foreground font-black">{dev.stats.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${dev.stats.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Screen table */}
              <div className="divide-y divide-border/60">
                {dev.screens.map((screen) => (
                  <div key={screen.screenId} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider shrink-0">
                          {screen.screenId}
                        </span>
                        <p className="text-xs font-bold text-foreground truncate">{screen.screenName}</p>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {screen.projectName} · {screen.platform.replace(/-/g, " ")} · {screen.moduleName}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={screen.status} />
                      <Link href={`/screens/${screen.screenId}`}>
                        <Button size="sm" variant="ghost" className="h-7 text-[11px] font-bold rounded-lg px-2.5 gap-1 text-primary hover:bg-primary/8">
                          <span>Detail</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </AppShell>
  );
}
