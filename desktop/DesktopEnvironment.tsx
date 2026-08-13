/**
 * @file desktop/DesktopEnvironment.tsx
 * @description macOS Desktop Environment Container View.
 *
 * Responsibilities:
 * - Serves as the primary desktop view wrapper on desktop-class viewports (>=1024px).
 * - Assembles top menu bar (`DesktopMenu`), floating dock (`DesktopDock`), desktop grid icons (`DesktopFolders`), interactive magnetic 3D title (`HeroHoverText`), and window manager (`DesktopWindowManager`).
 * - Handles right-click context menu events, wallpaper backgrounds, and GSAP startup animations.
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LayoutGrid } from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import DesktopMenu from "./components/DesktopMenu";
import DesktopDock from "./components/DesktopDock";
import DesktopWindowManager from "./components/DesktopWindowManager";
import DesktopFolders from "./components/DesktopFolders";
import HeroHoverText from "./components/HeroHoverText";
import ContextMenu from "../components/overlays/ContextMenu";
import ControlCenter from "../components/overlays/ControlCenter";
import NotificationCenter from "../components/overlays/NotificationCenter";
import ShortcutsHintOverlay from "../components/overlays/ShortcutsHintOverlay";
import SplashScreen from "../components/common/BootingScreen";

export default function DesktopEnvironment() {
  const {
    booting,
    wallpaper,
    openContextMenu,
    closeContextMenu,
    brightness,
    snapPreview,
  } = useEcosystemStore();

  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!booting && desktopRef.current) {
      gsap.fromTo(
        desktopRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.01, ease: "power2.out" },
      );
    }
  }, [booting]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY);
  };

  const handleDesktopClick = () => {
    closeContextMenu();
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black text-white selection:bg-blue-500/30 font-sans select-none"
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Background Wallpaper - Dynamic with Store */}
      <div
        ref={desktopRef}
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: booting ? 0 : 1,
        }}
      >
        {/* Dynamic Screen Brightness Dimming Overlay */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-200 z-10"
          style={{ opacity: Math.max(0, ((100 - brightness) / 100) * 0.8) }}
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Center Hero Text with Interactive Mouse Proximity Hover Animation */}
        <HeroHoverText />
      </div>

      {/* Desktop Folders (Draggable across viewport) */}
      {!booting && <DesktopFolders />}

      {/* OS Components */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        <DesktopMenu />
        <DesktopWindowManager />
        <DesktopDock />
      </div>

      {/* macOS Overlays & System Controls */}
      <ContextMenu />
      <ControlCenter />
      <NotificationCenter />
      <ShortcutsHintOverlay />

      {/* Snap-To-Grid Visual Preview Overlay */}
      {snapPreview && (
        <div
          className="fixed z-30 transition-all duration-150 ease-out border-2 border-blue-400/80 bg-blue-500/20 backdrop-blur-md rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.45)] pointer-events-none flex items-center justify-center animate-fadeIn"
          style={{
            left: snapPreview.x,
            top: snapPreview.y,
            width: snapPreview.width,
            height: snapPreview.height,
          }}
        >
          <div className="px-4 py-2 rounded-xl bg-blue-600/90 text-white font-semibold text-xs tracking-wide shadow-2xl border border-white/20 backdrop-blur-2xl flex items-center space-x-2">
            <LayoutGrid size={15} />
            <span>{snapPreview.label || "Snap Window"}</span>
          </div>
        </div>
      )}

      {/* Authentic Mac Boot Screen */}
      <SplashScreen />
    </div>
  );
}
