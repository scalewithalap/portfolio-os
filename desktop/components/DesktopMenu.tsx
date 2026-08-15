/**
 * @file desktop/components/DesktopMenu.tsx
 * @description macOS Top System Menu Bar Component.
 *
 * Responsibilities:
 * - Renders the top menu bar featuring Apple logo menu options, active app name, File/Edit submenus, and status tray icons.
 * - Displays dynamic clock time, battery status, Wi-Fi status, volume toggle, theme toggle button, Control Center trigger, and Notification Center trigger.
 * - Displays Spotlight Search trigger icon and quick portfolio share action.
 */

import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Share2,
  Calendar,
} from "lucide-react";
import { useEcosystemStore } from "../../store/useEcosystemStore";

export default function DesktopMenu() {
  const [time, setTime] = useState(new Date());
  const {
    openApp,
    openSpotlight,
    toggleControlCenter,
    toggleNotificationCenter,
    systemTheme,
    toggleSystemTheme,
    isMuted,
    toggleMute,
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
          className="inline-flex items-center justify-center cursor-pointer leading-none p-1.5 rounded transition-colors"
          title="Show Desktop (Minimize All Windows)"
          aria-label="Show Desktop (Minimize All Windows)"
        >
          <svg
            className="w-3.25 h-3.25 md:w-3.75 md:h-3.75 drop-shadow pointer-events-none shrink-0 fill-current"
            viewBox="0 0 384 512"
            aria-hidden="true"
          >
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`font-bold px-1.5 py-1 inline-flex items-center text-xs sm:text-sm justify-center leading-none rounded truncate ${
            isLight ? "text-slate-900" : "text-white"
          }`}
          title="About Scale with Alap"
          aria-label="Scale with Alap"
        >
          Scale with Alap
        </button>

        <button
          onClick={() => openApp("safari", "My Projects")}
          className={`hidden cursor-pointer px-2 py-1 rounded transition-colors md:inline-flex items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] ${
            isLight ? "text-black/85" : "text-white/85"
          }`}
          title="Open Projects"
          aria-label="Projects"
        >
          Projects
        </button>

        <button
          onClick={() => openApp("about", "About Me")}
          className={`cursor-pointer px-2 py-1 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden xs:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open About Me"
          aria-label="About"
        >
          About
        </button>

        <button
          onClick={() => openApp("resume", "Resume")}
          className={`cursor-pointer px-2 py-1 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden sm:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Resume"
          aria-label="Resume"
        >
          Resume
        </button>

        <button
          onClick={() => openApp("terminal", "Terminal")}
          className={`cursor-pointer px-2 py-1 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Terminal"
          aria-label="Terminal"
        >
          Terminal
        </button>

        <button
          onClick={() => openApp("mail", "Contact")}
          className={`cursor-pointer px-2 py-1 rounded transition-colors items-center justify-center leading-none font-medium text-xs sm:text-[12.5px] hidden md:inline-flex ${
            isLight ? "text-slate-800" : "text-white/90"
          }`}
          title="Open Contact"
          aria-label="Contact"
        >
          Contact
        </button>
      </div>

      {/* Right Toolbar Status Icons */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 leading-none shrink-0 pt-0.5">
        {/* Quick Theme Switcher */}
        <button
          onClick={toggleSystemTheme}
          className="cursor-pointer p-1.5 rounded transition-all inline-flex items-center justify-center leading-none"
          title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
          aria-label={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
        >
          {isLight ? (
            <Moon
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
              aria-hidden="true"
            />
          ) : (
            <Sun
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Sound SFX On/Off Toggle */}
        <button
          onClick={toggleMute}
          className="cursor-pointer p-1.5 rounded transition-all inline-flex items-center justify-center leading-none"
          title={isMuted ? "Unmute System Sound SFX" : "Mute System Sound SFX"}
          aria-label={isMuted ? "Unmute System Sound SFX" : "Mute System Sound SFX"}
        >
          {isMuted ? (
            <VolumeX
              size={13}
              strokeWidth={2.2}
              className="text-red-400 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <Volume2
              size={13}
              strokeWidth={2.2}
              className={`${iconColor} shrink-0`}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Share Portfolio Link */}
        <button
          onClick={handleSharePortfolio}
          className="cursor-pointer p-1.5 rounded transition-all inline-flex items-center justify-center leading-none xs:inline-flex"
          title="Share Portfolio URL"
          aria-label="Share Portfolio URL"
        >
          <Share2
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
            aria-hidden="true"
          />
        </button>

        {/* Spotlight Search Trigger */}
        <button
          onClick={openSpotlight}
          className="cursor-pointer p-1.5 rounded transition-all inline-flex items-center justify-center leading-none"
          title="Spotlight Search (⌘ + K)"
          aria-label="Spotlight Search (⌘ + K)"
        >
          <Search
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
            aria-hidden="true"
          />
        </button>

        {/* Control Center Toggle Button */}
        <button
          onClick={toggleControlCenter}
          className="cursor-pointer p-1.5 rounded transition-all inline-flex items-center justify-center leading-none"
          title="Control Center"
          aria-label="Control Center"
        >
          <SlidersHorizontal
            size={13}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
            aria-hidden="true"
          />
        </button>

        {/* Contact Hub Trigger (Date + Time) */}
        <button
          onClick={toggleNotificationCenter}
          className="cursor-pointer px-2 py-1 rounded transition-all hidden md:inline-flex items-center space-x-1 text-xs font-medium leading-none"
          title="Open Notifications & System Tray"
        >
          <Calendar
            size={12}
            strokeWidth={2.2}
            className={`${iconColor} shrink-0`}
            aria-hidden="true"
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
