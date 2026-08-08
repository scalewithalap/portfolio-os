import React, { useRef, useEffect, useState } from "react";
import { APPS_CONFIG } from "../utils/apps";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { DESKTOP_ITEMS } from "./DesktopFolders";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function DesktopDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const {
    toggleAppFromDock,
    openApps,
    focusedAppId,
    recentAppIds,
    systemTheme,
    trashItems,
    moveToTrash,
    isDockAutoHideEnabled,
    toggleDockAutoHide,
  } = useEcosystemStore();
  const isLight = systemTheme === "light";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDockHiddenManually, setIsDockHiddenManually] = useState(false);
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
    }, 1000); // Stay visible for 1 seconds before sliding down!
  };

  // Global mousemove detector for bottom edge reveal with 1-second hold delay
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

  // Filter only Dock items (exclude desktop project folders and resume)
  const DOCK_APPS = APPS_CONFIG.filter(
    (app) => !app.id.startsWith("folder-") && app.id !== "resume",
  );

  // Base scale is 0.615 (78px * 0.615 = 48px unhovered size).
  // Native 78px resolution prevents any GPU scaling blurriness when magnified up to 1.0.
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

  // High performance 120fps RAF lerp loop
  const startAnimationLoop = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tick = () => {
      let needsMoreFrames = false;

      DOCK_APPS.forEach((_, i) => {
        const cur = currentsRef.current[i];
        const tgt = targetsRef.current[i];

        if (!cur || !tgt) return;

        // Smooth spring/lerp interpolation (0.38 factor for instant responsive feel)
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

        // Direct DOM updates with translateZ(0) for butter-smooth, hardware-accelerated 0-blur transforms
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;

    let closestIndex: number | null = null;
    let minDistance = Infinity;

    DOCK_APPS.forEach((_, i) => {
      const iconEl = iconRefs.current[i];
      if (!iconEl) return;

      const rect = iconEl.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - iconCenterX);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }

      // macOS Dock Magnification Curve
      const maxDistance = 160;

      if (distance < maxDistance) {
        const cosineVal = Math.cos((distance / maxDistance) * (Math.PI / 2));
        const scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * cosineVal;
        const y = (scale - BASE_SCALE) * -18; // Lift wrapper smoothly
        targetsRef.current[i] = { scale, y };
      } else {
        targetsRef.current[i] = { scale: BASE_SCALE, y: 0 };
      }
    });

    if (minDistance < 60) {
      setHoveredIndex(closestIndex);
    } else {
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
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const hasOpenWindows = openApps.some((a) => a.isOpen && !a.isMinimized);
  const shouldSlideDown = hasOpenWindows && !isNearBottom;

  return (
    <>
      {/* Bottom Screen Reveal Indicator Handle when Dock is hidden */}
      {shouldSlideDown && (
        <div className="fixed bottom-1.5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fadeIn">
          <button
            onClick={() => {
              resetHideTimer();
              setIsNearBottom(true);
            }}
            onMouseEnter={() => {
              resetHideTimer();
              setIsNearBottom(true);
            }}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/85 text-white/90 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center space-x-1.5 text-xs font-semibold hover:bg-blue-600 transition-all cursor-pointer group"
          >
            <ChevronUp className="w-4 h-4 text-white mb-0.5" />
            <span>Show Dock</span>
          </button>
        </div>
      )}

      {/* Dock Container */}
      <div
        className={`w-full flex justify-center pb-3 pointer-events-auto z-50 select-none transition-all duration-300 transform ${
          shouldSlideDown
            ? "translate-y-28 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
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
          className={`flex items-end space-x-1 px-4 pb-2.5 pt-2.5 rounded-[26px] h-17 transition-all duration-300 ${
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

            const recentRank = recentAppIds.indexOf(app.id);
            const isFocused = focusedAppId === app.id && isOpen;
            const isRecent = recentRank >= 0 && recentRank < 3 && isOpen;

            return (
              <div
                key={app.id}
                ref={(el) => {
                  wrapperRefs.current[i] = el;
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
                    {isFocused && (
                      <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase -mt-0.5">
                        Active App
                      </span>
                    )}
                    {!isFocused && recentRank === 1 && isOpen && (
                      <span className="text-[10px] text-indigo-600 font-bold tracking-wider uppercase -mt-0.5">
                        2nd Recent
                      </span>
                    )}
                    {!isFocused && recentRank === 2 && isOpen && (
                      <span className="text-[10px] text-cyan-600 font-bold tracking-wider uppercase -mt-0.5">
                        3rd Recent
                      </span>
                    )}
                    <div className="w-2 h-2 bg-white/95 border-r border-b border-black/10 rotate-45 -mb-2 mt-0.5" />
                  </div>
                </div>

                {/* Dock Icon Button */}
                <button
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  onClick={() => toggleAppFromDock(app.id, app.title)}
                  onDragOver={(e) => {
                    if (app.id === "trash") {
                      e.preventDefault();
                      e.stopPropagation();
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
                            const lastPart =
                              urlParts[urlParts.length - 1] || "";
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
                      : recentRank === 1 && isOpen
                        ? "ring-3 ring-indigo-400/90 shadow-[0_0_18px_rgba(129,140,248,0.7)]"
                        : recentRank === 2 && isOpen
                          ? "ring-2 ring-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
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

                  {/* MRU Badge Badge */}
                  {isRecent && app.id !== "trash" && (
                    <div
                      className={`absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider text-white shadow-xl border border-white/30 backdrop-blur-md animate-pulse ${
                        isFocused
                          ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
                          : recentRank === 1
                            ? "bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.7)]"
                            : "bg-cyan-600 shadow-[0_0_8px_rgba(8,145,178,0.7)]"
                      }`}
                    >
                      {isFocused ? "1" : recentRank + 1}
                    </div>
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
    </>
  );
}
