import React, { useRef, useEffect } from "react";
import {
  Image,
  Grid,
  Layers,
  Search,
  Terminal,
  FileText,
  Check,
} from "lucide-react";
import { useEcosystemStore, WALLPAPERS } from "../store/useEcosystemStore";

export default function ContextMenu() {
  const {
    contextMenu,
    closeContextMenu,
    setRandomWallpaper,
    setWallpaperIndex,
    currentWallpaperIndex,
    sortDesktopIcons,
    openSpotlight,
    openApp,
    isStacksEnabled,
    toggleStacks,
    systemTheme,
  } = useEcosystemStore();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isLight = systemTheme === "light";

  useEffect(() => {
    if (!contextMenu) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [contextMenu, closeContextMenu]);

  if (!contextMenu) return null;

  // Keep menu inside viewport bounds
  const menuWidth = 250;
  const menuHeight = 390;
  const x = Math.min(contextMenu.x, window.innerWidth - menuWidth - 10);
  const y = Math.min(contextMenu.y, window.innerHeight - menuHeight - 10);

  return (
    <>
      {/* Background click listener to close menu */}
      <div
        onClick={closeContextMenu}
        onContextMenu={(e) => {
          e.preventDefault();
          closeContextMenu();
        }}
        className="fixed inset-0 z-50 bg-transparent"
      />

      {/* Context Menu Popup */}
      <div
        ref={menuRef}
        style={{ top: `${y}px`, left: `${x}px` }}
        className={`fixed z-50 w-64 backdrop-blur-2xl border rounded-2xl shadow-2xl p-1.5 font-sans text-xs select-none animate-fadeIn space-y-0.5 transition-colors ${
          isLight
            ? "bg-white/95 text-slate-900 border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
            : "bg-[#1a1a20]/90 text-white border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Change Wallpaper */}
        <button
          onClick={() => {
            setRandomWallpaper();
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isLight
              ? "hover:bg-blue-600 hover:text-white text-slate-800"
              : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Image
              className={`w-6.5 h-6.5 shrink-0 -mt-px group-hover:text-white ${isLight ? "text-indigo-600" : "text-indigo-400"}`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">Change Wallpaper</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isLight
                    ? "text-slate-600 group-hover:text-white/90"
                    : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Randomize background
              </span>
            </div>
          </div>
        </button>

        {/* Wallpaper Picker Sublist Pill */}
        <div className="px-2 pt-1 pb-0.5">
          <span className="font-medium leading-none">Choose Wallpaper</span>
        </div>
        <div
          className={`px-3 py-2 flex items-center space-x-1.25 justify-center overflow-x-auto rounded-full my-0.5 scrollbar-none border ${
            isLight
              ? "bg-slate-200/50 border-slate-200"
              : "bg-white/5 border-white/20"
          }`}
        >
          {WALLPAPERS.map((wp, idx) => (
            <button
              key={wp.id}
              onClick={() => {
                setWallpaperIndex(idx);
                closeContextMenu();
              }}
              className={`w-7 h-7 rounded-full overflow-hidden border transition-transform shrink-0 ${
                currentWallpaperIndex === idx
                  ? "border-blue-500 ring-1 ring-blue-500/50 shadow-md"
                  : isLight
                    ? "border-slate-300 hover:scale-105"
                    : "border-white/20 hover:scale-105"
              }`}
              title={wp.name}
            >
              <img
                src={wp.url}
                alt={wp.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Use Stacks / Stack by Kind */}
        <button
          onClick={() => {
            toggleStacks();
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isStacksEnabled
              ? "bg-blue-600 text-white font-medium shadow-sm"
              : isLight
                ? "hover:bg-blue-600 hover:text-white text-slate-800"
                : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Layers
              className={`w-6.5 h-6.5 -mt-px shrink-0 ${
                isStacksEnabled
                  ? "text-white"
                  : isLight
                    ? "text-blue-600 group-hover:text-white"
                    : "text-blue-400 group-hover:text-white"
              }`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">Stack by Type</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isStacksEnabled
                    ? "text-white/80"
                    : isLight
                      ? "text-slate-600 group-hover:text-white/90"
                      : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Group files by kind
              </span>
            </div>
          </div>
          {isStacksEnabled && <Check className="w-4 h-4 text-white shrink-0" />}
        </button>

        <div
          className={`h-px my-1 ${isLight ? "bg-slate-200" : "bg-white/10"}`}
        />

        {/* Sort Icons */}
        <button
          onClick={() => {
            sortDesktopIcons();
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isLight
              ? "hover:bg-blue-600 hover:text-white text-slate-800"
              : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Grid
              className={`w-6.5 h-6.5 -mt-px shrink-0 group-hover:text-white ${isLight ? "text-amber-600" : "text-amber-400"}`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">Clean Desktop</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isLight
                    ? "text-slate-600 group-hover:text-white/90"
                    : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Align items to grid
              </span>
            </div>
          </div>
        </button>

        <div
          className={`h-px my-1 ${isLight ? "bg-slate-200" : "bg-white/10"}`}
        />

        {/* Open Spotlight */}
        <button
          onClick={() => {
            openSpotlight();
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isLight
              ? "hover:bg-blue-600 hover:text-white text-slate-800"
              : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Search
              className={`w-6 h-6 -mt-px shrink-0 group-hover:text-white ${isLight ? "text-purple-600" : "text-purple-400"}`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">Spotlight Search</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isLight
                    ? "text-slate-600 group-hover:text-white/90"
                    : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Search apps & projects
              </span>
            </div>
          </div>
          <span
            className={`text-[10px] shrink-0 ${isLight ? "text-slate-400 group-hover:text-white/90" : "text-white/40 group-hover:text-white/80"}`}
          >
            ⌘ + K
          </span>
        </button>

        {/* Open Resume / About */}
        <button
          onClick={() => {
            openApp("resume", "Resume");
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isLight
              ? "hover:bg-blue-600 hover:text-white text-slate-800"
              : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <FileText
              className={`w-6.5 h-6.5 -mt-px shrink-0 group-hover:text-white ${isLight ? "text-emerald-600" : "text-emerald-400"}`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">View Resume</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isLight
                    ? "text-slate-600 group-hover:text-white/90"
                    : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Explore Alap's CV
              </span>
            </div>
          </div>
        </button>

        {/* Open Terminal */}
        <button
          onClick={() => {
            openApp("terminal", "Terminal");
            closeContextMenu();
          }}
          className={`w-full px-2 py-2 rounded-xl flex items-center justify-between transition-colors group ${
            isLight
              ? "hover:bg-blue-600 hover:text-white text-slate-800"
              : "hover:bg-blue-600 hover:text-white text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Terminal
              className={`w-6.5 h-6.5 -mt-px shrink-0 group-hover:text-white ${isLight ? "text-teal-600" : "text-teal-400"}`}
            />
            <div className="flex flex-col text-left">
              <span className="font-medium leading-none">Launch Terminal</span>
              <span
                className={`text-[11px] leading-none mt-px ${
                  isLight
                    ? "text-slate-600 group-hover:text-white/90"
                    : "text-white/60 group-hover:text-white/90"
                }`}
              >
                Open CLI simulator
              </span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
