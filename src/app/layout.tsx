import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "UX/UI Preview Hub",
  description: "Internal hub for UX/UI HTML previews, specs, and AI handoff prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
