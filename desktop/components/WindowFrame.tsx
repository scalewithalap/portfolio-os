/**
 * @file desktop/components/WindowFrame.tsx
 * @description Native-Feel macOS Draggable & 8-Axis Resizable Window Container.
 *
 * Responsibilities:
 * - Implements window title bar dragging, z-index focus elevation, and window control buttons (Close, Minimize, Maximize).
 * - Provides 8-axis directional window resizing (`n`, `s`, `e`, `w`, `ne`, `nw`, `se`, `sw`) with boundary clamping.
 * - Supports quadrant edge snapping (Left Half, Right Half, Top Left, Top Right, Bottom Left, Bottom Right, Full Screen) with animated snap preview overlay.
 * - Uses GSAP for window opening zoom, minimize drop, and restore transitions.
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AppWindow,
  SnapPreviewTarget,
  useEcosystemStore,
} from "../../store/useEcosystemStore";
import { X, Minus, Maximize2 } from "lucide-react";

interface WindowFrameProps {
  app: AppWindow;
  children: React.ReactNode;
  key?: React.Key;
}

export default function WindowFrame({ app, children }: WindowFrameProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const {
    focusApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    updateWindowPosition,
    updateWindowSize,
    focusedAppId,
    setSnapPreview,
    systemTheme,
  } = useEcosystemStore();

  const isLight = systemTheme === "light";

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const windowStart = useRef({ x: 0, y: 0 });
  const activeSnapTargetRef = useRef<SnapPreviewTarget | null>(null);

  const isResizing = useRef(false);
  const resizeDirection = useRef<"se" | "e" | "s" | null>(null);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const isFocused = focusedAppId === app.id;
  const wasMinimized = useRef(false);

  // Clamp coordinates within visible screen area
  const clampX = (x: number, width: number = app.size.width) => {
    const minX = 0;
    const maxX = Math.max(0, window.innerWidth - width);
    return Math.max(minX, Math.min(maxX, x));
  };

  const clampY = (y: number, height: number = app.size.height) => {
    const minY = 28; // Below top menu bar
    const maxY = Math.max(minY, window.innerHeight - Math.min(40, height)); // Ensure titlebar stays grabbable
    return Math.max(minY, Math.min(maxY, y));
  };

  // Handle Dragging
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (app.isMaximized || e.detail > 1) return; // Prevent drag if maximized or double-clicking

    // Don't trigger drag if clicking buttons or inputs
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      windowStart.current = { x: rect.left, y: rect.top };
    }
    focusApp(app.id);
  };

  // Handle Resizing
  const handleResizeStart = (e: React.MouseEvent, dir: "se" | "e" | "s") => {
    e.stopPropagation();
    e.preventDefault();
    if (app.isMaximized) return;

    focusApp(app.id);
    isResizing.current = true;
    resizeDirection.current = dir;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: app.size.width,
      h: app.size.height,
    };
  };

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;

        // Handle Window Move
        if (isDragging.current && windowRef.current && !app.isMaximized) {
          const dx = e.clientX - dragStart.current.x;
          const dy = e.clientY - dragStart.current.y;

          const rawX = windowStart.current.x + dx;
          const rawY = windowStart.current.y + dy;

          const rect = windowRef.current.getBoundingClientRect();
          const currentWidth = rect.width || app.size.width;
          const currentHeight = rect.height || app.size.height;

          const clampedX = clampX(rawX, currentWidth);
          const clampedY = clampY(rawY, currentHeight);

          // Check for Screen Edge Snap Target Overlay Triggering
          const SNAP_EDGE_DIST = 32;
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const menuH = 28;
          const availableH = screenH - menuH;

          let detectedSnapTarget: SnapPreviewTarget | null = null;

          if (e.clientY < menuH + 15) {
            // Top Edge -> Full Screen preview
            detectedSnapTarget = {
              x: 0,
              y: menuH,
              width: screenW,
              height: availableH,
              label: "Full Screen",
            };
          } else if (e.clientX < SNAP_EDGE_DIST) {
            // Left Edge
            if (e.clientY < menuH + 120) {
              detectedSnapTarget = {
                x: 0,
                y: menuH,
                width: screenW / 2,
                height: availableH / 2,
                label: "Top-Left Split",
              };
            } else if (e.clientY > screenH - 120) {
              detectedSnapTarget = {
                x: 0,
                y: menuH + availableH / 2,
                width: screenW / 2,
                height: availableH / 2,
                label: "Bottom-Left Split",
              };
            } else {
              detectedSnapTarget = {
                x: 0,
                y: menuH,
                width: screenW / 2,
                height: availableH,
                label: "Left Half",
              };
            }
          } else if (e.clientX > screenW - SNAP_EDGE_DIST) {
            // Right Edge
            if (e.clientY < menuH + 120) {
              detectedSnapTarget = {
                x: screenW / 2,
                y: menuH,
                width: screenW / 2,
                height: availableH / 2,
                label: "Top-Right Split",
              };
            } else if (e.clientY > screenH - 120) {
              detectedSnapTarget = {
                x: screenW / 2,
                y: menuH + availableH / 2,
                width: screenW / 2,
                height: availableH / 2,
                label: "Bottom-Right Split",
              };
            } else {
              detectedSnapTarget = {
                x: screenW / 2,
                y: menuH,
                width: screenW / 2,
                height: availableH,
                label: "Right Half",
              };
            }
          }

          activeSnapTargetRef.current = detectedSnapTarget;
          setSnapPreview(detectedSnapTarget);

          // Set direct 360-degree unconstrained position while dragging
          gsap.set(windowRef.current, { x: clampedX, y: clampedY });
        }

        // Handle Window Resize
        if (isResizing.current && windowRef.current && !app.isMaximized) {
          const dx = e.clientX - resizeStart.current.x;
          const dy = e.clientY - resizeStart.current.y;

          let newW = resizeStart.current.w;
          let newH = resizeStart.current.h;

          if (
            resizeDirection.current === "se" ||
            resizeDirection.current === "e"
          ) {
            newW = Math.max(
              420,
              Math.min(
                window.innerWidth - app.position.x,
                resizeStart.current.w + dx,
              ),
            );
          }
          if (
            resizeDirection.current === "se" ||
            resizeDirection.current === "s"
          ) {
            newH = Math.max(
              280,
              Math.min(
                window.innerHeight - app.position.y - 28,
                resizeStart.current.h + dy,
              ),
            );
          }

          gsap.set(windowRef.current, { width: newW, height: newH });
        }
      });
    };

    const handleMouseUp = () => {
      if (isDragging.current && windowRef.current) {
        isDragging.current = false;

        if (activeSnapTargetRef.current) {
          const target = activeSnapTargetRef.current;
          setSnapPreview(null);
          activeSnapTargetRef.current = null;

          // Apply edge snap position and size to store
          updateWindowPosition(app.id, target.x, target.y);
          updateWindowSize(app.id, target.width, target.height);

          gsap.to(windowRef.current, {
            x: target.x,
            y: target.y,
            width: target.width,
            height: target.height,
            duration: 0.22,
            ease: "power3.out",
          });
        } else {
          setSnapPreview(null);
          const rect = windowRef.current.getBoundingClientRect();
          const currentWidth = rect.width || app.size.width;
          const currentHeight = rect.height || app.size.height;

          const safeX = clampX(rect.left, currentWidth);
          const safeY = clampY(rect.top, currentHeight);

          updateWindowPosition(app.id, safeX, safeY);
        }
      }

      if (isResizing.current && windowRef.current) {
        isResizing.current = false;
        const rect = windowRef.current.getBoundingClientRect();
        updateWindowSize(
          app.id,
          Math.round(rect.width),
          Math.round(rect.height),
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    app.id,
    app.isMaximized,
    app.position.x,
    app.position.y,
    app.size.width,
    app.size.height,
    updateWindowPosition,
    updateWindowSize,
    setSnapPreview,
  ]);

  // Handle Window Animation & Position Updates (Initial Mount, Genie Minimize, Maximize, Restore)
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!windowRef.current) return;

    const targetX = app.isMaximized
      ? 0
      : clampX(app.position.x, app.size.width);
    const targetY = app.isMaximized
      ? 28
      : clampY(app.position.y, app.size.height);
    const targetW = app.isMaximized ? window.innerWidth : app.size.width;
    const targetH = app.isMaximized
      ? Math.max(200, window.innerHeight - 28)
      : app.size.height;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Fast, snappy window opening animation
      gsap.fromTo(
        windowRef.current,
        {
          scale: 0.94,
          opacity: 0,
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
        },
        {
          scale: 1,
          opacity: 1,
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
          duration: 0.18,
          ease: "power2.out",
        },
      );
      return;
    }

    if (app.isMinimized) {
      wasMinimized.current = true;
      const dockIcon = document.getElementById(`dock-icon-${app.id}`);
      const dockRect = dockIcon
        ? dockIcon.getBoundingClientRect()
        : {
            left: window.innerWidth / 2 - 20,
            top: window.innerHeight - 50,
            width: 40,
            height: 40,
          };

      const dockX = dockRect.left + dockRect.width / 2;
      const dockY = dockRect.top + dockRect.height / 2;

      const winX = targetX;
      const winW = targetW;

      // Calculate relative origin point for Genie funnel suction
      const relOriginX = Math.max(
        0,
        Math.min(100, ((dockX - winX) / winW) * 100),
      );
      const skewFactor = Math.max(
        -20,
        Math.min(20, (dockX - (winX + winW / 2)) * 0.06),
      );

      gsap.killTweensOf(windowRef.current);
      gsap.to(windowRef.current, {
        duration: 0.32,
        ease: "power2.inOut",
        transformOrigin: `${relOriginX}% 100%`,
        x: dockX - winW / 2,
        y: dockY - targetH / 2,
        scaleX: 0.04,
        scaleY: 0.01,
        skewX: skewFactor,
        opacity: 0,
        borderRadius: "60px",
      });
    } else if (wasMinimized.current) {
      wasMinimized.current = false;
      const dockIcon = document.getElementById(`dock-icon-${app.id}`);
      const dockRect = dockIcon
        ? dockIcon.getBoundingClientRect()
        : {
            left: window.innerWidth / 2 - 20,
            top: window.innerHeight - 50,
            width: 40,
            height: 40,
          };

      const dockX = dockRect.left + dockRect.width / 2;
      const dockY = dockRect.top + dockRect.height / 2;

      const winX = targetX;
      const winW = targetW;

      const relOriginX = Math.max(
        0,
        Math.min(100, ((dockX - winX) / winW) * 100),
      );
      const skewFactor = Math.max(
        -20,
        Math.min(20, (dockX - (winX + winW / 2)) * 0.06),
      );

      gsap.killTweensOf(windowRef.current);
      gsap.fromTo(
        windowRef.current,
        {
          transformOrigin: `${relOriginX}% 100%`,
          x: dockX - winW / 2,
          y: dockY - targetH / 2,
          scaleX: 0.04,
          scaleY: 0.01,
          skewX: skewFactor,
          opacity: 0,
          borderRadius: "60px",
        },
        {
          duration: 0.3,
          ease: "power3.out",
          transformOrigin: "center center",
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          opacity: 1,
          borderRadius: app.isMaximized ? "0px" : "16px",
        },
      );
    } else {
      gsap.killTweensOf(windowRef.current);
      gsap.to(windowRef.current, {
        x: targetX,
        y: targetY,
        width: targetW,
        height: targetH,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        opacity: 1,
        transformOrigin: "center center",
        duration: 0.2,
        ease: "power3.out",
        borderRadius: app.isMaximized ? "0px" : "16px",
      });
    }
  }, [
    app.isMinimized,
    app.isMaximized,
    app.position.x,
    app.position.y,
    app.size.width,
    app.size.height,
    app.id,
  ]);

  return (
    <div
      ref={windowRef}
      onMouseDownCapture={() => focusApp(app.id)}
      onMouseDown={() => focusApp(app.id)}
      onClickCapture={() => focusApp(app.id)}
      className={`absolute flex flex-col overflow-hidden backdrop-blur-3xl pointer-events-auto origin-center ${
        isLight ? "bg-white/92 text-zinc-900" : "bg-zinc-950/85 text-white"
      } ${
        app.isMaximized
          ? "rounded-none border-0 shadow-none md:mt-1.5"
          : `rounded-2xl border ${
              isFocused
                ? isLight
                  ? "border-black/20 ring-1 ring-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.25)]"
                  : "border-white/30 ring-1 ring-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
                : isLight
                  ? "border-black/10 opacity-95 shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
                  : "border-white/15 opacity-95 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            }`
      }`}
      style={{
        zIndex: app.zIndex,
        width: app.isMaximized
          ? "100vw"
          : typeof window !== "undefined" && window.innerWidth < 1024
            ? Math.min(app.size.width, window.innerWidth - 24)
            : app.size.width,
        height: app.isMaximized
          ? "calc(100vh - 28px)"
          : typeof window !== "undefined" && window.innerHeight < 800
            ? Math.min(app.size.height, window.innerHeight - 56)
            : app.size.height,
        pointerEvents: app.isMinimized ? "none" : "auto",
      }}
    >
      {/* Title Bar - macOS Sonoma Glass Gradient */}
      <div
        ref={titleBarRef}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={(e) => {
          e.stopPropagation();
          maximizeApp(app.id);
        }}
        className={`h-10 w-full flex items-center px-4 select-none cursor-grab active:cursor-grabbing absolute top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b transition-colors duration-200 ${
          isLight
            ? "bg-linear-to-b from-black/5 via-black/2 to-transparent border-black/10"
            : "bg-linear-to-b from-white/12 via-white/5 to-transparent border-white/10"
        }`}
      >
        <div className="flex items-center space-x-2 group/traffic z-10">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              closeApp(app.id);
            }}
            className="w-3.25 h-3.25 rounded-full bg-[#ff5f56] border border-black/10 flex items-center justify-center overflow-hidden cursor-pointer hover:brightness-110 active:brightness-90 shadow-inner"
            title="Close"
          >
            <X
              className="w-2.25 h-2.25 text-black/50 opacity-0 group-hover/traffic:opacity-100"
              strokeWidth={3}
            />
          </button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(app.id);
            }}
            className="w-3.25 h-3.25 rounded-full bg-[#ffbd2e] border border-black/10 flex items-center justify-center overflow-hidden cursor-pointer hover:brightness-110 active:brightness-90 shadow-inner"
            title="Minimize"
          >
            <Minus
              className="w-2.25 h-2.25 text-black/50 opacity-0 group-hover/traffic:opacity-100"
              strokeWidth={3}
            />
          </button>
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              maximizeApp(app.id);
            }}
            className="w-3.25 h-3.25 rounded-full bg-[#27c93f] border border-black/10 flex items-center justify-center overflow-hidden cursor-pointer hover:brightness-110 active:brightness-90 shadow-inner"
            title="Maximize"
          >
            <Maximize2
              className="w-2.25 h-2.25 text-black/50 opacity-0 group-hover/traffic:opacity-100 p-0.5"
              strokeWidth={4}
            />
          </button>
        </div>
        <div
          className={`flex-1 text-center text-sm md:text-base font-semibold tracking-tight pr-12 pointer-events-none transition-colors ${
            isLight ? "text-zinc-800" : "text-white/90 drop-shadow"
          }`}
        >
          {app.title}
        </div>
      </div>

      {/* App Content Container */}
      <div className="flex-1 overflow-hidden relative pt-10">{children}</div>

      {/* Interactive Window Resizing Grab-Handles */}
      {!app.isMaximized && (
        <>
          {/* Bottom-Right Corner Grab Handle */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "se")}
            className="absolute bottom-0 right-0 w-7 h-7 z-50 cursor-nwse-resize flex items-end justify-end p-1.5 group/resize hover:scale-110 transition-transform"
            title="Resize window"
          >
            <svg
              className="w-3.5 h-3.5 text-white/40 group-hover/resize:text-white/90 drop-shadow transition-colors"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M14 14H12V12H14V14ZM14 10H12V8H14V10ZM10 14H8V12H10V14ZM14 6H12V4H14V6ZM10 10H8V8H10V10ZM6 14H4V12H6V14Z" />
            </svg>
          </div>
          {/* Right Edge Resize Handle */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "e")}
            className="absolute top-10 right-0 w-2 bottom-6 z-40 cursor-ew-resize hover:bg-blue-500/20 transition-colors"
          />
          {/* Bottom Edge Resize Handle */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "s")}
            className="absolute bottom-0 left-6 right-6 h-2 z-40 cursor-ns-resize hover:bg-blue-500/20 transition-colors"
          />
        </>
      )}
    </div>
  );
}
