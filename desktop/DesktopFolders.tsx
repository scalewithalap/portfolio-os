import React, { useState, useRef, useEffect } from "react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Terminal,
  X,
  Layers,
} from "lucide-react";

export interface DesktopItem {
  id: string;
  title: string;
  appId: string;
  appTitle: string;
  iconImage: string;
  kind: "Projects" | "PDF Documents" | "Images" | "Developer Scripts";
  size?: string;
  dateModified?: string;
}

export const DESKTOP_ITEMS: DesktopItem[] = [
  // Projects
  {
    id: "folder-scalewithalap",
    title: "Scale with Alap",
    appId: "folder-scalewithalap",
    appTitle: "Scale with Alap",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Today, 3:15 PM",
  },
  {
    id: "folder-vibe44",
    title: "Vibe44 Website",
    appId: "folder-vibe44",
    appTitle: "Vibe44 - Marketing Website",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Today, 2:45 PM",
  },
  {
    id: "folder-vibe44-demo",
    title: "Vibe44 (Product)",
    appId: "folder-vibe44-demo",
    appTitle: "Vibe44 - Next.js Starter Kit",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Yesterday, 6:30 PM",
  },
  {
    id: "folder-zeroheadache",
    title: "Zero Headache Website",
    appId: "folder-zeroheadache",
    appTitle: "Zero Headache - Marketing Website",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Jul 26, 2026",
  },
  {
    id: "folder-zeroheadache-app",
    title: "Zero Headache App",
    appId: "folder-zeroheadache-app",
    appTitle: "Zero Headache App",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Jul 25, 2026",
  },
  {
    id: "folder-makemesound",
    title: "Make Me Sound",
    appId: "folder-makemesound",
    appTitle: "Make Me Sound",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Jul 24, 2026",
  },
  {
    id: "folder-openui",
    title: "OpenUI",
    appId: "folder-openui",
    appTitle: "OpenUI",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Yesterday, 5:12 PM",
  },
  {
    id: "folder-freecom",
    title: "Freecom AI",
    appId: "folder-freecom",
    appTitle: "Freecom AI",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Jul 20, 2026",
  },
  {
    id: "folder-soothly",
    title: "Soothly AI",
    appId: "folder-soothly",
    appTitle: "Soothly AI",
    iconImage: "/images/folder.png",
    kind: "Projects",
    dateModified: "Jul 18, 2026",
  },

  // PDF Document
  {
    id: "folder-resume",
    title: "Resume",
    appId: "resume",
    appTitle: "My Resume",
    iconImage: "/images/pdf.png",
    kind: "PDF Documents",
    size: "240 KB",
    dateModified: "Today, 10:15 AM",
  },

  // Developer Scripts
  {
    id: "script-terminal",
    title: "Terminal",
    appId: "terminal",
    appTitle: "Terminal",
    iconImage: "/images/terminal.png",
    kind: "Developer Scripts",
    size: "4 KB",
    dateModified: "Today, 9:15 AM",
  },

  // Images
  {
    id: "img-gallery",
    title: "Photos",
    appId: "photos",
    appTitle: "My Photos",
    iconImage: "/images/photos.png",
    kind: "Images",
    size: "1.8 MB",
    dateModified: "Today, 8:00 AM",
  },
];

const STACK_KINDS: Array<{
  kind: DesktopItem["kind"];
  label: string;
  icon: any;
}> = [
  { kind: "Projects", label: "Projects", icon: Folder },
  { kind: "PDF Documents", label: "Documents", icon: FileText },
  { kind: "Developer Scripts", label: "Developer Scripts", icon: Terminal },
  { kind: "Images", label: "Images", icon: ImageIcon },
];

export default function DesktopProjects() {
  const {
    openApp,
    desktopItemPositions,
    updateDesktopItemPosition,
    isStacksEnabled,
    expandedStackKind,
    toggleExpandStack,
    collapseAllStacks,
    systemTheme,
    trashItems,
  } = useEcosystemStore();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isLight = systemTheme === "light";

  // Active desktop items exclude any items currently in Trash
  const activeDesktopItems = DESKTOP_ITEMS.filter(
    (item) =>
      !trashItems.some((t) => t.name === item.title || t.id === item.id),
  );

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeDragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    currentX: number;
    currentY: number;
    hasMoved: boolean;
  } | null>(null);

  // Default grid coordinates for unstacked view
  const getDefaultPosition = (index: number) => {
    const startX = 24;
    const startY = 48;
    const gapY = 112;
    const maxItemsPerCol = 6;

    const col = Math.floor(index / maxItemsPerCol);
    const row = index % maxItemsPerCol;

    return {
      x: startX + col * 120,
      y: startY + row * gapY,
    };
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    item: DesktopItem,
    index: number,
  ) => {
    if (e.button !== 0 || isStacksEnabled) return; // Only left click drags when unstacked
    e.stopPropagation();

    setSelectedItemId(item.id);

    const pos = desktopItemPositions[item.id] || getDefaultPosition(index);

    activeDragRef.current = {
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      initX: pos.x,
      initY: pos.y,
      currentX: pos.x,
      currentY: pos.y,
      hasMoved: false,
    };

    let animFrameId: number | null = null;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!activeDragRef.current || animFrameId !== null) return;

      animFrameId = requestAnimationFrame(() => {
        animFrameId = null;
        if (!activeDragRef.current) return;

        const dx = moveEvent.clientX - activeDragRef.current.startX;
        const dy = moveEvent.clientY - activeDragRef.current.startY;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          activeDragRef.current.hasMoved = true;
        }

        const newX = Math.max(
          10,
          Math.min(window.innerWidth - 110, activeDragRef.current.initX + dx),
        );
        const newY = Math.max(
          36,
          Math.min(window.innerHeight - 120, activeDragRef.current.initY + dy),
        );

        activeDragRef.current.currentX = newX;
        activeDragRef.current.currentY = newY;

        const el = itemRefs.current[item.id];
        if (el) {
          el.style.left = `${newX}px`;
          el.style.top = `${newY}px`;
        }
      });
    };

    const handleMouseUp = () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (activeDragRef.current && activeDragRef.current.hasMoved) {
        updateDesktopItemPosition(
          activeDragRef.current.id,
          activeDragRef.current.currentX,
          activeDragRef.current.currentY,
        );
      }
      activeDragRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleOpenItem = (item: DesktopItem) => {
    openApp(item.appId, item.appTitle);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      setSelectedItemId(null);
      if (expandedStackKind) {
        const target = e.target as HTMLElement;
        if (!target.closest(".group")) {
          collapseAllStacks();
        }
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [expandedStackKind, collapseAllStacks]);

  // Group active desktop items by Kind for Stacks Mode
  const groupedStacks = STACK_KINDS.map(({ kind, label, icon }) => {
    const items = activeDesktopItems.filter((item) => item.kind === kind);
    return { kind, label, icon, items };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10">
      {/* ========================================================= */}
      {/* MODE 1: UNSTACKED FREESTYLE DESKTOP GRID                  */}
      {/* ========================================================= */}
      {!isStacksEnabled &&
        activeDesktopItems.map((item, index) => {
          const isSelected = selectedItemId === item.id;
          const pos =
            desktopItemPositions[item.id] || getDefaultPosition(index);

          return (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
              onMouseDown={(e) => handleMouseDown(e, item, index)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItemId(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleOpenItem(item);
              }}
              className="w-28 flex flex-col items-center group cursor-pointer pointer-events-auto"
            >
              {/* Item Icon */}
              <div className="w-14 h-14 relative flex items-center justify-center mb-0.5 pointer-events-none transition-transform group-hover:scale-105">
                <img
                  src={item.iconImage}
                  alt={item.title}
                  className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* Item Label */}
              <span
                className={`text-[12px] leading-tight md:leading-3.25 font-medium text-center line-clamp-2 px-2 py-0.5 rounded-[5px] transition-colors pointer-events-none ${
                  isSelected
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:bg-blue-600/90 group-hover:text-white"
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}

      {/* ========================================================= */}
      {/* MODE 2: STACKED BY KIND (AUTOMATIC GROUPING)             */}
      {/* ========================================================= */}
      {isStacksEnabled && (
        <div className="absolute top-12 left-6 flex flex-col space-y-6 pointer-events-auto animate-fadeIn">
          {groupedStacks.map((stack) => {
            const isExpanded = expandedStackKind === stack.kind;
            const topItem = stack.items[0];
            const isSingleItem = stack.items.length === 1;

            // If a stack category has ONLY 1 item (e.g. PDF Documents or Terminal script), show it normally as a single file item without stack deck or badge
            if (isSingleItem) {
              const singleItem = stack.items[0];
              const isSelected = selectedItemId === singleItem.id;

              return (
                <div
                  key={stack.kind}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "application/json",
                      JSON.stringify({
                        id: singleItem.id,
                        title: singleItem.title,
                        kind: singleItem.kind,
                        iconImage: singleItem.iconImage,
                      }),
                    );
                    e.dataTransfer.setData("text/plain", singleItem.title);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItemId(singleItem.id);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleOpenItem(singleItem);
                  }}
                  className="w-27.5 flex flex-col items-center group cursor-pointer pointer-events-auto"
                >
                  {/* Single Item Icon */}
                  <div className="w-14 h-14 relative flex items-center justify-center mb-1 transition-transform group-hover:scale-105">
                    <img
                      src={singleItem.iconImage}
                      alt={singleItem.title}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Single Item Title */}
                  <span
                    className={`text-[12px] font-medium text-center leading-snug line-clamp-2 px-2 py-0.5 rounded-[5px] transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white font-semibold shadow-md"
                        : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:bg-blue-600/90 group-hover:text-white"
                    }`}
                  >
                    {singleItem.title}
                  </span>
                </div>
              );
            }

            return (
              <div key={stack.kind} className="relative group flex items-start">
                {/* Stack Header Button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpandStack(stack.kind);
                  }}
                  className="w-27.5 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                >
                  {/* 3D Stack Deck Visual */}
                  <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                    {/* Card 3 (Bottom Layer) */}
                    <div className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20 transform scale-90 translate-y-2 rotate-6 shadow-md" />

                    {/* Card 2 (Middle Layer) */}
                    <div className="absolute inset-0 bg-white/15 rounded-2xl border border-white/25 transform scale-95 translate-y-1 -rotate-3 shadow-lg" />

                    {/* Card 1 (Top Layer) */}
                    <div
                      className={`relative w-full h-full rounded-2xl border p-2 flex items-center justify-center transition-all duration-200 shadow-xl ${
                        isExpanded
                          ? "bg-blue-600/40 border-blue-400 ring-2 ring-blue-400/60 scale-105"
                          : isLight
                            ? "bg-white/80 border-slate-300 group-hover:bg-blue-50"
                            : "bg-black/50 border-white/30 group-hover:bg-white/15"
                      }`}
                    >
                      <img
                        src={topItem.iconImage}
                        alt={stack.label}
                        className="w-10 h-10 object-contain drop-shadow-md"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />

                      {/* Item Count Badge */}
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-600 border border-white/50 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                        {stack.items.length}
                      </span>
                    </div>
                  </div>

                  {/* Stack Label */}
                  <span
                    className={`text-[12px] font-semibold text-center leading-snug px-2 py-0.5 rounded-[5px] transition-colors ${
                      isExpanded
                        ? "bg-blue-600 text-white shadow-md"
                        : isLight
                          ? "text-slate-900 bg-white/60 shadow-sm"
                          : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:bg-blue-600/90 group-hover:text-white"
                    }`}
                  >
                    {stack.label}
                  </span>
                </div>

                {/* Expanded Stack Fan-Out Panel (Absolutely Positioned so other stacks do NOT move) */}
                {isExpanded && (
                  <div
                    className={`absolute left-32 top-0 z-50 w-80 p-3.5 rounded-3xl border shadow-2xl backdrop-blur-3xl flex flex-col space-y-2.5 animate-scaleUp pointer-events-auto transition-colors ${
                      isLight
                        ? "bg-white/95 border-slate-300 text-slate-800 shadow-slate-400/30"
                        : "bg-[#16161a]/95 border-white/15 text-white shadow-[0_25px_60px_rgba(0,0,0,0.75)]"
                    }`}
                  >
                    {/* Header Bar */}
                    <div
                      className={`flex items-center justify-between pb-2.5 border-b text-xs font-semibold ${
                        isLight ? "border-slate-200" : "border-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-[13px]">
                          {stack.label} Stack
                        </span>
                        <span
                          className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full border ${
                            isLight
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }`}
                        >
                          {stack.items.length} items
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          collapseAllStacks();
                        }}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          isLight
                            ? "hover:bg-slate-200 text-slate-500"
                            : "hover:bg-white/10 text-white/60 hover:text-white"
                        }`}
                        title="Collapse Stack"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stacked Files Grid */}
                    <div className="grid grid-cols-1 gap-1.5 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-none">
                      {stack.items.map((item) => {
                        const isSelected = selectedItemId === item.id;

                        return (
                          <div
                            key={item.id}
                            draggable={true}
                            onDragStart={(e) => {
                              e.dataTransfer.setData(
                                "application/json",
                                JSON.stringify({
                                  id: item.id,
                                  title: item.title,
                                  kind: item.kind,
                                  iconImage: item.iconImage,
                                }),
                              );
                              e.dataTransfer.setData("text/plain", item.title);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItemId(item.id);
                            }}
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              handleOpenItem(item);
                            }}
                            className={`p-2.5 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-400 shadow-md"
                                : isLight
                                  ? "bg-slate-100/80 hover:bg-slate-200/80 border-slate-200 text-slate-800"
                                  : "bg-white/5 hover:bg-white/10 border-white/5 text-white"
                            }`}
                          >
                            <div className="flex items-center space-x-3 min-w-0 pr-2">
                              <img
                                src={item.iconImage}
                                alt={item.title}
                                className="w-8 h-8 object-contain shrink-0 drop-shadow-sm"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display =
                                    "none";
                                }}
                              />
                              <div className="min-w-0">
                                <span className="text-xs font-semibold block truncate leading-tight">
                                  {item.title}
                                </span>
                                <span
                                  className={`text-[10px] block mt-0.5 ${
                                    isSelected
                                      ? "text-white/80"
                                      : isLight
                                        ? "text-slate-500"
                                        : "text-white/50"
                                  }`}
                                >
                                  {item.dateModified}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
