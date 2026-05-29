const statusTone: Record<string, string> = {
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "in-review": "bg-blue-50 text-blue-700 ring-blue-200",
  draft: "bg-slate-100 text-slate-700 ring-slate-200",
  "need-revision": "bg-amber-50 text-amber-800 ring-amber-200",
  "in-progress": "bg-blue-50 text-blue-700 ring-blue-200",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusTone[status] ?? statusTone.draft}`}>
      {status}
    </span>
  );
}
