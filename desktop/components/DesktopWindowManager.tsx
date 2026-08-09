/**
 * @file desktop/components/DesktopWindowManager.tsx
 * @description Desktop Window Instance Manager Component.
 *
 * Responsibilities:
 * - Reads open application instances (`openApps`) from store state.
 * - Maps active window IDs against `APPS_CONFIG` to resolve lazy-loaded application components.
 * - Wraps lazy component instances in React `<Suspense>` and `<WindowFrame>` for drag, resize, and window controls.
 */

import { Suspense } from "react";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import WindowFrame from "./WindowFrame";
import { APPS_CONFIG } from "../../config/apps.config";

export default function DesktopWindowManager() {
  const { openApps } = useEcosystemStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {openApps
        .filter((app) => app.isOpen)
        .map((app) => {
          const config = APPS_CONFIG.find(
            (c) =>
              c.id === app.id ||
              (c.id === "about" && app.id === "settings") ||
              (c.id === "settings" && app.id === "about"),
          );
          if (!config) return null;

          const AppComponent = config.component;

          return (
            <WindowFrame key={app.id} app={app}>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </div>
                }
              >
                <AppComponent />
              </Suspense>
            </WindowFrame>
          );
        })}
    </div>
  );
}
