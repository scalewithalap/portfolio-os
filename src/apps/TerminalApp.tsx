import { useEffect, useState, useRef } from "react";
import { useEcosystemStore } from "../store/useEcosystemStore";

const OUTPUT_LINES = [
  { cmd: "fetch --skills", type: "input" },
  { text: "Loading technical matrices...", type: "sys" },
  { text: "[ OK ] AI Agents, LLMs & Automations", type: "success" },
  {
    text: "  ├─ RAG, embeddings, vector search, semantic retrieval, multi-agent systems, agent orchestration",
    type: "item",
  },
  {
    text: "  ├─ Structured outputs, intent classification, persistent memory, prompt engineering, token metering",
    type: "item",
  },
  {
    text: "  └─ OpenAI, Anthropic/Claude, Gemini, DeepSeek, OpenRouter, LangChain, Hermes Agent",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Languages & Frontend", type: "success" },
  {
    text: "  ├─ TypeScript, Python, React 19, Next.js 15/16, Vite, Tailwind CSS v4, shadcn/ui, Radix UI",
    type: "item",
  },
  {
    text: "  ├─ GSAP, Motion, Zustand, Immer, ReactFlow, Fumadocs, Lenis, Lucide React, Server-Sent Events (SSE)",
    type: "item",
  },
  {
    text: "  └─ React.lazy, Suspense, responsive UI, accessibility, i18n, CSS 3D transforms",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Backend, Data & Protocols", type: "success" },
  {
    text: "  ├─ Node.js, REST APIs, webhooks, Model Context Protocol (MCP), JSON-RPC 2.0, microservices",
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
    text: "  └─ requestAnimationFrame, IntersectionObserver, Clipboard API, Web Audio API, window management",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Voice, Messaging & Integrations", type: "success" },
  {
    text: "  └─ Vapi, Twilio, Deepgram, ElevenLabs, Murf AI, Resend, Postmark, Composio, Cal.com",
    type: "item",
  },
  { text: "", type: "empty" },
  { text: "[ OK ] Delivery & AI-Native Workflows", type: "success" },
  {
    text: "  ├─ AWS Lightsail, Vercel, GitHub Actions CI/CD, Vitest, Playwright, Sentry",
    type: "item",
  },
  {
    text: "  └─ Claude Code, Cursor, Codex, GitHub Copilot, Antigravity, OpenCode, AGENTS.md / CLAUDE.md context",
    type: "item",
  },
  { text: "", type: "empty" },
  { cmd: "fetch --projects", type: "input" },
  { text: "Loading production projects...", type: "sys" },
  { text: "[ OK ] Production Projects & Applications", type: "success" },
  {
    text: "  ├─ Scale with Alap | Interactive macOS-style Portfolio OS built by Alap Putatunda (AI Engineer & Full-stack Developer).",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 | Marketing & MCP for Next.js AI SaaS Starter Kit | vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Vibe44 Starter Kit | ~165k line Next.js 16 Next.js Starter Kit | demo.vibe44.com",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache | Inbound AI front desk engine | zeroheadache.co (YC F26 app)",
    type: "item",
  },
  {
    text: "  ├─ Zero Headache Platform | Multi-tenant dashboard & sandboxed agents | app.zeroheadache.co",
    type: "item",
  },
  {
    text: "  ├─ OpenUI | Local-first open-source UI platform | github.com/scalewithalap/openui",
    type: "item",
  },
  {
    text: "  ├─ Make Me Sound | AI tone transformation engine | makemesound.xyz",
    type: "item",
  },
  {
    text: "  └─ Freecom AI | Open-source AI eCommerce platform | github.com/scalewithalap/freecom-ai",
    type: "item",
  },
  { text: "", type: "empty" },
  { cmd: "fetch --recognition", type: "input" },
  { text: "Loading awards & grants...", type: "sys" },
  { text: "[ OK ] Honors & Industry Recognition", type: "success" },
  {
    text: '  └─ "The Founding 500" | Hyperagent by Airtable (2 June 2026) | US$20,000 credits',
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
      className={`h-full w-full p-4 font-mono text-[13px] overflow-y-auto transition-colors duration-200 ${
        isLight
          ? "bg-slate-50 text-slate-800 selection:bg-blue-100"
          : "bg-black/95 text-zinc-100 selection:bg-zinc-700"
      }`}
    >
      <div className={`mb-4 ${isLight ? "text-slate-400" : "text-zinc-400"}`}>
        Last login: {new Date().toDateString()} on ttys001
        <br />
      </div>

      {OUTPUT_LINES.slice(0, lines).map((line, i) => {
        if (line.type === "input") {
          return (
            <div key={i} className="mb-2">
              <PromptPrefix isLight={isLight} /> {line.cmd}
            </div>
          );
        }
        if (line.type === "sys") {
          return (
            <div
              key={i}
              className={isLight ? "text-slate-400" : "text-zinc-500"}
            >
              {line.text}
            </div>
          );
        }
        if (line.type === "success") {
          return (
            <div
              key={i}
              className={`font-bold mt-2 ${isLight ? "text-blue-600" : "text-blue-400"}`}
            >
              {line.text}
            </div>
          );
        }
        if (line.type === "item") {
          return <div key={i}>{renderItemContent(line.text)}</div>;
        }
        return <div key={i} className="h-4" />;
      })}

      {lines >= OUTPUT_LINES.length && (
        <div className="mt-2 flex items-center">
          <PromptPrefix isLight={isLight} />
          <span
            className={`w-2 h-3.75 ml-2 animate-pulse ${isLight ? "bg-slate-700" : "bg-zinc-400"}`}
          />
        </div>
      )}
    </div>
  );
}
