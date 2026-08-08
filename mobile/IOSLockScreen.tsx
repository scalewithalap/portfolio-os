import React, { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import gsap from "gsap";
import { useEcosystemStore } from "../store/useEcosystemStore";
import LazyImage from "../components/LazyImage";

interface IOSLockScreenProps {
  onUnlock: () => void;
}

export default function IOSLockScreen({ onUnlock }: IOSLockScreenProps) {
  const { wallpaper, systemTheme } = useEcosystemStore();
  const isLight = systemTheme === "light";
  const [time, setTime] = useState(new Date());

  const lockScreenRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Gesture Handlers (Touch + Mouse for swipe up)
  const handleStart = (clientY: number) => {
    startYRef.current = clientY;
    currentYRef.current = 0;
    isDraggingRef.current = true;
  };

  const handleMove = (clientY: number) => {
    if (!isDraggingRef.current || startYRef.current === null) return;
    const dy = startYRef.current - clientY;

    // Only allow upward drag (positive dy)
    if (dy > 0) {
      currentYRef.current = dy;
      if (lockScreenRef.current) {
        const progress = Math.min(dy / 250, 1);
        gsap.set(lockScreenRef.current, {
          y: -dy,
          opacity: 1 - progress * 0.5,
          scale: 1 - progress * 0.05,
        });
      }
    }
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const threshold = 70; // minimum swipe distance to unlock

    if (currentYRef.current >= threshold && lockScreenRef.current) {
      // Trigger smooth swipe-up unlock animation off-screen
      gsap.to(lockScreenRef.current, {
        y: -window.innerHeight,
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => {
          onUnlock();
        },
      });
    } else if (lockScreenRef.current) {
      // Snap back smoothly if threshold not reached
      gsap.to(lockScreenRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    startYRef.current = null;
    currentYRef.current = 0;
  };

  return (
    <div
      ref={lockScreenRef}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientY)}
      onMouseMove={(e) => handleMove(e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-cover px-2.5 pt-12 pb-10 transition-opacity duration-300 overflow-hidden font-sans touch-none"
      style={{
        backgroundImage: "url(/images/wallpaper-mobile.webp)",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Top Lock Indicator & Time Display */}
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="text-[18px] sm:text-[22px] font-semibold text-white/90 tracking-wide">
          {formatDate(time)}
        </div>

        <h1 className="text-8xl sm:text-9xl font-semibold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] font-sans">
          {formatTime(time)}
        </h1>
      </div>

      {/* Center Notification Preview Card */}
      <div className="relative z-10 mb-auto w-full mx-auto mt-1">
        <div className="rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/20 p-4 shadow-2xl space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LazyImage
                src="/images/alap.webp"
                alt="Alap Putatunda"
                className={`w-9 h-9 rounded-full object-cover shadow-md border shrink-0 object-[center_10%] ${
                  isLight ? "border-black/30" : "border-white/30"
                }`}
              />
              <div className="flex flex-col items-start gap-0.75">
                <span className="text-md font-bold leading-none text-white/90">
                  Portfolio OS
                </span>
                <span className="text-xs font-semibold leading-none text-white/80">
                  Created by Alap Putatunda
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold text-white">
              Hey, I'm Alap! Welcome to My Portfolio.
            </h4>
            <p className="text-xs text-white/85 leading-tight mt-0.5">
              Founding AI Engineer & Full-Stack AI-native Developer. For the
              full macOS experience, view this website on a desktop.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls & Unlock Prompt */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Swipe Prompt */}
        <div className="flex flex-col items-center space-y-1 animate-bounce">
          <ChevronUp size={20} className="text-white/90" />
          <span className="text-sm font-medium text-white/90 tracking-tight">
            Swipe up to unlock the magic
          </span>
        </div>
      </div>
    </div>
  );
}
