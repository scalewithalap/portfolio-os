/**
 * @file tablet/TabletEnvironment.tsx
 * @description iPadOS Tablet Environment Container View Component.
 *
 * Responsibilities:
 * - Serves as the primary layout wrapper for tablet viewports (768px - 1023px).
 * - Combines tablet top menu bar (`DesktopMenu`), hero title banner (`StaticHeroText`), folder grid, floating bottom dock, and full-bleed active window containers.
 */

import { Suspense, useState } from "react";
import { X, Minus, Maximize2, ChevronUp } from "lucide-react";
import { useEcosystemStore, WALLPAPERS } from "../store/useEcosystemStore";
import { APPS_CONFIG } from "../config/apps.config";
import { DESKTOP_ITEMS } from "../desktop/components/DesktopFolders";
import StaticHeroText from "../components/common/StaticHeroText";
import DesktopMenu from "../desktop/components/DesktopMenu";
import ControlCenter from "../components/overlays/ControlCenter";
import NotificationCenter from "../components/overlays/NotificationCenter";
import SplashScreen from "../components/common/BootingScreen";

export default function TabletEnvironment() {
  const {
    openApps,
    focusedAppId,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp,
    wallpaper,
    systemTheme,
  } = useEcosystemStore();

  const defaultWallpaperUrl = "/images/default-wallpaper-mobile.webp";
  const tahoeWallpaperUrl =
    WALLPAPERS.find((w) => w.id === "tahoe-wallpaper")?.url ||
    "/images/tahoe-wallpaper.webp";

  // Exclude default-wallpaper on tablet and default to tahoe-wallpaper
  const tabletWallpaper =
    wallpaper === defaultWallpaperUrl ? tahoeWallpaperUrl : wallpaper;

  const [isTabletDockRevealed, setIsTabletDockRevealed] = useState(false);
  const activeApps = openApps.filter((a) => a.isOpen && !a.isMinimized);

  const isTabletDockHidden = activeApps.length > 0 && !isTabletDockRevealed;
  const isLight = systemTheme === "light";

  // Dock apps excluding project folders on tablet
  const dockApps = APPS_CONFIG.filter((app) => !app.id.startsWith("folder-"));

  // Desktop items grid excluding Soothly AI, Photos, and Terminal from tablet screen grid
  const tabletDesktopItems = DESKTOP_ITEMS.filter(
    (item) =>
      item.appId !== "about" &&
      item.appId !== "photos" &&
      item.appId !== "terminal",
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none font-sans flex flex-col">
      {/* Authentic Apple Boot Splash Screen */}
      <SplashScreen />

      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-bottom-right transition-all duration-500 z-0"
        style={{
          backgroundImage: `url(${tabletWallpaper})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Responsive Top Menu Bar - Identical Desktop Top Bar */}
      <DesktopMenu />

      {/* iPad Launcher Content View */}
      <div className="absolute inset-0 pt-12 pb-24 px-8 z-10 flex flex-col justify-between overflow-y-auto">
        {/* iPad Hero Visual Header */}
        <div className="w-full flex justify-center my-2">
          <StaticHeroText />
        </div>

        {/* iPad 4-Column Desktop Items Grid */}
        <div className="grid grid-cols-4 gap-6 my-auto max-w-3xl mx-auto w-full">
          {tabletDesktopItems.map((item) => {
            const isOpen = openApps.some(
              (a) => a.id === item.appId && a.isOpen && !a.isMinimized,
            );

            return (
              <div
                key={item.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <button
                  onClick={() => openApp(item.appId, item.appTitle)}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 hover:scale-105 transition-all duration-200 relative bg-transparent border-0"
                  style={{ borderRadius: "22.5%" }}
                >
                  <img
                    src={item.iconImage}
                    alt={item.title}
                    className="w-15 h-15 object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                  />
                </button>
                <span className="text-xs font-medium text-white/90 mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center line-clamp-2 max-w-24">
                  {item.title}
                </span>
                {isOpen && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-md" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* iPadOS Stage Manager Windows Container */}
      <div className="absolute inset-0 pt-10 pb-20 px-4 z-30 pointer-events-none flex items-center justify-center">
        {activeApps.map((app) => {
          const appConfig = APPS_CONFIG.find((c) => c.id === app.id);
          if (!appConfig) return null;
          const AppComponent = appConfig.component;
          const isFocused = focusedAppId === app.id;

          return (
            <div
              key={app.id}
              onClick={() => focusApp(app.id)}
              className={`pointer-events-auto absolute flex flex-col rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 border ${
                isFocused
                  ? "border-blue-500/60 shadow-[0_25px_80px_rgba(0,0,0,0.85)] ring-1 ring-blue-400/40"
                  : "border-white/20 opacity-95 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              }`}
              style={{
                zIndex: app.zIndex,
                width: app.isMaximized
                  ? "calc(100vw - 32px)"
                  : "min(780px, calc(100vw - 40px))",
                height: app.isMaximized
                  ? "calc(100vh - 100px)"
                  : "min(620px, calc(100vh - 120px))",
              }}
            >
              {/* iPadOS Stage Manager Header with 3 Dots Multitasking Bar */}
              <div className="h-10 px-4 shrink-0 bg-zinc-900/90 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between select-none">
                {/* 3 Multitasking Dots */}
                <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
                  <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-white/10 border border-white/10 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
                  </div>
                  <span className="text-xs font-semibold text-white/90 truncate">
                    {app.title}
                  </span>
                </div>

                {/* Window Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => minimizeApp(app.id)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 active:scale-95 transition-all cursor-pointer"
                    title="Minimize"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => maximizeApp(app.id)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 active:scale-95 transition-all cursor-pointer"
                    title="Maximize / Scale"
                  >
                    <Maximize2 size={13} />
                  </button>
                  <button
                    onClick={() => closeApp(app.id)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-red-500 text-white active:scale-95 transition-all cursor-pointer"
                    title="Close App"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="flex-1 overflow-y-auto bg-zinc-950">
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center text-white/50 text-sm">
                      Loading...
                    </div>
                  }
                >
                  <AppComponent />
                </Suspense>
              </div>
            </div>
          );
        })}
      </div>

      {/* iPad Floating Bottom Dock */}
      <div
        onMouseLeave={() => setIsTabletDockRevealed(false)}
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 px-4 py-2 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/20 shadow-2xl transition-all duration-300 ${
          isTabletDockHidden
            ? "translate-y-28 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        {dockApps.map((app) => {
          const Icon = app.icon;
          const isOpen = openApps.some(
            (a) => a.id === app.id && a.isOpen && !a.isMinimized,
          );

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <button
                onClick={() => {
                  openApp(app.id, app.title);
                  setIsTabletDockRevealed(false);
                }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white active:scale-90 hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg"
                style={{ borderRadius: "22.5%" }}
                title={app.title}
              >
                {app.iconImage ? (
                  <img
                    src={app.iconImage}
                    alt={app.title}
                    className="w-11 h-11 object-contain drop-shadow-md"
                  />
                ) : (
                  <Icon size={26} strokeWidth={1.5} />
                )}
              </button>
              {isOpen && (
                <div className="w-1.5 h-1.5 rounded-full bg-white absolute -bottom-1 shadow-md" />
              )}
            </div>
          );
        })}
      </div>

      {/* Floating "Show Dock" Pill Button when Tablet Dock is Hidden */}
      {isTabletDockHidden && (
        <button
          onClick={() => setIsTabletDockRevealed(true)}
          onMouseEnter={() => setIsTabletDockRevealed(true)}
          className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-auto px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 backdrop-blur-2xl border shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isLight
              ? "bg-white/90 border-slate-300 text-slate-900 shadow-slate-400/20 hover:bg-white"
              : "bg-black/80 border-white/20 text-white shadow-black/60 hover:bg-black/95"
          }`}
          title="Click or hover to reveal bottom dock"
        >
          <ChevronUp className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span className="tracking-tight">Show Dock</span>
        </button>
      )}

      {/* Control Center & Notification Overlays */}
      <ControlCenter />
      <NotificationCenter />
    </div>
  );
}
