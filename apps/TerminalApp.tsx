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
    text: "[ OK ] Alap Putatunda — Full-Stack AI Engineer | AI-Native Product/Software Development",
    type: "success",
  },
  {
    text: '  └─ Technical founder who spent 6+ years building & scaling a pharmaceutical company end-to-end (technology, operations, 20+ members, $784K+ USD or Rs.7.5+ Crore revenue). Began building AI agents & apps part-time in 2024, stepped down as CTO in 2025 to pursue AI engineering full-time, and started Scale with Alap. Specializes in AI-native SaaS, AI Agents, multi-agent systems, MCP servers, semantic search, RAG, and payment integrations. Selected for Hyperagent\'s (by Airtable) "The Founding 500" program, and awarded $20,000 in platform credits to build AI agents.',
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Skills ──
  { cmd: "fetch --skills", type: "input" },
  { text: "Loading technical matrices...", type: "sys" },
  { text: "[ OK ] AI Agents, Frameworks & LLM Systems", type: "success" },
  {
    text: "  ├─ Multi-agent systems, agent orchestration, agent swarm, human-in-the-loop workflows, autonomous workflows",
    type: "item",
  },
  {
    text: "  ├─ RAG, embeddings, vector search, semantic retrieval, persistent memory, structured outputs, intent classification",
    type: "item",
  },
  {
    text: "  ├─ Model routing and failover, token metering, prompt engineering, Claude (Anthropic), Gemini (Google), OpenAI (ChatGPT), DeepSeek, OpenRouter, LangChain",
    type: "item",
  },
  {
    text: "  └─ Model Context Protocol (MCP) servers and clients, JSON-RPC 2.0, MCP tools and resources, /llms.txt endpoints for agent ingestion, agent skills/rules/hooks systems",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] AI IDEs & Coding Agents", type: "success" },
  {
    text: "  ├─ Google Antigravity, Claude Code, Cursor, Codex, GitHub Copilot, Google AI Studio, OpenCode",
    type: "item",
  },
  {
    text: "  └─ Context engineering (AGENTS.md, CLAUDE.md, .cursorrules), custom subagents, custom skills, test-driven agent loops, spec-driven development",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] AI Automation & Integrations", type: "success" },
  {
    text: "  ├─ Trigger.dev, Inngest, Upstash Redis, QStash, n8n, Zapier, Webhooks, REST APIs, JSON-RPC 2.0",
    type: "item",
  },
  {
    text: "  ├─ Resend, Postmark, SendGrid, Brevo, AWS SES, Twilio, Sent.dm, Vapi, Murf AI, ElevenLabs, Deepgram",
    type: "item",
  },
  {
    text: "  └─ Composio, Zernio, Cal.com API, GitHub API, Notion API, PostHog, Langfuse, Sentry",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] UI/UX & Frontend Engineering", type: "success" },
  {
    text: "  ├─ TypeScript, JavaScript, React 19, Next.js 16, Vite, Tailwind CSS 4, Motion, GSAP + ScrollTrigger, Lenis Smooth Scroll",
    type: "item",
  },
  {
    text: "  └─ Zustand, Immer, ReactFlow, Lexical Editor, Lucide, Web Audio API, requestAnimationFrame, IntersectionObserver, responsive/adaptive UI",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Full-Stack Engineering & Database", type: "success" },
  {
    text: "  ├─ PostgreSQL, Supabase, pgvector, Row-Level Security (RLS), Prisma 7, Drizzle ORM, SQLite",
    type: "item",
  },
  {
    text: "  └─ Node.js, WebAuthn, Clerk Auth, Supabase Auth, HMAC token impersonation, CSRF protection, rate limiting, PII redaction",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Payment Gateways & Metered Billing", type: "success" },
  {
    text: "  └─ Stripe, Dodo Payments, Polar, Lemon Squeezy, Creem, Webhook signature verification, idempotent event processing, subscription lifecycles",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Cloud & Delivery", type: "success" },
  {
    text: "  └─ Vercel, AWS Lightsail, GitHub Actions CI/CD, Vitest, Playwright E2E testing, Docker",
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Projects ──
  { cmd: "fetch --projects", type: "input" },
  { text: "Loading production projects...", type: "sys" },
  { text: "[ OK ] Production Projects & Applications", type: "success" },
  {
    text: "  ├─ Portfolio OS | Interactive macOS-style Portfolio (Open-sourced) | scalewithalap.com | GitHub",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 Marketing Site & MCP Server | The Next.js AI SaaS Starter Kit & MCP Server | vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 Starter Kit Demo | 687-file, ~165k-line Next.js 16 AI SaaS codebase | demo.vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache Marketing Site | Fully managed AI front desk for service businesses | zeroheadache.co",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache Platform | Multi-tenant dashboard & sandboxed AI agents | app.zeroheadache.co",
    type: "item",
  },
  {
    text: "  ├─ OpenUI | Local-first UI design platform (Google Stitch alternative) | GitHub",
    type: "item",
  },
  {
    text: "  ├─ Make Me Sound | AI communication copilot, 105 tone variations | makemesound.xyz",
    type: "item",
  },
  {
    text: "  ├─ Freecom AI | Open-source AI eCommerce platform with agent swarm | GitHub",
    type: "item",
  },
  {
    text: "  └─ Soothly AI | Autonomous 8-agent revenue platform with Superagent manager | GitHub",
    type: "item",
  },
  { text: "", type: "empty" },

  // ── Experience ──
  { cmd: "fetch --experience", type: "input" },
  { text: "Loading work history...", type: "sys" },
  { text: "[ OK ] Work Experience", type: "success" },
  {
    text: "  ├─ Full-stack AI Engineer | Scale with Alap (Portfolio & Personal Brand) | Feb 2025 – Present",
    type: "item",
  },
  {
    text: "  ├─ Co-founder & CEO | Zero Headache (AI-native Front Desk Service) | July 2026 – Present",
    type: "item",
  },
  {
    text: "  └─ Co-founder & Former CTO | Pharmison Valentes Pharma Pvt. Ltd. (Pharmaceutical) | May 2019 – Present",
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
    text: "  ├─ Bachelor of Computer Applications (BCA) coursework | JIS College of Engineering, Kalyani | 2018 – 2020 (left in 2nd year to build full time)",
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
