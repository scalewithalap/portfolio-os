/**
 * @file apps/ResumeApp.tsx
 * @description Interactive Resume & Curriculum Vitae Viewer Window Component.
 *
 * Responsibilities:
 * - Renders Alap Putatunda's full interactive resume document matching PDF design standards.
 * - Displays executive summary, core engineering competencies, detailed work experience history, key achievements, and education.
 * - Provides action buttons for downloading the official PDF resume file and initiating contact.
 */

import {
  Download,
  ExternalLink,
  Sparkles,
  Briefcase,
  Award,
  Mail,
  MapPin,
  Globe,
  GraduationCap,
  Code2,
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { LazyImage } from "../components/common/LazyImage";

export default function ResumeApp() {
  const { systemTheme, showToast } = useEcosystemStore();
  const isLight = systemTheme === "light";

  const handleDownloadToast = () => {
    showToast("Downloading Alap's Resume.pdf...", "info");
  };

  return (
    <div
      className={`flex flex-col h-full w-full max-w-full font-sans select-none overflow-hidden transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#18181b]"
      }`}
    >
      {/* Top Controls Bar */}
      <div
        className={`h-11 sm:h-12 border-b px-3 sm:px-4 flex items-center justify-between gap-2 shrink-0 transition-colors ${
          isLight
            ? "bg-slate-100 border-slate-200 text-slate-800"
            : "bg-[#27272a] border-white/10 text-white"
        }`}
      >
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0 flex-1">
          <img
            src="/icons/pdf.webp"
            alt="PDF"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="min-w-0 flex-1">
            <span
              className={`text-xs sm:text-[13px] font-semibold block leading-tight truncate ${isLight ? "text-slate-900" : "text-white"}`}
            >
              Alap Putatunda's Resume
            </span>
            <span
              className={`text-[9px] sm:text-[10px] block leading-none truncate ${isLight ? "text-slate-700" : "text-white/70"}`}
            >
              Official Resume
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <a
            href="/alap_resume.pdf"
            download="Alap's Resume"
            onClick={handleDownloadToast}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-semibold rounded-lg flex items-center space-x-1 sm:space-x-1.5 shadow-md shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Document Content */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden max-w-full p-2.5 sm:p-5 md:p-6 pb-24 md:pb-24 font-sans transition-colors duration-200 scrollbar-none ${
          isLight ? "bg-slate-100/60" : "bg-[#09090b]"
        }`}
      >
        <div
          className={`w-full max-w-full border rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-8 shadow-2xl space-y-6 sm:space-y-8 transition-colors ${
            isLight
              ? "bg-white border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-[#18181b] border-white/10 text-white"
          }`}
        >
          {/* Resume Document Header */}
          <div
            className={`border-b pb-4 sm:pb-6 text-left ${isLight ? "border-slate-200" : "border-white/10"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight wrap-break-word ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  ALAP PUTATUNDA
                </h1>
                <p
                  className={`font-bold text-sm sm:text-base md:text-lg mt-0.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  FULL-STACK AI ENGINEER | AI-NATIVE PRODUCT/SOFTWARE
                  DEVELOPMENT
                </p>
                <p
                  className={`flex items-start sm:items-center text-xs sm:text-sm md:text-base mt-1.5 leading-relaxed ${isLight ? "text-slate-800" : "text-white/80"}`}
                >
                  <MapPin
                    className={`mr-1.5 w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"} shrink-0 mt-0.5 sm:mt-0`}
                  />
                  <span>
                    Remote worldwide from India | Ready to relocate with visa
                    sponsorship
                  </span>
                </p>
                <div
                  className={`flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5 text-xs sm:text-sm ${
                    isLight ? "text-slate-800" : "text-white/80"
                  }`}
                >
                  <a
                    href="mailto:hi@scalewithalap.com"
                    className={`flex items-center space-x-1 px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    <Mail
                      className={`w-3 h-3 ${isLight ? "text-blue-800" : "text-blue-400"} shrink-0`}
                    />
                    <span>hi@scalewithalap.com</span>
                  </a>
                  <a
                    href="https://scalewithalap.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    scalewithalap.com
                  </a>
                  <a
                    href="https://linkedin.com/in/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://x.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    X
                  </a>
                  <a
                    href="https://wa.me/917980301128/"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.threads.com/@scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    Threads
                  </a>
                  <a
                    href="https://www.youtube.com/@scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-2 py-0.5 rounded-md border text-xs transition-colors ${
                      isLight
                        ? "bg-slate-100 border-slate-200 hover:text-blue-800 hover:bg-slate-200"
                        : "bg-white/5 border-white/10 hover:text-blue-400 hover:bg-white/10"
                    }`}
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Summary</span>
            </h2>
            <div
              className={`text-xs sm:text-sm leading-relaxed p-3.5 sm:p-4 rounded-xl border space-y-2.5 ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-white/5 border-white/5 text-white/80"
              }`}
            >
              <p>
                Technical founder who spent 6+ years running a pharmaceutical
                company end-to-end — technology, operations, a team of 20+
                members, Rs.7.5+ Crore ($784K+ USD) in revenue. Began building
                AI-native products part-time in 2024 alongside my role as
                Co-founder & CTO of Pharmison Valentes. Transitioned to a
                full-time commitment in February 2025 upon stepping into a
                non-executive role on the Board of Directors.
              </p>
              <p>
                Currently a Full-stack AI Engineer who specializes in building
                AI-native SaaS, AaaS (Agents as a Service), multi-agent systems,
                automations, AI agents, business websites, mobile applications,
                and MCP servers. Has production level experience in integrating
                provider-agnostic LLM layers, Retrieval-Augmented Generation
                (RAG), and semantic search. Uses AI IDEs and coding agents
                across architecture, implementation, testing, review, and
                deployment while retaining ownership of security and release
                quality.
              </p>
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="space-y-3">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Code2
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Technical Skills</span>
            </h2>
            <div
              className={`p-3.5 sm:p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm leading-relaxed ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-white/5 border-white/5 text-white/80"
              }`}
            >
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  AI agents, frameworks and LLM systems:
                </span>{" "}
                Agentic AI, multi-agent orchestration, tool calling, Model
                Context Protocol (MCP), JSON-RPC 2.0, persistent memory, context
                engineering, RAG, embeddings, semantic search, vector databases
                (pgvector), structured outputs, intent classification, prompt
                engineering, model routing and failover, token metering,
                guardrails, human-in-the-loop workflows, LangChain, OpenRouter,
                AWS Bedrock, OpenAI API, Gemini API, and Claude API.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  AI IDEs and coding agents:
                </span>{" "}
                Google Antigravity, Cursor, Claude Code, Codex, OpenCode, Visual
                Studio Code, Google AI Studio, Android Studio.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  AI automation & integrations:
                </span>{" "}
                Trigger.dev, Inngest, QStash, n8n, Zapier, Composio, Cal.com,
                Resend, Notion API, GitHub API, and integration of major CRMs
                via APIs.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  UI/UX and frontend:
                </span>{" "}
                Figma, Framer, Webflow, Google Stitch, Claude Design, React,
                React Native, Next.js, Vite, Tailwind CSS, shadcn/ui, Radix UI,
                GSAP, Motion, Zustand, responsive design, accessibility, i18n.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Full-stack engineering:
                </span>{" "}
                TypeScript, Python, JavaScript, SQL, Node.js, REST APIs,
                webhooks, SSE, microservices, PostgreSQL, Supabase, Row-Level
                Security (RLS), Drizzle ORM, Prisma, Redis, WebAuthn, RBAC, rate
                limiting, webhook idempotency, PII redaction, OWASP Top 10.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Payment gateways integrations:
                </span>{" "}
                Stripe, Dodo Payments, Polar, Lemon Squeezy, Creem, Paddle,
                RazorPay.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Cloud and delivery:
                </span>{" "}
                AWS, Vercel, Git, GitHub Actions, CI/CD, Vitest, Playwright,
                Sentry, PostHog, Langfuse.
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4 pt-2">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Briefcase
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Experience</span>
            </h2>
            <div
              className={`border-l-2 ${isLight ? "border-blue-300/70" : "border-blue-500/30"} pl-3.5 sm:pl-4 space-y-5 sm:space-y-6 text-xs sm:text-sm ml-0.5 sm:ml-1 relative`}
            >
              {/* Scale with Alap */}
              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5 sm:-left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Full-stack AI Engineer | Scale with Alap (Portfolio &
                    Personal Brand)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    Started in Feb 2025
                  </span>
                </div>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Began building AI-native products part-time in 2024
                    alongside my role as Co-founder & CTO of Pharmison Valentes.
                    Transitioned to a full-time commitment in February 2025 upon
                    stepping into a non-executive role on the Board of
                    Directors.
                  </li>
                  <li>
                    Shipped Portfolio OS, Vibe44, Zero Headache, and OpenUI, as
                    measured by live public deployments, by owning architecture,
                    engineering, testing, CI/CD, deployment, and documentation.
                  </li>
                  <li>
                    Established AI-native delivery across five stages, as
                    measured by specification, implementation, testing,
                    automated review, and CI workflows, by using Cursor, Claude
                    Code, Codex, Windsurf, Google Antigravity, OpenCode, and
                    GitHub Copilot.
                  </li>
                </ul>
              </div>

              {/* Zero Headache */}
              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5 sm:-left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Co-founder & CEO | Zero Headache (AI-native Service Company)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    July 2026 – Present
                  </span>
                </div>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Leads product and engineering for a 24/7 AI lead-capture,
                    qualification, booking, and recovery service across 12 voice
                    and messaging channels for high-ticket local businesses.
                  </li>
                  <li>
                    Defined the multi-tenant product direction, industry
                    qualification playbooks, sub-10-second call-answer target,
                    and outcome-based billing around booked appointments and
                    conversations; applied to Y Combinator Fall 2026.
                  </li>
                </ul>
              </div>

              {/* Pharmison Valentes */}
              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5 sm:-left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Co-founder & Former CTO | Pharmison Valentes Pharma Pvt.
                    Ltd. (Pharmaceutical)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    May 2019 – Present
                  </span>
                </div>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Co-founded a registered Indian pharmaceutical company and
                    led all technology end-to-end for six years, growing the
                    business to more than Rs.7.5 Crore ($784K+ USD) in
                    cumulative revenue while owning the website pharmison.com,
                    employee reporting, and the operational systems supporting
                    day-to-day business — including a team of 20+ members across
                    Medical Representatives, Managers, Accountant, HR & Admin.
                  </li>
                  <li>
                    Now holds a non-executive Director and Shareholder position
                    with no active operational role.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project Portfolio Section */}
          <div className="space-y-4">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Globe
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Project Portfolio</span>
            </h2>

            <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
              {/* Portfolio OS */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${
                    isLight ? "text-blue-800" : "text-blue-400"
                  }`}
                >
                  Portfolio OS – Interactive macOS-style Portfolio
                  (Open-sourced) | Live -{" "}
                  <a
                    href="https://scalewithalap.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    scalewithalap.com
                  </a>
                  {" | "}
                  <a
                    href="https://github.com/scalewithalap/portfolio-os"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    GitHub
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built a custom web window manager recreating macOS and iOS
                    desktop interfaces, supporting window dragging, resizing,
                    edge and quadrant snapping, z-index focus management, and
                    minimize/restore animations across 39 components.
                  </li>
                  <li>
                    Centralized state across 30+ fields using Zustand and Immer,
                    lazy-loaded 13 apps with React.lazy and Suspense, and
                    implemented 60 FPS dock animations using
                    requestAnimationFrame and GPU-accelerated transforms.
                  </li>
                </ul>
              </div>

              {/* Vibe44 Marketing */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Vibe44 – The Next.js AI SaaS Starter Kit | Marketing site,
                  Documentations & MCP Server | Live –{" "}
                  <a
                    href="https://vibe44.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    vibe44.com
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Implemented a serverless Model Context Protocol (MCP) server
                    from scratch using JSON-RPC 2.0, providing 6 tools, 4
                    resource templates, IP-based rate limiting, and /llms.txt
                    endpoints for AI agent and RAG ingestion.
                  </li>
                  <li>
                    Built idempotent Creem payment webhook handlers to automate
                    post-purchase fulfillment, triggering GitHub repo invites,
                    single-use Cal.com booking links, transactional Resend
                    emails, and parallel Notion database syncs.
                  </li>
                </ul>
              </div>

              {/* Vibe44 Demo */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Vibe44 – The Next.js AI SaaS Starter Kit for Committed
                  Builders | Demo site | Live –{" "}
                  <a
                    href="https://demo.vibe44.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    demo.vibe44.com
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Developed a Next.js 16 AI SaaS codebase (~165k lines across
                    687 files) using a Universal Adapter Pattern to support
                    streaming, structured output, and runtime model switching
                    across 4 LLM providers with a PII-redacting RAG pipeline.
                  </li>
                  <li>
                    Engineered backend infrastructure with a 32-table PostgreSQL
                    schema using Row-Level Security, integrating 5 payment
                    gateways, 9 analytics providers, 4 fallback email services,
                    WebAuthn, QStash/Trigger.dev background jobs, and 900+ unit
                    and Playwright E2E tests.
                  </li>
                </ul>
              </div>

              {/* Zero Headache Marketing */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Zero Headache – Fully managed AI front desk for service
                  businesses | Marketing site | Live –{" "}
                  <a
                    href="https://zeroheadache.co"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    zeroheadache.co
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built and launched a Next.js 16 and React 19 marketing site
                    with TypeScript, Tailwind CSS 4, Motion, and Lenis,
                    featuring an interactive ROI calculator, product coverage
                    for 12 channels, 35+ CRM integrations, and structured
                    JSON-LD schemas.
                  </li>
                  <li>
                    Configured strict CSP, HSTS, clickjacking, and cross-origin
                    security headers while optimizing accessibility and
                    rendering performance through semantic HTML, accessible form
                    controls, and responsive SVGs.
                  </li>
                </ul>
              </div>

              {/* Zero Headache Platform */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Zero Headache Platform – Multi-tenant Dashboard & AI Agents |
                  In Active Development –{" "}
                  <a
                    href="https://app.zeroheadache.co"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    app.zeroheadache.co
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building from scratch a Next.js 16 platform that runs one
                    sandboxed AI Agent per client with persistent memory and
                    self-refining communication skills; OpenRouter provides
                    multi-model routing and automatic failover.
                  </li>
                  <li>
                    Connects channels and tools through MCP, with per-client
                    Supabase RLS, Trigger.dev pipelines, PostHog/Langfuse
                    observability, Dodo billing, and a LangChain operations
                    orchestrator that requests permission before difficult
                    actions.
                  </li>
                </ul>
              </div>

              {/* OpenUI */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  OpenUI – The Local-First UI Design Platform. An Open-source
                  Google Stitch Alternative | Live –{" "}
                  <a
                    href="https://github.com/scalewithalap/openui"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    github.com/scalewithalap/openui
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built an open-source, local-first UI design tool using
                    Next.js 16, React 19, Tailwind CSS 4, SQLite, Prisma 7, and
                    the Vercel AI SDK, enabling offline UI generation across 4
                    AI providers without requiring accounts, subscriptions, or
                    cloud storage.
                  </li>
                </ul>
              </div>

              {/* Make Me Sound */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Make Me Sound – An AI-powered Communication Copilot | In
                  Active Development –{" "}
                  <a
                    href="https://makemesound.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    makemesound.xyz
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building a parallel multi-stream engine that converts drafts
                    into 105 tone variations with sub-second streaming;
                    expanding across web, desktop, browser, and mobile clients.
                  </li>
                </ul>
              </div>

              {/* Freecom AI */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Freecom AI – An Open-Source AI-Agents-powered eCommerce
                  Platform | In Slow Development (80% Complete) –{" "}
                  <a
                    href="https://github.com/scalewithalap/freecom-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    github.com/scalewithalap/freecom-ai
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building an open-source digital-download commerce platform
                    with a self-hosted Store Manager Agent and a cloud agent
                    swarm for SEO, content, marketing, analytics, and support
                    with human approval controls.
                  </li>
                </ul>
              </div>

              {/* Soothly AI */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm sm:text-base leading-snug ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Soothly AI – Autonomous Revenue Platform & 8-AI-Agents
                  Ecosystem | In Slow Development –{" "}
                  <a
                    href="https://github.com/scalewithalap/soothly-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    github.com/scalewithalap/soothly-ai
                  </a>
                </h3>
                <ul
                  className={`pl-4 sm:pl-6 md:pl-7 text-xs sm:text-sm list-disc space-y-1 leading-relaxed ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building an autonomous revenue operations platform running
                    an 8-AI-agents ecosystem (Lead Gen, SEO, Partnership,
                    Proposal, Competitor Intel, Recovery, etc.) orchestrated by
                    a central Superagent manager. Runs fault-tolerant workflow
                    functions using Inngest step execution, Supabase pgvector
                    vector search with Row-Level Security, and 3-tier autonomy
                    settings with human approval gates.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <GraduationCap
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Education</span>
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div>
                <div
                  className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Bachelor of Computer Applications (BCA){" "}
                  <span className="font-normal text-slate-500">
                    | JIS College of Engineering, Kalyani | 2018 – 2020
                  </span>
                </div>
                <p className="text-slate-600 dark:text-white/70 mt-0.5 leading-relaxed">
                  Enrolled in the Bachelor of Computer Applications (BCA) in
                  2018. In 2020, during 2nd year, left the degree to focus
                  full-time on building products & running the business.
                </p>
              </div>

              <div>
                <div
                  className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Higher Secondary Examination, Science{" "}
                  <span className="font-normal text-slate-500">
                    | Krishnagar Collegiate School | 2018 | 77.40%
                  </span>
                </div>
              </div>

              <div>
                <div
                  className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Secondary Examination{" "}
                  <span className="font-normal text-slate-500">
                    | Krishnagar Collegiate School | 2016 | 89.43%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recognition Section */}
          <div className="space-y-2">
            <h2
              className={`text-xs font-bold uppercase tracking-wider leading-0 flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Recognition</span>
            </h2>
            <div
              className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm space-y-1 leading-relaxed ${
                isLight
                  ? "bg-amber-50 border-amber-200 text-slate-800"
                  : "bg-amber-500/10 border-amber-500/20 text-white/80"
              }`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="font-bold text-amber-600">
                  “The Founding 500” Program by Hyperagent (by Airtable) on 2
                  June 2026:
                </div>
                <a
                  href="https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-500 underline decoration-1 underline-offset-2 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p>
                Selected as a member of The Founding 500 program by Hyperagent
                and awarded US$20,000 in platform credits to build & run AI
                agents.
              </p>
              <div className="pt-2">
                <a
                  href="https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w"
                  target="_blank"
                  rel="noreferrer"
                  className="block group overflow-hidden rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-sm hover:shadow-md w-full"
                >
                  <LazyImage
                    src="/images/screenshots/hyperagent-founding-500.webp"
                    alt="The Founding 500 Hyperagent Credential"
                    className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
