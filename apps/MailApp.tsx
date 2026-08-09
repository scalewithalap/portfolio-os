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
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";

const EMAILS = [
  {
    id: "1",
    sender: "Scale with Alap",
    subject: "Founder & AI Engineer",
    date: "May 2026 – Present",
    preview:
      "Founded Scale with Alap to publish technical content and build AI products...",
    body: `Founded Scale with Alap to publish technical content and build AI products, including Vibe44, OpenUI, Make Me Sound, Freecom AI, and the Scale with Alap portfolio.\n\nDirects AI-assisted engineering workflows across architecture, implementation, testing, review, and CI using Claude Code, Cursor, Codex, and GitHub Copilot.`,
  },
  {
    id: "2",
    sender: "Zero Headache",
    subject: "Co-founder & CEO",
    date: "July 2026 – Present",
    preview:
      "Leads product and engineering for a 24/7 AI lead-capture service...",
    body: `Leads product and engineering for a 24/7 AI lead-capture, qualification, booking, and recovery service across 12 voice and messaging channels for high-ticket local service businesses.\n\nDefined the multi-tenant product direction, industry qualification playbooks, sub-10-second call-answer target, and outcome-based billing around booked appointments and conversations. Applied to Y Combinator Fall 2026.`,
  },
  {
    id: "3",
    sender: "Pharmison Valentes Pharma",
    subject: "Co-founder & CTO",
    date: "May 2019 – Present",
    preview: "Co-founded a registered Indian pharmaceutical company...",
    body: `Co-founded a registered Indian pharmaceutical company and led all technology end to end — company website, internal tooling and systems, and digital operations.\n\nNow holds a non-executive Director & Shareholder position with no active operational role.`,
  },
  {
    id: "4",
    sender: "Freelance Clients",
    subject: "Full-Stack AI & Software Engineer",
    date: "2019 – 2026",
    preview: "Designed, built, and deployed custom web applications...",
    body: `Designed, built, and deployed custom web applications, REST APIs, and automation scripts for small businesses and startup clients using Next.js, Node.js, and Python.\n\nIntegrated LLM streaming routes, vector search stores, third-party payment gateways (Stripe, Lemonsqueezy), and CRM webhooks.\n\nSet up automated CI/CD workflows, automated unit test suites with Vitest, and error tracking with Sentry.`,
  },
];

export default function MailApp() {
  const [selectedId, setSelectedId] = useState("1");
  const selectedEmail = EMAILS.find((e) => e.id === selectedId);
  const { systemTheme } = useEcosystemStore();
  const isLight = systemTheme === "light";

  return (
    <div
      className={`flex h-full w-full font-sans transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#1e1e1e] text-white"
      }`}
    >
      {/* Sidebar - Mailboxes */}
      <div
        className={`w-48 border-r flex flex-col shrink-0 transition-colors duration-200 ${
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

      {/* Inbox List */}
      <div
        className={`w-72 border-r flex flex-col shrink-0 transition-colors duration-200 ${
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

        <div className="flex-1 overflow-y-auto">
          {EMAILS.map((email) => (
            <button
              key={email.id}
              onClick={() => setSelectedId(email.id)}
              className={`w-full text-left px-4 py-3 border-b transition-colors ${
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

      {/* Main Content Pane */}
      <div
        className={`flex-1 overflow-y-auto flex flex-col relative transition-colors duration-200 ${
          isLight ? "bg-white text-slate-900" : "bg-[#1e1e1e] text-white"
        }`}
      >
        {/* Top toolbar spacer */}
        <div
          className={`h-12 border-b flex items-center px-4 shrink-0 justify-end space-x-4 absolute top-0 w-full z-10 transition-colors ${
            isLight
              ? "bg-slate-100/90 border-slate-200"
              : "bg-[#2d2d2d] border-black/40"
          }`}
        >
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

        <div className="pt-12 flex-1">
          {selectedEmail ? (
            <div className="animate-in fade-in duration-300">
              {/* Email Header */}
              <div
                className={`p-6 border-b ${isLight ? "border-slate-200" : "border-white/10"}`}
              >
                <h2
                  className={`text-xl font-bold mb-4 tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  {selectedEmail.subject}
                </h2>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold mr-3 shadow-sm text-sm ${
                        isLight
                          ? "bg-slate-200 border border-slate-300 text-slate-800"
                          : "bg-linear-to-br from-zinc-600 to-zinc-800 border border-white/10 text-white"
                      }`}
                    >
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <div
                        className={`font-semibold text-[13px] ${isLight ? "text-slate-900" : "text-white"}`}
                      >
                        {selectedEmail.sender}
                      </div>
                      <div
                        className={`text-[12px] ${isLight ? "text-slate-500" : "text-white/50"}`}
                      >
                        To: Scale with Alap
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[12px] ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    {selectedEmail.date}
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div
                className={`p-6 text-[14px] leading-relaxed w-full whitespace-pre-wrap font-sans ${
                  isLight ? "text-slate-800" : "text-white/80"
                }`}
              >
                {selectedEmail.body}
              </div>
            </div>
          ) : (
            <div
              className={`flex-1 h-full flex flex-col items-center justify-center ${
                isLight ? "text-slate-400" : "text-white/30"
              }`}
            >
              <MailIcon className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-[13px] font-medium">No Message Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
