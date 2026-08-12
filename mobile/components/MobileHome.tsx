/**
 * @file mobile/components/MobileHome.tsx
 * @description iOS Home Launcher Grid & Pinned App Dock Component.
 *
 * Responsibilities:
 * - Renders mobile search bar, touch-optimized static hero banner (`StaticHeroText`), and app grid icons.
 * - Displays a sleek mobile bottom dock hosting system app launcher icons.
 */

import { APPS_CONFIG } from "../../config/apps.config";
import { DESKTOP_ITEMS } from "../../desktop/components/DesktopFolders";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import { Search } from "lucide-react";
import StaticHeroText from "../../components/common/StaticHeroText";

export default function MobileHome() {
  const { openApp, openSpotlight, openApps } = useEcosystemStore();

  // System apps pinned to sleek bottom dock menu (excluding Trash on mobile)
  const dockApps = APPS_CONFIG.filter(
    (app) => !app.id.startsWith("folder-") && app.id !== "resume",
  );

  // Desktop Folders & Files Grid (excluding Soothly AI, Photos, and Terminal from mobile screen grid)
  const mobileDesktopItems = DESKTOP_ITEMS.filter(
    (item) =>
      item.appId !== "about" &&
      item.appId !== "photos" &&
      item.appId !== "terminal",
  );

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Section: Full-Width Spotlight Search Bar */}
      <div className="w-full pt-5 px-4 shrink-0 z-20">
        <button
          onClick={openSpotlight}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-2xl border border-white/20 text-white/90 shadow-2xl active:scale-[0.99] hover:bg-black/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-3.5 h-3.5 text-white/90 group-hover:text-white transition-colors" />
            <span className="text-xs sm:text-sm font-medium text-white/90 tracking-tight mt-px">
              Search skills, projects, experience, etc.
            </span>
          </div>
        </button>
      </div>

      {/* Branding Hero Visual */}
      <div className="w-full flex flex-col items-center justify-center pt-4">
        <StaticHeroText />
      </div>

      {/* Middle Content View: Desktop Items Grid & Hero Text */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-6 scrollbar-none">
        {/* Desktop Folders & Files Grid */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-4 pt-2">
          {mobileDesktopItems.map((item) => {
            const isOpen = openApps.some(
              (a) => a.id === item.appId && a.isOpen && !a.isMinimized,
            );

            return (
              <div
                key={item.id}
                onClick={() => openApp(item.appId, item.appTitle)}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openApp(item.appId, item.appTitle);
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white active:scale-90 hover:scale-105 transition-all duration-200 relative bg-transparent border-0 shadow-none cursor-pointer"
                  style={{
                    borderRadius: "22.5%",
                  }}
                >
                  <img
                    src={item.iconImage}
                    alt={item.title}
                    className="w-13 h-13 sm:w-15 sm:h-15 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                  />
                </button>
                <span className="text-[11px] font-medium text-white/90 mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center line-clamp-2 max-w-24">
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

      {/* Sleek Floating Bottom Dock Menu */}
      <div className="fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-auto">
        <div className="flex items-center justify-around px-3 py-2 rounded-3xl bg-black/45 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          {dockApps.map((app) => {
            const Icon = app.icon;
            const isOpen = openApps.some(
              (a) => a.id === app.id && a.isOpen && !a.isMinimized,
            );

            return (
              <div
                key={app.id}
                onClick={() => openApp(app.id, app.title)}
                className="relative flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openApp(app.id, app.title);
                  }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white active:scale-90 hover:scale-110 transition-all duration-200 cursor-pointer relative"
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
                    <Icon size={24} strokeWidth={1.5} />
                  )}
                </button>
                {isOpen && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute -bottom-1 shadow-md" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
