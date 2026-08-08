import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, LayoutGrid, Search, Sparkles } from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";

export default function ControlCenter() {
  const {
    isControlCenterOpen,
    closeControlCenter,
    systemTheme,
    toggleSystemTheme,
    isStacksEnabled,
    toggleStacks,
    brightness,
    setBrightness,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isWifiOn,
    toggleWifi,
    isBluetoothOn,
    toggleBluetooth,
    isAirDropOn,
    toggleAirDrop,
    openSpotlight,
    openApp,
    showToast,
  } = useEcosystemStore();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const controlCenterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isControlCenterOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        controlCenterRef.current &&
        !controlCenterRef.current.contains(event.target as Node)
      ) {
        closeControlCenter();
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
  }, [isControlCenterOpen, closeControlCenter]);

  if (!isControlCenterOpen) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("scalewithalap@gmail.com");
    setCopiedEmail(true);
    showToast("Copied email to clipboard!", "copy");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const isLight = systemTheme === "light";

  return (
    <>
      {/* Invisible backdrop to dismiss Control Center */}
      <div
        onClick={closeControlCenter}
        className="fixed inset-0 z-40 bg-transparent"
      />

      {/* Control Center Popover */}
      <div
        ref={controlCenterRef}
        className={`fixed top-9 right-3 w-[320px] sm:w-85 backdrop-blur-3xl border rounded-2xl shadow-2xl z-50 p-4 space-y-3 font-sans select-none animate-fadeIn transition-colors ${
          isLight
            ? "bg-white/95 border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            : "bg-[#1a1a20]/90 border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Header Title */}
        <h3
          className={`font-serif font-semibold text-sm ${isLight ? "text-slate-900" : "text-white/95"}`}
        >
          Control Center
        </h3>

        {/* 2x2 Grid for Core Portfolio Toggles */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Appearance Toggle */}
          <button
            onClick={toggleSystemTheme}
            className={`border rounded-2xl p-3 flex flex-col justify-between space-y-3 transition-all text-left group cursor-pointer ${
              isLight
                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                systemTheme === "dark"
                  ? "bg-indigo-600/50 text-indigo-300"
                  : "bg-amber-500/20 text-amber-600 border border-amber-500/30"
              }`}
            >
              {systemTheme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div>
              <span className="text-[12px] font-bold block">Appearance</span>
              <span
                className={`text-[10px] block capitalize ${isLight ? "text-slate-500" : "text-white/50"}`}
              >
                {systemTheme} Theme
              </span>
            </div>
          </button>

          {/* Desktop Stacks Toggle */}
          <button
            onClick={toggleStacks}
            className={`border rounded-2xl p-3 flex flex-col justify-between space-y-3 transition-all text-left group cursor-pointer ${
              isLight
                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                isStacksEnabled
                  ? "bg-emerald-500/30 text-emerald-500 border border-emerald-500/30"
                  : isLight
                    ? "bg-slate-200 text-slate-400"
                    : "bg-white/10 text-white/50"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[12px] font-bold block">
                Desktop Stacks
              </span>
              <span
                className={`text-[10px] block ${isLight ? "text-slate-500" : "text-white/50"}`}
              >
                {isStacksEnabled ? "Grouped by Kind" : "Freeform Layout"}
              </span>
            </div>
          </button>
        </div>

        {/* Interactive Brightness & Volume Sliders Container */}
        <div
          className={`border rounded-2xl p-3 space-y-2.5 ${
            isLight
              ? "bg-slate-100 border-slate-200 text-slate-900"
              : "bg-white/10 border-white/10 text-white"
          }`}
        >
          {/* Display Brightness Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] font-semibold">
              <span
                className={`flex items-center space-x-1.5 ${isLight ? "text-slate-700" : "text-white/80"}`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Display Brightness</span>
              </span>
              <span
                className={`font-mono text-[10px] ${isLight ? "text-slate-500" : "text-white/60"}`}
              >
                {brightness}%
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className={`w-full accent-blue-500 cursor-pointer h-1.5 rounded-lg border-0 ${
                isLight ? "bg-slate-200" : "bg-white/20"
              }`}
            />
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="space-y-2 pt-1">
          {/* Spotlight Search Shortcut */}
          <button
            onClick={() => {
              closeControlCenter();
              openSpotlight();
            }}
            className={`w-full border rounded-2xl p-3 flex items-center justify-between transition-all text-left group cursor-pointer ${
              isLight
                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">
                  Spotlight Search
                </span>
                <span
                  className={`text-[10px] block ${isLight ? "text-slate-500" : "text-white/50"}`}
                >
                  Search skills, projects, experience, etc.
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                isLight
                  ? "bg-slate-200 border-slate-300 text-slate-600"
                  : "bg-white/10 border-white/10 text-white/60"
              }`}
            >
              ⌘ + K
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
