/**
 * @file components/overlays/NotificationCenter.tsx
 * @description System Notification Center Drawer Component.
 *
 * Responsibilities:
 * - Slides out from the top right edge of the screen when date/time is clicked in the menu bar.
 * - Displays system notifications (e.g., Hyperagent Founding 500 selection, new project releases, contact invites).
 * - Houses interactive desktop widgets (System Calendar, Quick Contact card, Featured Project highlight).
 */

import { useState, useRef, useEffect } from "react";
import {
  X,
  Mail,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Copy,
  Zap,
  ArrowUpRight,
  CircleCheckBig,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  AtSign,
} from "lucide-react";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import { PROJECTS_DATA } from "../../data/projectsData";

function ProjectIcon({
  iconImage,
  title,
  isLight,
}: {
  iconImage?: string;
  title: string;
  isLight: boolean;
}) {
  const [src, setSrc] = useState(iconImage || "/icons/folder.webp");
  const isFolder = src.includes("folder.webp");

  return (
    <div
      className={`w-8 h-8 flex items-center justify-center shrink-0 ${
        isFolder
          ? "border-0 bg-transparent shadow-none p-0 rounded-none"
          : `rounded-full shadow-xs border ${
              isLight
                ? "bg-white border-black/20"
                : "bg-zinc-800/90 border-white/20"
            }`
      }`}
    >
      <img
        src={src}
        alt={title}
        className="w-full h-full object-contain"
        onError={() => setSrc("/icons/folder.webp")}
      />
    </div>
  );
}

export default function NotificationCenter() {
  const {
    isNotificationCenterOpen,
    closeNotificationCenter,
    openApp,
    systemTheme,
  } = useEcosystemStore();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const notificationCenterRef = useRef<HTMLDivElement | null>(null);

  const isLight = systemTheme === "light";

  useEffect(() => {
    if (!isNotificationCenterOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        notificationCenterRef.current &&
        !notificationCenterRef.current.contains(event.target as Node)
      ) {
        closeNotificationCenter();
      }
    };

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationCenterOpen, closeNotificationCenter]);

  if (!isNotificationCenterOpen) return null;

  const email = "hi@scalewithalap.com";

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const socialLinks = [
    {
      name: "GitHub",
      handle: "@scalewithalap",
      url: "https://github.com/scalewithalap",
      icon: Github,
    },
    {
      name: "LinkedIn",
      handle: "Alap Putatunda",
      url: "https://linkedin.com/in/scalewithalap",
      icon: Linkedin,
    },
    {
      name: "X / Twitter",
      handle: "@scalewithalap",
      url: "https://x.com/scalewithalap",
      icon: Twitter,
    },
    {
      name: "Threads",
      handle: "@scalewithalap",
      url: "https://www.threads.com/@scalewithalap",
      icon: AtSign,
    },
    {
      name: "YouTube",
      handle: "@scalewithalap",
      url: "https://www.youtube.com/@scalewithalap",
      icon: Youtube,
    },
    {
      name: "Instagram",
      handle: "@scalewithalap",
      url: "https://www.instagram.com/scalewithalap",
      icon: Instagram,
    },
    {
      name: "Facebook",
      handle: "@scalewithalap",
      url: "https://www.facebook.com/scalewithalap",
      icon: Facebook,
    },
  ];

  return (
    <>
      {/* Backdrop overlay for closing */}
      <div
        onClick={closeNotificationCenter}
        className={`fixed inset-0 z-100 backdrop-blur-xs transition-opacity animate-fadeIn cursor-pointer ${
          isLight ? "bg-black/15" : "bg-black/40"
        }`}
      />

      {/* Sliding Notification Sidebar — Doppelrand Hardware Enclosure */}
      <div
        ref={notificationCenterRef}
        className={`fixed top-9 right-3 bottom-3 w-92 sm:w-100 backdrop-blur-3xl rounded-[28px] z-100 flex flex-col overflow-hidden font-sans animate-slideInRight select-none border transition-colors ${
          isLight
            ? "bg-white/90 border-slate-300 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
            : "bg-zinc-950/80 border-white/20 text-white shadow-[0_25px_60px_rgba(0,0,0,0.75)]"
        }`}
      >
        <div
          className={`w-full h-full rounded-[1.375rem] flex flex-col overflow-hidden border ${
            isLight
              ? "bg-slate-50/95 border-slate-200 text-slate-900"
              : "bg-zinc-900/90 border-white/10 text-white"
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3.25 border-b flex items-center justify-between shrink-0 backdrop-blur-md ${
              isLight
                ? "bg-slate-100/90 border-slate-200"
                : "bg-white/5 border-white/10"
            }`}
          >
            <h3
              className={`font-serif font-semibold tracking-normal mt-1.5 text-lg ${isLight ? "text-slate-900" : "text-white/95"}`}
            >
              Contact Hub
            </h3>

            <button
              onClick={closeNotificationCenter}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isLight
                  ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  : "bg-white/10 hover:bg-white/20 text-white/80"
              }`}
              title="Close Sidebar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {/* Quick Info & Portfolio Status Widget */}
            <div className="grid grid-cols-2 gap-3">
              {/* Location Card */}
              <div
                className={`border rounded-2xl p-3.5 flex flex-col justify-between shadow-lg relative overflow-hidden group ${
                  isLight
                    ? "bg-linear-to-br from-blue-50 via-slate-50 to-white border-blue-200 text-slate-900"
                    : "bg-linear-to-br from-blue-950/50 via-slate-900/60 to-zinc-950/90 border-blue-500/20 text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 text-blue-500">
                  <MapPin className="w-3 h-3" />
                  <span
                    className={`text-xs leading-0 font-semibold uppercase tracking-wider ${isLight ? "text-blue-700" : "text-blue-300"}`}
                  >
                    Location
                  </span>
                </div>
                <div className="mt-2.5">
                  <span
                    className={`text-xs md:text-sm font-bold tracking-tight block ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Kolkata, India
                  </span>
                  <span
                    className={`text-[11px] leading-3 block mt-0.5 ${isLight ? "text-slate-500" : "text-white/60"}`}
                  >
                    Open for Visa Sponsored or Remote Job.
                  </span>
                </div>
              </div>

              {/* Status Card */}
              <div
                className={`border rounded-2xl p-3.5 flex flex-col justify-between shadow-lg relative overflow-hidden group ${
                  isLight
                    ? "bg-linear-to-br from-emerald-50 via-slate-50 to-white border-emerald-200 text-slate-900"
                    : "bg-linear-to-br from-emerald-950/50 via-slate-900/60 to-zinc-950/90 border-emerald-500/20 text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <Zap className="w-3 h-3" />
                  <span
                    className={`text-xs leading-0 font-semibold uppercase tracking-wider ${isLight ? "text-emerald-700" : "text-emerald-300"}`}
                  >
                    Status
                  </span>
                </div>
                <div className="mt-2.5">
                  <span
                    className={`text-xs md:text-sm font-bold tracking-tight block text-emerald-600 dark:text-emerald-400`}
                  >
                    Available for Hire
                  </span>
                  <span
                    className={`text-[11px] leading-3 block mt-0.5 ${isLight ? "text-slate-500" : "text-white/60"}`}
                  >
                    Full-Stack AI Engineer | AI-Native Product/Software Development.
                  </span>
                </div>
              </div>
            </div>

            {/* Email Address Direct Action Card */}
            <div
              className={`border rounded-2xl p-3.5 shadow-xl ${
                isLight
                  ? "bg-linear-to-r from-blue-50 via-indigo-50 to-slate-50 border-slate-200 text-slate-900"
                  : "bg-linear-to-r from-blue-950/40 via-indigo-950/30 to-zinc-900/60 border-white/15 text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div
                    className={`p-2 rounded-xl border shrink-0 ${
                      isLight
                        ? "bg-blue-100 text-blue-600 border-blue-200"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center md:mt-0.75">
                    <span
                      className={`text-[10px] font-semibold leading-none uppercase tracking-wider block ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      Email Me Directly
                    </span>
                    <span
                      className={`text-xs md:text-sm font-bold block truncate select-all ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      {email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={`shrink-0 py-1.5 px-3 active:scale-95 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all cursor-pointer ${
                    isLight
                      ? "bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-300"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                  }`}
                >
                  {copiedEmail ? (
                    <CircleCheckBig className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-1 block ${isLight ? "text-slate-500" : "text-white/40"}`}
              >
                Social Networks
              </span>
              <div className="grid grid-cols-1 gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 border rounded-xl flex items-center justify-between transition-all group cursor-pointer ${
                        isLight
                          ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
                          : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-1.5 rounded-lg group-hover:scale-105 transition-transform ${
                            isLight
                              ? "bg-slate-200 text-slate-800"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold block transition-colors ${
                              isLight
                                ? "text-slate-900 group-hover:text-blue-600"
                                : "text-white group-hover:text-blue-400"
                            }`}
                          >
                            {social.name}
                          </span>
                          <span
                            className={`text-[10px] block ${isLight ? "text-slate-500" : "text-white/50"}`}
                          >
                            {social.handle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isLight
                            ? "text-slate-400 group-hover:text-slate-900"
                            : "text-white/50 group-hover:text-white"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Live Websites & Repositories */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between px-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? "text-slate-500" : "text-white/40"}`}
                >
                  Live Projects & Codebases
                </span>
                <span
                  className={`text-[10px] font-semibold font-mono ${isLight ? "text-blue-600" : "text-blue-400"}`}
                >
                  {PROJECTS_DATA.length} Projects
                </span>
              </div>

              <div className="space-y-2">
                {PROJECTS_DATA.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 border rounded-2xl flex items-center justify-between transition-all group ${
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900"
                        : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 pr-2">
                      <ProjectIcon
                        iconImage={p.iconImage}
                        title={p.title}
                        isLight={isLight}
                      />
                      <div className="min-w-0">
                        <span
                          className={`text-xs font-bold block truncate leading-tight transition-colors ${
                            isLight
                              ? "text-slate-900 group-hover:text-blue-600"
                              : "text-white group-hover:text-blue-400"
                          }`}
                        >
                          {p.title}
                        </span>
                        <span
                          className={`text-[10px] block truncate leading-tight font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                        >
                          {p.url}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <a
                        href={p.demoUrl || p.githubUrl || `https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isLight
                            ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
                            : "bg-white/10 hover:bg-white/20 text-white/90"
                        }`}
                        title="Open External URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          closeNotificationCenter();
                          openApp(`folder-${p.id}`, p.title);
                        }}
                        className={`py-1.5 px-2.5 rounded-lg transition-colors text-[11px] font-semibold flex items-center space-x-1 group/btn cursor-pointer ${
                          isLight
                            ? "bg-blue-100 hover:bg-blue-200 text-blue-700"
                            : "bg-blue-600/30 hover:bg-blue-600/50 text-blue-300"
                        }`}
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
