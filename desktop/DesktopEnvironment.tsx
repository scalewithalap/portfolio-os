import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LayoutGrid } from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import DesktopMenu from "./DesktopMenu";
import DesktopDock from "./DesktopDock";
import DesktopWindowManager from "./DesktopWindowManager";
import DesktopFolders from "./DesktopFolders";
import HeroHoverText from "./HeroHoverText";
import ContextMenu from "../components/ContextMenu";
import ControlCenter from "../components/ControlCenter";
import NotificationCenter from "../components/NotificationCenter";
import ShortcutsHintOverlay from "../components/ShortcutsHintOverlay";

export default function DesktopEnvironment() {
  const {
    booting,
    finishBoot,
    wallpaper,
    openContextMenu,
    closeContextMenu,
    brightness,
    snapPreview,
  } = useEcosystemStore();

  const bootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!booting) return;

    const tl = gsap.timeline({
      onComplete: finishBoot,
    });

    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "power1.inOut",
      delay: 0.5,
    })
      .to(
        [logoRef.current, progressRef.current],
        {
          opacity: 0,
          duration: 0.3,
        },
        "+=0.1",
      )
      .to(bootRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .set(bootRef.current, { display: "none" })
      .fromTo(
        desktopRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      );

    return () => {
      tl.kill();
    };
  }, [booting, finishBoot]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
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
        <div className="absolute inset-0 bg-black/10" />

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
      {booting && (
        <div
          ref={bootRef}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <svg
            ref={logoRef}
            className="w-22 h-22 text-white mb-14"
            viewBox="0 0 384 512"
            fill="currentColor"
          >
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>

          <div className="w-50 h-1 bg-[#333333] rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-white w-0" />
          </div>
        </div>
      )}
    </div>
  );
}
