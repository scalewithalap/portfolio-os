import React from "react";

export default function StaticHeroText() {
  const line1Text = "I built this portfolio just to";
  const line2Text = "impress you.";

  return (
    <div className="select-none text-center pointer-events-auto flex flex-col items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
      {/* Top Line */}
      <h2 className="font-sans font-normal text-white text-3xl sm:text-4xl tracking-tighter leading-snug cursor-default drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]">
        {line1Text}
      </h2>

      {/* Bottom Line */}
      <h1 className="font-serif italic font-normal text-white text-[45px] sm:text-5xl leading-none tracking-tight cursor-default drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] mt-2 md:mt-4">
        {line2Text}
      </h1>
    </div>
  );
}
