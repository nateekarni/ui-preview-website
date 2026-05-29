type Metric = {
  label: string;
  value: string | number;
};

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] md:grid-cols-5">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-4">
          <dt className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">{metric.label}</dt>
          <dd className="mt-2 text-2xl font-bold">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
