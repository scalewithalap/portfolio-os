/**
 * @file components/common/SplashScreen.tsx
 * @description Cinematic Apple OLED & Radiant Ambient Glow Boot Screen Component.
 *
 * Responsibilities:
 * - Renders an agency-tier $150k+ boot sequence matching Apple & Linear aesthetic standards.
 * - Displays a glowing metallic Apple logo, ambient radial mesh aura, double-bezel progress bar,
 *   and real-time percentage counter with dynamic system status messages.
 * - Works seamlessly across Desktop (macOS), Tablet (iPadOS), and Mobile (iOS) viewports.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useEcosystemStore } from "../../store/useEcosystemStore";

const BOOT_MESSAGES = [
  "Initializing Portfolio OS...",
  "Loading Systems & Services...",
  "Welcome to Scale with Alap.",
];

export default function SplashScreen() {
  const { booting, finishBoot } = useEcosystemStore();
  const [statusMessage, setStatusMessage] = useState(BOOT_MESSAGES[0]);
  const [progressPercent, setProgressPercent] = useState(0);

  const bootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!booting) return;

    const progressObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: finishBoot,
    });

    // Initial entrance with authentic smooth Apple ease
    tl.fromTo(
      [logoRef.current, badgeRef.current, textGroupRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
    )
      // Progress bar fill & percentage counter with realistic macOS boot progression
      .to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=0.1",
      )
      .to(
        progressObj,
        {
          value: 100,
          duration: 1.5,
          ease: "power1.inOut",
          onUpdate: () => {
            const current = Math.round(progressObj.value);
            setProgressPercent(current);

            const stepIndex = Math.min(
              Math.floor((current / 100) * BOOT_MESSAGES.length),
              BOOT_MESSAGES.length - 1,
            );
            setStatusMessage(BOOT_MESSAGES[stepIndex]);
          },
        },
        "<",
      )
      // Smooth fade-out exit to reveal the desktop/mobile wallpaper
      .call(() => {
        finishBoot();
      })
      .to(bootRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .set(bootRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [booting, finishBoot]);

  if (!booting) return null;

  return (
    <div
      ref={bootRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-linear-to-b from-[#090d1e] via-[#030511] to-[#000106] overflow-hidden select-none pointer-events-auto -mt-12 md:mt-0"
    >
      {/* Radiant Mesh Background Aura Glows */}
      <div className="absolute w-112.5 h-112.5 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-75 h-75 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none" />

      {/* Center Apple Logo */}
      <div className="relative mb-7 md:mb-10 flex items-center justify-center">
        <svg
          ref={logoRef}
          className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)] transition-all duration-300"
          viewBox="0 0 384 512"
          fill="currentColor"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
      </div>

      {/* Double-Bezel Progress Bar & Status Text Area */}
      <div ref={textGroupRef} className="flex flex-col items-center">
        {/* Inner Progress Track */}
        <div className="w-64 sm:w-72 h-1.25 md:h-1.5 bg-slate-800 rounded-full overflow-hidden relative backdrop-blur-xl">
          <div
            ref={progressRef}
            className="h-full bg-white rounded-full w-full shadow-[0_0_14px_rgba(99,102,241,0.9)] relative origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Micro-Status Label & Real-Time Counter */}
        <div className="mt-2 md:px-0.5 flex items-center justify-between w-64 sm:w-72 text-xs sm:text-sm">
          <span className="truncate pr-2 font-medium tracking-tight text-white/90 transition-all duration-200">
            {statusMessage}
          </span>
          <span className="text-white/90 font-semibold shrink-0">
            {progressPercent}%
          </span>
        </div>
      </div>
    </div>
  );
}
