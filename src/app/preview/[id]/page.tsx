import { notFound } from "next/navigation";
import { getScreens } from "@/lib/data";
import { PreviewPage } from "./preview-page";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function HTMLPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const screens = await getScreens();
  const screen = screens.find((s) => s.screenId === id);

  if (!screen) {
    notFound();
  }

  const flowScreens = screens.filter((s) => s.flowId === screen.flowId);

  return (
    <PreviewPage
      screen={screen}
      flowScreens={flowScreens}
    />
  );
}
