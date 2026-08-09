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
      className={`flex flex-col h-full w-full font-sans transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#18181b]"
      }`}
    >
      {/* Top Controls Bar */}
      <div
        className={`h-12 border-b px-4 flex items-center justify-between shrink-0 transition-colors ${
          isLight
            ? "bg-slate-100 border-slate-200 text-slate-800"
            : "bg-[#27272a] border-white/10 text-white"
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <img
            src="/images/pdf.png"
            alt="PDF"
            className="w-5 h-5 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div>
            <span
              className={`text-xs sm:text-[13px] font-semibold block leading-normal ${isLight ? "text-slate-900" : "text-white"}`}
            >
              Alap Putatunda's Resume
            </span>
            <span
              className={`text-[10px] block leading-none ${isLight ? "text-slate-700" : "text-white/70"}`}
            >
              Official Resume
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <a
            href="/files/alap_resume.pdf"
            download="Alap's Resume"
            onClick={handleDownloadToast}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-md shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download as PDF</span>
          </a>
        </div>
      </div>

      {/* Main Document Content */}
      <div
        className={`flex-1 overflow-y-auto p-3 md:p-6 pb-28 md:pb-32 font-sans transition-colors duration-200 ${
          isLight ? "bg-slate-100/60" : "bg-[#09090b]"
        }`}
      >
        <div
          className={`w-full border rounded-2xl p-4 md:p-8 shadow-2xl space-y-8 transition-colors ${
            isLight
              ? "bg-white border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-[#18181b] border-white/10 text-white"
          }`}
        >
          {/* Resume Document Header */}
          <div
            className={`border-b pb-6 text-center md:text-left ${isLight ? "border-slate-200" : "border-white/10"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1
                  className={`text-4xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  ALAP PUTATUNDA
                </h1>
                <p
                  className={`font-bold text-lg ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Founding AI Engineer & Full-Stack AI-native Developer
                </p>
                <p
                  className={`flex items-center text-sm md:text-base mt-1 ${isLight ? "text-slate-800" : "text-white/80"}`}
                >
                  <MapPin
                    className={`mr-1 w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"} shrink-0`}
                  />
                  From India | Open to remote jobs | Ready to relocate with visa
                  sponsorship | DM or Email for demos or to schedule a call
                </p>
                <div
                  className={`flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 mt-1 text-sm md:text-base ${
                    isLight ? "text-slate-800" : "text-white/80"
                  }`}
                >
                  <a
                    href="mailto:hi@scalewithalap.com"
                    className={`flex items-center space-x-1 ${isLight ? "hover:text-blue-800" : "hover:text-blue-400"}`}
                  >
                    <Mail
                      className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"} shrink-0`}
                    />
                    <span>hi@scalewithalap.com</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/917980301128/"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    WhatsApp
                  </a>
                  <span>•</span>
                  <a
                    href="https://linkedin.com/in/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a
                    href="https://github.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href="https://x.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    X
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.threads.com/@scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    Threads
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.youtube.com/@scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    YouTube
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.instagram.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.facebook.com/scalewithalap"
                    target="_blank"
                    rel="noreferrer"
                    className={
                      isLight ? "hover:text-blue-800" : "hover:text-blue-400"
                    }
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
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Summary</span>
            </h2>
            <p
              className={`text-xs sm:text-sm leading-normal p-4 rounded-xl border ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-white/5 border-white/5 text-white/80"
              }`}
            >
              Founding AI Engineer and Full-stack AI-native Developer with 6+
              years of experience taking software from an empty repository to
              deployment, monitoring, and ongoing operation. Builds production
              LLM and multi-agent systems with RAG, semantic search,
              provider-agnostic model orchestration, voice AI, workflow
              automation, metered billing, and observability. Founded Scale with
              Alap, co-founded and leads Zero Headache as CEO, and shipped
              Vibe44 and OpenUI. Uses AI coding agents to accelerate delivery
              while retaining ownership of architecture, testing, security, and
              reliability. Selected for Hyperagent's "The Founding 500" ($20,000
              in platform credits) in June 2026.
            </p>
          </div>

          {/* Technical Skills Section */}
          <div className="space-y-3">
            <h2
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Code2
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Technical Skills</span>
            </h2>
            <div
              className={`p-4 rounded-xl border space-y-2.5 text-xs md:text-sm ${
                isLight
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-white/5 border-white/5 text-white/80"
              }`}
            >
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  AI Agents, LLMs & Automations:
                </span>{" "}
                Retrieval-Augmented Generation (RAG), embeddings, vector search,
                semantic retrieval, multi-agent systems, agent orchestration,
                structured outputs, intent classification, persistent agent
                memory, prompt engineering, token metering, model routing and
                failover, AWS Bedrock, Gemini Enterprise Agent Platform,
                Anthropic/Claude, Gemini, OpenAI/ChatGPT, DeepSeek, Z.AI/GLM,
                MiniMax, MoonShot/Kimi, Qwen, OpenRouter, LangChain, Genspark,
                Manus, OpenClaw, Hermes Agent.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Languages & Frontend:
                </span>{" "}
                TypeScript, Python, React 19, Next.js 15/16, React Native, Vite,
                Tailwind CSS v4, shadcn/ui, Radix UI, GSAP, Motion/Framer
                Motion, Zustand, Immer, ReactFlow, Fumadocs, Lenis, Lucide
                React, Server-Sent Events (SSE), React.lazy, Suspense,
                responsive and adaptive UI, accessibility, internationalization
                (i18n), CSS 3D transforms.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Backend, Data & Protocols:
                </span>{" "}
                Node.js, REST APIs, webhooks, Model Context Protocol (MCP),
                JSON-RPC 2.0, microservices, event-driven systems, PostgreSQL,
                Supabase, pgvector, Row-Level Security, Drizzle ORM, Prisma,
                Upstash Redis, Trigger.dev, Inngest, QStash, n8n.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Browser & UI Systems:
                </span>{" "}
                requestAnimationFrame, IntersectionObserver, Clipboard API, Web
                Audio API, custom window management, drag/resize/snap
                interactions, command palettes, fuzzy search, code splitting,
                dark/light theming, touch gestures.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Voice, Messaging & Integrations:
                </span>{" "}
                Vapi, Twilio, Deepgram, ElevenLabs, Murf AI, Sent.dm, Resend,
                Postmark, SendGrid, Brevo, Composio, Zernio, Zapier, Cal.com,
                GitHub API, Notion API, CRM integrations, SMS, WhatsApp, voice
                AI.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Payments, Analytics & Security:
                </span>{" "}
                Dodo Payments, Stripe, Polar, Lemon Squeezy, Creem, PostHog,
                Langfuse, Mixpanel, DataFast, Umami, Plausible, Pirsch,
                Vemetric, Google Analytics 4, Vercel Analytics, PII redaction,
                WebAuthn/passkeys, RBAC, HMAC tokens, CSRF and SSRF protection,
                rate limiting, webhook idempotency, consent management, OWASP
                Top 10.
              </div>
              <div>
                <span
                  className={`font-bold ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Delivery & AI-Native Engineering:
                </span>{" "}
                AWS Lightsail, Vercel, GitHub Actions CI/CD, Vitest, Playwright,
                Sentry, system design, performance and latency optimization,
                Claude Code, Cursor, Codex, GitHub Copilot, Google AI Studio,
                Antigravity, OpenCode, agent context engineering (AGENTS.md and
                CLAUDE.md), specification-driven development, test-driven agent
                loops, automated review and CI.
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h2
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Globe
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Projects</span>
            </h2>

            <div className="grid grid-cols-1 gap-3 text-xs">
              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${
                    isLight ? "text-blue-800" : "text-blue-400"
                  }`}
                >
                  Scale with Alap | Interactive macOS-style Portfolio OS |{" "}
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
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built a 39-file application that recreates macOS and iOS
                    interfaces, including a custom window manager for drag,
                    resize, edge and quadrant snapping, z-index focus, and
                    animated minimize and restore behavior.
                  </li>
                  <li>
                    Managed 30+ UI state fields in a 755-line Zustand/Immer
                    store and code-split 13 apps with React.lazy and Suspense.
                    Added store-driven themes, touch gestures,
                    IntersectionObserver image loading, CSS 3D effects, and a
                    Web Audio API interaction.
                  </li>
                  <li>
                    Implemented a requestAnimationFrame dock magnification
                    system using cosine scaling, direct DOM updates, and
                    GPU-accelerated transforms.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Vibe44 | Marketing website & MCP for Vibe44 Next.js AI SaaS
                  Starter Kit |{" "}
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
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built from scratch a serverless MCP server with JSON-RPC
                    2.0, 6 tools, 4 resource templates, IP rate limiting, and
                    /llms.txt endpoints that prepare product documentation for
                    agent and RAG ingestion.
                  </li>
                  <li>
                    Automated fulfillment from Creem payment webhooks to GitHub
                    access, single-use Cal.com booking links, Resend email, and
                    parallel Notion/audience synchronization with idempotency
                    guards.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Vibe44 Starter Kit | Demo website for Vibe44 Next.js AI SaaS
                  Starter Kit |{" "}
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
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built from scratch a 687-file, ~165,000-line Next.js 16
                    Next.js Starter Kit around a Universal Adapter Pattern; its
                    LLM layer supports four providers, streaming, structured
                    output, model switching, and a PII-redacting RAG context
                    pipeline.
                  </li>
                  <li>
                    Added 5 payment gateways, 9 consent-aware analytics
                    providers, 4 email providers with fallback,
                    QStash/Trigger.dev jobs, WebAuthn, HMAC impersonation,
                    CSRF/rate-limit controls, and a 32-table PostgreSQL/RLS
                    schema; covered by 900+ unit tests across 84 suites and 9
                    Playwright E2E suites.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Zero Headache | Fully managed AI front desk for local service
                  businesses | YC Fall 2026 applicant |{" "}
                  <a
                    href="https://zeroheadache.co"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    zeroheadache.co
                  </a>{" "}
                </h3>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built from scratch a 12-channel inbound engine with 10
                    industry qualification playbooks and a 35+ CRM integration
                    architecture with Google Sheets fallback.
                  </li>
                  <li>
                    Built a lead-loss ROI simulator, machine-readable LLM index,
                    compliance modules, and JSON-LD across 40+ routes in a
                    ~17,200-line Next.js 16 and React 19 codebase.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Zero Headache Platform | Multi-tenant Dashboard & AI Agents |{" "}
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
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
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

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  OpenUI | Local-First UI Design Platform |{" "}
                  <a
                    href="https://github.com/scalewithalap/openui"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    GitHub
                  </a>
                </h3>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Built an MIT-licensed, provider-agnostic alternative to
                    Google Stitch for generating production UI without a cloud
                    database, authentication layer, or subscription requirement
                    (Next.js 16, React 19, Prisma 7, Tailwind CSS v4).
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Make Me Sound | AI-powered Communication Copilot |{" "}
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
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building a parallel multi-stream engine that converts drafts
                    into 105 tone variations with sub-second streaming;
                    expanding across web, desktop, browser, and mobile clients.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Freecom AI | Open-Source AI eCommerce Platform |{" "}
                  <a
                    href="https://github.com/scalewithalap/freecom"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    GitHub
                  </a>
                </h3>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building an open-source digital-download commerce platform
                    with a self-hosted Store Manager Agent and a cloud agent
                    swarm for SEO, content, marketing, analytics, and support
                    with human approval controls.
                  </li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isLight
                    ? "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
                    : "bg-white/2 border-white/10 hover:border-white/20"
                }`}
              >
                <h3
                  className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                >
                  Soothly AI | Autonomous Revenue Platform & 8-AI-Agents
                  Ecosystem |{" "}
                  <a
                    href="https://github.com/scalewithalap/soothly-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-1 underline-offset-2"
                  >
                    GitHub
                  </a>
                </h3>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Building an autonomous revenue operations platform running
                    an 8-AI-agents ecosystem (Lead Gen, SEO, Partnership,
                    Proposal, Competitor Intel, Recovery, etc.) orchestrated by
                    a central Superagent manager.
                  </li>
                  <li>
                    Runs fault-tolerant workflow functions using Inngest step
                    execution, Supabase pgvector vector search with Row-Level
                    Security, and 3-tier autonomy settings with human approval
                    gates.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4 pt-2">
            <h2
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Briefcase
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Work Experience</span>
            </h2>
            <div
              className={`border-l-2 ${isLight ? "border-blue-300/70" : "border-blue-500/30"} pl-4 space-y-6 text-xs ml-1 relative`}
            >
              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Founder & AI Engineer | Scale with Alap (Personal Brand)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    May 2026 – Present
                  </span>
                </div>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Founded Scale with Alap to publish technical content and
                    build AI products, including Vibe44, OpenUI, Make Me Sound,
                    Freecom AI, and the Scale with Alap portfolio.
                  </li>
                  <li>
                    Directs AI-assisted engineering workflows across
                    architecture, implementation, testing, review, and CI using
                    Claude Code, Cursor, Codex, and GitHub Copilot.
                  </li>
                </ul>
              </div>

              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Co-founder & CEO | Zero Headache (AI-Native Service Company)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    July 2026 – Present
                  </span>
                </div>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
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

              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Co-founder & CTO | Pharmison Valentes Pharma Pvt. Ltd.
                    (Pharmaceutical)
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    May 2019 – Present
                  </span>
                </div>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Co-founded a registered Indian pharmaceutical company and
                    led all technology end to end — company website, internal
                    tooling and systems, and digital operations.
                  </li>
                  <li>
                    Now holds a non-executive Director and Shareholder position
                    with no active operational role.
                  </li>
                </ul>
              </div>

              <div className="relative space-y-1.5">
                <div
                  className={`absolute -left-5.25 top-1.5 w-2.5 h-2.5 rounded-full ${
                    isLight
                      ? "bg-blue-600 ring-4 ring-white"
                      : "bg-blue-400 ring-4 ring-[#18181b]"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h3
                    className={`font-bold text-sm md:text-base ${isLight ? "text-blue-800" : "text-blue-400"}`}
                  >
                    Full-Stack AI & Software Engineer | Freelancer
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium shrink-0 self-start sm:self-auto ${
                      isLight
                        ? "bg-blue-50 text-blue-800 border border-blue-200/80"
                        : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    }`}
                  >
                    2019 – 2026
                  </span>
                </div>
                <ul
                  className={`md:pl-7 text-xs md:text-sm list-disc space-y-1 leading-normal ${isLight ? "text-slate-800 font-medium" : "text-white/80 font-normal"}`}
                >
                  <li>
                    Designed, built, and deployed custom web applications, REST
                    APIs, and automation scripts for small businesses and
                    startup clients using Next.js, Node.js, and Python.
                  </li>
                  <li>
                    Integrated LLM streaming routes, vector search stores,
                    third-party payment gateways (Stripe, Lemonsqueezy), and CRM
                    webhooks.
                  </li>
                  <li>
                    Set up automated CI/CD workflows, automated unit test suites
                    with Vitest, and error tracking with Sentry.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recognition Section */}
          <div className="space-y-2">
            <h2
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Recognition</span>
            </h2>
            <div
              className={`p-4 rounded-xl border text-xs md:text-sm space-y-1 ${
                isLight
                  ? "bg-amber-50 border-amber-200 text-slate-800"
                  : "bg-amber-500/10 border-amber-500/20 text-white/80"
              }`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="font-bold text-amber-600">
                  "The Founding 500," Hyperagent by Airtable (2 June 2026)
                </div>
                <a
                  href="https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs md:text-sm font-semibold text-amber-600 hover:text-amber-500 underline decoration-1 underline-offset-2 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p>
                Selected as one of the Founding 500 and awarded US$20,000 in
                platform AI credits.
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

          {/* Education Section */}
          <div className="space-y-3">
            <h2
              className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              <GraduationCap
                className={`w-3.5 h-3.5 ${isLight ? "text-blue-800" : "text-blue-400"}`}
              />
              <span>Education</span>
            </h2>
            <div className="space-y-2.5 text-xs md:text-sm">
              <div>
                <div
                  className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Bachelor of Computer Applications coursework{" "}
                  <span className="font-normal text-slate-500">
                    | JIS College of Engineering, Kalyani | 2018 – 2020
                  </span>
                </div>
                <p className="italic text-slate-500 mt-0.5">
                  Left in the second year to build full time.
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
        </div>
      </div>
    </div>
  );
}
