/**
 * @file apps/MailApp.tsx
 * @description Interactive macOS Mail Client Window Component.
 *
 * Responsibilities:
 * - Renders an inbox list with simulated messages (Welcome email, project inquiries, social links).
 * - Provides an interactive email composer form allowing users to send direct messages to hi@scalewithalap.com via mailto triggers.
 * - Displays social profile links (GitHub, LinkedIn, Twitter/X, YouTube, Instagram) and contact details.
 */

import { useState } from "react";
import {
  MailIcon,
  Paperclip,
  Inbox,
  Github,
  Trash2,
  Linkedin,
  Twitter,
  AtSign,
  Youtube,
  Instagram,
  Facebook,
  ChevronLeft,
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";

const EMAILS = [
  {
    id: "1",
    sender: "Scale with Alap",
    subject: "Full-stack AI Engineer",
    date: "Feb 2025 – Present",
    preview: "Built Vibe44, OpenUI, Make Me Sound, and macOS Portfolio OS...",
    body: `Built and launched Vibe44, a Next.js 16 AI SaaS codebase (~165k lines across 687 files) featuring an MCP server with JSON-RPC 2.0, Universal Adapter Pattern across 4 LLM providers, 5 payment gateways, and a 32-table Postgres RLS schema.\n\nDeveloped OpenUI, an open-source, local-first UI design tool (Next.js 16, React 19, SQLite, Prisma 7, Vercel AI SDK) and Make Me Sound, a parallel multi-stream engine converting drafts into 105 tone variations.\n\nBuilt an open-source macOS-style portfolio with 30+ Zustand state fields, 13 lazy-loaded apps, and 60 FPS GPU-accelerated dock animations.`,
  },
  {
    id: "2",
    sender: "Zero Headache",
    subject: "Co-founder & CEO",
    date: "July 2026 – Present",
    preview:
      "Fully managed AI front desk for service businesses across 12 channels...",
    body: `Built and launched a Next.js 16 and React 19 marketing site with 12 channels, 35+ CRM integrations, interactive ROI calculator, and strict security headers.\n\nEngineered multi-tenant dashboard and sandboxed AI agents per client with persistent memory, OpenRouter multi-model failover, and Supabase RLS isolation.`,
  },
  {
    id: "3",
    sender: "Pharmison Valentes Pharma",
    subject: "Co-founder & Former CTO",
    date: "May 2019 – Present",
    preview: "Scaled pharmaceutical company to Rs.7.5+ Cr revenue...",
    body: `Co-founded a registered Indian pharmaceutical company, scaled it to Rs.7.5+ Cr ($784K+ USD) in total revenue, and managed business operations and a 20+ member team across technology, finance, sales, and supply chain.\n\nLed technology end to end — company website, custom internal tools, supply-chain tracking, and digital operations.\n\nStepped back from day-to-day operations in Feb 2025 to focus full-time on AI engineering and building AI products; currently non-executive Director & Shareholder.`,
  },
];

export default function MailApp() {
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const [mobileShowDetail, setMobileShowDetail] = useState<boolean>(false);
  const selectedEmail = EMAILS.find((e) => e.id === selectedId);
  const { systemTheme } = useEcosystemStore();
  const isLight = systemTheme === "light";

  const handleSelectEmail = (id: string) => {
    setSelectedId(id);
    setMobileShowDetail(true);
  };

  return (
    <div
      className={`flex h-full w-full max-w-full font-sans select-none overflow-hidden transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#1e1e1e] text-white"
      }`}
    >
      {/* Sidebar - Mailboxes (Hidden on mobile < md) */}
      <div
        className={`w-48 border-r hidden md:flex flex-col shrink-0 transition-colors duration-200 ${
          isLight
            ? "bg-slate-100/90 border-slate-200 text-slate-800"
            : "bg-[#1e1e1e]/80 border-white/10 text-white"
        }`}
      >
        <div
          className={`p-3 text-[11px] font-bold px-4 mt-2 tracking-wider uppercase ${
            isLight ? "text-slate-400" : "text-white/50"
          }`}
        >
          Favorites
        </div>
        <div className="px-2 space-y-0.5">
          <div className="flex items-center space-x-2 px-2 py-1.5 bg-[#0058d0] rounded text-[13px] font-medium text-white shadow-sm">
            <Inbox className="w-4 h-4" />
            <span>My Inbox</span>
          </div>
        </div>

        <div
          className={`p-3 text-[11px] font-bold px-4 mt-2 tracking-wider uppercase ${
            isLight ? "text-slate-400" : "text-white/50"
          }`}
        >
          Contact & Social
        </div>
        <div className="px-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none">
          <a
            href="mailto:hi@scalewithalap.com"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <MailIcon className="w-4 h-4 text-blue-500" />
            <span className="truncate">Email Address</span>
          </a>
          <a
            href="https://github.com/scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Github className="w-4 h-4 text-blue-500" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-500" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://x.com/scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Twitter className="w-4 h-4 text-blue-500" />
            <span>X / Twitter</span>
          </a>
          <a
            href="https://www.threads.com/@scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <AtSign className="w-4 h-4 text-blue-500" />
            <span>Threads</span>
          </a>
          <a
            href="https://www.youtube.com/@scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Youtube className="w-4 h-4 text-blue-500" />
            <span>YouTube</span>
          </a>
          <a
            href="https://www.instagram.com/scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Instagram className="w-4 h-4 text-blue-500" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/scalewithalap"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center space-x-2 px-2 py-1.5 rounded text-[13px] font-medium transition-colors ${
              isLight
                ? "text-slate-700 hover:bg-slate-200/70"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Facebook className="w-4 h-4 text-blue-500" />
            <span>Facebook</span>
          </a>
        </div>
      </div>

      {/* Inbox List (On mobile, hidden when detail view is active) */}
      <div
        className={`w-full md:w-72 border-r flex flex-col shrink-0 transition-colors duration-200 ${
          mobileShowDetail ? "hidden md:flex" : "flex"
        } ${
          isLight
            ? "bg-slate-100/60 border-slate-200 text-slate-900"
            : "bg-[#2d2d2d] border-white/10 text-white"
        }`}
      >
        {/* Toolbar */}
        <div
          className={`h-12 border-b flex items-center px-4 shrink-0 justify-between ${
            isLight ? "border-slate-200" : "border-black/40"
          }`}
        >
          <div className="text-[13px] font-bold">Inbox</div>
          <MailIcon
            className={`w-4 h-4 ${
              isLight ? "text-slate-800" : "text-white/80"
            }`}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full pb-24 md:pb-24">
          {EMAILS.map((email) => (
            <button
              key={email.id}
              onClick={() => handleSelectEmail(email.id)}
              className={`w-full text-left px-4 py-3 border-b transition-colors active:scale-[0.99] cursor-pointer ${
                isLight ? "border-slate-200/60" : "border-white/5"
              } ${
                selectedId === email.id
                  ? "bg-[#0058d0] text-white shadow-sm"
                  : isLight
                    ? "hover:bg-slate-200/50"
                    : "hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-baseline mb-0.5">
                <span
                  className={`font-semibold text-[13px] truncate ${
                    selectedId === email.id
                      ? "text-white"
                      : isLight
                        ? "text-slate-900"
                        : "text-white"
                  }`}
                >
                  {email.sender}
                </span>
                <span
                  className={`text-[11px] shrink-0 ml-2 ${
                    selectedId === email.id
                      ? "text-blue-200"
                      : isLight
                        ? "text-slate-500"
                        : "text-white/50"
                  }`}
                >
                  {email.date.split("-")[0].trim()}
                </span>
              </div>
              <div
                className={`text-[12px] font-medium truncate mb-1 ${
                  selectedId === email.id
                    ? "text-blue-100"
                    : isLight
                      ? "text-slate-700"
                      : "text-white/80"
                }`}
              >
                {email.subject}
              </div>
              <div
                className={`text-[12px] leading-tight line-clamp-2 ${
                  selectedId === email.id
                    ? "text-blue-200/90"
                    : isLight
                      ? "text-slate-500"
                      : "text-white/50"
                }`}
              >
                {email.preview}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Pane (On mobile, visible when detail view is active) */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden max-w-full flex-col relative transition-colors duration-200 ${
          mobileShowDetail ? "flex" : "hidden md:flex"
        } ${isLight ? "bg-white text-slate-900" : "bg-[#1e1e1e] text-white"}`}
      >
        {/* Top toolbar */}
        <div
          className={`h-12 border-b flex items-center px-4 shrink-0 justify-between space-x-2 absolute top-0 w-full z-10 transition-colors ${
            isLight
              ? "bg-slate-100/90 border-slate-200"
              : "bg-[#2d2d2d] border-black/40"
          }`}
        >
          {/* Mobile Back Button */}
          <button
            onClick={() => setMobileShowDetail(false)}
            className="md:hidden flex items-center space-x-1 text-sm font-semibold text-blue-500 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Inbox</span>
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <Paperclip
              className={`w-4 h-4 ${
                isLight ? "text-slate-800" : "text-white/80"
              }`}
            />
            <Trash2
              className={`w-4 h-4 ${
                isLight ? "text-slate-800" : "text-white/80"
              }`}
            />
          </div>
        </div>

        <div className="pt-12 flex-1 pb-24 md:pb-24">
          {selectedEmail ? (
            <div className="animate-in fade-in duration-300">
              {/* Email Header */}
              <div
                className={`p-4 sm:p-6 border-b ${isLight ? "border-slate-200" : "border-white/10"}`}
              >
                <h2
                  className={`text-lg sm:text-xl font-bold mb-3 tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  {selectedEmail.subject}
                </h2>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold mr-2.5 shadow-sm text-xs sm:text-sm shrink-0 ${
                        isLight
                          ? "bg-slate-200 border border-slate-300 text-slate-800"
                          : "bg-linear-to-br from-zinc-600 to-zinc-800 border border-white/10 text-white"
                      }`}
                    >
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-xs sm:text-[13px] truncate ${isLight ? "text-slate-900" : "text-white"}`}
                      >
                        {selectedEmail.sender}
                      </div>
                      <div
                        className={`text-[11px] sm:text-[12px] ${isLight ? "text-slate-500" : "text-white/50"}`}
                      >
                        To: Scale with Alap
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[11px] sm:text-[12px] shrink-0 ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    {selectedEmail.date}
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div
                className={`p-4 sm:p-6 text-xs sm:text-[14px] leading-relaxed w-full whitespace-pre-wrap font-sans ${
                  isLight ? "text-slate-800" : "text-white/80"
                }`}
              >
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div
              className={`flex-1 h-full flex flex-col items-center justify-center p-6 ${
                isLight ? "text-slate-400" : "text-white/30"
              }`}
            >
              <MailIcon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 opacity-30" />
              <p className="text-xs sm:text-[13px] font-medium">
                No Message Selected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
