import React, { useRef, useEffect } from "react";

export default function HeroHoverText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const line1Text = "Hey, I'm Alap! Welcome to my";
  const line2Text = "portfolio.";

  useEffect(() => {
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
        e.clientX >= containerRect.left - 200 &&
        e.clientX <= containerRect.right + 200 &&
        e.clientY >= containerRect.top - 200 &&
        e.clientY <= containerRect.bottom + 200;

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
          const dist = Math.hypot(
            e.clientX - charCenterX,
            e.clientY - charCenterY,
          );
          const maxDist = 150;

          if (dist < maxDist) {
            const power = Math.pow(1 - dist / maxDist, 1.8);
            const scale = 1 + power * 0.45;
            const translateY = -18 * power;

            char.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            char.style.transition =
              "transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1)";
            char.style.color = "#ffffff";
            char.style.zIndex = "10";
          } else {
            char.style.transform = "scale(1) translateY(0px)";
            char.style.transition =
              "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            char.style.zIndex = "1";
          }
        });
      });
    };

    const handleMouseLeave = () => {
      charsRef.current.forEach((char) => {
        if (!char) return;
        char.style.transform = "scale(1) translateY(0px)";
        char.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
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
      className="select-none text-center pointer-events-auto flex flex-col items-center justify-center py-6 px-4"
    >
      {/* Top Line: "Hey, I'm Alap! welcome to my" */}
      <div className="flex flex-wrap justify-center items-center gap-x-[0.3em]">
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
                  className="inline-block font-sans font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-[55px] tracking-tight cursor-default transition-transform drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </div>

      {/* Bottom Line: "portfolio." */}
      <div className="flex justify-center items-center">
        {line2Text.split("").map((char, cIdx) => {
          const myIdx = charIndexCounter++;
          return (
            <span
              key={cIdx}
              ref={(el) => {
                charsRef.current[myIdx] = el;
              }}
              className="md:mt-7 inline-block font-serif italic font-normal text-white text-6xl sm:text-8xl md:text-9xl tracking-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-default transition-transform"
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
