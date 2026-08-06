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
      className={`h-7.75 pb-0.75 px-6 leading-none w-full flex items-center justify-between font-medium tracking-normal pointer-events-auto select-none z-50 shadow-sm transition-colors duration-200 border-b ${
        isLight
          ? "bg-white/80 text-zinc-900 border-black/10 backdrop-blur-2xl"
          : "bg-black/40 text-white border-white/10 backdrop-blur-2xl"
      }`}
    >
      {/* Left Menu Items (Working Links) */}
      <div className="flex items-center space-x-0.5 sm:space-x-1 leading-none">
        <button
          onClick={minimizeAllApps}
          className="pl-1.5 inline-flex items-center justify-center cursor-pointer leading-none"
          title="Show Desktop (Minimize All Windows)"
        >
          <img
            src="/images/logo.svg"
            alt="Scale with Alap"
            className={`w-3.5 h-3.5 drop-shadow pointer-events-none shrink-0 ${isLight ? "brightness-0" : "invert"}`}
          />
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`font-bold pl-0.5 pr-1.5 inline-flex mt-1 items-center text-sm justify-center leading-none py-0.5 ${
            isLight ? "text-slate-900" : "text-white"
          }`}
          title="About Scale with Alap"
        >
          Scale with Alap
        </button>

        <button
          onClick={() => openApp("safari", "My Projects")}
          className={`cursor-pointer px-1.5 py-0.5 mt-1 rounded transition-colors inline-flex items-center justify-center leading-none font-medium text-[12.5px] ${
            isLight ? "text-black/85" : "text-white/85"
          }`}
          title="Open Projects"
        >
          Projects
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`cursor-pointer px-1.5 py-0.5 mt-1 rounded transition-colors items-center justify-center leading-none font-medium text-[12.5px] hidden xs:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open About Me"
        >
          About
        </button>

        <button
          onClick={() => openApp("resume", "Resume")}
          className={`cursor-pointer px-1.5 py-0.5 mt-1 rounded transition-colors items-center justify-center leading-none font-medium text-[12.5px] hidden sm:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Resume"
        >
          Resume
        </button>

        <button
          onClick={() => openApp("terminal", "Terminal")}
          className={`cursor-pointer px-1.5 py-0.5 mt-1 rounded transition-colors items-center justify-center leading-none font-medium text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Terminal"
        >
          Terminal
        </button>

        <button
          onClick={() => openApp("mail", "Contact")}
          className={`cursor-pointer px-1.5 py-0.5 mt-1 rounded transition-colors items-center justify-center leading-none font-medium text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Contact"
        >
          Contact
        </button>
      </div>

      {/* Right Toolbar Status Icons */}
      <div className="flex items-center space-x-0.5 sm:space-x-1 leading-none">
        {/* Quick Theme Switcher */}
        <button
          onClick={toggleSystemTheme}
          className={`cursor-pointer px-1 py-0.5 mt-0.5 rounded transition-all duration-200 inline-flex items-center justify-center leading-none`}
          title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
        >
          {isLight ? (
            <Sun
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
            />
          ) : (
            <Moon
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
            />
          )}
        </button>

        {/* Share Portfolio Link */}
        <button
          onClick={handleSharePortfolio}
          className={`cursor-pointer px-1 py-0.5 mt-0.5 rounded transition-all duration-200 inline-flex items-center justify-center leading-none`}
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
          className={`cursor-pointer px-1 py-0.5 mt-0.5 rounded transition-all duration-200 inline-flex items-center justify-center leading-none`}
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
          className={`cursor-pointer px-1 py-0.5 mt-0.5 rounded transition-all duration-200 inline-flex items-center justify-center leading-none ${
            isControlCenterOpen ? (isLight ? "bg-black/15" : "bg-white/30") : ""
          }`}
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
          className={`cursor-pointer px-1.5 py-0.5 mt-0.5 rounded transition-all duration-200 inline-flex items-center space-x-1.5 text-[12.5px] font-medium leading-none ${
            isNotificationCenterOpen
              ? isLight
                ? "bg-black/15"
                : "bg-white/30"
              : ""
          }`}
          title="Open Contact Hub"
        >
          <Calendar
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
          />
          <span className="hidden sm:inline text-[12.5px] leading-none mt-px">
            {formatTime(time)}
          </span>
          <span className="text-xl">•</span>
          <span className="hidden sm:inline text-[12.5px] leading-none mt-px">
            {formatDate(time)}
          </span>
        </button>
      </div>
    </div>
  );
}
