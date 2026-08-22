/**
 * @file data/projectsData.ts
 * @description Master Data Store & Case Study Dataset for Alap Putatunda's Portfolio Projects.
 *
 * Responsibilities:
 * - Contains comprehensive structured metadata for all 9 portfolio project case studies (Scale with Alap, Vibe44, Zero Headache, OpenUI, Make Me Sound, Freecom AI, Soothly AI).
 * - Stores project titles, badges, taglines, live URLs, full Markdown case study content, key tech stack tags, architecture highlights, and screenshot image paths.
 * - Exports helper utilities like `getProjectById` and `getProjectCoverImage`.
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  url: string;
  demoUrl?: string;
  githubUrl?: string;
  iconImage: string;
  coverImage: string;
  coverImageLight?: string;
  coverImageDark?: string;
  description: string;
  longDescription: string;
  color: string;
  accentColor: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  techStack: { category: string; items: string[] }[];
  features: { title: string; description: string }[];
  skills?: string[];
  codeSnippet?: { language: string; code: string };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "portfolio-os",
    title: "Portfolio OS (This site)",
    tagline: "Interactive macOS-style Portfolio (Open-sourced)",
    badge: "Shipped & Live",
    url: "scalewithalap.com",
    demoUrl: "https://scalewithalap.com",
    githubUrl: "https://github.com/scalewithalap/portfolio-os",
    iconImage: "/logos/Scale with Alap.webp",
    coverImage: "/images/screenshots/scalewithalap-dark.webp",
    coverImageDark: "/images/screenshots/scalewithalap-dark.webp",
    coverImageLight: "/images/screenshots/scalewithalap-light.webp",
    description:
      "A custom web window manager recreating macOS and iOS desktop interfaces with 30+ Zustand state fields and 60 FPS dock animations.",
    longDescription:
      "Built a custom web window manager recreating macOS and iOS desktop interfaces, supporting window dragging, resizing, edge and quadrant snapping, z-index focus management, and minimize/restore animations across 39 components. Centralized state across 30+ fields using Zustand and Immer, lazy-loaded 13 apps with React.lazy and Suspense, and implemented 60 FPS dock animations using requestAnimationFrame and GPU-accelerated transforms.",
    skills: [
      "TypeScript",
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "Zustand",
      "Immer",
      "Web Audio API",
      "requestAnimationFrame",
      "IntersectionObserver",
      "React.lazy",
      "Suspense",
      "CSS 3D Transforms",
      "Clipboard API",
      "Dark/Light Theming",
      "Touch Gestures",
      "Responsive UI",
    ],
    color: "from-blue-600 to-indigo-900",
    accentColor: "#3b82f6",
    highlights: [
      "Built custom web window manager recreating macOS/iOS desktop interfaces across 39 components",
      "Centralized state across 30+ fields in Zustand/Immer store and lazy-loaded 13 apps with React.lazy and Suspense",
      "60 FPS dock magnification animations using requestAnimationFrame and GPU-accelerated transforms",
      "Theme toggle engine, Web Audio API synthesis, and touch gesture support",
    ],
    metrics: [
      { label: "Components", value: "39 Items" },
      { label: "State Fields", value: "30+ Fields" },
      { label: "Lazy Apps", value: "13 Apps" },
      { label: "Dock Animation", value: "60 FPS GPU" },
    ],
    techStack: [
      {
        category: "Frontend Architecture",
        items: [
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS v4",
          "Lucide Icons",
        ],
      },
      {
        category: "State & Systems",
        items: ["Zustand", "Immer", "Web Audio API", "IntersectionObserver"],
      },
      {
        category: "Performance",
        items: [
          "React.lazy",
          "Suspense",
          "requestAnimationFrame",
          "CSS 3D Transforms",
        ],
      },
    ],
    features: [
      {
        title: "Custom Window Geometry Manager",
        description:
          "Handles window dragging, 8-axis resizing, edge and quadrant snapping, and z-index focus management across desktop displays.",
      },
      {
        title: "60 FPS Cosine Magnification Dock",
        description:
          "Calculates cursor proximity in real time to apply fluid GPU-accelerated transforms to dock icon items via requestAnimationFrame.",
      },
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Window manager state reducer using Zustand and Immer
export const useEcosystemStore = create<EcosystemState>()(
  immer((set, get) => ({
    openApps: [],
    focusedAppId: null,
    
    openApp: (id: string) => {
      set((state) => {
        const existing = state.openApps.find((app) => app.id === id);
        if (!existing) {
          const appConfig = APPS_CONFIG.find((a) => a.id === id);
          state.openApps.push({
            id,
            title: appConfig?.title || id,
            isMinimized: false,
            zIndex: getNextZIndex(state.openApps),
            position: getInitialPosition(state.openApps.length),
            size: { width: 960, height: 640 },
          });
        } else {
          existing.isMinimized = false;
          existing.zIndex = getNextZIndex(state.openApps);
        }
        state.focusedAppId = id;
      });
    },
  }))
);`,
    },
  },

  {
    id: "vibe44",
    title: "Vibe44 Marketing Site & MCP Server",
    tagline:
      "The Next.js AI SaaS Starter Kit | Marketing site, Documentations & MCP Server",
    badge: "Shipped & Live",
    url: "vibe44.com",
    demoUrl: "https://vibe44.com",
    githubUrl: "https://github.com/scalewithalap",
    iconImage: "/logos/Vibe44.webp",
    coverImage: "/images/screenshots/vibe44-dark.webp",
    coverImageDark: "/images/screenshots/vibe44-dark.webp",
    coverImageLight: "/images/screenshots/vibe44-light.webp",
    description:
      "Serverless Model Context Protocol (MCP) server with JSON-RPC 2.0, 6 tools, 4 resource templates, and idempotent Creem payment webhook fulfillment.",
    longDescription:
      "Implemented a serverless Model Context Protocol (MCP) server from scratch using JSON-RPC 2.0, providing 6 tools, 4 resource templates, IP-based rate limiting, and /llms.txt endpoints for AI agent and RAG ingestion. Built idempotent Creem payment webhook handlers to automate post-purchase fulfillment, triggering GitHub repo invites, single-use Cal.com booking links, transactional Resend emails, and parallel Notion database syncs.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "MCP",
      "JSON-RPC 2.0",
      "Creem Webhooks",
      "GitHub API",
      "Cal.com API",
      "Resend API",
      "Notion API",
      "Rate Limiting",
      "Webhook Idempotency",
    ],
    color: "from-indigo-600 to-slate-900",
    accentColor: "#6366f1",
    highlights: [
      "Implemented serverless Model Context Protocol (MCP) server from scratch using JSON-RPC 2.0",
      "Provides 6 tools, 4 resource templates, IP-based rate limiting, and /llms.txt endpoints for AI agent and RAG ingestion",
      "Built idempotent Creem payment webhook handlers automating GitHub repo invites and single-use Cal.com booking links",
      "Parallel Notion database synchronization and transactional Resend email dispatch",
    ],
    metrics: [
      { label: "MCP Tools", value: "6 Tools" },
      { label: "Templates", value: "4 Resources" },
      { label: "Webhook Sync", value: "Idempotent Engine" },
      { label: "Ingestion", value: "/llms.txt" },
    ],
    techStack: [
      {
        category: "MCP & API",
        items: [
          "JSON-RPC 2.0",
          "MCP Specification",
          "Next.js 16 Route Handlers",
        ],
      },
      {
        category: "Integrations & Fulfillment",
        items: [
          "Creem Payments",
          "GitHub API",
          "Cal.com API",
          "Resend API",
          "Notion API",
        ],
      },
    ],
    features: [
      {
        title: "Serverless MCP Architecture",
        description:
          "Exposes 6 tools, 4 resource templates, IP rate limiting, and structured /llms.txt documentation endpoints for AI agent and RAG ingestion.",
      },
      {
        title: "Idempotent Webhook Fulfillment",
        description:
          "Grants repository access, dispatches single-use booking credentials, and updates Notion databases upon verified Creem payments.",
      },
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Serverless Model Context Protocol (MCP) route handler
export async function POST(request: Request) {
  const body = await request.json();
  const { jsonrpc, method, params, id } = body;

  if (jsonrpc !== "2.0") {
    return Response.json({ jsonrpc: "2.0", error: { code: -32600, message: "Invalid Request" }, id });
  }

  switch (method) {
    case "tools/list":
      return Response.json({ jsonrpc: "2.0", result: { tools: MCP_TOOLS }, id });
    case "tools/call":
      const toolResult = await executeMCPTool(params.name, params.arguments);
      return Response.json({ jsonrpc: "2.0", result: toolResult, id });
    case "resources/read":
      const resourceContent = await readMCPResource(params.uri);
      return Response.json({ jsonrpc: "2.0", result: resourceContent, id });
    default:
      return Response.json({ jsonrpc: "2.0", error: { code: -32601, message: "Method not found" }, id });
  }
}`,
    },
  },
  {
    id: "zeroheadache",
    title: "Zero Headache Marketing Site",
    tagline:
      "Fully managed AI front desk for service businesses | Marketing site",
    badge: "Shipped & Live",
    url: "zeroheadache.co",
    demoUrl: "https://zeroheadache.co",
    iconImage: "/logos/Zero Headache.webp",
    coverImage: "/images/screenshots/zeroheadache.webp",
    coverImageDark: "/images/screenshots/zeroheadache.webp",
    coverImageLight: "/images/screenshots/zeroheadache.webp",
    description:
      "A Next.js 16 and React 19 marketing site with 12 channels, 35+ CRM integrations, interactive ROI calculator, and strict security headers.",
    longDescription:
      "Built and launched a Next.js 16 and React 19 marketing site with TypeScript, Tailwind CSS 4, Motion, and Lenis, featuring an interactive ROI calculator, product coverage for 12 channels, 35+ CRM integrations, and structured JSON-LD schemas. Configured strict CSP, HSTS, clickjacking, and cross-origin security headers while optimizing accessibility and rendering performance through semantic HTML, accessible form controls, and responsive SVGs.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "Motion",
      "Lenis Smooth Scroll",
      "JSON-LD Schema",
      "Webhooks",
      "Security Headers (CSP/HSTS)",
      "Responsive SVGs",
    ],
    color: "from-emerald-600 to-teal-900",
    accentColor: "#10b981",
    highlights: [
      "Built and launched Next.js 16 and React 19 marketing site with TypeScript, Tailwind CSS 4, Motion, and Lenis",
      "Interactive lead-loss ROI calculator and product coverage for 12 inbound channels",
      "35+ CRM integration architecture with structured JSON-LD schemas across routes",
      "Configured strict CSP, HSTS, clickjacking, and cross-origin security headers",
    ],
    metrics: [
      { label: "Channels", value: "12 Channels" },
      { label: "CRM Integrations", value: "35+ Systems" },
      { label: "Framework", value: "Next.js 16 + React 19" },
      { label: "Security", value: "Strict CSP & HSTS" },
    ],
    techStack: [
      {
        category: "Marketing Engine",
        items: ["Next.js 16", "React 19", "Tailwind CSS v4", "Lucide Icons"],
      },
      {
        category: "Animations & UI",
        items: ["Motion", "Lenis Smooth Scroll", "Responsive SVGs"],
      },
      {
        category: "Architecture & Security",
        items: [
          "35+ CRM Webhook System",
          "Structured JSON-LD Schema",
          "CSP & HSTS Security Headers",
        ],
      },
    ],
    features: [
      {
        title: "Lead-Loss ROI Calculator",
        description:
          "Calculates missed revenue based on call volume, response times, and average job ticket values.",
      },
      {
        title: "Hardened Security Configuration",
        description:
          "Configures strict CSP, HSTS, clickjacking, and cross-origin security headers while optimizing rendering performance.",
      },
    ],
    codeSnippet: {
      language: "typescript",
      code: `// 35+ CRM Webhook Dispatcher with Google Sheets Fallback
export async function dispatchLeadIntake(lead: LeadIntakeData) {
  const webhookUrl = process.env.PRIMARY_CRM_WEBHOOK_URL;

  try {
    const res = await fetch(webhookUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, timestamp: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(\`CRM HTTP status \${res.status}\`);
    return { success: true, provider: "primary_crm" };
  } catch (error) {
    // Automatic fallback to Google Sheets Webhook API
    await fetch(process.env.GOOGLE_SHEETS_FALLBACK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, fallbackReason: String(error) }),
    });
    return { success: true, provider: "google_sheets_fallback" };
  }
}`,
    },
  },
  {
    id: "vibe44-demo",
    title: "Vibe44 (Next.js AI SaaS Starter Kit Demo)",
    tagline:
      "The Next.js AI SaaS Starter Kit for Committed Builders | Demo site",
    badge: "Shipped & Live",
    url: "demo.vibe44.com",
    demoUrl: "https://demo.vibe44.com",
    iconImage: "/logos/Vibe44.webp",
    coverImage: "/images/screenshots/vibe44-demo-dark.webp",
    coverImageDark: "/images/screenshots/vibe44-demo-dark.webp",
    coverImageLight: "/images/screenshots/vibe44-demo-light.webp",
    description:
      "A Next.js 16 AI SaaS codebase (~165k lines across 687 files) featuring Universal Adapter Pattern across 4 LLM providers, 5 payment gateways, and a 32-table Postgres schema.",
    longDescription:
      "Developed a Next.js 16 AI SaaS codebase (~165k lines across 687 files) using a Universal Adapter Pattern to support streaming, structured output, and runtime model switching across 4 LLM providers with a PII-redacting RAG pipeline. Engineered backend infrastructure with a 32-table PostgreSQL schema using Row-Level Security, integrating 5 payment gateways, 9 analytics providers, 4 fallback email services, WebAuthn, QStash/Trigger.dev background jobs, and 900+ unit and Playwright E2E tests.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "PostgreSQL",
      "Supabase RLS",
      "Drizzle ORM",
      "Trigger.dev",
      "QStash",
      "Upstash Redis",
      "OpenAI",
      "Claude",
      "Gemini",
      "DeepSeek",
      "Stripe",
      "Dodo Payments",
      "Polar",
      "Lemon Squeezy",
      "Creem",
      "WebAuthn",
      "HMAC Tokens",
      "CSRF Protection",
      "Rate Limiting",
      "PII Redaction",
      "Vitest",
      "Playwright",
      "Sentry",
    ],
    color: "from-blue-600 to-cyan-900",
    accentColor: "#0284c7",
    highlights: [
      "Universal Adapter Pattern supporting streaming, structured output, and runtime model switching across 4 LLM providers",
      "PII-redacting RAG pipeline with pgvector semantic retrieval",
      "32-table PostgreSQL schema with Row-Level Security, 5 payment gateways, and 9 analytics providers",
      "Covered by 900+ unit tests across 84 suites and 9 Playwright E2E test suites",
    ],
    metrics: [
      { label: "Codebase Size", value: "~165k Lines" },
      { label: "Source Files", value: "687 Files" },
      { label: "Unit & E2E Tests", value: "900+ Tests" },
      { label: "DB Schema", value: "32 Tables RLS" },
    ],
    techStack: [
      {
        category: "Core Engine",
        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
      },
      {
        category: "Database & Security",
        items: [
          "PostgreSQL",
          "Supabase RLS",
          "Drizzle ORM",
          "WebAuthn",
          "HMAC Impersonation",
        ],
      },
      {
        category: "AI & Workflows",
        items: [
          "OpenAI",
          "Claude",
          "Gemini",
          "DeepSeek",
          "Trigger.dev",
          "QStash",
        ],
      },
      {
        category: "Testing",
        items: ["Vitest (84 suites)", "Playwright (9 E2E suites)"],
      },
    ],
    features: [
      {
        title: "Universal LLM Layer",
        description:
          "Orchestrates model switching, streaming output, structured responses, and PII masking across 4 provider APIs.",
      },
      {
        title: "Multi-Gateway Billing Engine",
        description:
          "Supports Stripe, Dodo Payments, Polar, Lemon Squeezy, and Creem with unified webhook verification.",
      },
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Universal LLM Provider Adapter with streaming & PII redaction
export async function generateUniversalStream(params: LLMStreamParams) {
  const { provider, model, prompt, piiRedaction } = params;
  const sanitizedPrompt = piiRedaction ? redactPII(prompt) : prompt;

  switch (provider) {
    case "anthropic":
      return streamAnthropic({ model, messages: [{ role: "user", content: sanitizedPrompt }] });
    case "openai":
      return streamOpenAI({ model, messages: [{ role: "user", content: sanitizedPrompt }] });
    case "gemini":
      return streamGemini({ model, prompt: sanitizedPrompt });
    case "deepseek":
      return streamDeepSeek({ model, prompt: sanitizedPrompt });
    default:
      throw new Error(\`Unsupported LLM provider: \${provider}\`);
  }
}`,
    },
  },
  {
    id: "zeroheadache-app",
    title: "Zero Headache Platform",
    tagline: "Multi-tenant dashboard & sandboxed AI agents per client",
    badge: "Under Development",
    url: "app.zeroheadache.co",
    demoUrl: "https://app.zeroheadache.co",
    iconImage: "/logos/Zero Headache.webp",
    coverImage: "/images/screenshots/zeroheadache-app.webp",
    coverImageDark: "/images/screenshots/zeroheadache-app.webp",
    coverImageLight: "/images/screenshots/zeroheadache-app.webp",
    description:
      "Multi-tenant Next.js 16 platform running sandboxed AI agents with persistent memory, OpenRouter failover, and Supabase RLS.",
    longDescription:
      "Building from scratch a Next.js 16 platform that runs one sandboxed AI Agent per client with persistent memory and self-refining communication skills; OpenRouter provides multi-model routing and automatic failover. Connects channels and tools through MCP, with per-client Supabase RLS, Trigger.dev pipelines, PostHog/Langfuse observability, Dodo billing, and a LangChain operations orchestrator that requests permission before difficult actions.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "Supabase PostgreSQL",
      "Row-Level Security",
      "pgvector",
      "LangChain",
      "OpenRouter",
      "Model Context Protocol (MCP)",
      "Trigger.dev",
      "PostHog",
      "Langfuse",
      "Dodo Payments",
    ],
    color: "from-teal-600 to-slate-900",
    accentColor: "#0d9488",
    highlights: [
      "Sandboxed AI Agent per client with persistent memory and self-refining skills",
      "OpenRouter multi-model routing with automatic fallback logic",
      "Model Context Protocol (MCP) tooling with Supabase Row-Level Security",
      "LangChain orchestrator with human approval gates for critical actions",
    ],
    metrics: [
      { label: "Agent Isolation", value: "Per-Client RLS" },
      { label: "Channel Tooling", value: "MCP Standard" },
      { label: "Observability", value: "PostHog + Langfuse" },
      { label: "Billing", value: "Dodo Payments" },
    ],
    techStack: [
      {
        category: "Platform & Storage",
        items: [
          "Next.js 16",
          "Supabase PostgreSQL",
          "Row-Level Security (RLS)",
          "pgvector",
        ],
      },
      {
        category: "Agent Orchestration",
        items: ["LangChain", "OpenRouter", "MCP Protocol", "Trigger.dev"],
      },
      {
        category: "Telemetry & Billing",
        items: ["PostHog", "Langfuse", "Dodo Payments API"],
      },
    ],
    features: [
      {
        title: "Per-Client Sandboxed Memory",
        description:
          "Stores client conversation histories and custom business rules under isolated RLS policies.",
      },
      {
        title: "Human Approval Gatekeeper",
        description:
          "Interprets complex customer requests and prompts office managers before executing high-impact actions.",
      },
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Sandboxed AI Agent Execution with Supabase RLS isolation
export async function executeAgentTask(tenantId: string, taskInput: TaskInput) {
  const supabase = createServerClient({ tenantId });
  
  // Verify tenant access via Row-Level Security policy
  const { data: tenantConfig, error } = await supabase
    .from("tenant_agents")
    .select("system_prompt, memory_context, allowed_tools")
    .eq("tenant_id", tenantId)
    .single();

  if (error || !tenantConfig) throw new Error("Unauthorized tenant agent access");

  const agentExecutor = new LangChainAgentOrchestrator({
    systemPrompt: tenantConfig.system_prompt,
    memory: tenantConfig.memory_context,
    tools: tenantConfig.allowed_tools,
    requireApproval: taskInput.isHighImpactAction,
  });

  return agentExecutor.run(taskInput.prompt);
}`,
    },
  },
  {
    id: "openui",
    title: "OpenUI",
    tagline:
      "The Local-First UI Design Platform. An Open-source Google Stitch Alternative",
    badge: "Shipped & Open Source",
    url: "github.com/scalewithalap/openui",
    githubUrl: "https://github.com/scalewithalap/openui",
    iconImage: "/logos/OpenUI.webp",
    coverImage: "/images/screenshots/openui-dark.webp",
    coverImageDark: "/images/screenshots/openui-dark.webp",
    coverImageLight: "/images/screenshots/openui-light.webp",
    description:
      "An open-source, local-first UI design tool using Next.js 16, React 19, Tailwind CSS 4, SQLite, Prisma 7, and the Vercel AI SDK.",
    longDescription:
      "Built an open-source, local-first UI design tool using Next.js 16, React 19, Tailwind CSS 4, SQLite, Prisma 7, and the Vercel AI SDK, enabling offline UI generation across 4 AI providers without requiring accounts, subscriptions, or cloud storage.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "SQLite",
      "Prisma 7",
      "Vercel AI SDK",
      "Local-First Architecture",
    ],
    color: "from-sky-600 to-blue-900",
    accentColor: "#0284c7",
    highlights: [
      "Built an open-source, local-first UI design tool using Next.js 16, React 19, Tailwind CSS 4, SQLite, Prisma 7, and Vercel AI SDK",
      "Enables offline UI generation across 4 AI providers without requiring accounts, subscriptions, or cloud storage",
      "Open-source Google Stitch alternative with complete local privacy",
      "Exports clean React and TypeScript component structures directly to disk",
    ],
    metrics: [
      { label: "License", value: "MIT Open Source" },
      { label: "Cloud Auth", value: "None Required" },
      { label: "Cloud Storage", value: "Zero Dependence" },
      { label: "Providers", value: "4 AI Providers" },
    ],
    techStack: [
      {
        category: "Core Technologies",
        items: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS v4",
          "Prisma 7 + SQLite",
        ],
      },
      {
        category: "LLM Support",
        items: [
          "Vercel AI SDK (Ollama, OpenAI, Anthropic, Gemini, OpenRouter)",
        ],
      },
    ],
    features: [
      {
        title: "Local Component Synthesis",
        description:
          "Transforms descriptive prompts into React component code directly on the local client.",
      },
      {
        title: "Zero Subscription Requirement",
        description:
          "Runs self-hosted without paywalls, user tracking, or external database requirements.",
      },
    ],
  },
  {
    id: "makemesound",
    title: "Make Me Sound",
    tagline: "An AI-powered Communication Copilot | In Active Development",
    badge: "Under Active Development",
    url: "makemesound.xyz",
    demoUrl: "https://makemesound.xyz",
    iconImage: "",
    coverImage: "/images/screenshots/makemesound-light.webp",
    coverImageDark: "/images/screenshots/makemesound-dark.webp",
    coverImageLight: "/images/screenshots/makemesound-light.webp",
    description:
      "A parallel multi-stream engine converting drafts into 105 tone variations with sub-second streaming across web, desktop, browser, and mobile.",
    longDescription:
      "Building a parallel multi-stream engine that converts drafts into 105 tone variations with sub-second streaming; expanding across web, desktop, browser, and mobile clients. Employs Next.js 16, OpenRouter, Supabase RLS, Upstash Redis rate limiting, Lemonsqueezy subscription billing, Tauri v2 desktop floating toolboxes, and WXT browser extensions.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "Vercel AI SDK",
      "OpenRouter",
      "Supabase PostgreSQL",
      "Row-Level Security",
      "Upstash Redis",
      "Lemonsqueezy",
      "Tauri v2",
      "WXT Browser Extension",
    ],
    color: "from-amber-600 to-orange-900",
    accentColor: "#f59e0b",
    highlights: [
      "Building a parallel multi-stream engine that converts drafts into 105 tone variations with sub-second streaming",
      "Expanding across web, desktop, browser, and mobile clients",
      "Cross-platform architecture with Tauri v2 desktop floating toolboxes and WXT browser extensions",
      "Custom dictionary enforcement and system prompt safety boundaries",
    ],
    metrics: [
      { label: "Tone Variations", value: "105 Variations" },
      { label: "Generation Speed", value: "Sub-second Streaming" },
      { label: "Engine", value: "Parallel Multi-Stream" },
      { label: "Platforms", value: "Web, Desktop, Extension, Mobile" },
    ],
    techStack: [
      {
        category: "Stream Engine",
        items: ["Next.js 16", "Vercel AI SDK", "OpenRouter API", "TypeScript"],
      },
      {
        category: "Storage & Rate Limiting",
        items: ["Supabase PostgreSQL", "Row-Level Security", "Upstash Redis"],
      },
    ],
    features: [
      {
        title: "Concurrent Tone Matrix",
        description:
          "Streams multiple tone variations concurrently so users compare style options instantly.",
      },
      {
        title: "Tone Customization Engine",
        description:
          "Adjusts formality, brevity, persuasion, and empathy levels across input drafts.",
      },
    ],
  },
  {
    id: "freecom",
    title: "Freecom AI",
    tagline:
      "An Open-Source AI-Agents-powered eCommerce Platform | In Development (80% Complete)",
    badge: "Under Development (80%)",
    url: "github.com/scalewithalap/freecom-ai",
    githubUrl: "https://github.com/scalewithalap/freecom-ai",
    iconImage: "",
    coverImage: "/images/screenshots/freecom-ai.webp",
    coverImageDark: "/images/screenshots/freecom-ai.webp",
    coverImageLight: "/images/screenshots/freecom-ai.webp",
    description:
      "An open-source digital-download commerce platform with a self-hosted Store Manager Agent and cloud agent swarm for SEO, content, and support.",
    longDescription:
      "Building an open-source digital-download commerce platform with a self-hosted Store Manager Agent and a cloud agent swarm for SEO, content, marketing, analytics, and support with human approval controls. Uses Next.js 16, Supabase PostgreSQL, Trigger.dev background workers, Composio.dev, Zernio social API, and Human-in-the-Loop approval controls.",
    skills: [
      "TypeScript",
      "Next.js 16",
      "Supabase PostgreSQL",
      "Trigger.dev v4",
      "Composio.dev",
      "Zernio Social API",
      "OpenRouter",
      "Human-in-the-Loop",
    ],
    color: "from-zinc-700 to-zinc-900",
    accentColor: "#71717a",
    highlights: [
      "Building an open-source digital-download commerce platform with a self-hosted Store Manager Agent",
      "Cloud agent swarm for SEO, content, marketing, analytics, and support with human approval controls",
      "Human-in-the-Loop approval controls with budget guardrails and session kill switches",
      "Open-Core architecture using Next.js 16, Supabase, Trigger.dev, and Composio.dev",
    ],
    metrics: [
      { label: "Platform Type", value: "Open Source" },
      { label: "Core Agent", value: "Store Manager" },
      { label: "Cloud Swarm", value: "SEO, Content, Support" },
      { label: "Safety Controls", value: "Human Approval" },
    ],
    techStack: [
      {
        category: "Commerce Architecture",
        items: ["Next.js 16", "Supabase PostgreSQL", "Clerk Auth", "AWS SES"],
      },
      {
        category: "Agent System",
        items: [
          "Trigger.dev v4",
          "Composio.dev Integrations",
          "Zernio Social API",
          "OpenRouter Multi-Model",
        ],
      },
    ],
    features: [
      {
        title: "Autonomous Store Manager",
        description:
          "Monitors inventory, generates product copy, and runs marketing campaigns under approval limits.",
      },
      {
        title: "Digital Fulfillment Engine",
        description:
          "Delivers digital files securely to customers post-checkout.",
      },
    ],
  },
  {
    id: "soothly-ai",
    title: "Soothly AI",
    tagline:
      "Autonomous 8-agent revenue platform with durable workflow execution",
    badge: "Under Development",
    url: "github.com/scalewithalap/soothly-ai",
    githubUrl: "https://github.com/scalewithalap/soothly-ai",
    iconImage: "",
    coverImage: "/images/screenshots/soothly-ai.webp",
    coverImageDark: "/images/screenshots/soothly-ai.webp",
    coverImageLight: "/images/screenshots/soothly-ai.webp",
    description:
      "An autonomous revenue platform running an 8-agent ecosystem coordinated by a Superagent manager using Inngest durable functions and Supabase pgvector.",
    longDescription:
      "Building an autonomous revenue operations platform with an 8-agent ecosystem (Lead Gen, SEO, Partnership, Proposal, Competitor Intel, Revenue Recovery, Onboarding, and Customer Success) orchestrated by a central Superagent manager. Runs durable workflow functions with Inngest step execution, stores embeddings in Supabase pgvector with Row-Level Security, and features 3-tier autonomy settings (manual, smart, auto).",
    skills: [
      "TypeScript",
      "Next.js 16",
      "Supabase PostgreSQL",
      "Row-Level Security",
      "pgvector",
      "Inngest",
      "Zustand",
      "Tailwind CSS v4",
      "Gemini 3 Flash",
      "Lexical Editor",
      "ReactFlow",
      "Apify",
      "Polar",
    ],
    color: "from-purple-600 to-indigo-900",
    accentColor: "#9382ff",
    highlights: [
      "8-agent autonomous ecosystem coordinated by hub-and-spoke Superagent manager",
      "Inngest durable workflow step functions ensuring fault-tolerant execution",
      "Supabase PostgreSQL with Row-Level Security and pgvector semantic search",
      "3-tier agent autonomy settings (manual, smart, auto) with Human-in-the-Loop approval",
    ],
    metrics: [
      { label: "Agent Ecosystem", value: "8 Agents + Superagent" },
      { label: "Workflows", value: "Inngest Durable" },
      { label: "Vector Search", value: "Supabase pgvector" },
      { label: "Autonomy Tiers", value: "3 Modes" },
    ],
    techStack: [
      {
        category: "Core Engine",
        items: [
          "Next.js 16 (App Router)",
          "TypeScript",
          "Tailwind CSS v4",
          "Zustand",
        ],
      },
      {
        category: "Backend & Database",
        items: [
          "Supabase PostgreSQL",
          "Row-Level Security (RLS)",
          "pgvector",
          "Supabase Auth",
        ],
      },
      {
        category: "Orchestration & AI",
        items: [
          "Inngest Workflows",
          "Gemini 3 Flash",
          "Lexical Editor",
          "ReactFlow",
          "Apify Client",
        ],
      },
    ],
    features: [
      {
        title: "Hub-and-Spoke Superagent Manager",
        description:
          "Delegates tasks to specialized agents (Lead Gen, SEO, Proposal, Intel) without executing raw operations directly.",
      },
      {
        title: "Durable Step Execution",
        description:
          "Wraps AI calls inside Inngest step.run functions to eliminate API timeouts during background jobs.",
      },
    ],
  },
];

export const PROJECT_APP_MAPPING: Record<
  string,
  { appId: string; title: string }
> = {
  "portfolio-os": {
    appId: "folder-portfolio-os",
    title: "Portfolio OS",
  },
  vibe44: { appId: "folder-vibe44", title: "Vibe44 Marketing & MCP" },
  "vibe44-demo": {
    appId: "folder-vibe44-demo",
    title: "Vibe44 Next.js Starter Kit Demo",
  },
  openui: { appId: "folder-openui", title: "OpenUI" },
  zeroheadache: {
    appId: "folder-zeroheadache",
    title: "Zero Headache Marketing",
  },
  "zeroheadache-platform": {
    appId: "folder-zeroheadache-app",
    title: "Zero Headache Platform",
  },
  "zeroheadache-app": {
    appId: "folder-zeroheadache-app",
    title: "Zero Headache Platform",
  },
  makemesound: { appId: "folder-makemesound", title: "Make Me Sound" },
  freecom: { appId: "folder-freecom", title: "Freecom AI Store" },
  soothly: { appId: "folder-soothly-ai", title: "Soothly AI" },
};

export function getAppInfoByProjectId(
  projectId: string,
): { appId: string; title: string } | undefined {
  const cleanId = projectId
    .toLowerCase()
    .trim()
    .replace(/^folder-/, "");
  if (PROJECT_APP_MAPPING[cleanId]) return PROJECT_APP_MAPPING[cleanId];
  // Fallback matching by key substring
  const match = Object.keys(PROJECT_APP_MAPPING).find(
    (k) => cleanId.includes(k) || k.includes(cleanId),
  );
  return match ? PROJECT_APP_MAPPING[match] : undefined;
}

export function getProjectCoverImage(
  project: Project,
  theme: "dark" | "light",
): string {
  if (theme === "light" && project.coverImageLight) {
    return project.coverImageLight;
  }
  if (theme === "dark" && project.coverImageDark) {
    return project.coverImageDark;
  }
  return project.coverImage;
}
