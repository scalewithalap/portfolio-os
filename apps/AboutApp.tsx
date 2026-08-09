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
import LazyImage from "../components/LazyImage";

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
        {/* Profile Card */}
        <div className="px-3 pt-3 mb-1 md:mb-2">
          <div
            className={`rounded-lg p-2.5 md:p-3 flex items-center space-x-3 cursor-pointer transition-colors border ${
              isLight
                ? "bg-white border-slate-200/80 hover:bg-slate-200/50 text-slate-900 shadow-xs"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
            }`}
          >
            <LazyImage
              src="/images/alap.webp"
              alt="Alap Putatunda"
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full object-cover shrink-0 shadow-xs border object-[center_10%] ${
                isLight ? "border-black/30" : "border-white/30"
              }`}
            />
            <div className="overflow-hidden">
              <div
                className={`text-xs md:text-sm font-semibold truncate ${isLight ? "text-slate-900" : "text-white"}`}
              >
                Alap Putatunda
              </div>
              <div
                className={`text-[11px] md:text-xs truncate ${isLight ? "text-slate-500" : "text-white/60"}`}
              >
                Founding AI Engineer
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List - Horizontal scroll on mobile, vertical list on desktop */}
        <div className="px-3 py-1.5 md:py-0 flex flex-row overflow-x-auto md:flex-col space-x-1 md:space-x-0 md:space-y-0.5 md:mt-2 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 md:w-full flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs md:text-sm transition-colors select-none cursor-pointer ${
                  isActive
                    ? "text-white font-medium"
                    : isLight
                      ? "text-slate-700 hover:bg-slate-200/80"
                      : "text-white/80 hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeAboutSidebarTab"
                    className="absolute inset-0 bg-[#0058d0] rounded-md shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <div
                  className={`relative z-10 w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center shrink-0 ${
                    isActive ? "bg-white/20" : "bg-[#0058d0]"
                  }`}
                >
                  <tab.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                </div>
                <span className="relative z-10 text-xs md:text-sm whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      <div
        className={`flex-1 overflow-y-auto transition-colors duration-200 ${
          isLight ? "bg-white text-slate-900" : "bg-[#1e1e1e]"
        }`}
      >
        <div className="w-full px-4 py-4 md:px-8 md:py-8">
          {activeTab === "general" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div className="flex items-center space-x-4">
                <LazyImage
                  src="/images/alap.webp"
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
                    Entrepreneur | Founding AI Engineer
                    <br />
                    Full-stack AI-native Developer
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
                    India (Open to remote jobs or ready to relocate with visa
                    sponsorship)
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
                    6+ years taking software from empty repo to production
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
                    AI Engineer & Full-Stack AI-Native Developer roles at
                    early-stage startups (≤200 people), remote or relocation
                    with visa sponsorship
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
                  Summary
                </h3>
                <p
                  className={`leading-relaxed text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                >
                  Founding AI Engineer and Full-stack AI-native Developer with
                  6+ years of experience taking software from an empty
                  repository to deployment, monitoring, and ongoing operation.
                  Builds production LLM and multi-agent systems with RAG,
                  semantic search, provider-agnostic model orchestration, voice
                  AI, workflow automation, metered billing, and observability.
                </p>
                <p
                  className={`leading-relaxed text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                >
                  Founded Scale with Alap, co-founded and leads Zero Headache as
                  CEO, and shipped Vibe44 and OpenUI. Uses AI coding agents to
                  accelerate delivery while retaining ownership of architecture,
                  testing, security, and reliability. Selected for Hyperagent's
                  "The Founding 500" ($20,000 in platform credits) in June 2026.
                </p>
              </div>
            </div>
          )}

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
                      Founder & AI Engineer
                    </h3>
                    <span
                      className={`text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      May 2026 – Present
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-blue-600 mt-0.5">
                    Scale with Alap (Personal Brand)
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Founded Scale with Alap to publish technical content and
                      build AI products, including Vibe44, OpenUI, Make Me
                      Sound, Freecom AI, and the Scale with Alap portfolio.
                    </li>
                    <li>
                      Directs AI-assisted engineering workflows across
                      architecture, implementation, testing, review, and CI
                      using Claude Code, Cursor, Codex, and GitHub Copilot.
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
                    Zero Headache (AI-Native Service Company)
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Leads product and engineering for a 24/7 AI lead-capture,
                      qualification, booking, and recovery service across 12
                      voice and messaging channels for high-ticket local
                      businesses.
                    </li>
                    <li>
                      Defined the multi-tenant product direction, industry
                      qualification playbooks, sub-10-second call-answer target,
                      and outcome-based billing around booked appointments and
                      conversations; applied to Y Combinator Fall 2026.
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
                      Co-founder & CTO
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
                      Co-founded a registered Indian pharmaceutical company and
                      led all technology end to end — company website, internal
                      tooling and systems, and digital operations.
                    </li>
                    <li>
                      Holds a non-executive Director and Shareholder position
                      with no active operational role.
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
                      Independent Web & App Developer, and AI Systems Builder
                    </h3>
                    <span
                      className={`text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                    >
                      2019 – 2026
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-blue-600 mt-0.5">
                    Freelancer
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 list-disc list-inside text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    <li>
                      Designed, built, and deployed custom web applications, REST
                      APIs, and automation scripts for small businesses and
                      startup clients using Next.js, Node.js, and Python.
                    </li>
                    <li>
                      Integrated LLM streaming routes, vector search stores,
                      third-party payment gateways (Stripe, Lemonsqueezy), and
                      CRM webhooks.
                    </li>
                    <li>
                      Set up automated CI/CD workflows, unit test suites with
                      Vitest, and error tracking with Sentry.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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
                    Bachelor of Computer Applications coursework
                  </h3>
                  <p
                    className={`mt-0.5 text-xs md:text-sm ${isLight ? "text-slate-600" : "text-white/60"}`}
                  >
                    JIS College of Engineering, Kalyani
                  </p>
                  <div
                    className={`mt-2 text-[11px] md:text-xs font-mono ${isLight ? "text-slate-500" : "text-white/50"}`}
                  >
                    2018 – 2020
                  </div>
                  <p
                    className={`mt-3 pl-3 border-l-2 border-[#0058d0] italic text-xs md:text-sm ${isLight ? "text-slate-700" : "text-white/80"}`}
                  >
                    Left in the second year to build full time.
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
