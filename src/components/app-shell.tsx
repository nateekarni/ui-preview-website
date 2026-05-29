"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { 
  FolderKanban, 
  Layers, 
  GitFork, 
  Users, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { label: "Projects", href: "/", icon: FolderKanban },
  { label: "Screen Library", href: "/screens", icon: Layers },
  { label: "Flows", href: "/flows", icon: GitFork },
  { label: "Assignees", href: "/assignees", icon: Users },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.005_240)] font-sans antialiased text-foreground">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-border bg-white px-5 py-8 lg:block shadow-sm">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground leading-none">PREVIEW SYSTEM</p>
                <h1 className="mt-1 text-lg font-extrabold tracking-tight text-foreground leading-none">UX/UI Hub</h1>
              </div>
            </Link>

            <nav className="mt-12 space-y-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = 
                  pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-sm shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                    }`} />
                    <span className={isActive ? "text-white" : ""}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent-soft/30 p-4 border border-primary/10">
            <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Next.js + Shadcn UI
            </h4>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground font-medium">
              ระบบจัดการและทดสอบไฟล์ Preview แนะนำสำหรับ AI Agent และ Dev Team
            </p>
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <main className="lg:pl-60 flex flex-col min-h-screen">
        {/* Header on Mobile */}
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 px-6 py-4 backdrop-blur-md lg:hidden flex items-center justify-between shadow-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm shadow-primary/15">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-base font-extrabold tracking-tight">UX/UI Preview</h2>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:bg-muted rounded-lg">
                <Menu className="h-5.5 w-5.5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">PREVIEW SYSTEM</p>
                    <h2 className="text-base font-extrabold tracking-tight">UX/UI Hub</h2>
                  </div>
                </div>

                <nav className="mt-10 space-y-1.5">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = 
                      pathname === item.href || 
                      (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="rounded-xl bg-muted p-4">
                <h4 className="text-xs font-bold text-primary">UX/UI Platform v1.1</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  พัฒนาด้วยโครงสร้างไฟล์ Next.js 15 App Router & Shadcn UI
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 w-full px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
