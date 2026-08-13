/**
 * @file mobile/MobileEnvironment.tsx
 * @description iOS Mobile Environment Container View Component.
 *
 * Responsibilities:
 * - Serves as the primary mobile layout wrapper for small screen viewports (<768px).
 * - Manages iOS Lock Screen unlock gestures (`IOSLockScreen`) and app container transitions.
 * - Renders active full-screen app windows with swipe-up-to-home gesture handling.
 * - Integrates with browser History API so that pressing the mobile back button
 *   closes the active app instead of navigating away from the site.
 */

import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useEcosystemStore, WALLPAPERS } from "../store/useEcosystemStore";
import MobileHome from "./components/MobileHome";
import IOSLockScreen from "./components/IOSLockScreen";
import DesktopMenu from "../desktop/components/DesktopMenu";
import ControlCenter from "../components/overlays/ControlCenter";
import NotificationCenter from "../components/overlays/NotificationCenter";
import SplashScreen from "../components/common/BootingScreen";
import { APPS_CONFIG } from "../config/apps.config";

export default function MobileEnvironment() {
  const { openApps, focusedAppId, wallpaper, closeApp } = useEcosystemStore();
  const [isLocked, setIsLocked] = useState(true);
  const focusedApp = openApps.find((a) => a.id === focusedAppId && a.isOpen);
  const appConfig = APPS_CONFIG.find((c) => c.id === focusedApp?.id);

  const defaultWallpaperUrl = "/images/default-wallpaper-mobile.webp";
  const tahoeWallpaperUrl =
    WALLPAPERS.find((w) => w.id === "tahoe-wallpaper")?.url ||
    "/images/tahoe-wallpaper.webp";

  // Exclude default-wallpaper on mobile and default to tahoe-wallpaper
  const mobileWallpaper =
    wallpaper === defaultWallpaperUrl ? tahoeWallpaperUrl : wallpaper;

  const appContainerRef = useRef<HTMLDivElement>(null);

  // Track the previously focused app ID to detect open/close transitions
  const prevFocusedAppIdRef = useRef<string | null>(null);

  // Push a browser history entry when an app opens so the hardware/gesture
  // back button closes the app instead of leaving the site.
  useEffect(() => {
    const currentId = focusedApp?.id ?? null;
    const prevId = prevFocusedAppIdRef.current;

    if (currentId && !prevId) {
      // An app just opened — push a history entry
      window.history.pushState({ mobileApp: currentId }, "");
    } else if (!currentId && prevId) {
      // An app was closed programmatically (e.g. swipe-to-home) —
      // pop the history entry we pushed so the stack stays clean.
      // Only pop if the current state has our marker.
      if (window.history.state?.mobileApp) {
        window.history.back();
      }
    }

    prevFocusedAppIdRef.current = currentId;
  }, [focusedApp?.id]);

  // Listen for the browser back button (popstate) to close the active app
  useEffect(() => {
    const handlePopState = () => {
      const currentFocusedId = useEcosystemStore.getState().focusedAppId;
      const currentOpenApps = useEcosystemStore.getState().openApps;
      const currentFocusedApp = currentOpenApps.find(
        (a) => a.id === currentFocusedId && a.isOpen,
      );

      if (currentFocusedApp) {
        // Close the app instead of navigating away
        closeApp(currentFocusedApp.id);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeApp]);

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
    <div className="relative h-screen w-full max-w-full overflow-hidden bg-black text-white selection:bg-blue-500/30 font-sans flex flex-col">
      {/* Authentic Apple Boot Splash Screen */}
      <SplashScreen />

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

      {/* Active App Overlay */}
      {focusedApp && appConfig && (
        <div
          ref={appContainerRef}
          className="absolute inset-0 top-8.5 z-40 bg-zinc-950 overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-zinc-950 max-w-full">
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

      {/* System Overlays — Placed after active app window to ensure Control Center & Notification Center open on top */}
      <ControlCenter />
      <NotificationCenter />
    </div>
  );
}
