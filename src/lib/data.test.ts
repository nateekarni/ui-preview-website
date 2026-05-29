import { describe, expect, it } from "vitest";

import {
  getDashboardSummary,
  getProjects,
  getScreenFilterOptions,
  getScreens,
} from "./data";

describe("file based preview hub data", () => {
  it("loads projects and screens from the data folder", async () => {
    const projects = await getProjects();
    const screens = await getScreens();

    expect(projects).toHaveLength(1);
    expect(projects[0].projectId).toBe("obt-system");
    expect(screens.length).toBeGreaterThanOrEqual(5);
    expect(screens.map((screen) => screen.screenId)).toContain("ADM-NEWS-002");
  });

  it("summarizes counts and status progress for the dashboard", async () => {
    const summary = await getDashboardSummary();

    expect(summary.projectCount).toBe(1);
    expect(summary.screenCount).toBeGreaterThanOrEqual(5);
    expect(summary.statusCounts["in-review"]).toBeGreaterThan(0);
    expect(summary.progress).toBeGreaterThan(0);
  });

  it("returns stable filter options for the screen library", async () => {
    const options = await getScreenFilterOptions();

    expect(options.platforms).toEqual(["admin-web", "mobile-app", "public-website"]);
    expect(options.statuses).toContain("approved");
    expect(options.assignees).toContain("Dev A");
  });
});
