import React, { useState, useEffect } from "react";
import {
  Command,
  X,
  Search,
  LayoutGrid,
  Monitor,
  MousePointer,
  AppWindow,
  Keyboard,
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";

export default function ShortcutsHintOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const { openSpotlight, toggleMissionControl, systemTheme } =
    useEcosystemStore();
  const isLight = systemTheme === "light";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+/ or Ctrl+/
      if ((e.metaKey || e.ctrlKey) && (e.key === "/" || e.key === "?")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const SHORTCUT_GROUPS = [
    {
      title: "System Search & Navigation",
      items: [
        {
          keys: ["⌘", "K"],
          ctrlKeys: ["Ctrl", "K"],
          description: "Open Spotlight Search for quick app launching",
          action: () => {
            setIsOpen(false);
            openSpotlight();
          },
          icon: Search,
        },
        {
          keys: ["Ctrl", "↑"],
          ctrlKeys: ["Ctrl", "↑"],
          description: "Trigger Mission Control window overview",
          action: () => {
            setIsOpen(false);
            toggleMissionControl();
          },
          icon: LayoutGrid,
        },
        {
          keys: ["⌘", "/"],
          ctrlKeys: ["Ctrl", "/"],
          description: "Toggle system shortcuts hint sheet",
          action: () => setIsOpen((p) => !p),
          icon: Keyboard,
        },
      ],
    },
    {
      title: "Window Management & Gestures",
      items: [
        {
          keys: ["Click", "Window"],
          ctrlKeys: ["Click", "Window"],
          description: "Bring any inactive window immediately to front",
          icon: MousePointer,
        },
        {
          keys: ["Drag", "Screen Edge"],
          ctrlKeys: ["Drag", "Screen Edge"],
          description: "Snap window to grid (Left/Right half, Top fullscreen)",
          icon: AppWindow,
        },
        {
          keys: ["3-Finger", "Swipe Up"],
          ctrlKeys: ["3-Finger", "Swipe Up"],
          description: "Launch Mission Control gesture on touch devices",
          icon: Monitor,
        },
      ],
    },
  ];

  return (
    <>
      {/* Bottom-Right Key Hint Button */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`group flex items-center space-x-2 pl-1.5 pr-2 py-1.25 rounded-lg backdrop-blur-2xl border shadow-xl transition-all duration-200 cursor-pointer active:scale-95 ${
            isLight
              ? "bg-white/80 hover:bg-white border-black/15 text-zinc-800 shadow-black/10"
              : "bg-black/60 hover:bg-black/80 border-white/20 text-white/80 hover:text-white"
          }`}
          // title="Press Cmd + / or click for System Navigation Shortcuts"
        >
          <div
            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-md border text-[11px] font-mono font-bold ${
              isLight
                ? "bg-zinc-100 border-zinc-300 text-blue-600"
                : "bg-white/10 border-white/20 text-blue-300"
            }`}
          >
            <Command size={11} className="inline -mt-0.5" />
            <span>/</span>
          </div>
          <span className="text-xs font-semibold tracking-tight leading-none">
            Shortcuts
          </span>
        </button>
      </div>

      {/* Floating System Shortcuts HUD Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn pointer-events-auto ${
            isLight
              ? "bg-black/25 backdrop-blur-xs"
              : "bg-black/60 backdrop-blur-md"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`w-full max-w-lg rounded-2xl shadow-2xl backdrop-blur-3xl overflow-hidden p-6 font-sans animate-scaleUp border transition-colors ${
              isLight
                ? "bg-white/95 border-slate-200 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
                : "bg-zinc-950/90 border-white/20 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-4 border-b mb-5 ${isLight ? "border-slate-200" : "border-white/10"}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-xl border ${
                    isLight
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "bg-blue-600/30 border-blue-400/30 text-blue-400"
                  }`}
                >
                  <Keyboard size={20} />
                </div>
                <div>
                  <h3
                    className={`font-bold text-base tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    System Navigation & Shortcuts
                  </h3>
                  <p
                    className={`text-xs ${isLight ? "text-slate-500" : "text-zinc-400"}`}
                  >
                    Essential key combinations for macOS task switching
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isLight
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
                    : "bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Groups */}
            <div className="space-y-6">
              {SHORTCUT_GROUPS.map((group, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h4
                    className={`text-[11px] font-bold uppercase tracking-wider px-1 ${
                      isLight ? "text-slate-500" : "text-zinc-400"
                    }`}
                  >
                    {group.title}
                  </h4>
                  <div className="space-y-2">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={itemIdx}
                          onClick={item.action}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                            isLight
                              ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                              : "bg-white/5 hover:bg-white/10 border-white/10 text-zinc-200"
                          } ${
                            item.action
                              ? "cursor-pointer hover:border-blue-500/40"
                              : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-1.5 rounded-lg ${
                                isLight
                                  ? "bg-slate-200 text-slate-700"
                                  : "bg-white/10 text-zinc-300"
                              }`}
                            >
                              <Icon size={16} />
                            </div>
                            <span
                              className={`text-xs font-medium ${isLight ? "text-slate-800" : "text-zinc-200"}`}
                            >
                              {item.description}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            {item.keys.map((k, kIdx) => (
                              <kbd
                                key={kIdx}
                                className={`px-2 py-1 text-[11px] font-mono font-bold rounded-md shadow-xs min-w-5.5 text-center border ${
                                  isLight
                                    ? "bg-white border-slate-300 text-slate-800"
                                    : "bg-zinc-800 border-zinc-600 text-zinc-100"
                                }`}
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Tip */}
            <div
              className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                isLight
                  ? "border-slate-200 text-slate-500"
                  : "border-white/10 text-zinc-400"
              }`}
            >
              <span className="flex items-center space-x-1">
                <span>Tip: Press</span>
                <kbd
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                    isLight
                      ? "bg-slate-100 border-slate-300 text-slate-700"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}
                >
                  ⌘ /
                </kbd>
                <span>anytime to toggle this sheet</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-500 cursor-pointer hover:text-blue-600 font-medium transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
