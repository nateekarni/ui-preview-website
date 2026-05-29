import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import JSZip from "jszip";
import { getScreens } from "@/lib/data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const screens = await getScreens();
    const screen = screens.find((s) => s.screenId === id);

    if (!screen) {
      return NextResponse.json({ error: "Screen not found" }, { status: 404 });
    }

    // Resolve preview directory on disk
    // screen.previewPath is e.g. "/previews/dsl-msa/mobile-app/dashboard/employer-dashboard/index.html"
    const previewFileRelative = screen.previewPath;
    const previewDirRelative = path.dirname(previewFileRelative); // e.g. "/previews/dsl-msa/mobile-app/dashboard/employer-dashboard"
    const previewDirClean = previewDirRelative.startsWith("/") ? previewDirRelative.slice(1) : previewDirRelative;
    const previewFolderOnDisk = path.join(process.cwd(), "public", previewDirClean);

    // Resolve spec file on disk
    // screen.specPath is e.g. "/data/projects/dsl-msa/mobile-app/dashboard/employer-dashboard/spec.md"
    const specFileRelative = screen.specPath;
    const specFileClean = specFileRelative.startsWith("/") ? specFileRelative.slice(1) : specFileRelative;
    const specFileOnDisk = path.join(process.cwd(), specFileClean);
    const specDirOnDisk = path.dirname(specFileOnDisk);

    const zip = new JSZip();

    // Helper to recursively add files from a directory to JSZip
    async function addDirToZip(zipInstance: JSZip, folderPathOnDisk: string, zipFolderTarget: string) {
      try {
        const entries = await fs.readdir(folderPathOnDisk, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(folderPathOnDisk, entry.name);
          const targetPath = zipFolderTarget ? `${zipFolderTarget}/${entry.name}` : entry.name;
          if (entry.isDirectory()) {
            await addDirToZip(zipInstance, fullPath, targetPath);
          } else {
            const content = await fs.readFile(fullPath);
            zipInstance.file(targetPath, content);
          }
        }
      } catch (err) {
        console.error(`Error adding directory ${folderPathOnDisk} to zip:`, err);
      }
    }

    // Add all preview assets
    await addDirToZip(zip, previewFolderOnDisk, "preview");

    // Add spec.md if it exists
    try {
      const specContent = await fs.readFile(specFileOnDisk);
      zip.file("spec/spec.md", specContent);
    } catch (e) {
      console.warn("Spec file not found on disk:", specFileOnDisk, e);
    }

    // Add metadata.json if it exists
    try {
      const metadataFileOnDisk = path.join(specDirOnDisk, "metadata.json");
      const metadataContent = await fs.readFile(metadataFileOnDisk);
      zip.file("spec/metadata.json", metadataContent);
    } catch (e) {
      console.warn("Metadata file not found on disk:", specDirOnDisk, e);
    }

    // Add README.md
    const readmeContent = `# Flow Package: ${screen.screenName} (${screen.screenId})

This package contains the high-fidelity interactive preview mockup and visual specification files for:
- **Project**: ${screen.projectName} (${screen.projectId})
- **Flow**: ${screen.flowName} (${screen.flowId})
- **Screen**: ${screen.screenName} (${screen.screenId})

## Directory Contents:
- \`preview/\`: Contains the interactive HTML view and assets. Double-click \`preview/index.html\` to open it in a web browser.
- \`spec/\`: Contains the markdown visual design specification (\`spec.md\`) and metadata (\`metadata.json\`).

## AI Usage Instructions:
This package is structured to be read easily by any AI coding assistant. You can upload the entire ZIP file or drag-and-drop individual files (like \`spec/spec.md\`, \`preview/index.html\`, and \`preview/app.js\`) to another AI agent to resume development or generate production-ready code based on these mockup layouts.
`;
    zip.file("README.md", readmeContent);

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Return zip response
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="flow-${screen.screenId}.zip"`,
      },
    });
  } catch (error: any) {
    console.error("Export API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
