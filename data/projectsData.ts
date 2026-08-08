export interface Project {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  category:
    | "Next.js Starter Kit"
    | "Open Source"
    | "AI Agents"
    | "Desktop App"
    | "eCommerce"
    | "Portfolio"
    | "AI Studio";
  url: string;
  demoUrl?: string;
  githubUrl?: string;
  iconImage: string;
  coverImage: string;
  coverImageLight?: string;
  coverImageDark?: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  accentColor: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  techStack: { category: string; items: string[] }[];
  features: { title: string; description: string }[];
  codeSnippet?: { language: string; code: string };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "scalewithalap",
    title: "Scale with Alap (This site)",
    tagline:
      "Interactive macOS-style Portfolio OS built by Alap Putatunda.",
    badge: "Shipped & Live",
    category: "Portfolio",
    url: "scalewithalap.com",
    demoUrl: "https://scalewithalap.com",
    githubUrl: "https://github.com/scalewithalap/portfolio-os",
    iconImage: "/icons/Scale with Alap.png",
    coverImage: "/images/screenshots/scalewithalap-dark.webp",
    coverImageDark: "/images/screenshots/scalewithalap-dark.webp",
    coverImageLight: "/images/screenshots/scalewithalap-light.webp",
    description:
      "A 39-file React 19 application recreating macOS and iOS desktop environments with custom window management and Web Audio synthesis.",
    longDescription:
      "Built a 39-file application that recreates macOS and iOS windowing systems, featuring a custom window manager for drag, 8-axis resize, edge snapping, and z-index ordering. Manages state in a 755-line Zustand and Immer store, code-splits 13 apps with React.lazy and Suspense, and uses a requestAnimationFrame dock magnification system with GPU-accelerated transforms.",
    tags: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind v4",
      "Zustand",
      "Immer",
      "Web Audio API",
    ],
    color: "from-blue-600 to-indigo-900",
    accentColor: "#3b82f6",
    highlights: [
      "Custom window geometry manager with drag, resize, quadrant snap, and z-index ordering",
      "30+ UI state fields in Zustand/Immer store across 13 code-split React apps",
      "requestAnimationFrame dock magnification with cosine scaling & GPU transforms",
      "Theme toggle engine, Web Audio API synthesis, and touch gesture support",
    ],
    metrics: [
      { label: "App Files", value: "39 Files" },
      { label: "State Fields", value: "30+ Fields" },
      { label: "Lazy Apps", value: "13 Apps" },
      { label: "Dock Target", value: "GPU-Accelerated" },
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
          "Handles window dragging, 8-axis resizing, edge snapping, and z-index ordering across desktop displays.",
      },
      {
        title: "Cosine Magnification Dock",
        description:
          "Calculates cursor proximity in real time to apply fluid scale transforms to dock icon items.",
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
    title: "Vibe44 Marketing Site",
    tagline: "Marketing site & Model Context Protocol server for Vibe44",
    badge: "Shipped & Live",
    category: "Next.js Starter Kit",
    url: "vibe44.com",
    demoUrl: "https://vibe44.com",
    githubUrl: "https://github.com/scalewithalap",
    iconImage: "/icons/Vibe44.png",
    coverImage: "/images/screenshots/vibe44-dark.webp",
    coverImageDark: "/images/screenshots/vibe44-dark.webp",
    coverImageLight: "/images/screenshots/vibe44-light.webp",
    description:
      "A serverless Model Context Protocol server exposing 6 tools, 4 resource templates, /llms.txt endpoints, and Creem payment webhook fulfillment.",
    longDescription:
      "Built a serverless MCP server implementing JSON-RPC 2.0 with 6 tools, 4 resource templates, rate limiting, and /llms.txt documentation endpoints for AI agent and RAG ingestion. Handles automated webhook fulfillment from Creem payments to GitHub repository access, single-use Cal.com booking link generation, Resend email dispatch, and Notion CRM synchronization with idempotency guards.",
    tags: [
      "Next.js 16",
      "Model Context Protocol",
      "JSON-RPC 2.0",
      "Creem Webhooks",
      "Resend",
      "Notion API",
    ],
    color: "from-indigo-600 to-slate-900",
    accentColor: "#6366f1",
    highlights: [
      "Serverless MCP server with JSON-RPC 2.0, 6 tools & 4 resource templates",
      "Automated Creem payment webhook processing with idempotency guards",
      "Single-use Cal.com booking links and GitHub repository access automated on purchase",
      "/llms.txt endpoint formatted for agent and RAG documentation indexing",
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
        title: "Agent Ingestion Pipeline",
        description:
          "Exposes structured documentation tools and resource endpoints for AI coding agents.",
      },
      {
        title: "Webhook Fulfillment Engine",
        description:
          "Grants repository access, sends booking credentials, and updates CRM records upon purchase.",
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
    tagline: "Fully managed AI front desk for local service businesses",
    badge: "Shipped & Live",
    category: "AI Agents",
    url: "zeroheadache.co",
    demoUrl: "https://zeroheadache.co",
    iconImage: "/icons/Zero Headache.png",
    coverImage: "/images/screenshots/zeroheadache.webp",
    coverImageDark: "/images/screenshots/zeroheadache.webp",
    coverImageLight: "/images/screenshots/zeroheadache.webp",
    description:
      "A 12-channel inbound lead engine with 10 qualification playbooks, 35+ CRM integrations, and interactive ROI simulator.",
    longDescription:
      "Built a conversion-first marketing and lead intake engine across 12 inbound communication channels. Features 10 industry qualification playbooks (plumbing, HVAC, legal, dental, home services), 35+ CRM webhook integrations with Google Sheets fallback, interactive lead-loss ROI calculator, JSON-LD structured schema across 40+ routes, and Lenis smooth scrolling with GSAP ScrollTrigger animations in a ~17,200-line Next.js 16 codebase.",
    tags: [
      "Next.js 16",
      "React 19",
      "Tailwind v4",
      "GSAP ScrollTrigger",
      "Lenis",
      "JSON-LD",
    ],
    color: "from-emerald-600 to-teal-900",
    accentColor: "#10b981",
    highlights: [
      "12-channel inbound engine with 10 industry qualification playbooks",
      "35+ CRM integration architecture with automated Google Sheets fallback",
      "Interactive lead-loss ROI simulator & machine-readable LLM index",
      "17,200-line Next.js 16 codebase with structured JSON-LD across 40+ routes",
    ],
    metrics: [
      { label: "Inbound Channels", value: "12 Channels" },
      { label: "CRM Integrations", value: "35+ Systems" },
      { label: "Routes", value: "40+ Routes" },
      { label: "Codebase", value: "~17.2k Lines" },
    ],
    techStack: [
      {
        category: "Marketing Engine",
        items: ["Next.js 16", "React 19", "Tailwind CSS v4", "Lucide Icons"],
      },
      {
        category: "Animations & UI",
        items: ["GSAP + ScrollTrigger", "Motion", "Lenis Smooth Scroll"],
      },
      {
        category: "Architecture & Data",
        items: [
          "35+ CRM Webhook System",
          "Google Sheets Fallback API",
          "JSON-LD Schema",
        ],
      },
    ],
    features: [
      {
        title: "Lead-Loss ROI Simulator",
        description:
          "Calculates missed revenue based on call volume, response times, and average job ticket values.",
      },
      {
        title: "Industry Qualification Playbooks",
        description:
          "Structures pre-configured intake logic for plumbing, HVAC, legal, dental, and home services.",
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
    title: "Vibe44 (Next.js 16 Starter Kit)",
    tagline:
      "687-file Next.js 16 starter kit engine with Universal Adapter Pattern",
    badge: "Shipped & Live",
    category: "Next.js Starter Kit",
    url: "demo.vibe44.com",
    demoUrl: "https://demo.vibe44.com",
    iconImage: "/icons/Vibe44.png",
    coverImage: "/images/screenshots/vibe44-demo-dark.webp",
    coverImageDark: "/images/screenshots/vibe44-demo-dark.webp",
    coverImageLight: "/images/screenshots/vibe44-demo-light.webp",
    description:
      "A 687-file, ~165,000-line Next.js 16 engine featuring multi-provider LLM orchestration, 5 payment gateways, and a 32-table PostgreSQL schema.",
    longDescription:
      "Built a 687-file, ~165,000-line Next.js 16 engine across ~810 files using a Universal Adapter Pattern. Supports 4 LLM providers (Anthropic, OpenAI, Gemini, DeepSeek) with PII redaction and structured output generation. Integrates 5 payment gateways (Stripe, Dodo Payments, Polar, Lemon Squeezy, Creem), Drizzle ORM over PostgreSQL with Supabase RLS, Trigger.dev v4 background jobs, Upstash Redis/QStash, WebAuthn authentication, and Sentry telemetry; validated by 900+ unit tests across 84 Vitest suites and 9 Playwright E2E test suites.",
    tags: [
      "Next.js 16",
      "React 19",
      "PostgreSQL",
      "Drizzle ORM",
      "Trigger.dev",
      "Vitest",
      "Playwright",
    ],
    color: "from-blue-600 to-cyan-900",
    accentColor: "#0284c7",
    highlights: [
      "Universal Adapter Pattern supporting 4 LLM providers with automatic fallback",
      "PII-redacting RAG context pipeline and structured output generation",
      "5 payment gateways, 9 analytics integrations, and 4 email providers",
      "32-table Postgres/RLS schema covered by 900+ unit tests & 9 Playwright suites",
    ],
    metrics: [
      { label: "Codebase Size", value: "~165k Lines" },
      { label: "Source Files", value: "687 Files" },
      { label: "Unit Tests", value: "900+ Tests" },
      { label: "DB Tables", value: "32 Tables" },
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
    category: "AI Agents",
    url: "app.zeroheadache.co",
    demoUrl: "https://app.zeroheadache.co",
    iconImage: "/icons/Zero Headache.png",
    coverImage: "/images/screenshots/zeroheadache-app.webp",
    coverImageDark: "/images/screenshots/zeroheadache-app.webp",
    coverImageLight: "/images/screenshots/zeroheadache-app.webp",
    description:
      "Multi-tenant Next.js 16 platform running sandboxed AI agents with persistent memory, OpenRouter failover, and Supabase RLS.",
    longDescription:
      "Building from scratch a Next.js 16 platform that runs one sandboxed AI Agent per client with persistent memory and self-refining communication skills; OpenRouter provides multi-model routing and automatic failover. Connects channels and tools through MCP, with per-client Supabase RLS, Trigger.dev pipelines, PostHog/Langfuse observability, Dodo billing, and a LangChain operations orchestrator that requests permission before difficult actions.",
    tags: [
      "Next.js 16",
      "Supabase RLS",
      "OpenRouter",
      "LangChain",
      "MCP",
      "Trigger.dev",
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
    tagline: "Local-first, MIT-licensed open-source UI component generator",
    badge: "Shipped & Open Source",
    category: "Open Source",
    url: "github.com/scalewithalap/openui",
    githubUrl: "https://github.com/scalewithalap/openui",
    iconImage: "/icons/OpenUI.png",
    coverImage: "/images/screenshots/openui-dark.webp",
    coverImageDark: "/images/screenshots/openui-dark.webp",
    coverImageLight: "/images/screenshots/openui-light.webp",
    description:
      "An MIT-licensed UI generator running local component synthesis across multiple LLM providers without cloud database dependencies.",
    longDescription:
      "Built an MIT-licensed, provider-agnostic platform for generating React and TypeScript component code locally without cloud databases, user tracking, or subscription requirements. Built with Next.js 16, React 19, Prisma 7 with SQLite, Tailwind CSS v4, and Redux Toolkit; connects directly to local or cloud LLMs via Vercel AI SDK and OpenRouter.",
    tags: [
      "Next.js 16",
      "React 19",
      "Prisma 7",
      "Tailwind v4",
      "SQLite",
      "MIT License",
    ],
    color: "from-sky-600 to-blue-900",
    accentColor: "#0284c7",
    highlights: [
      "MIT-licensed local-first platform requiring no cloud database or login",
      "Provider-agnostic LLM interface for component code generation",
      "Built with Next.js 16, React 19, Prisma 7, SQLite, and Tailwind CSS v4",
      "Exports clean React and TypeScript component structures directly to disk",
    ],
    metrics: [
      { label: "License", value: "MIT" },
      { label: "Cloud Auth", value: "None Required" },
      { label: "Cloud DB", value: "Zero Dependence" },
      { label: "Stack", value: "React 19 + Prisma 7" },
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
          "Provider Agnostic (Ollama, OpenAI, Anthropic, Gemini, OpenRouter)",
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
    tagline: "AI communication copilot with 105-tone transformation matrix",
    badge: "Under Development",
    category: "Desktop App",
    url: "makemesound.xyz",
    demoUrl: "https://makemesound.xyz",
    iconImage: "",
    coverImage: "/images/screenshots/makemesound-light.webp",
    coverImageDark: "/images/screenshots/makemesound-dark.webp",
    coverImageLight: "/images/screenshots/makemesound-light.webp",
    description:
      "A parallel multi-stream engine converting drafts into 105 tone variations across 15 categories with sub-second streaming speed.",
    longDescription:
      "Building an AI communication copilot with a 105-tone matrix (15 categories with 7 sub-variants each) for precise linguistic adjustments. Employs a parallel multi-stream engine on Next.js 16 and OpenRouter for sub-second streaming responses. Uses Supabase RLS, Upstash Redis rate limiting, Lemonsqueezy subscription billing, and a cross-platform architecture expanding to Tauri v2 desktop floating toolboxes and WXT browser extensions.",
    tags: [
      "Next.js 16",
      "Vercel AI SDK",
      "OpenRouter",
      "Supabase",
      "Upstash Redis",
      "Lemonsqueezy",
    ],
    color: "from-amber-600 to-orange-900",
    accentColor: "#f59e0b",
    highlights: [
      "Parallel multi-stream generation engine returning sub-second streaming responses",
      "105 distinct communication tone variations across 15 structured categories",
      "Cross-platform architecture expanding across web, Tauri v2 desktop, and WXT browser extension",
      "Custom dictionary enforcement and system prompt safety boundaries",
    ],
    metrics: [
      { label: "Tone Variations", value: "105 Tones" },
      { label: "Generation Speed", value: "Sub-second" },
      { label: "Stream Engine", value: "Parallel" },
      { label: "Platforms", value: "Web, Desktop, Extension" },
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
      "Open-source digital download eCommerce platform with autonomous agent swarm",
    badge: "Under Development & Open Sourced",
    category: "eCommerce",
    url: "github.com/scalewithalap/freecom-ai",
    githubUrl: "https://github.com/scalewithalap/freecom-ai",
    iconImage: "",
    coverImage: "/images/screenshots/freecom-ai.webp",
    coverImageDark: "/images/screenshots/freecom-ai.webp",
    coverImageLight: "/images/screenshots/freecom-ai.webp",
    description:
      "An open-source digital product commerce platform featuring a self-hosted Store Manager Agent and cloud agent swarm.",
    longDescription:
      "Building an open-source digital download commerce platform with an Open-Core architecture. Combines a self-hosted Store Manager Agent for inventory and checkout management with a cloud agent swarm (SEO, Content, Marketing, Analytics, Customer Support). Uses Next.js 16, Supabase PostgreSQL, Trigger.dev background workers, Composio.dev, Zernio social API, and Human-in-the-Loop approval controls.",
    tags: [
      "Open Source",
      "eCommerce",
      "Next.js 16",
      "Supabase",
      "Trigger.dev",
      "Composio",
      "Zernio API",
    ],
    color: "from-zinc-700 to-zinc-900",
    accentColor: "#71717a",
    highlights: [
      "Self-hosted Store Manager Agent automating digital product inventory and checkout operations",
      "Cloud agent swarm managing SEO audits, marketing campaigns, and customer support tickets",
      "Human-in-the-Loop approval controls with budget guardrails and session kill switches",
      "Open-Core architecture using Next.js 16, Supabase, Trigger.dev, and Composio.dev",
    ],
    metrics: [
      { label: "Platform Type", value: "Open Source" },
      { label: "Core Agent", value: "Store Manager" },
      { label: "Cloud Swarm", value: "SEO, Marketing, Support" },
      { label: "Safety Controls", value: "Human-in-the-Loop" },
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
    badge: "Under Development & Open Sourced",
    category: "AI Agents",
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
    tags: [
      "Next.js 16",
      "Supabase",
      "Inngest",
      "pgvector",
      "Lexical",
      "Polar",
      "Apify",
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
  scalewithalap: { appId: "folder-scalewithalap", title: "Scale with Alap" },
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
  "soothly-ai": { appId: "folder-soothly-ai", title: "Soothly AI" },
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
