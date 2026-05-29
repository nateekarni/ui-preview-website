import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Preview",
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden">
      {children}
    </div>
  );
}
