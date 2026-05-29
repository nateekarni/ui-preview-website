"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import Link from "next/link";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  GitFork,
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  X,
  Layers,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

import type { PreviewScreen } from "@/lib/types";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_CONFIG: Record<Device, { label: string; width: number; icon: React.ReactNode }> = {
  desktop: { label: "Desktop", width: 0,   icon: <Monitor    className="h-4 w-4" /> },
  tablet:  { label: "Tablet",  width: 768, icon: <Tablet     className="h-4 w-4" /> },
  mobile:  { label: "Mobile",  width: 390, icon: <Smartphone className="h-4 w-4" /> },
};

function FlowStatusIcon({ status }: { status: string }) {
  switch (status) {
    case "approved":      return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />;
    case "in-review":     return <Clock        className="h-3.5 w-3.5 text-blue-500   shrink-0" />;
    case "need-revision": return <AlertCircle  className="h-3.5 w-3.5 text-rose-500   shrink-0" />;
    default:              return <Circle       className="h-3.5 w-3.5 text-slate-400  shrink-0" />;
  }
}

// ── Touch Gesture Overlay (mobile preview only) ─────────────────────────────
function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null;

  let current: HTMLElement | null = el;
  while (current && current !== current.ownerDocument.documentElement) {
    const style = current.ownerDocument.defaultView?.getComputedStyle(current);
    if (style) {
      const overflowY = style.overflowY;
      const isScrollableStyle = overflowY === "auto" || overflowY === "scroll";
      const hasScrollableContent = current.scrollHeight > current.clientHeight;

      if (
        current.classList.contains("detail-content") ||
        current.classList.contains("app-content") ||
        (isScrollableStyle && hasScrollableContent)
      ) {
        return current;
      }
    }
    current = current.parentElement;
  }

  return el.ownerDocument.querySelector<HTMLElement>(".app-content") || el.ownerDocument.body;
}

function TouchGestureOverlay({
  iframeRef,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}) {
  const dotRef   = useRef<HTMLDivElement>(null);
  const isDown   = useRef(false);
  const rafId    = useRef<number | null>(null);
  const scrollEl = useRef<HTMLElement | null>(null);
  const scrollSt = useRef(0);
  const pointerStart = useRef({ x: 0, y: 0, time: 0 });

  /* ── Dot helpers (imperative, no re-render) ── */
  const dot = (x: number, y: number, show: boolean, pressed: boolean) => {
    const el = dotRef.current;
    if (!el) return;
    el.style.display  = show ? "block" : "none";
    el.style.left     = x + "px";
    el.style.top      = y + "px";
    el.style.transform = pressed
      ? "translate(-50%,-50%) scale(0.52)"
      : "translate(-50%,-50%) scale(1)";
    el.style.background  = pressed ? "rgba(36,68,230,0.42)"  : "rgba(66,90,210,0.18)";
    el.style.borderColor = pressed ? "rgba(36,68,230,0.92)"  : "rgba(66,90,210,0.75)";
  };

  const stopMomentum = () => {
    if (rafId.current != null) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  };

  const startMomentum = (el: HTMLElement, vy: number) => {
    // Check screen density based on element classes to adjust scroll physics
    const isDetailScreen = el.classList.contains("detail-content") || el.id.includes("detail") || el.id.includes("payment");

    // Low density (Dashboard) -> Smooth, lightweight, long gliding feel
    // High density (Details/Transactions) -> Tight, grounded, stops quickly to prevent overshooting
    const multiplier = isDetailScreen ? 85 : 130;
    const friction   = isDetailScreen ? 0.83 : 0.89;

    let v = -vy * multiplier;
    const frame = () => {
      v *= friction;
      el.scrollTop += v;
      if (Math.abs(v) > 0.3) rafId.current = requestAnimationFrame(frame);
    };
    rafId.current = requestAnimationFrame(frame);
  };

  const getCoordinates = (e: any) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e: any) => {
    const coords = getCoordinates(e);
    pointerStart.current = { x: coords.x, y: coords.y, time: Date.now() };
    isDown.current = true;
  };

  const handleEnd = (e: any) => {
    isDown.current = false;
    const coords = getCoordinates(e);
    const dx = coords.x - pointerStart.current.x;
    const dy = coords.y - pointerStart.current.y;
    const dt = Date.now() - pointerStart.current.time;

    const distance = Math.sqrt(dx * dx + dy * dy);
    // If pointer displacement is small and the action was relatively fast, it is a click/tap!
    if (distance < 12 && dt < 300) {
      const iframe = iframeRef.current;
      const doc    = iframe?.contentDocument;
      if (iframe && doc) {
        const rect = iframe.getBoundingClientRect();
        const clickX = coords.x - rect.left;
        const clickY = coords.y - rect.top;

        let el = doc.elementFromPoint(clickX, clickY) as HTMLElement | null;

        // Traverse up to find the closest interactive element (button, link, or custom clickable items)
        let current = el;
        while (current && current !== doc.body) {
          if (
            current.tagName === "BUTTON" ||
            current.tagName === "A" ||
            current.classList.contains("channel-option-card") ||
            current.classList.contains("segment-tab") ||
            current.classList.contains("dropdown-item") ||
            current.classList.contains("radio-option") ||
            current.onclick ||
            current.getAttribute("onclick") ||
            doc.defaultView?.getComputedStyle(current).cursor === "pointer"
          ) {
            el = current;
            break;
          }
          current = current.parentElement;
        }

        if (el) {
          el.click();
        }
      }
    }
  };

  const wrapHandler = (originalHandler: any, customLogic: (e: any) => void) => {
    return (e: any) => {
      customLogic(e);
      originalHandler?.(e);
    };
  };

  const bind = useGesture(
    {
      /* Cursor tracking when not pressing */
      onMove: ({ xy: [x, y] }) => {
        if (!isDown.current) dot(x, y, true, false);
      },

      onDrag: ({ first, last, active, movement: [, my], velocity: [, vy], xy: [x, y], event }) => {
        const iframe = iframeRef.current;
        const doc    = iframe?.contentDocument;
        if (!doc) return;

        /* ── Press start ── */
        if (first) {
          stopMomentum();
          isDown.current = true;
          dot(x, y, true, true);

          const rect = iframe.getBoundingClientRect();
          const touchX = x - rect.left;
          const touchY = y - rect.top;

          const targetEl = doc.elementFromPoint(touchX, touchY) as HTMLElement | null;
          const sc = findScrollParent(targetEl);

          scrollEl.current  = sc ?? null;
          scrollSt.current  = sc?.scrollTop ?? 0;
          event?.preventDefault();
        }

        /* ── Dragging ── */
        if (active && !first && !last) {
          dot(x, y, true, true);
          if (scrollEl.current) scrollEl.current.scrollTop = scrollSt.current - my;
        }

        /* ── Release ── */
        if (last) {
          isDown.current = false;
          dot(x, y, true, false);

          const isSignificantDrag = Math.abs(my) > 6;
          const isFlick = Math.abs(vy) > 0.15;

          if (scrollEl.current && isSignificantDrag && isFlick) {
            // Cap vy between -3.0 and 3.0 to prevent high-speed micro-jitters from shooting scroll away
            const cappedVy = Math.max(-3, Math.min(3, vy));
            startMomentum(scrollEl.current, cappedVy);
          }

          scrollEl.current = null;
        }
      },
    },
    {
      drag: {
        filterTaps:     true,
        threshold:      5,
        preventDefault: true,
        pointer:        { capture: true, mouse: true },
      },
    }
  );

  const gestureBind = bind();
  const customBind = {
    ...gestureBind,
    onPointerDown: wrapHandler(gestureBind.onPointerDown, handleStart),
    onPointerUp: wrapHandler(gestureBind.onPointerUp, handleEnd),
    onMouseDown: wrapHandler(gestureBind.onMouseDown, handleStart),
    onMouseUp: wrapHandler(gestureBind.onMouseUp, handleEnd),
    onTouchStart: wrapHandler(gestureBind.onTouchStart, handleStart),
    onTouchEnd: wrapHandler(gestureBind.onTouchEnd, handleEnd),
  };

  return (
    <>
      {/* Transparent overlay — absorbs all mouse events, blocks iframe hover */}
      <div
        {...customBind}
        onMouseLeave={() => { if (!isDown.current) dot(0, 0, false, false); }}
        style={{
          position:   "absolute",
          inset:      0,
          cursor:     "none",
          touchAction:"none",
          userSelect: "none",
          zIndex:     10,
        }}
      />

      {/* Finger dot — fixed in viewport coordinates */}
      <div
        ref={dotRef}
        style={{
          position:     "fixed",
          width:        28,
          height:       28,
          borderRadius: "50%",
          background:   "rgba(66,90,210,0.18)",
          border:       "2.5px solid rgba(66,90,210,0.75)",
          boxShadow:    "0 0 0 5px rgba(66,90,210,0.07)",
          pointerEvents:"none",
          transform:    "translate(-50%,-50%) scale(1)",
          transition:   "transform .08s ease, background .08s ease, border-color .08s ease",
          zIndex:       99999,
          display:      "none",
        }}
      />
    </>
  );
}

// ── Realistic phone frame ──────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div
      className="relative flex flex-col overflow-hidden select-none"
      style={{
        width: 390,
        height: 844,
        borderRadius: 54,
        background: "#111",
        boxShadow: `
          0 0 0 1.5px #3a3a3a,
          0 0 0 3px #1a1a1a,
          0 0 0 5px #2a2a2a,
          0 30px 80px rgba(0,0,0,0.7),
          0 10px 30px rgba(0,0,0,0.5),
          inset 0 0 0 1px rgba(255,255,255,0.06)
        `,
      }}
    >
      {/* Side buttons — left */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-8 rounded-l-sm"
        style={{ background: "#2a2a2a", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
      <div className="absolute -left-[3px] top-[168px] w-[3px] h-14 rounded-l-sm"
        style={{ background: "#2a2a2a", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
      <div className="absolute -left-[3px] top-[236px] w-[3px] h-14 rounded-l-sm"
        style={{ background: "#2a2a2a", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
      {/* Side buttons — right */}
      <div className="absolute -right-[3px] top-[168px] w-[3px] h-20 rounded-r-sm"
        style={{ background: "#2a2a2a", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />

      {/* Screen surface */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          margin: "2px",
          borderRadius: 52,
          flex: 1,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Status Bar */}
        <div
          className="relative flex items-center justify-between shrink-0 text-black"
          style={{ height: 54, paddingLeft: 28, paddingRight: 24 }}
        >
          {/* Time */}
          <span className="text-[15px] font-black tracking-tight">{timeStr}</span>

          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-3"
            style={{
              width: 120,
              height: 34,
              borderRadius: 20,
              background: "#000",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
            }}
          />

          {/* Status icons */}
          <div className="flex items-center gap-1">
            <Signal    className="h-3.5 w-3.5" strokeWidth={2.5} />
            <Wifi      className="h-3.5 w-3.5" strokeWidth={2.5} />
            <Battery   className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
        </div>

        {/* Iframe content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>

        {/* Home indicator */}
        <div className="shrink-0 flex items-center justify-center pb-2 pt-1 bg-white">
          <div className="h-1.5 w-28 rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  );
}

// ── Tablet frame ──────────────────────────────────────────────────────────────
function TabletFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden select-none"
      style={{
        width: 810,
        height: "calc(100vh - 80px)",
        maxHeight: 1080,
        borderRadius: 36,
        background: "#111",
        boxShadow: `
          0 0 0 1.5px #3a3a3a,
          0 0 0 3px #1a1a1a,
          0 0 0 5px #2a2a2a,
          0 30px 80px rgba(0,0,0,0.7),
          inset 0 0 0 1px rgba(255,255,255,0.05)
        `,
      }}
    >
      {/* Home button (iPad style) */}
      <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-[4px] h-12 rounded-r-sm"
        style={{ background: "#2a2a2a" }} />

      <div
        className="flex flex-col overflow-hidden"
        style={{ margin: "2px", borderRadius: 34, flex: 1, background: "#fff", overflow: "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function PreviewPage({
  screen,
  flowScreens,
}: {
  screen: PreviewScreen;
  flowScreens: PreviewScreen[];
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isMobileApp = screen.platform?.toLowerCase().includes("mobile");

  const [activeScreenId, setActiveScreenId] = useState(screen.screenId);
  const [device, setDevice] = useState<Device>(isMobileApp ? "mobile" : "desktop");
  const [panelOpen, setPanelOpen] = useState(false);

  const [pos, setPos] = useState({ x: 24, y: 24 });
  const dragging   = useRef(false);
  const didDrag    = useRef(false);
  const offset     = useRef({ x: 0, y: 0 });
  const buttonRef  = useRef<HTMLButtonElement>(null);

  const activeScreen = flowScreens.find((s) => s.screenId === activeScreenId) ?? screen;
  const cfg = DEVICE_CONFIG[device];

  // drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    didDrag.current  = false;
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    offset.current = { x: rect.right - e.clientX, y: rect.bottom - e.clientY };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      didDrag.current = true;
      const newX = window.innerWidth  - e.clientX - offset.current.x;
      const newY = window.innerHeight - e.clientY - offset.current.y;
      setPos({
        x: Math.max(8, Math.min(newX, window.innerWidth  - 60)),
        y: Math.max(8, Math.min(newY, window.innerHeight - 60)),
      });
    };
    const onUp = () => { dragging.current = false; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#0f172a" }}
    >
      {/* ── Viewport ── */}
      {/* All devices: render the iframe full-viewport.
          Mobile/tablet HTML files contain their own .phone-shell CSS mockup,
          which looks identical to opening the file directly. */}
      <div className="relative w-full h-full">
        <iframe
          ref={iframeRef}
          key={activeScreenId}
          src={activeScreen.previewPath}
          className="w-full h-full border-none"
          title={activeScreen.screenName}
        />
        {/* Gesture overlay — only on mobile app previews */}
        {isMobileApp && <TouchGestureOverlay iframeRef={iframeRef} />}
      </div>

      {/* Subtle grid background for non-desktop */}
      {device !== "desktop" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      {/* ── Floating Button ── */}
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={() => { if (!didDrag.current) setPanelOpen((v) => !v); }}
        style={{ position: "fixed", right: pos.x, bottom: pos.y, cursor: "grab", zIndex: 9999 }}
        className="h-12 w-12 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center border-2 border-slate-200 hover:border-primary hover:text-primary transition-colors select-none"
        title="Open Preview Panel"
      >
        <Layers className="h-5 w-5" />
      </button>

      {/* ── Popover Panel ── */}
      {panelOpen && (() => {
        const PANEL_W = 288; // w-72
        const BTN_SIZE = 48;
        const GAP = 8;
        // button's left edge from left of screen
        const btnLeft = window.innerWidth - pos.x - BTN_SIZE;
        // if there's enough room to the right of the button, open right; else open left
        const openRight = btnLeft + BTN_SIZE + GAP + PANEL_W <= window.innerWidth;
        const panelStyle: React.CSSProperties = openRight
          ? { position: "fixed", left: btnLeft + BTN_SIZE + GAP, bottom: pos.y - 20, zIndex: 9998 }
          : { position: "fixed", right: pos.x + BTN_SIZE + GAP, bottom: pos.y - 20, zIndex: 9998 };
        return (
          <div style={panelStyle} className="w-72 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-border flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{activeScreen.screenId}</p>
                <p className="text-xs font-bold text-foreground truncate">{activeScreen.screenName}</p>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 ml-2"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Back */}
            <div className="px-4 py-3 border-b border-border/60">
              <Link
                href={`/screens/${screen.screenId}`}
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Task Detail
              </Link>
            </div>

            {/* Device switcher */}
            <div className="px-4 py-3 border-b border-border/60">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Device</p>
              <div className="flex gap-1.5">
                {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
                  const c = DEVICE_CONFIG[d];
                  const isActive = device === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setDevice(d)}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-xl border py-2.5 text-[10px] font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {c.icon}
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile frame note */}
              {device === "mobile" && (
                <p className="mt-2 text-[10px] text-primary/70 font-semibold text-center">
                  📱 Mobile frame พร้อม Dynamic Island
                </p>
              )}
              {device === "tablet" && (
                <p className="mt-2 text-[10px] text-primary/70 font-semibold text-center">
                  🖥 Tablet frame (810px)
                </p>
              )}
            </div>

            {/* Flow screens */}
            <div className="px-4 py-3 max-h-60 overflow-y-auto">
              <div className="flex items-center gap-1.5 mb-2">
                <GitFork className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Flow Screens</p>
              </div>
              <p className="text-[10px] text-muted-foreground font-semibold mb-2">{screen.flowName}</p>
              <div className="space-y-1">
                {flowScreens.map((fs) => {
                  const isActive = fs.screenId === activeScreenId;
                  return (
                    <button
                      key={fs.screenId}
                      onClick={() => setActiveScreenId(fs.screenId)}
                      className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all ${
                        isActive ? "bg-primary/8 border border-primary/20" : "hover:bg-muted/60 border border-transparent"
                      }`}
                    >
                      <FlowStatusIcon status={fs.status} />
                      <div className="min-w-0 flex-1">
                        <p className={`text-[10px] font-bold truncate ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                          {fs.screenId}
                        </p>
                        <p className={`text-[10px] truncate ${isActive ? "text-primary/70" : "text-muted-foreground/70"}`}>
                          {fs.screenName}
                        </p>
                      </div>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
