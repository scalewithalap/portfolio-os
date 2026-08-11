/**
 * @file desktop/components/HeroHoverText.tsx
 * @description Magnetic 3D Kinetic Hover Title Component for Desktop Environment.
 *
 * Responsibilities:
 * - Renders desktop hero title text ("I built this portfolio to impress you." / "Now Hire Me.").
 * - Runs a real-time mouse proximity tracking loop via requestAnimationFrame for 3D kinetic character depth surge and tilt.
 * - Automatically disables JS mouse hover calculations on touch screens and viewports <1024px for optimal performance.
 */

import { useRef, useEffect } from "react";

export default function HeroHoverText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const line1Text = "I built this portfolio to impress you.";
  const line2Text = "Now Hire Me.";
  const line1CharCount = line1Text.replace(/ /g, "").length;

  useEffect(() => {
    // Disable hover animation on mobile and tablet screens
    const isMobileOrTablet =
      window.innerWidth < 1024 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isMobileOrTablet) return;

    let animationFrameId: number | null = null;
    let cachedCoords: Array<{ x: number; y: number }> = [];

    const updateCachedPositions = () => {
      cachedCoords = charsRef.current.map((char) => {
        if (!char) return { x: 0, y: 0 };
        const rect = char.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };

    updateCachedPositions();
    window.addEventListener("resize", updateCachedPositions);

    let isContainerHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId !== null || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const isNearContainer =
        e.clientX >= containerRect.left - 150 &&
        e.clientX <= containerRect.right + 150 &&
        e.clientY >= containerRect.top - 150 &&
        e.clientY <= containerRect.bottom + 150;

      if (!isNearContainer) {
        if (isContainerHovered) {
          isContainerHovered = false;
          handleMouseLeave();
        }
        return;
      }

      isContainerHovered = true;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        charsRef.current.forEach((char, index) => {
          if (!char || !cachedCoords[index]) return;

          const charCenterX = cachedCoords[index].x;
          const charCenterY = cachedCoords[index].y;

          const dx = Math.abs(e.clientX - charCenterX);
          const dy = Math.abs(e.clientY - charCenterY);

          const isLine2 = index >= line1CharCount;
          const maxDistX = isLine2 ? 110 : 75;
          const maxDistY = isLine2 ? 60 : 42;

          if (dx < maxDistX && dy < maxDistY) {
            const normDist = Math.hypot(dx / maxDistX, dy / maxDistY);
            if (normDist < 1) {
              const power = Math.pow(1 - normDist, 1.5);
              const deltaX = (e.clientX - charCenterX) / maxDistX;
              const deltaY = (e.clientY - charCenterY) / maxDistY;

              const rotateY = isLine2 ? -deltaX * 28 * power : 0;
              const rotateX = isLine2 ? deltaY * 22 * power : 0;
              const rotateZ = isLine2 ? -deltaX * 10 * power : 0;
              const scale = 1 + power * (isLine2 ? 0.28 : 0.35);
              const translateY = (isLine2 ? -20 : -12) * power;
              const translateZ = isLine2 ? 35 * power : 0;

              char.style.transform = `perspective(600px) translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
              char.style.transition =
                "transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)";
              char.style.zIndex = "30";
              return;
            }
          }

          char.style.transform =
            "perspective(600px) translate3d(0, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
          char.style.transition =
            "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          char.style.zIndex = "1";
        });
      });
    };

    const handleMouseLeave = () => {
      charsRef.current.forEach((char) => {
        if (!char) return;
        char.style.transform =
          "perspective(600px) translate3d(0, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
        char.style.transition =
          "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCachedPositions);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  let charIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className="select-none text-center pointer-events-auto flex flex-col items-center justify-center py-6 px-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.55)]"
    >
      {/* Top Line */}
      <div className="flex flex-wrap justify-center items-center gap-x-[0.65em]">
        {line1Text.split(" ").map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              const myIdx = charIndexCounter++;
              return (
                <span
                  key={cIdx}
                  ref={(el) => {
                    charsRef.current[myIdx] = el;
                  }}
                  className="inline-block font-sans font-normal text-white text-[65px] leading-tight tracking-tighter transition-transform drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>

      {/* Bottom Line */}
      <div className="flex flex-wrap justify-center items-center gap-x-[1.25em] mt-1.5">
        {line2Text.split(" ").map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              const myIdx = charIndexCounter++;
              return (
                <span
                  key={cIdx}
                  ref={(el) => {
                    charsRef.current[myIdx] = el;
                  }}
                  className="inline-block font-serif italic font-normal text-white text-[165px] leading-none tracking-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-transform"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
}
