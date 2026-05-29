import Link from "next/link";
import { GitFork, ArrowRight, CheckCircle2, Clock, AlertCircle, Circle, User } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getScreens } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StatusDot({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
    case "in-review":
      return <Clock className="h-4 w-4 text-blue-500 shrink-0" />;
    case "need-revision":
      return <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground shrink-0" />;
  }
}

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

export default async function FlowsPage() {
  const screens = await getScreens();

  const flowsMap = new Map<string, { flowName: string; projectName: string; screens: typeof screens }>();
  screens.forEach((screen) => {
    if (!screen.flowId) return;
    const existing = flowsMap.get(screen.flowId);
    if (existing) {
      existing.screens.push(screen);
    } else {
      flowsMap.set(screen.flowId, {
        flowName: screen.flowName ?? "Unnamed Flow",
        projectName: screen.projectName,
        screens: [screen],
      });
    }
  });

  const flows = Array.from(flowsMap.entries()).map(([flowId, data]) => ({
    flowId,
    ...data,
    screens: data.screens.sort((a, b) => a.screenId.localeCompare(b.screenId)),
  }));

  return (
    <AppShell>
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-bold">
          <GitFork className="h-3.5 w-3.5" />
          <span>Processes</span>
        </div>
        <h1 className="mt-1.5 text-2xl font-black tracking-tight text-foreground">Flow Management</h1>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          ติดตามเส้นทางการทำงานของผู้ใช้งาน (User Flow) แยกตาม Flow ID แสดงลำดับหน้าจอในแต่ละขั้นตอน
        </p>
      </div>

      <section className="mt-8 space-y-10">
        {flows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
            ไม่พบข้อมูล Flow
          </div>
        ) : (
          flows.map((flow) => {
            const completedCount = flow.screens.filter((s) => s.status === "approved").length;
            const progress = Math.round((completedCount / flow.screens.length) * 100);

            return (
              <div key={flow.flowId} className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
                {/* Flow Header */}
                <div className="px-6 py-4 bg-slate-50/70 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{flow.flowId}</p>
                    <h2 className="text-base font-black text-foreground mt-0.5">{flow.flowName}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{flow.projectName}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{completedCount}/{flow.screens.length} completed</p>
                      <p className="text-sm font-black text-foreground">{progress}%</p>
                    </div>
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div className="px-6 py-5">
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-5 bottom-5 w-px bg-border" />

                    <div className="space-y-3">
                      {flow.screens.map((screen, index) => (
                        <div key={screen.screenId} className="flex gap-4 items-start group">
                          {/* Step indicator */}
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-black transition-colors duration-200 group-hover:border-primary group-hover:text-primary border-border text-muted-foreground">
                            {index + 1}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 rounded-xl border border-border/70 bg-white p-4 hover:border-primary/20 hover:shadow-sm transition-all duration-200 group-hover:bg-slate-50/50">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 min-w-0">
                                <StatusDot status={screen.status} />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider shrink-0">
                                      {screen.screenId}
                                    </span>
                                    <StatusBadge status={screen.status} />
                                  </div>
                                  <p className="text-sm font-bold text-foreground mt-0.5">{screen.screenName}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{screen.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[10px] text-muted-foreground font-medium hidden sm:flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {screen.assignee}
                                </span>
                                <Link href={`/screens/${screen.screenId}`}>
                                  <Button size="sm" variant="outline" className="h-7 text-[11px] font-bold rounded-lg px-3 gap-1 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                                    <span>Detail</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </AppShell>
  );
}
