import { useEffect, useState } from "react";
import { APPS_CONFIG } from "../utils/apps";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { CloudRain, Search } from "lucide-react";

export default function MobileHome() {
  const { openApp, openSpotlight } = useEcosystemStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 p-6 pt-24 pb-16 flex flex-col justify-between overflow-y-auto">
      <div className="grid grid-cols-4 gap-y-6 gap-x-4">
        {/* Weather Widget (2x2) */}
        <div className="col-span-2 row-span-2 rounded-4xl bg-linear-to-b from-blue-400 to-blue-600 shadow-lg p-4 flex flex-col justify-between text-white border border-white/20">
          <div>
            <div className="font-semibold text-sm">Remote</div>
            <div className="text-3xl font-light mt-1">24°</div>
          </div>
          <div className="flex items-center space-x-2">
            <CloudRain size={20} />
            <span className="text-xs font-medium">H:26° L:21°</span>
          </div>
        </div>

        {/* Battery Widget (2x1) */}
        <div className="col-span-2 row-span-1 rounded-3xl bg-zinc-800/80 backdrop-blur-md shadow-lg p-3 flex items-center justify-center text-white border border-white/10">
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-zinc-600"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-green-500"
                strokeDasharray="125"
                strokeDashoffset="25"
              />
            </svg>
            <span className="absolute text-[10px] font-bold">80%</span>
          </div>
        </div>

        {/* Calendar Widget (2x1) */}
        <div className="col-span-2 row-span-1 rounded-3xl bg-white shadow-lg p-3 flex flex-col justify-center items-center text-black">
          <div className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
            {time.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className="text-2xl font-light tracking-tighter">
            {time.getDate()}
          </div>
        </div>

        {/* App Icons */}
        {APPS_CONFIG.map((app) => {
          const Icon = app.icon;
          return (
            <div key={app.id} className="flex flex-col items-center">
              <button
                onClick={() => openApp(app.id, app.title)}
                className={`w-15 h-15 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition-transform relative ${
                  app.iconImage
                    ? "bg-transparent border-0 shadow-none"
                    : `${app.color} border border-white/10`
                }`}
                style={{
                  borderRadius: "22.5%",
                }}
              >
                {app.iconImage ? (
                  <img
                    src={app.iconImage}
                    alt={app.title}
                    className="w-14.5 h-14.5 object-contain drop-shadow-md"
                  />
                ) : (
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="drop-shadow-md"
                  />
                )}
              </button>
              <span className="text-[11px] font-medium text-white mt-1.5 drop-shadow-md text-center line-clamp-1">
                {app.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* iOS Style Spotlight Search Pill */}
      <div className="mt-8 flex justify-center pb-4">
        <button
          onClick={openSpotlight}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/10 text-white shadow-lg active:scale-95 transition-transform"
        >
          <Search className="w-3.5 h-3.5 text-white/80" />
          <span className="text-[12px] font-semibold text-white/90 tracking-tight">
            Search
          </span>
        </button>
      </div>
    </div>
  );
}
