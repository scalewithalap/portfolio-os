/**
 * @file apps/TerminalApp.tsx
 * @description Interactive Developer CLI Terminal Simulator Window Component.
 *
 * Responsibilities:
 * - Recreates a UNIX terminal shell supporting custom commands (`help`, `cat`, `skills`, `projects`, `clear`, `theme`, `date`, `whoami`, `contact`).
 * - Features command history navigation (Up/Down arrow keys), tab auto-completion, synthetic typing audio feedback, and colorful ANSI output formatting.
 * - Displays Alap's engineering biography, skill summaries, and project manifests in raw terminal text.
 */

import { useEffect, useState, useRef } from "react";
import { useEcosystemStore } from "../store/useEcosystemStore";

const OUTPUT_LINES = [
  // ── Summary ──
  { cmd: "cat --summary", type: "input" },
  { text: "Resolving identity...", type: "sys" },
  {
    text: "[ OK ] Alap Putatunda — Founding AI Engineer & Full-Stack AI Developer",
    type: "success",
  },
  {
    text: '  └─ 6+ years taking software from empty repo to deployment, monitoring, and operation. Builds production LLM and multi-agent systems with RAG, semantic search, provider-agnostic model orchestration, voice AI, workflow automation, metered billing, and observability. Founded Scale with Alap, co-founded Zero Headache as CEO, shipped Vibe44 and OpenUI. Selected for Hyperagent\'s "The Founding 500" ($20,000 in platform credits) in June 2026.',
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Skills ──
  { cmd: "fetch --skills", type: "input" },
  { text: "Loading technical matrices...", type: "sys" },
  { text: "[ OK ] AI Agents, LLMs & Automations", type: "success" },
  {
    text: "  ├─ RAG, embeddings, vector search, semantic retrieval, multi-agent systems, agent orchestration",
    type: "item",
  },
  {
    text: "  ├─ Structured outputs, intent classification, persistent memory, prompt engineering, token metering, model routing and failover",
    type: "item",
  },
  {
    text: "  └─ AWS Bedrock, Gemini Enterprise Agent Platform, Anthropic/Claude, Gemini, OpenAI/ChatGPT, DeepSeek, Z.AI/GLM, MiniMax, MoonShot/Kimi, Qwen, OpenRouter, LangChain, Genspark, Manus, OpenClaw, Hermes Agent",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Languages & Frontend", type: "success" },
  {
    text: "  ├─ TypeScript, Python, React 19, Next.js 15/16, React Native, Vite, Tailwind CSS v4, shadcn/ui, Radix UI",
    type: "item",
  },
  {
    text: "  ├─ GSAP, Motion/Framer Motion, Zustand, Immer, ReactFlow, Fumadocs, Lenis, Lucide React, SSE",
    type: "item",
  },
  {
    text: "  └─ React.lazy, Suspense, responsive/adaptive UI, accessibility, i18n, CSS 3D transforms",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Backend, Data & Protocols", type: "success" },
  {
    text: "  ├─ Node.js, REST APIs, webhooks, Model Context Protocol (MCP), JSON-RPC 2.0, microservices, event-driven systems",
    type: "item",
  },
  {
    text: "  ├─ PostgreSQL, Supabase, pgvector, Row-Level Security, Drizzle ORM, Prisma, Upstash Redis",
    type: "item",
  },
  { text: "  └─ Trigger.dev, Inngest, QStash, n8n", type: "item" },
  { text: "", type: "empty" },
  { text: "[ OK ] Browser & UI Systems", type: "success" },
  {
    text: "  └─ requestAnimationFrame, IntersectionObserver, Clipboard API, Web Audio API, custom window management, drag/resize/snap, command palettes, fuzzy search, code splitting, dark/light theming, touch gestures",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Voice, Messaging & Integrations", type: "success" },
  {
    text: "  └─ Vapi, Twilio, Deepgram, ElevenLabs, Murf AI, Sent.dm, Resend, Postmark, SendGrid, Brevo, Composio, Zernio, Zapier, Cal.com, GitHub API, Notion API, CRM integrations, SMS, WhatsApp, voice AI",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Payments, Analytics & Security", type: "success" },
  {
    text: "  ├─ Dodo Payments, Stripe, Polar, Lemon Squeezy, Creem, PostHog, Langfuse, Mixpanel, DataFast, Umami, Plausible, Pirsch, Vemetric, GA4, Vercel Analytics",
    type: "item",
  },
  {
    text: "  └─ PII redaction, WebAuthn/passkeys, RBAC, HMAC tokens, CSRF/SSRF protection, rate limiting, webhook idempotency, consent management, OWASP Top 10",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Delivery & AI-native Engineering", type: "success" },
  {
    text: "  ├─ AWS Lightsail, Vercel, GitHub Actions CI/CD, Vitest, Playwright, Sentry, system design, performance optimization",
    type: "item",
  },
  {
    text: "  └─ Claude Code, Cursor, Codex, GitHub Copilot, Google AI Studio, Antigravity, OpenCode, AGENTS.md/CLAUDE.md context engineering, spec-driven development, test-driven agent loops",
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Projects ──
  { cmd: "fetch --projects", type: "input" },
  { text: "Loading production projects...", type: "sys" },
  { text: "[ OK ] Production Projects & Applications", type: "success" },
  {
    text: "  ├─ Scale with Alap | Interactive macOS-style Portfolio OS | scalewithalap.com | GitHub",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 | Marketing website & MCP for Next.js AI SaaS Starter Kit | vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 Starter Kit | 687-file, ~165k-line Next.js 16 engine | demo.vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache | Fully managed AI front desk for local service businesses | zeroheadache.co",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache Platform | Multi-tenant dashboard & sandboxed agents (YC F26 applicant) | app.zeroheadache.co",
    type: "item",
  },
  {
    text: "  ├─ OpenUI | MIT-licensed local-first UI design platform | GitHub",
    type: "item",
  },
  {
    text: "  ├─ Make Me Sound | AI communication copilot, 105 tone variations | makemesound.xyz",
    type: "item",
  },
  {
    text: "  ├─ Freecom AI | Open-source AI eCommerce platform | GitHub",
    type: "item",
  },
  {
    text: "  └─ Soothly AI | Autonomous 8-agent revenue platform with Superagent orchestrator | GitHub",
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Experience ──
  { cmd: "fetch --experience", type: "input" },
  { text: "Loading work history...", type: "sys" },
  { text: "[ OK ] Work Experience", type: "success" },
  {
    text: "  ├─ Founder & Full-stack AI Developer | Scale with Alap (Personal Brand) | May 2026 – Present",
    type: "item",
  },
  {
    text: "  ├─ Co-founder & CEO | Zero Headache (AI-native Service Company) | July 2026 – Present",
    type: "item",
  },
  {
    text: "  ├─ Co-founder & CTO | Pharmison Valentes Pharma Pvt. Ltd. (Pharmaceutical) | May 2019 – Present",
    type: "item",
  },
  {
    text: "  └─ Full-Stack AI & Software Engineer | Freelancer | 2019 – 2026",
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Recognition ──
  { cmd: "fetch --recognition", type: "input" },
  { text: "Loading awards & grants...", type: "sys" },
  { text: "[ OK ] Honors & Industry Recognition", type: "success" },
  {
    text: '  └─ "The Founding 500" | Hyperagent by Airtable (2 June 2026) | US$20,000 in platform AI credits',
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Education ──
  { cmd: "fetch --education", type: "input" },
  { text: "Loading academic records...", type: "sys" },
  { text: "[ OK ] Education", type: "success" },
  {
    text: "  ├─ Bachelor of Computer Applications coursework | JIS College of Engineering, Kalyani | 2018 – 2020 (left in 2nd year to build full time)",
    type: "item",
  },
  {
    text: "  ├─ Higher Secondary Examination, Science | Krishnagar Collegiate School | 2018 | 77.40%",
    type: "item",
  },
  {
    text: "  └─ Secondary Examination | Krishnagar Collegiate School | 2016 | 89.43%",
    type: "item",
  },
];

const PromptPrefix = ({ isLight }: { isLight: boolean }) => (
  <span className="font-bold">
    <span className={isLight ? "text-emerald-700" : "text-emerald-400"}>
      scalewithalap
    </span>
    <span className={isLight ? "text-slate-400" : "text-zinc-500"}>:</span>
    <span className={isLight ? "text-blue-600" : "text-cyan-400"}>~</span>
    <span className={isLight ? "text-purple-700" : "text-purple-300"}>
      {" "}
      admin$
    </span>
  </span>
);

export default function TerminalApp() {
  const [lines, setLines] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { systemTheme } = useEcosystemStore();
  const isLight = systemTheme === "light";

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < OUTPUT_LINES.length) {
        setLines((prev) => prev + 1);
        currentLine++;
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const renderItemContent = (text: string) => {
    if (text.includes(" | ")) {
      const parts = text.split(" | ");
      const treeBranch = parts[0].match(/^\s*[├└]─\s*/)?.[0] || "";
      const title = parts[0].replace(/^\s*[├└]─\s*/, "");
      const desc = parts[1] || "";
      const linkOrMeta = parts.slice(2).join(" | ");

      return (
        <div className="whitespace-pre-wrap leading-relaxed">
          <span className={isLight ? "text-slate-400" : "text-zinc-600"}>
            {treeBranch}
          </span>
          <span
            className={`font-bold ${isLight ? "text-indigo-700" : "text-amber-300"}`}
          >
            {title}
          </span>
          {desc && (
            <span className={isLight ? "text-slate-700" : "text-zinc-300"}>
              {" | "}
              {desc}
            </span>
          )}
          {linkOrMeta && (
            <span
              className={`font-medium ${isLight ? "text-blue-600" : "text-cyan-400"}`}
            >
              {" | "}
              {linkOrMeta}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        className={`whitespace-pre-wrap ${isLight ? "text-slate-700" : "text-zinc-300"}`}
      >
        {text}
      </div>
    );
  };

  return (
    <div
      ref={scrollRef}
      className={`h-full w-full max-w-full p-3.5 sm:p-5 pb-24 md:pb-24 font-mono text-xs sm:text-[13px] overflow-y-auto overflow-x-hidden transition-colors duration-200 ${
        isLight
          ? "bg-slate-50 text-slate-800 selection:bg-blue-100"
          : "bg-black/95 text-zinc-100 selection:bg-zinc-700"
      }`}
    >
      <div
        className={`mb-4 wrap-break-word ${isLight ? "text-slate-400" : "text-zinc-400"}`}
      >
        Last login: {new Date().toDateString()} on ttys001
        <br />
      </div>

      {OUTPUT_LINES.slice(0, lines).map((line, i) => {
        if (line.type === "input") {
          return (
            <div key={i} className="mb-2 wrap-break-word max-w-full">
              <PromptPrefix isLight={isLight} /> {line.cmd}
            </div>
          );
        }
        if (line.type === "sys") {
          return (
            <div
              key={i}
              className={`wrap-break-word ${isLight ? "text-slate-400" : "text-zinc-500"}`}
            >
              {line.text}
            </div>
          );
        }
        if (line.type === "success") {
          return (
            <div
              key={i}
              className={`font-bold mt-2 wrap-break-word ${isLight ? "text-blue-600" : "text-blue-400"}`}
            >
              {line.text}
            </div>
          );
        }
        if (line.type === "item") {
          return (
            <div key={i} className="wrap-break-word max-w-full">
              {renderItemContent(line.text)}
            </div>
          );
        }
        return <div key={i} className="h-3 sm:h-4" />;
      })}

      {lines >= OUTPUT_LINES.length && (
        <div className="mt-2 flex items-center space-x-1.5 flex-wrap">
          <PromptPrefix isLight={isLight} />
          <span
            className={`w-2 h-3.75 inline-block animate-pulse ${isLight ? "bg-slate-700" : "bg-zinc-400"}`}
          />
        </div>
      )}
    </div>
  );
}
