import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { getScreens } from "@/lib/data";
import { ScreenDetailView } from "./screen-detail-view";

interface ScreenPageProps {
  params: Promise<{ id: string }>;
}

async function readFileSafe(relativePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    return await fs.readFile(fullPath, "utf8");
  } catch {
    return "";
  }
}

export default async function ScreenDetailPage({ params }: ScreenPageProps) {
  const { id } = await params;
  const screens = await getScreens();
  const screen = screens.find((s) => s.screenId === id);

  if (!screen) {
    notFound();
  }

  const [specContent, flowScreens] = await Promise.all([
    readFileSafe(screen.specPath.startsWith("/") ? screen.specPath.slice(1) : screen.specPath),
    Promise.resolve(screens.filter((s) => s.flowId === screen.flowId && s.screenId !== screen.screenId)),
  ]);

  return (
    <AppShell>
      <div className="border-b border-border pb-5 mb-6">
        <Link
          href={`/projects/${screen.projectId}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {screen.projectName}</span>
        </Link>

        <div className="mt-3 flex items-center gap-2 text-primary text-xs font-bold">
          <Layers className="h-3.5 w-3.5" />
          <span>Task Detail</span>
        </div>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-foreground">
          {screen.screenName}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          <span className="font-mono">{screen.screenId}</span>
          {" · "}
          {screen.moduleName} · {screen.featureName} · <span className="font-semibold">v{screen.version}</span>
        </p>
      </div>

      <ScreenDetailView
        screen={screen}
        specContent={specContent}
        flowScreens={flowScreens}
      />
    </AppShell>
  );
}

export async function generateStaticParams() {
  const screens = await getScreens();
  return screens.map((s) => ({ id: s.screenId }));
}
