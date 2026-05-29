export type PlatformCode = "public-website" | "admin-web" | "mobile-app" | "shared";

export type PreviewStatus =
  | "draft"
  | "in-review"
  | "approved"
  | "need-revision";

export type PreviewPriority = "low" | "medium" | "high";

export type PreviewProject = {
  projectId: string;
  projectName: string;
  description: string;
  platforms: PlatformCode[];
  status: PreviewStatus | "in-progress";
  owner: string;
  logoPath?: string;
  createdAt: string;
  updatedAt: string;
};

export type PreviewScreen = {
  screenId: string;
  screenName: string;
  projectId: string;
  projectName: string;
  platform: PlatformCode;
  module: string;
  moduleName: string;
  feature: string;
  featureName: string;
  flowId: string;
  flowName: string;
  description: string;
  assignee: string;
  reviewer: string;
  status: PreviewStatus;
  priority: PreviewPriority;
  version: string;
  previewPath: string;
  specPath: string;
  promptPath: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type DashboardSummary = {
  projectCount: number;
  screenCount: number;
  moduleCount: number;
  featureCount: number;
  flowCount: number;
  progress: number;
  statusCounts: Record<string, number>;
};
