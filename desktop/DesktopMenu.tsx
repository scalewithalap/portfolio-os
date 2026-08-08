import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Bell,
  Sun,
  Moon,
  Share2,
  Calendar,
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";

export default function DesktopMenu() {
  const [time, setTime] = useState(new Date());
  const {
    openApp,
    openSpotlight,
    toggleControlCenter,
    isControlCenterOpen,
    toggleNotificationCenter,
    isNotificationCenterOpen,
    systemTheme,
    toggleSystemTheme,
    showToast,
    minimizeAllApps,
  } = useEcosystemStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isLight = systemTheme === "light";
  const iconColor = isLight ? "text-slate-800" : "text-white";

  const handleSharePortfolio = () => {
    const portfolioUrl = "https://scalewithalap.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portfolioUrl);
    }
    showToast("Copied URL: https://scalewithalap.com", "copy");
  };

  return (
    <div
      className={`h-8.5 px-3 md:px-6 leading-none w-full flex items-center justify-between font-medium tracking-normal pointer-events-auto select-none z-50 shadow-sm transition-colors duration-200 border-b shrink-0 ${
        isLight
          ? "bg-white/85 text-zinc-900 border-black/10 backdrop-blur-2xl"
          : "bg-black/50 text-white border-white/10 backdrop-blur-2xl"
      }`}
    >
      {/* Left Menu Items (Working Links) */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 leading-none overflow-hidden">
        <button
          onClick={minimizeAllApps}
          className="inline-flex items-center justify-center cursor-pointer leading-none pb-px"
          title="Show Desktop (Minimize All Windows)"
        >
          <img
            src="/images/logo.svg"
            alt="Scale with Alap"
            className={`w-3.25 h-3.25 md:w-3.5 md:h-3.5 drop-shadow pointer-events-none shrink-0 ${isLight ? "brightness-0" : "invert"}`}
          />
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`font-bold pr-1 pl-0.75 inline-flex items-center text-xs sm:text-sm justify-center leading-none pt-0.75 truncate ${
            isLight ? "text-slate-900" : "text-white"
          }`}
          title="About Scale with Alap"
        >
          Scale with Alap
        </button>

        <button
          onClick={() => openApp("safari", "My Projects")}
          className={`hidden cursor-pointer px-1.5 pt-0.5 rounded transition-colors md:inline-flex items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] ${
            isLight ? "text-black/85" : "text-white/85"
          }`}
          title="Open Projects"
        >
          Projects
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`cursor-pointer px-1.5 pt-0.5 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden xs:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open About Me"
        >
          About
        </button>

        <button
          onClick={() => openApp("resume", "Resume")}
          className={`cursor-pointer px-1.5 pt-0.5 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden sm:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Resume"
        >
          Resume
        </button>

        <button
          onClick={() => openApp("terminal", "Terminal")}
          className={`cursor-pointer px-1.5 pt-0.5 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Terminal"
        >
          Terminal
        </button>

        <button
          onClick={() => openApp("mail", "Contact")}
          className={`cursor-pointer px-1.5 pt-0.5 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Contact"
        >
          Contact
        </button>
      </div>

      {/* Right Toolbar Status Icons */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 leading-none shrink-0 pt-0.5">
        {/* Quick Theme Switcher */}
        <button
          onClick={toggleSystemTheme}
          className="cursor-pointer p-1 rounded transition-all inline-flex items-center justify-center leading-none"
          title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
        >
          {isLight ? (
            <Moon
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
            />
          ) : (
            <Sun
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
            />
          )}
        </button>

        {/* Share Portfolio Link */}
        <button
          onClick={handleSharePortfolio}
          className="cursor-pointer p-1 rounded transition-all inline-flex items-center justify-center leading-none xs:inline-flex"
          title="Share Portfolio URL"
        >
          <Share2
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
          />
        </button>

        {/* Spotlight Search Trigger */}
        <button
          onClick={openSpotlight}
          className="cursor-pointer p-1 rounded transition-all inline-flex items-center justify-center leading-none"
          title="Spotlight Search (⌘ + K)"
        >
          <Search
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
          />
        </button>

        {/* Control Center Toggle Button */}
        <button
          onClick={toggleControlCenter}
          className="cursor-pointer pl-1 md:p-1 rounded transition-all inline-flex items-center justify-center leading-none"
          title="Control Center"
        >
          <SlidersHorizontal
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
          />
        </button>

        {/* Contact Hub Trigger (Date + Time) */}
        <button
          onClick={toggleNotificationCenter}
          className="cursor-pointer pl-1.5 py-1 rounded transition-all hidden md:inline-flex items-center space-x-1 text-xs font-medium leading-none"
          title="Open Notifications & System Tray"
        >
          <Calendar
            size={12}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
          />
          <span className="ml-px text-[11px] sm:text-[12.5px] leading-none">
            {formatDate(time)}
          </span>
          <span className="text-xs inline">•</span>
          <span className="text-[11px] sm:text-[12.5px] leading-none">
            {formatTime(time)}
          </span>
        </button>
      </div>
    </div>
  );
}
