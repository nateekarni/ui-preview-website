import { promises as fs } from "node:fs";
import path from "node:path";

import type { DashboardSummary, PreviewProject, PreviewScreen } from "./types";

const dataRoot = path.join(process.cwd(), "data", "projects");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function findFiles(dir: string, fileName: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return findFiles(entryPath, fileName);
      }
      return entry.name === fileName ? [entryPath] : [];
    }),
  );

  return nested.flat();
}

export async function getProjects(): Promise<PreviewProject[]> {
  const entries = await fs.readdir(dataRoot, { withFileTypes: true });
  const projects = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => readJsonFile<PreviewProject>(path.join(dataRoot, entry.name, "project.json"))),
  );

  return projects.sort((a, b) => a.projectName.localeCompare(b.projectName, "th"));
}

export async function getScreens(): Promise<PreviewScreen[]> {
  const files = await findFiles(dataRoot, "metadata.json");
  const screens = await Promise.all(files.map((file) => readJsonFile<PreviewScreen>(file)));

  return screens.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.screenId.localeCompare(b.screenId));
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [projects, screens] = await Promise.all([getProjects(), getScreens()]);
  const approvedCount = screens.filter((screen) => screen.status === "approved").length;

  return {
    projectCount: projects.length,
    screenCount: screens.length,
    moduleCount: new Set(screens.map((screen) => `${screen.platform}:${screen.module}`)).size,
    featureCount: new Set(screens.map((screen) => `${screen.module}:${screen.feature}`)).size,
    flowCount: new Set(screens.map((screen) => screen.flowId)).size,
    progress: screens.length === 0 ? 0 : Math.round((approvedCount / screens.length) * 100),
    statusCounts: screens.reduce<Record<string, number>>((counts, screen) => {
      counts[screen.status] = (counts[screen.status] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "en"));
}

export async function getScreenFilterOptions() {
  const screens = await getScreens();

  return {
    projects: uniqueSorted(screens.map((screen) => screen.projectName)),
    platforms: uniqueSorted(screens.map((screen) => screen.platform)),
    modules: uniqueSorted(screens.map((screen) => screen.moduleName)),
    features: uniqueSorted(screens.map((screen) => screen.featureName)),
    statuses: uniqueSorted(screens.map((screen) => screen.status)),
    assignees: uniqueSorted(screens.map((screen) => screen.assignee)),
  };
}
