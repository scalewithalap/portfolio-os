import { useEffect, useState } from "react";
import { APPS_CONFIG } from "../utils/apps";
import { useEcosystemStore } from "../store/useEcosystemStore";
import {
  CloudRain,
  Search,
  Battery,
  Calendar as CalendarIcon,
} from "lucide-react";
import HeroHoverText from "../desktop/HeroHoverText";

export default function MobileHome() {
  const { openApp, openSpotlight } = useEcosystemStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 p-4 pt-10 pb-12 flex flex-col justify-between overflow-y-auto select-none">
      {/* Top Branding Section: Hero Visual matching Desktop */}
      <div className="w-full flex flex-col items-center justify-center">
        <HeroHoverText />
      </div>

      <div className="space-y-6 mt-2">
        {/* iOS Widgets Row */}
        <div className="grid grid-cols-4 gap-3">
          {/* Weather Widget (2x2) */}
          <div className="col-span-2 row-span-2 rounded-3xl bg-linear-to-br from-blue-600/80 via-blue-500/70 to-indigo-600/80 backdrop-blur-xl shadow-xl p-4 flex flex-col justify-between text-white border border-white/20">
            <div>
              <div className="font-semibold text-xs text-white/80 tracking-wide">
                Remote
              </div>
              <div className="text-3xl font-light mt-1 tracking-tight">24°</div>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-white/90">
              <div className="flex items-center space-x-1.5">
                <CloudRain size={16} />
                <span>Rainy</span>
              </div>
              <span className="text-[11px] opacity-80">H:26° L:21°</span>
            </div>
          </div>

          {/* Battery Widget (2x1) */}
          <div className="col-span-2 row-span-1 rounded-3xl bg-black/40 backdrop-blur-2xl shadow-xl p-3 flex items-center justify-between text-white border border-white/15 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Battery size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 font-medium">
                  Battery
                </span>
                <span className="text-xs font-bold text-emerald-400">98%</span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>

          {/* Calendar Widget (2x1) */}
          <div className="col-span-2 row-span-1 rounded-3xl bg-white/90 backdrop-blur-2xl shadow-xl p-3 flex items-center justify-between text-zinc-900 border border-white/40 px-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <CalendarIcon size={16} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  {time.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-sm font-bold text-zinc-900">
                  {time.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* App Icons Grid */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-3 pt-2">
          {APPS_CONFIG.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <button
                  onClick={() => openApp(app.id, app.title)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl active:scale-90 hover:scale-105 transition-all duration-200 relative ${
                    app.iconImage
                      ? "bg-transparent border-0 shadow-none"
                      : `${app.color} border border-white/20 shadow-black/40`
                  }`}
                  style={{
                    borderRadius: "22%",
                  }}
                >
                  {app.iconImage ? (
                    <img
                      src={app.iconImage}
                      alt={app.title}
                      className="w-13 h-13 sm:w-15 sm:h-15 object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <Icon
                      size={30}
                      strokeWidth={1.5}
                      className="drop-shadow-md"
                    />
                  )}
                </button>
                <span className="text-[11px] font-medium text-white/90 mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center line-clamp-1 max-w-18">
                  {app.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* iOS Style Spotlight Search Pill */}
      <div className="mt-6 flex justify-center pb-2">
        <button
          onClick={openSpotlight}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-2xl active:scale-95 hover:bg-black/60 transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-white/80" />
          <span className="text-xs font-semibold text-white/90 tracking-tight">
            Search
          </span>
        </button>
      </div>
    </div>
  );
}
