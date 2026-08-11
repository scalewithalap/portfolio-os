/**
 * @file components/common/StaticHeroText.tsx
 * @description Mobile & Tablet Lightweight Hero Title Banner Component.
 *
 * Responsibilities:
 * - Renders crisp, touch-optimized static hero text without heavy mouse-hover JS calculation loops.
 * - Used exclusively on mobile and tablet touch layouts (`MobileHome.tsx`, `TabletEnvironment.tsx`).
 */

export default function StaticHeroText() {
  const line1Text = "I built this portfolio just to";
  const line2Text = "impress you.";

  return (
    <div className="px-2 select-none text-center pointer-events-auto flex flex-col items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
      {/* Top Line */}
      <h2 className="font-sans font-normal text-white text-[32.5px] sm:text-4xl tracking-tighter leading-snug drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]">
        {line1Text}
      </h2>

      {/* Bottom Line */}
      <h1 className="font-serif italic font-normal text-white text-[55.5px] sm:text-5xl leading-none tracking-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] -mt-0.5">
        {line2Text}
      </h1>
    </div>
  );
}
