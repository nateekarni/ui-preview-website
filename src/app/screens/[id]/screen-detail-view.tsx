"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  User,
  Tag,
  Calendar,
  GitFork,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  Send,
  MonitorPlay,
  FileText,
  ChevronRight,
  ChevronDown,
  Hash,
  Layers,
  Flag,
  Eye,
  FolderDown,
  Loader2,
} from "lucide-react";

import type { PreviewScreen, PreviewStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// ─── Status config ───────────────────────────────────────────────────────────

type StatusCfg = { label: string; cls: string; bar: string; icon: React.ReactNode };
const STATUS_MAP: Record<PreviewStatus, StatusCfg> = {
  draft: {
    label: "Draft",
    cls: "bg-slate-100 text-slate-600 border-slate-200",
    bar: "bg-slate-400",
    icon: <Circle className="h-3.5 w-3.5" />,
  },
  "in-review": {
    label: "In Review",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    bar: "bg-blue-500",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  approved: {
    label: "Approved",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  "need-revision": {
    label: "Need Revision",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    bar: "bg-rose-500",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  },
};

function getCfg(s: string): StatusCfg {
  return STATUS_MAP[s as PreviewStatus] ?? STATUS_MAP.draft;
}

// ─── Priority badge ───────────────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    high: "text-rose-600 bg-rose-50 border-rose-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    low: "text-slate-500 bg-slate-50 border-slate-200",
  };
  return (
    <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${map[priority] ?? map.low}`}>
      <Flag className="h-2.5 w-2.5" />
      {priority}
    </span>
  );
}

// ─── Spec renderer ────────────────────────────────────────────────────────────
function SpecRenderer({ content }: { content: string }) {
  if (!content.trim())
    return <p className="text-sm text-muted-foreground italic py-4 text-center">ไม่พบข้อมูล Specification</p>;

  return (
    <div className="prose prose-sm max-w-none text-foreground/90">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("# "))
          return <h2 key={i} className="text-base font-black text-foreground mt-5 mb-2 first:mt-0 border-b border-border pb-1.5">{line.slice(2)}</h2>;
        if (line.startsWith("## "))
          return <h3 key={i} className="text-sm font-extrabold text-foreground mt-4 mb-1.5 flex items-center gap-1.5"><Hash className="h-3.5 w-3.5 text-primary shrink-0" />{line.slice(3)}</h3>;
        if (line.startsWith("### "))
          return <h4 key={i} className="text-sm font-bold text-foreground mt-3 mb-1">{line.slice(4)}</h4>;
        if (line.startsWith("- "))
          return (
            <div key={i} className="flex items-start gap-2 my-0.5">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
              <span className="text-sm text-foreground/85 leading-6">{line.slice(2)}</span>
            </div>
          );
        if (line.trim() === "") return <div key={i} className="h-1.5" />;
        return <p key={i} className="text-sm text-foreground/85 leading-6">{line}</p>;
      })}
    </div>
  );
}

// ─── Flow dot ────────────────────────────────────────────────────────────────
function FlowDot({ status }: { status: string }) {
  const cfg = getCfg(status);
  return <span className={`h-2 w-2 rounded-full shrink-0 ${cfg.bar}`} />;
}

// ─── Comment type ────────────────────────────────────────────────────────────
type Comment = { id: string; author: string; text: string; createdAt: string };

// ─── Main component ───────────────────────────────────────────────────────────
export function ScreenDetailView({
  screen,
  specContent,
  flowScreens,
}: {
  screen: PreviewScreen;
  specContent: string;
  flowScreens: PreviewScreen[];
}) {
  const storageKey = `task-${screen.screenId}`;
  const [status, setStatus] = useState<PreviewStatus>(screen.status as PreviewStatus);
  const [statusOpen, setStatusOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [author, setAuthor] = useState("Dev");
  const statusRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownloadFlow() {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/export/${screen.screenId}`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `flow-${screen.screenId}-${screen.feature || "export"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("ดาวน์โหลดล้มเหลว กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsDownloading(false);
    }
  }

  // Load from localStorage
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
      if (d.status) setStatus(d.status as PreviewStatus);
      if (d.comments) setComments(d.comments);
    } catch {}
  }, [storageKey]);

  // Close status dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function save(s: PreviewStatus, c: Comment[]) {
    localStorage.setItem(storageKey, JSON.stringify({ status: s, comments: c }));
  }

  function changeStatus(val: PreviewStatus) {
    setStatus(val);
    setStatusOpen(false);
    save(val, comments);
  }

  function submitComment() {
    if (!commentText.trim()) return;
    const c: Comment = { id: Date.now().toString(), author: author || "Dev", text: commentText.trim(), createdAt: new Date().toLocaleString("th-TH") };
    const next = [...comments, c];
    setComments(next);
    setCommentText("");
    save(status, next);
  }

  const cfg = getCfg(status);
  const allFlow = [screen, ...flowScreens].sort((a, b) => a.screenId.localeCompare(b.screenId));

  return (
    <div className="flex gap-6 items-start">
      {/* ══════════════════════════ MAIN ══════════════════════════ */}
      <div className="flex-1 min-w-0 space-y-4">

        {/* ── Hero status bar ── */}
        <div className={`rounded-xl border p-4 ${cfg.cls}`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border-2 ${cfg.cls}`}>
                {cfg.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Current Status</p>
                <p className="text-sm font-extrabold leading-tight">{cfg.label}</p>
              </div>
            </div>

            {/* Status selector */}
            <div className="relative" ref={statusRef}>
              <button
                onClick={() => setStatusOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg bg-white/70 border border-current/20 px-3 py-1.5 text-[11px] font-bold hover:bg-white transition-colors"
              >
                เปลี่ยนสถานะ
                <ChevronDown className="h-3 w-3" />
              </button>
              {statusOpen && (
                <div className="absolute right-0 top-full mt-1.5 z-50 w-48 rounded-xl border border-border bg-white shadow-xl p-1.5">
                  {(Object.entries(STATUS_MAP) as [PreviewStatus, StatusCfg][]).map(([val, sc]) => (
                    <button
                      key={val}
                      onClick={() => changeStatus(val)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${status === val ? "bg-primary/8 text-primary" : "hover:bg-muted text-foreground"}`}
                    >
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${sc.cls}`}>{sc.icon}</span>
                      {sc.label}
                      {status === val && <CheckCircle2 className="h-3 w-3 ml-auto text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description + tags under status bar */}
          <p className="mt-3 text-sm leading-relaxed opacity-80">{screen.description}</p>
          {screen.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {screen.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-md bg-white/50 border border-current/15 px-2 py-0.5 text-[10px] font-semibold">
                  <Tag className="h-2.5 w-2.5" />{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Spec ── */}
        <div className="rounded-xl border border-border bg-white shadow-sm">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Specification</h2>
          </div>
          <div className="px-5 py-4">
            <SpecRenderer content={specContent} />
          </div>
        </div>

        {/* ── Comments ── */}
        <div className="rounded-xl border border-border bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-foreground">Comments & Review</h2>
            </div>
            {comments.length > 0 && (
              <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 rounded-full">
                {comments.length}
              </Badge>
            )}
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Comment list */}
            {comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-black mt-0.5">
                      {c.author[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 rounded-xl border border-border/70 bg-slate-50/60 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-foreground">{c.author}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{c.createdAt}</span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="flex gap-3 items-start pt-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted border border-border text-[11px] font-black text-muted-foreground mt-0.5">
                {author[0]?.toUpperCase() || "?"}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ชื่อผู้แสดงความเห็น"
                  className="w-full h-8 rounded-lg border border-border px-3 text-xs font-semibold bg-white text-foreground outline-none focus:border-primary/50 transition-colors"
                />
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="เพิ่ม comment หรือ review feedback... (Ctrl+Enter เพื่อส่ง)"
                  className="min-h-[72px] text-sm resize-none rounded-lg border-border bg-white focus:border-primary/50"
                  onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submitComment(); }}
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={submitComment} disabled={!commentText.trim()} className="h-8 px-4 text-xs font-bold gap-1.5 rounded-lg">
                    <Send className="h-3.5 w-3.5" />
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════ SIDEBAR ══════════════════════════ */}
      <aside className="w-[268px] shrink-0 space-y-3 sticky top-6">

        {/* Actions */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50/70">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Actions</p>
          </div>
          <div className="p-3 space-y-2">
            <a href={`/preview/${screen.screenId}`} target="_blank" rel="noreferrer" className="block">
              <Button className="w-full h-9 text-xs font-bold gap-2 rounded-lg shadow-sm">
                <MonitorPlay className="h-4 w-4" />
                Open HTML Preview
              </Button>
            </a>
            <Button
              onClick={handleDownloadFlow}
              disabled={isDownloading}
              className="w-full h-9 text-xs font-bold gap-2 rounded-lg shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  <span>กำลังเตรียมไฟล์...</span>
                </>
              ) : (
                <>
                  <FolderDown className="h-4 w-4 shrink-0" />
                  <span>ดาวน์โหลด Flow (Folder)</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Task Info */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50/70">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Task Info</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { icon: <User className="h-3.5 w-3.5" />, label: "Assignee", value: screen.assignee },
              { icon: <Eye className="h-3.5 w-3.5" />, label: "Reviewer", value: screen.reviewer },
              { icon: <Layers className="h-3.5 w-3.5" />, label: "Module", value: screen.moduleName },
              { icon: <GitFork className="h-3.5 w-3.5" />, label: "Flow", value: screen.flowName },
              { icon: <Calendar className="h-3.5 w-3.5" />, label: "Updated", value: screen.updatedAt },
              { icon: <Tag className="h-3.5 w-3.5" />, label: "Version", value: `v${screen.version}` },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <span className="text-muted-foreground mt-px shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{item.label}</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5 leading-snug truncate">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Priority separate */}
            <div className="flex items-start gap-2.5">
              <Flag className="h-3.5 w-3.5 text-muted-foreground mt-px shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Priority</p>
                <div className="mt-0.5">
                  <PriorityBadge priority={screen.priority} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow navigator */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50/70 flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Flow</p>
            <span className="text-[10px] font-bold text-muted-foreground">{allFlow.length} screens</span>
          </div>
          <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-primary/80 truncate">{screen.flowName}</p>
          <div className="px-2 pb-2 space-y-0.5">
            {allFlow.map((fs) => {
              const isCurrent = fs.screenId === screen.screenId;
              const fc = getCfg(fs.status);
              return isCurrent ? (
                <div
                  key={fs.screenId}
                  className="flex items-center gap-2.5 rounded-lg bg-primary/8 border border-primary/15 px-3 py-2"
                >
                  <FlowDot status={fs.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-primary truncate">{fs.screenId}</p>
                    <p className="text-[10px] text-primary/60 truncate leading-tight">{fs.screenName}</p>
                  </div>
                  <span className="text-[9px] font-extrabold text-primary/60 uppercase shrink-0 bg-primary/10 px-1.5 py-0.5 rounded-md">
                    now
                  </span>
                </div>
              ) : (
                <Link
                  key={fs.screenId}
                  href={`/screens/${fs.screenId}`}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-muted/60 transition-colors group"
                >
                  <FlowDot status={fs.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground truncate">{fs.screenId}</p>
                    <p className="text-[10px] text-muted-foreground/60 truncate leading-tight">{fs.screenName}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-muted-foreground shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
