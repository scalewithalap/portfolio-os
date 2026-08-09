/**
 * @file desktop/components/DesktopDock.tsx
 * @description macOS Animated Dock Component with Cosine Distance Magnification.
 *
 * Responsibilities:
 * - Renders the floating macOS bottom dock featuring system app icons, divider line, and active app indicators.
 * - Runs a real-time cosine distance mouse tracking algorithm via requestAnimationFrame for macOS-style dock icon magnification.
 * - Supports drag-and-drop file trashing: dropping desktop icons onto the Trash dock icon moves them to the trash bin with sound effects.
 */

import React, { useRef, useEffect, useState, useMemo } from "react";
import { APPS_CONFIG, AppConfig } from "../../config/apps.config";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import { DESKTOP_ITEMS } from "./DesktopFolders";
import {
  playTrashWhooshSound,
  playDockLaunchSound,
} from "../../utils/soundEffects";

export default function DesktopDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const {
    toggleAppFromDock,
    openApps,
    focusedAppId,
    systemTheme,
    moveToTrash,
    isDockAutoHideEnabled,
  } = useEcosystemStore();
  const isLight = systemTheme === "light";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDockHiddenManually] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const startHideTimer = () => {
    resetHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setIsNearBottom(false);
      hideTimerRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const isBottom = window.innerHeight - e.clientY < 75;
      if (isBottom) {
        resetHideTimer();
        setIsNearBottom(true);
      } else if (isNearBottom && !hideTimerRef.current) {
        startHideTimer();
      }
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      resetHideTimer();
    };
  }, [isNearBottom]);

  // Dynamic Dock Apps: Folder apps FIRST in the row, followed by standard dock items, with Trash at the end
  const DOCK_APPS = useMemo(() => {
    const staticAppIds = ["about", "safari", "photos", "mail", "terminal"];
    const activeAppIds = openApps.filter((a) => a.isOpen).map((a) => a.id);

    const folderAppIds = activeAppIds.filter((id) => id.startsWith("folder-"));
    const nonFolderActiveAppIds = activeAppIds.filter(
      (id) => !id.startsWith("folder-"),
    );

    // Put folder apps FIRST in the row
    const combinedIds = Array.from(
      new Set([...folderAppIds, ...staticAppIds, ...nonFolderActiveAppIds]),
    );

    const finalIds = [...combinedIds.filter((id) => id !== "trash"), "trash"];

    return finalIds
      .map((id) => APPS_CONFIG.find((app) => app.id === id))
      .filter((app): app is AppConfig => app !== undefined);
  }, [openApps]);

  const BASE_SCALE = 0.615;
  const MAX_SCALE = 1.0;

  const targetsRef = useRef<{ scale: number; y: number }[]>(
    DOCK_APPS.map(() => ({ scale: BASE_SCALE, y: 0 })),
  );
  const currentsRef = useRef<{ scale: number; y: number }[]>(
    DOCK_APPS.map(() => ({ scale: BASE_SCALE, y: 0 })),
  );
  const isAnimatingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    targetsRef.current = DOCK_APPS.map(
      (_, i) => targetsRef.current[i] || { scale: BASE_SCALE, y: 0 },
    );
    currentsRef.current = DOCK_APPS.map(
      (_, i) => currentsRef.current[i] || { scale: BASE_SCALE, y: 0 },
    );
  }, [DOCK_APPS.length]);

  const startAnimationLoop = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tick = () => {
      let needsMoreFrames = false;

      DOCK_APPS.forEach((_, i) => {
        const cur = currentsRef.current[i];
        const tgt = targetsRef.current[i];

        if (!cur || !tgt) return;

        cur.scale += (tgt.scale - cur.scale) * 0.38;
        cur.y += (tgt.y - cur.y) * 0.38;

        if (
          Math.abs(cur.scale - tgt.scale) > 0.0005 ||
          Math.abs(cur.y - tgt.y) > 0.01
        ) {
          needsMoreFrames = true;
        } else {
          cur.scale = tgt.scale;
          cur.y = tgt.y;
        }

        const wrapperEl = wrapperRefs.current[i];
        const iconEl = iconRefs.current[i];
        if (wrapperEl && iconEl) {
          wrapperEl.style.transform = `translate3d(0, ${cur.y.toFixed(2)}px, 0)`;
          iconEl.style.transform = `scale(${cur.scale.toFixed(4)}) translateZ(0)`;
        }
      });

      if (needsMoreFrames) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mouseX = e.clientX;
    let closestIndex: number | null = null;
    let minDistance = Infinity;

    DOCK_APPS.forEach((_, i) => {
      const iconEl = iconRefs.current[i];
      if (!iconEl) return;

      const rect = iconEl.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - iconCenterX);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }

      const maxDistance = 150;

      if (distance < maxDistance) {
        const cosineVal = Math.cos((distance / maxDistance) * (Math.PI / 2));
        const scale =
          BASE_SCALE + (MAX_SCALE - BASE_SCALE) * Math.pow(cosineVal, 2.0);
        const yOffset = -((scale - BASE_SCALE) * 44);

        targetsRef.current[i] = { scale, y: yOffset };
      } else {
        targetsRef.current[i] = { scale: BASE_SCALE, y: 0 };
      }
    });

    if (minDistance < 65 && closestIndex !== null) {
      if (hoveredIndex !== closestIndex) setHoveredIndex(closestIndex);
    } else if (hoveredIndex !== null) {
      setHoveredIndex(null);
    }

    startAnimationLoop();
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);

    DOCK_APPS.forEach((_, i) => {
      targetsRef.current[i] = { scale: BASE_SCALE, y: 0 };
    });

    startAnimationLoop();
  };

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const hasOpenWindows = openApps.some((a) => a.isOpen && !a.isMinimized);
  const isDockHidden =
    isDockHiddenManually ||
    (isDockAutoHideEnabled && hasOpenWindows && !isNearBottom);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-2">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          resetHideTimer();
          setIsNearBottom(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          startHideTimer();
        }}
        className={`relative transition-transform duration-300 ease-out pointer-events-auto flex items-end space-x-1 px-4 pb-2.5 pt-2.5 rounded-[26px] h-17 select-none ${
          isDockHidden
            ? "translate-y-28 opacity-0"
            : "translate-y-0 opacity-100"
        } ${
          isLight
            ? hasOpenWindows
              ? "bg-white/20 border border-white/40 backdrop-blur-xs hover:backdrop-blur-xl hover:bg-white/65 shadow-md ring-1 ring-black/5"
              : "bg-white/50 border border-white/80 backdrop-blur-md shadow-lg ring-1 ring-black/5"
            : hasOpenWindows
              ? "bg-black/10 border border-white/15 backdrop-blur-xs hover:backdrop-blur-xl hover:bg-black/40 shadow-md"
              : "bg-black/25 border border-white/20 backdrop-blur-md shadow-lg"
        }`}
      >
        {DOCK_APPS.map((app, i) => {
          const isOpen = openApps.some((a) => a.id === app.id && a.isOpen);
          const Icon = app.icon;
          const isHovered = hoveredIndex === i;
          const isFocused = focusedAppId === app.id && isOpen;

          return (
            <div
              key={app.id}
              ref={(el) => {
                wrapperRefs.current[i] = el;
              }}
              style={{
                zIndex: isHovered ? 60 : isFocused ? 50 : 10,
              }}
              className="relative flex flex-col items-center w-12 h-12 justify-end group/icon"
            >
              {/* Tooltip Speech Bubble Pill */}
              <div
                className={`absolute -top-12 transition-all duration-150 pointer-events-none z-50 flex flex-col items-center ${
                  isHovered
                    ? "opacity-100 scale-100 -translate-y-1"
                    : "opacity-0 scale-90 translate-y-1"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-xl text-zinc-900 text-[12px] font-bold px-3 py-1 rounded-lg whitespace-nowrap shadow-xl border border-black/10 tracking-tight flex flex-col items-center font-sans">
                  <span>{app.title}</span>
                  <div className="w-2 h-2 bg-white/95 border-r border-b border-black/10 rotate-45 -mb-2 mt-0.5" />
                </div>
              </div>

              {/* Dock Icon Button */}
              <button
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                onClick={() => {
                  playDockLaunchSound();
                  toggleAppFromDock(app.id, app.title);
                }}
                onDragOver={(e) => {
                  if (app.id === "trash") {
                    e.preventDefault();
                    e.stopPropagation();
                    e.dataTransfer.dropEffect = "move";
                  }
                }}
                onDrop={(e) => {
                  if (app.id === "trash") {
                    e.preventDefault();
                    e.stopPropagation();

                    let fileName = "";
                    let fileType = "Desktop Item";
                    let iconImg = "/images/text.png";

                    const jsonString =
                      e.dataTransfer.getData("application/json");
                    if (jsonString) {
                      try {
                        const item = JSON.parse(jsonString);
                        if (item.title) fileName = item.title;
                        if (item.kind) fileType = item.kind;
                        if (item.iconImage) iconImg = item.iconImage;
                      } catch (err) {}
                    }

                    if (!fileName) {
                      const textData = e.dataTransfer.getData("text/plain");
                      if (textData) {
                        const matchedItem = DESKTOP_ITEMS.find(
                          (d) =>
                            d.title === textData ||
                            d.iconImage === textData ||
                            textData.includes(d.iconImage),
                        );
                        if (matchedItem) {
                          fileName = matchedItem.title;
                          fileType = matchedItem.kind;
                          iconImg = matchedItem.iconImage;
                        } else if (
                          !textData.startsWith("http://") &&
                          !textData.startsWith("https://")
                        ) {
                          fileName = textData;
                        } else {
                          const urlParts = textData.split("/");
                          const lastPart = urlParts[urlParts.length - 1] || "";
                          const cleanName = lastPart.split("?")[0] || "";
                          fileName =
                            decodeURIComponent(cleanName) || "Desktop_File";
                        }
                      }
                    }

                    if (fileName) {
                      moveToTrash({
                        name: fileName,
                        type: fileType,
                        iconImage: iconImg,
                      });
                      playTrashWhooshSound();
                    }
                  }
                }}
                id={`dock-icon-${app.id}`}
                style={{
                  transform: `scale(${BASE_SCALE}) translateZ(0)`,
                  transformOrigin: "bottom center",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className={`w-19.5 h-19.5 rounded-[22px] flex items-center justify-center text-white relative cursor-pointer transition-shadow duration-150 ${
                  isFocused
                    ? "ring-4 ring-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.85)] scale-105"
                    : ""
                } ${
                  app.iconImage
                    ? "bg-transparent border-0"
                    : `${app.color} border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)]`
                }`}
              >
                {app.iconImage ? (
                  <img
                    src={app.iconImage}
                    alt={app.title}
                    style={{
                      imageRendering: "-webkit-optimize-contrast",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="w-19.5 h-19.5 object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)] pointer-events-none"
                  />
                ) : (
                  <Icon
                    size={40}
                    strokeWidth={1.5}
                    className="drop-shadow-md pointer-events-none"
                  />
                )}
              </button>

              {/* Active Dot Indicator */}
              <div
                className={`w-1.2 h-1.2 rounded-full bg-white absolute -bottom-1.75 transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 scale-100 shadow-[0_0_8px_white]"
                    : "opacity-0 scale-50"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
