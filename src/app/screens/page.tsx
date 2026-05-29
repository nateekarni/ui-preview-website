import { AppShell } from "@/components/app-shell";
import { getScreenFilterOptions, getScreens } from "@/lib/data";

import { ScreenLibrary } from "./screen-library";

export default async function ScreensPage() {
  const [screens, filterOptions] = await Promise.all([getScreens(), getScreenFilterOptions()]);

  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold text-[var(--accent)]">Screen Library</p>
        <h2 className="mt-2 text-3xl font-bold">All UX/UI Screens</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          ค้นหาและกรอง Screen ตาม Project, Platform, Module, Status และ Assignee จาก metadata.json.
        </p>
      </div>

      <ScreenLibrary screens={screens} filterOptions={filterOptions} />
    </AppShell>
  );
}
