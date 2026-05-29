import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { getDashboardSummary, getProjects, getScreens } from "@/lib/data";

export default async function ProjectsPage() {
  const [projects, screens, summary] = await Promise.all([getProjects(), getScreens(), getDashboardSummary()]);

  return (
    <AppShell>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--accent)]">Projects</p>
          <h2 className="mt-2 text-3xl font-bold">Project List</h2>
        </div>
        <p className="text-sm text-[var(--muted)]">{summary.screenCount} screens tracked from file-based metadata</p>
      </div>

      <div className="mt-6 grid gap-5">
        {projects.map((project) => {
          const projectScreens = screens.filter((screen) => screen.projectId === project.projectId);
          const modules = new Set(projectScreens.map((screen) => `${screen.platform}:${screen.module}`)).size;
          const features = new Set(projectScreens.map((screen) => `${screen.module}:${screen.feature}`)).size;
          const flows = new Set(projectScreens.map((screen) => screen.flowId)).size;
          const approved = projectScreens.filter((screen) => screen.status === "approved").length;
          const progress = projectScreens.length === 0 ? 0 : Math.round((approved / projectScreens.length) * 100);

          return (
            <article key={project.projectId} className="rounded-lg border border-[var(--line)] bg-white p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">{project.projectName}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.platforms.map((platform) => (
                      <span key={platform} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <StatusBadge status={project.status} />
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
                <div>
                  <dt className="text-[var(--muted)]">Modules</dt>
                  <dd className="mt-1 font-semibold">{modules}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Features</dt>
                  <dd className="mt-1 font-semibold">{features}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Screens</dt>
                  <dd className="mt-1 font-semibold">{projectScreens.length}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Flows</dt>
                  <dd className="mt-1 font-semibold">{flows}</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Progress</dt>
                  <dd className="mt-1 font-semibold">{progress}%</dd>
                </div>
              </dl>

              <div className="mt-5">
                <Link href="/screens" className="text-sm font-semibold text-[var(--accent)]">
                  Open project screens
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
