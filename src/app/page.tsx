import { AppShell } from "@/components/app-shell";
import { getProjects, getScreens } from "@/lib/data";
import { ProjectList } from "./project-list";

export default async function Home() {
  const [projects, screens] = await Promise.all([getProjects(), getScreens()]);

  const approvedCount = screens.filter((s) => s.status === "approved").length;
  const inReviewCount = screens.filter((s) => s.status === "in-review").length;
  const overallProgress =
    screens.length === 0 ? 0 : Math.round((approvedCount / screens.length) * 100);

  const projectsWithStats = projects.map((p) => {
    const ps = screens.filter((s) => s.projectId === p.projectId);
    const app = ps.filter((s) => s.status === "approved").length;
    return {
      ...p,
      screenCount: ps.length,
      approvedCount: app,
      progress: ps.length === 0 ? 0 : Math.round((app / ps.length) * 100),
    };
  });

  return (
    <AppShell>
      <ProjectList
        projects={projectsWithStats}
        globalStats={{ total: screens.length, approved: approvedCount, inReview: inReviewCount, progress: overallProgress }}
      />
    </AppShell>
  );
}
