import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, X } from "lucide-react";
import { useEcosystemStore, WALLPAPERS } from "../store/useEcosystemStore";
import MobileHome from "./MobileHome";
import DynamicIsland from "./DynamicIsland";
import IOSLockScreen from "./IOSLockScreen";
import DesktopMenu from "../desktop/DesktopMenu";
import ControlCenter from "../components/ControlCenter";
import NotificationCenter from "../components/NotificationCenter";
import { APPS_CONFIG } from "../utils/apps";

export default function MobileEnvironment() {
  const { openApps, focusedAppId, closeApp, wallpaper } = useEcosystemStore();
  const [isLocked, setIsLocked] = useState(true);
  const focusedApp = openApps.find((a) => a.id === focusedAppId && a.isOpen);
  const appConfig = APPS_CONFIG.find((c) => c.id === focusedApp?.id);

  const mobileWallpaper =
    WALLPAPERS.find((w) => w.id === "man-silhouette")?.url || wallpaper;

  const appContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // Handle Swipe up to close
  useEffect(() => {
    if (!focusedApp || !appContainerRef.current) return;

    const el = appContainerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const dy = currentY - touchStartY.current;

      // If swiping up from bottom area (home bar indicator area)
      if (touchStartY.current > window.innerHeight * 0.85 && dy < -50) {
        gsap.to(el, {
          scale: 0.85,
          opacity: 0,
          y: -80,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            closeApp(focusedApp.id);
          },
        });
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [focusedApp, closeApp]);

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
          className="absolute inset-0 top-8 z-40 bg-zinc-950 overflow-hidden flex flex-col"
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

          {/* Home Bar Indicator & Close Button */}
          <div
            onClick={() => closeApp(focusedApp.id)}
            className="h-6 w-full flex items-center justify-center shrink-0 bg-zinc-950 border-t border-white/5 cursor-pointer active:bg-white/5 transition-colors"
            title="Tap to Close App"
          >
            <div className="w-1/3 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
