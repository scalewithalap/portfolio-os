import React, { useState } from "react";
import { Image as ImageIcon, ExternalLink, X, Maximize2 } from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import LazyImage from "../components/LazyImage";

export interface ScreenshotPhoto {
  id: string;
  title: string;
  url: string;
  details: string;
  appId?: string;
  appTitle?: string;
  badge?: string;
}

export const SCREENSHOT_PHOTOS: ScreenshotPhoto[] = [
  {
    id: "scalewithalap-dark",
    title: "Scale with Alap (Portfolio OS - Dark)",
    url: "/images/screenshots/scalewithalap-dark.webp",
    details:
      "Interactive macOS & iOS web operating system built with React 19, Vite, Tailwind v4, Zustand & Immer state management, and Web Audio API synthesis.",
    appId: "folder-scalewithalap",
    appTitle: "Scale with Alap",
    badge: "Shipped & Live",
  },
  {
    id: "scalewithalap-light",
    title: "Scale with Alap (Portfolio OS - Light)",
    url: "/images/screenshots/scalewithalap-light.webp",
    details:
      "macOS Light theme desktop UI recreating window geometry management, dock cosine magnification, and responsive touch routing.",
    appId: "folder-scalewithalap",
    appTitle: "Scale with Alap",
    badge: "Shipped & Live",
  },
  {
    id: "vibe44-dark",
    title: "Vibe44 Marketing & MCP Server",
    url: "/images/screenshots/vibe44-dark.webp",
    details:
      "Serverless Model Context Protocol (MCP) server implementing JSON-RPC 2.0 with 6 tools, 4 resource templates, Creem payments & Notion sync.",
    appId: "folder-vibe44",
    appTitle: "Vibe44 Marketing Website",
    badge: "Shipped & Live",
  },
  {
    id: "vibe44-light",
    title: "Vibe44 Landing Page (Light)",
    url: "/images/screenshots/vibe44-light.webp",
    details:
      "Light mode product landing page showcasing Next.js 16 starter kit features, live demo links, and webhook automation.",
    appId: "folder-vibe44",
    appTitle: "Vibe44 Marketing Website",
    badge: "Shipped & Live",
  },
  {
    id: "vibe44-demo-dark",
    title: "Vibe44 Starter Kit Engine (Dark)",
    url: "/images/screenshots/vibe44-demo-dark.webp",
    details:
      "A 687-file Next.js 16 engine featuring Universal Adapter Pattern for 4 LLM providers, 5 payment gateways, and 32 Postgres tables.",
    appId: "folder-vibe44-demo",
    appTitle: "Vibe44 Next.js Starter Kit Demo",
    badge: "Shipped & Live",
  },
  {
    id: "vibe44-demo-light",
    title: "Vibe44 Starter Kit Engine (Light)",
    url: "/images/screenshots/vibe44-demo-light.webp",
    details:
      "Full SaaS management console with multi-tenant auth, Supabase RLS policies, Drizzle ORM, Trigger.dev jobs, and 900+ unit tests.",
    appId: "folder-vibe44-demo",
    appTitle: "Vibe44 Next.js Starter Kit Demo",
    badge: "Shipped & Live",
  },
  {
    id: "zeroheadache",
    title: "Zero Headache Marketing",
    url: "/images/screenshots/zeroheadache.webp",
    details:
      "24/7 AI lead capture, qualification, and voice booking platform answering inbound calls across 12 channels in under 10 seconds.",
    appId: "folder-zeroheadache",
    appTitle: "Zero Headache Marketing",
    badge: "Shipped & Live",
  },
  {
    id: "zeroheadache-app",
    title: "Zero Headache Platform",
    url: "/images/screenshots/zeroheadache-app.webp",
    details:
      "Multi-tenant AI voice call dispatch and real-time audio streaming engine with PostHog and Langfuse telemetry.",
    appId: "folder-zeroheadache-app",
    appTitle: "Zero Headache Platform",
    badge: "Under Active Development",
  },
  {
    id: "openui-dark",
    title: "OpenUI Generator (Dark)",
    url: "/images/screenshots/openui-dark.webp",
    details:
      "MIT-licensed local-first UI generator running component synthesis across local LLMs (Ollama) and cloud models.",
    appId: "folder-openui",
    appTitle: "OpenUI",
    badge: "Shipped & Live",
  },
  {
    id: "openui-light",
    title: "OpenUI Generator (Light)",
    url: "/images/screenshots/openui-light.webp",
    details:
      "React 19 & Next.js 16 component generator with Prisma 7, SQLite local database, and real-time live code preview.",
    appId: "folder-openui",
    appTitle: "OpenUI",
    badge: "Shipped & Live",
  },
  {
    id: "makemesound-dark",
    title: "Make Me Sound Copilot (Dark)",
    url: "/images/screenshots/makemesound-dark.webp",
    details:
      "AI communication copilot converting text drafts into 105 tone variations across 15 categories with parallel multi-stream execution.",
    appId: "folder-makemesound",
    appTitle: "Make Me Sound",
    badge: "Under Active Development",
  },
  {
    id: "makemesound-light",
    title: "Make Me Sound Copilot (Light)",
    url: "/images/screenshots/makemesound-light.webp",
    details:
      "Light theme writing copilot powered by Vercel AI SDK, OpenRouter, and Upstash Redis rate limiting.",
    appId: "folder-makemesound",
    appTitle: "Make Me Sound",
    badge: "Under Active Development",
  },
  {
    id: "hyperagent-founding-500",
    title: "Hyperagent 'The Founding 500' Award",
    url: "/images/screenshots/hyperagent-founding-500.webp",
    details:
      "Selected for Hyperagent's 'The Founding 500' cohort in June 2026, recipient of $20,000 in AI credits for AI engineering work.",
    appId: "about",
    appTitle: "About Alap",
    badge: "Received $20k Credits",
  },
  {
    id: "freecom-ai",
    title: "Freecom AI Digital Download Store",
    url: "/images/screenshots/freecom-ai.webp",
    details:
      "Open-source digital download platform featuring automated recommendation agents, Trigger.dev v4, and Store Manager Agent.",
    appId: "folder-freecom",
    appTitle: "Freecom AI Store",
    badge: "Under Development",
  },
  {
    id: "soothly-ai",
    title: "Soothly AI Revenue System",
    url: "/images/screenshots/soothly-ai.webp",
    details:
      "Autonomous 8-agent revenue platform coordinated by a Superagent meta-orchestrator with Inngest durable workflow functions.",
    appId: "folder-soothly",
    appTitle: "Soothly AI Revenue Platform",
    badge: "Under Development",
  },
];

export default function PhotosApp() {
  const { systemTheme, openApp } = useEcosystemStore();
  const isLight = systemTheme === "light";

  const [selectedPhoto, setSelectedPhoto] = useState<ScreenshotPhoto | null>(
    null,
  );

  const handleOpenCaseStudy = (photo: ScreenshotPhoto) => {
    if (photo.appId) {
      openApp(photo.appId, photo.appTitle || photo.title);
      setSelectedPhoto(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full font-sans select-none overflow-hidden transition-colors duration-200 ${
        isLight ? "bg-slate-100 text-slate-900" : "bg-[#18181c] text-white"
      }`}
    >
      {/* App Header */}
      <div
        className={`px-6 py-4 border-b shrink-0 flex items-center justify-between gap-4 backdrop-blur-xl ${
          isLight
            ? "bg-white/80 border-slate-200"
            : "bg-black/30 border-white/10"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-rose-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1
                className={`text-lg font-bold tracking-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Photos Gallery
              </h1>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isLight
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}
              >
                {SCREENSHOT_PHOTOS.length} Photos
              </span>
            </div>
            <p
              className={`text-xs ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              Screenshots & visuals from my projects
            </p>
          </div>
        </div>
      </div>

      {/* Main Screenshots Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCREENSHOT_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5 ${
                isLight
                  ? "bg-white border-slate-200 hover:shadow-2xl hover:border-blue-400"
                  : "bg-zinc-900/90 border-white/10 hover:shadow-2xl hover:border-blue-500/40"
              }`}
            >
              {/* Lazy Image Container */}
              <div className="relative overflow-hidden bg-black/40">
                {photo.badge && (
                  <div className="absolute top-3 right-3 z-30 pointer-events-none">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-lg backdrop-blur-md ${
                        photo.badge === "Shipped & Live"
                          ? isLight
                            ? "bg-emerald-600/90 text-white border-emerald-400/40 shadow-emerald-950/20"
                            : "bg-emerald-500/90 text-white border-emerald-400/40 shadow-black/40"
                          : photo.badge?.includes("Development")
                            ? isLight
                              ? "bg-amber-600/90 text-white border-amber-400/40 shadow-amber-950/20"
                              : "bg-amber-500/90 text-white border-amber-400/40 shadow-black/40"
                            : isLight
                              ? "bg-purple-600/90 text-white border-purple-400/40 shadow-purple-950/20"
                              : "bg-purple-500/90 text-white border-purple-400/40 shadow-black/40"
                      }`}
                    >
                      {photo.badge}
                    </span>
                  </div>
                )}

                <LazyImage
                  src={photo.url}
                  alt={photo.title}
                  containerClassName="w-full h-auto min-h-48"
                  className="w-full border-b border-slate-300 h-auto object-contain object-top duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end pointer-events-none">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start text-white min-w-0 flex-1">
                      <span className="text-sm md:text-base font-bold leading-snug">
                        {photo.title}
                      </span>
                      <p className="text-xs text-white/80 line-clamp-2 leading-snug mt-0.5">
                        {photo.details}
                      </p>
                    </div>
                    <Maximize2 className="w-5 h-5 text-blue-400 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex flex-col pr-2">
                  <h3
                    className={`text-sm md:text-base font-bold leading-none truncate ${
                      isLight ? "text-slate-800" : "text-white"
                    }`}
                  >
                    {photo.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenCaseStudy(photo);
                  }}
                  className={`leading-none text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors shrink-0 flex items-center space-x-1 cursor-pointer ${
                    isLight
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                      : "bg-blue-500/20 text-blue-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <span>Open App</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border flex flex-col max-h-[90vh] animate-scaleUp ${
              isLight
                ? "bg-white border-slate-200 text-slate-900"
                : "bg-zinc-900 border-white/20 text-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
                isLight
                  ? "bg-slate-50 border-slate-200"
                  : "bg-black/40 border-white/10"
              }`}
            >
              <h2 className="text-sm sm:text-base font-bold truncate pr-4">
                {selectedPhoto.title}
              </h2>
              <button
                onClick={() => setSelectedPhoto(null)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isLight
                    ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Screenshot Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-black/90 flex items-center justify-center min-h-75">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Details Footer */}
            <div
              className={`p-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 ${
                isLight
                  ? "bg-slate-50 border-slate-200"
                  : "bg-black/40 border-white/10"
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <h3 className="text-sm font-bold">{selectedPhoto.title}</h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isLight ? "text-slate-600" : "text-white/70"
                  }`}
                >
                  {selectedPhoto.details}
                </p>
              </div>

              {selectedPhoto.appId && (
                <button
                  onClick={() => handleOpenCaseStudy(selectedPhoto)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/25 shrink-0 cursor-pointer"
                >
                  <span>Open Full Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
