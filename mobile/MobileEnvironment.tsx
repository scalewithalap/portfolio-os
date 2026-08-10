/**
 * @file mobile/MobileEnvironment.tsx
 * @description iOS Mobile Environment Container View Component.
 *
 * Responsibilities:
 * - Serves as the primary mobile layout wrapper for small screen viewports (<768px).
 * - Manages iOS Lock Screen unlock gestures (`IOSLockScreen`) and app container transitions.
 * - Renders active full-screen app windows with swipe-up-to-home gesture handling.
 */

import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useEcosystemStore, WALLPAPERS } from "../store/useEcosystemStore";
import MobileHome from "./components/MobileHome";
import IOSLockScreen from "./components/IOSLockScreen";
import DesktopMenu from "../desktop/components/DesktopMenu";
import ControlCenter from "../components/overlays/ControlCenter";
import NotificationCenter from "../components/overlays/NotificationCenter";
import { APPS_CONFIG } from "../config/apps.config";

export default function MobileEnvironment() {
  const { openApps, focusedAppId, wallpaper } = useEcosystemStore();
  const [isLocked, setIsLocked] = useState(true);
  const focusedApp = openApps.find((a) => a.id === focusedAppId && a.isOpen);
  const appConfig = APPS_CONFIG.find((c) => c.id === focusedApp?.id);

  const mobileWallpaper =
    WALLPAPERS.find((w) => w.id === "purple-abstract")?.url || wallpaper;

  const appContainerRef = useRef<HTMLDivElement>(null);

  // Entrance animation for opening an app
  useEffect(() => {
    if (focusedApp && appContainerRef.current) {
      gsap.fromTo(
        appContainerRef.current,
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [focusedApp?.id]);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-black text-white selection:bg-blue-500/30 font-sans flex flex-col">
      {/* Background Wallpaper - Matches Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-bottom-right z-0 transition-all duration-500"
        style={{
          backgroundImage: `url(${mobileWallpaper})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
      </div>

      {/* iOS Lock Screen */}
      {isLocked && <IOSLockScreen onUnlock={() => setIsLocked(false)} />}

      {/* Responsive Top Desktop Menu Bar */}
      <DesktopMenu />

      <div className="relative flex-1 w-full overflow-hidden">
        <MobileHome />
      </div>

      {/* System Overlays */}
      <ControlCenter />
      <NotificationCenter />

      {/* Active App Overlay */}
      {focusedApp && appConfig && (
        <div
          ref={appContainerRef}
          className="absolute inset-0 top-8 z-50 bg-zinc-950 overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto relative bg-zinc-950">
            {APPS_CONFIG.map((config) => {
              if (config.id === focusedApp.id) {
                const AppComponent = config.component;
                return (
                  <Suspense
                    key={config.id}
                    fallback={
                      <div className="h-full w-full bg-zinc-950 flex items-center justify-center text-white/50 text-sm">
                        Loading...
                      </div>
                    }
                  >
                    <AppComponent />
                  </Suspense>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
