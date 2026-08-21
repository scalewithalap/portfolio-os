/**
 * @file apps/AboutApp.tsx
 * @description About Me System Window Component for Alap Putatunda.
 *
 * Responsibilities:
 * - Displays developer biography, core technical skills, work experience history, education, and honors/awards.
 * - Provides tabbed sub-navigation (General, Experience, Education, Recognition) with smooth motion transitions.
 * - Allows quick-copy functionality for contact email and social profiles with toast alerts.
 */

import {
  User,
  GraduationCap,
  Award,
  Copy,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import LazyImage from "../components/common/LazyImage";

const TABS = [
  { id: "general", icon: User, label: "General" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "recognition", icon: Award, label: "Recognition" },
];

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState("general");
  const { systemTheme, showToast } = useEcosystemStore();
  const isLight = systemTheme === "light";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hi@scalewithalap.com");
    showToast("Copied email address: hi@scalewithalap.com", "copy");
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-full w-full font-sans transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#1e1e1e] text-white"
      }`}
    >
      {/* Sidebar - Settings style */}
      <div
        className={`w-full md:w-60 border-b md:border-b-0 md:border-r flex flex-col transition-colors duration-200 shrink-0 ${
          isLight
            ? "bg-slate-100/90 border-slate-200 text-slate-800"
            : "bg-[#1e1e1e]/80 border-white/10 text-white"
        }`}
      >
        {/* Navigation List - Horizontal scroll on mobile, vertical list on desktop */}
        <div className="px-3 py-2 md:py-0 flex flex-row overflow-x-auto md:flex-col space-x-1.5 md:space-x-0 md:space-y-0.5 md:mt-2 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 md:w-full flex items-center justify-center md:justify-start px-3.5 py-1.5 rounded-lg md:rounded-md text-xs md:text-sm transition-all select-none cursor-pointer active:scale-95 md:active:scale-100 ${
                  isActive
                    ? "text-white font-medium"
                    : isLight
                      ? "bg-slate-200/70 hover:bg-slate-200 text-slate-700 md:bg-transparent md:hover:bg-slate-200/80"
                      : "bg-zinc-800/70 hover:bg-zinc-800 border border-white/10 text-white/80 md:bg-transparent md:border-transparent md:hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeAboutSidebarTab"
                    className="absolute inset-0 bg-[#0058d0] rounded-lg md:rounded-md shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <div
                  className={`relative z-10 flex items-center justify-center shrink-0 md:w-6 md:h-6 md:rounded ${
                    isActive ? "md:bg-white/20" : "md:bg-[#0058d0]"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 md:w-3.5 md:h-3.5 mr-1 md:mr-0 ${
                      isActive
                        ? "text-white"
                        : isLight
                          ? "text-blue-600 md:text-white"
                          : "text-blue-400 md:text-white"
                    }`}
                  />
                </div>
                <span className="md:ml-2.5 ml-0 relative z-10 text-xs md:text-sm whitespace-nowrap leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden max-w-full transition-colors duration-200 ${
          isLight ? "bg-white text-slate-900" : "bg-[#1e1e1e]"
        }`}
      >
        <div className="w-full px-3.5 py-4 sm:px-6 md:px-8 md:py-8 pb-24 md:pb-24">
          {/* General Tab Content */}
          {activeTab === "general" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div className="flex items-center space-x-4">
                <LazyImage
                  src="/images/alap-putatunda.webp"
                  alt="Alap Putatunda"
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md border shrink-0 object-[center_10%] ${
                    isLight ? "border-black/30" : "border-white/30"
                  }`}
                />
                <div>
                  <h1
                    className={`text-lg md:text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Alap Putatunda
                  </h1>
                  <p
                    className={`text-xs md:text-sm leading-tight font-medium ${isLight ? "text-slate-600" : "text-white/70"}`}
                  >
                    Full-Stack AI Engineer
                    <br />
                    AI-Native Product/Software Development
                  </p>
                </div>
              </div>

              <div
                className={`rounded-xl border overflow-hidden text-xs md:text-sm transition-colors ${
                  isLight
                    ? "bg-slate-50/80 border-slate-200"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div
                  className={`flex flex-col sm:flex-row border-b px-4 py-3 gap-1 sm:gap-0 ${isLight ? "border-slate-200" : "border-white/10"}`}
                >
                  <span
                    className={`w-full sm:w-32 font-medium shrink-0 ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    Location
                  </span>
                  <span className={isLight ? "text-slate-800" : "text-white"}>
                    Remote worldwide from India | Ready to relocate with visa sponsorship
                  </span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row border-b px-4 py-3 gap-1 sm:gap-0 ${isLight ? "border-slate-200" : "border-white/10"}`}
                >
                  <span
                    className={`w-full sm:w-32 font-medium shrink-0 ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    Experience
                  </span>
                  <span className={isLight ? "text-slate-800" : "text-white"}>
                    6+ years leading pharma tech/ops (Rs.7.5+ Cr revenue, 20+ team) & full-stack AI engineering
                  </span>
                </div>
                <div
                  className={`flex flex-col sm:flex-row border-b px-4 py-3 gap-1 sm:gap-0 items-start sm:items-center ${isLight ? "border-slate-200" : "border-white/10"}`}
                >
                  <span
                    className={`w-full sm:w-32 font-medium shrink-0 ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    Open to Work
                  </span>
                  <span
                    className={`font-semibold ${isLight ? "text-emerald-700" : "text-emerald-400"}`}
                  >
                    AI Engineer & Full-Stack AI Developer roles at AI startups (Remote or relocation with visa sponsorship)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row px-4 py-3 gap-1 sm:gap-0 items-start sm:items-center">
                  <span
                    className={`w-full sm:w-32 font-medium shrink-0 ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    Email me
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-blue-400 font-semibold hover:underline flex items-center space-x-1.5 cursor-pointer text-xs md:text-sm"
                  >
                    <span>hi@scalewithalap.com</span>
                    <Copy className="w-3.5 h-3.5 opacity-70" />
                  </button>
                </div>
              </div>

              <div
                className={`rounded-xl border overflow-hidden text-xs md:text-sm p-5 transition-colors space-y-3 ${
                  isLight
                    ? "bg-slate-50/80 border-slate-200"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <h3
                  className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Executive Summary
                </h3>
                <p
                  className={`leading-relaxed text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                >
                  Technical founder who spent 6+ years building and scaling a pharmaceutical company from the ground up, managing complete technology, business operations, and a 20+ member team to Rs.7.5+ Cr (~$784K USD) in total revenue. Began building AI products part-time in 2024, stepped back from day-to-day operations in Feb 2025 to pursue full-time AI engineering while remaining a non-executive Director & Shareholder, and founded Zero Headache to build autonomous AI systems.
                </p>
                <p
                  className={`leading-relaxed text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                >
                  Specializes in building AI-native SaaS and Agentic SaaS (AaaS) products from scratch — multi-agent systems, automations, AI agents, MCP servers, RAG with vector search, semantic search, AI IDEs and coding agents, payment gateway integrations, and production full-stack engineering with modern web frameworks.
                </p>
              </div>
            </div>
          )}

          {/* Experience Tab Content */}
          {activeTab === "experience" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <h1
                className={`text-xl md:text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
              >
                Experience
              </h1>

              <div className="space-y-4">
                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      Full-stack AI Engineer
                    </h3>
                    <span
                      className={`text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      Feb 2025 – Present
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-blue-600 mt-0.5">
                    Scale with Alap (Portfolio & Personal Brand)
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Built and launched Vibe44, a Next.js 16 AI SaaS codebase (~165k lines across 687 files) featuring an MCP server with JSON-RPC 2.0, Universal Adapter Pattern across 4 LLM providers, 5 payment gateways, and a 32-table Postgres RLS schema.
                    </li>
                    <li>
                      Developed OpenUI, an open-source, local-first UI design tool (Next.js 16, React 19, SQLite, Prisma 7, Vercel AI SDK) and Make Me Sound, a parallel multi-stream engine converting drafts into 105 tone variations.
                    </li>
                    <li>
                      Built an open-source macOS-style portfolio with 30+ Zustand state fields, 13 lazy-loaded apps, and 60 FPS GPU-accelerated dock animations.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      Co-founder & CEO
                    </h3>
                    <span
                      className={`text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      July 2026 – Present
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-blue-600 mt-0.5">
                    Zero Headache (AI-native Front Desk Service)
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Built and launched a Next.js 16 and React 19 marketing site with 12 channels, 35+ CRM integrations, interactive ROI calculator, and strict security headers.
                    </li>
                    <li>
                      Engineered multi-tenant dashboard and sandboxed AI agents per client with persistent memory, OpenRouter multi-model failover, and Supabase RLS isolation.
                    </li>
                  </ul>
                </div>

                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      Co-founder & Former CTO
                    </h3>
                    <span
                      className={`text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      May 2019 – Present
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-blue-600 mt-0.5">
                    Pharmison Valentes Pharma Pvt. Ltd. (Pharmaceutical)
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Co-founded a registered Indian pharmaceutical company, scaled it to Rs.7.5+ Cr (~$784K USD) in total revenue, and managed business operations and a 20+ member team across technology, finance, sales, and supply chain.
                    </li>
                    <li>
                      Led technology end to end — company website, custom internal tools, supply-chain tracking, and digital operations.
                    </li>
                    <li>
                      Stepped back from day-to-day operations in Feb 2025 to focus full-time on AI engineering and building AI products; currently non-executive Director & Shareholder.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab Content */}
          {activeTab === "education" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <h1
                className={`text-xl md:text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
              >
                Education
              </h1>

              <div className="space-y-4">
                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Bachelor of Computer Applications (BCA) coursework
                  </h3>
                  <p
                    className={`mt-0.5 text-xs md:text-sm ${isLight ? "text-slate-600" : "text-white/60"}`}
                  >
                    JIS College of Engineering, Kalyani
                  </p>
                  <div
                    className={`mt-2 text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    Enrolled 2018, left in 2020 during 2nd year to focus full-time on building products and running the business
                  </div>
                  <p
                    className={`mt-3 pl-3 border-l-2 border-[#0058d0] italic text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    Left in the second year to focus full-time on building products and running the business.
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Higher Secondary Examination, Science
                  </h3>
                  <p
                    className={`mt-0.5 text-xs md:text-sm ${isLight ? "text-slate-600" : "text-white/60"}`}
                  >
                    Krishnagar Collegiate School
                  </p>
                  <div className="flex space-x-3 mt-2 text-[11px] md:text-xs font-mono">
                    <span
                      className={isLight ? "text-slate-500" : "text-white/50"}
                    >
                      2018
                    </span>
                    <span
                      className={`font-semibold ${isLight ? "text-slate-800" : "text-white"}`}
                    >
                      77.40%
                    </span>
                  </div>
                </div>

                <div
                  className={`rounded-xl border p-5 text-xs md:text-sm transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                  >
                    Secondary Examination
                  </h3>
                  <p
                    className={`mt-0.5 text-xs md:text-sm ${isLight ? "text-slate-600" : "text-white/60"}`}
                  >
                    Krishnagar Collegiate School
                  </p>
                  <div className="flex space-x-3 mt-2 text-[11px] md:text-xs font-mono">
                    <span
                      className={isLight ? "text-slate-500" : "text-white/50"}
                    >
                      2016
                    </span>
                    <span
                      className={`font-semibold ${isLight ? "text-slate-800" : "text-white"}`}
                    >
                      89.43%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "recognition" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <h1
                className={`text-xl md:text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
              >
                Recognition
              </h1>

              <div
                className={`rounded-xl border p-6 text-xs md:text-sm relative overflow-hidden transition-colors ${
                  isLight
                    ? "bg-linear-to-b from-blue-500/10 to-transparent border-blue-200 text-slate-900"
                    : "bg-linear-to-b from-[#0058d0]/20 to-transparent border-[#0058d0]/30 text-white"
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award size={100} />
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#0058d0] flex items-center justify-center mb-4 shadow-md">
                  <Award className="text-white w-5 h-5" />
                </div>
                <h3
                  className={`text-base md:text-lg font-bold mb-2 relative z-10 ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  "The Founding 500" by Hyperagent (by Airtable)
                </h3>
                <p
                  className={`leading-relaxed text-xs md:text-sm mb-4 relative z-10 ${isLight ? "text-slate-700" : "text-white/80"}`}
                >
                  Selected as one of the Founding 500 on 2 June 2026 by
                  Hyperagent (by Airtable) and awarded US$20,000 in platform
                  credits.
                </p>
                <div className="my-4 relative z-10">
                  <a
                    href="https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group overflow-hidden rounded-xl border border-white/10 hover:border-blue-500/40 transition-all shadow-md w-full"
                  >
                    <LazyImage
                      src="/images/screenshots/hyperagent-founding-500.webp"
                      alt="The Founding 500 Hyperagent Credential"
                      className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                  </a>
                </div>
                <a
                  href="https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-1.5 font-semibold text-xs md:text-sm relative z-10 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    isLight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white/10 text-blue-300 hover:text-blue-200"
                  }`}
                >
                  <span>Learn more</span>
                  <ExternalLink className="w-3.25 h-3.25" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
