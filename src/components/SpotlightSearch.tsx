import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Settings,
  Compass,
  Terminal,
  Mail,
  User,
  GraduationCap,
  Award,
  Briefcase,
  Github,
  ExternalLink,
  Sparkles,
  Layout,
  Bot,
  MessageSquare,
  ShoppingBag,
  Workflow,
  Send,
  CornerDownLeft,
  X,
  Clock,
  FileText,
} from "lucide-react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { APPS_CONFIG } from "../utils/apps";
import { PROJECTS_DATA } from "../data/projectsData";

export interface SearchItem {
  id: string;
  appId: string;
  title: string;
  subtitle: string;
  category: "Applications" | "Projects" | "Sections" | "Contact & Links";
  icon: React.ElementType;
  color?: string;
  tags?: string[];
  keywords: string[];
  url?: string;
  actionTab?: string;
  iconImage?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Applications
  {
    id: "app-about",
    appId: "about",
    title: "About Me",
    subtitle: "About Alap, Work Experience, Education & Recognition",
    category: "Applications",
    icon: Settings,
    color: "bg-zinc-700 text-zinc-100",
    keywords: [
      "settings",
      "system",
      "about",
      "alap",
      "education",
      "recognition",
      "experience",
      "profile",
      "bio",
      "resume",
    ],
  },
  {
    id: "app-safari",
    appId: "safari",
    title: "Safari",
    subtitle: "Explore Featured Projects, Live Demos & Architecture",
    category: "Applications",
    icon: Compass,
    color: "bg-blue-500 text-white",
    keywords: [
      "safari",
      "projects",
      "browser",
      "portfolio",
      "work",
      "vibe44",
      "openui",
      "web",
      "apps",
    ],
  },
  {
    id: "app-terminal",
    appId: "terminal",
    title: "Terminal",
    subtitle: "Interactive CLI Shell, Tech Stack & Shell Commands",
    category: "Applications",
    icon: Terminal,
    color: "bg-black text-green-400",
    keywords: [
      "terminal",
      "cli",
      "shell",
      "bash",
      "commands",
      "skills",
      "developer",
      "code",
      "cat resume",
    ],
  },
  {
    id: "app-mail",
    appId: "mail",
    title: "Mail App",
    subtitle: "Send Email, Hire or Contact Alap Putatunda Directly",
    category: "Applications",
    icon: Mail,
    color: "bg-sky-400 text-white",
    keywords: [
      "mail",
      "email",
      "contact",
      "hire",
      "message",
      "inquiry",
      "reach out",
      "send email",
    ],
  },

  // Projects
  {
    id: "proj-scalewithalap",
    appId: "safari",
    title: "Scale with Alap",
    subtitle:
      "Interactive macOS-style Portfolio OS built by Alap Putatunda (AI Engineer & Full-stack Developer).",
    category: "Projects",
    icon: Sparkles,
    color: "bg-blue-600 text-white",
    tags: ["React 19", "Vite", "Zustand", "Web Audio"],
    keywords: [
      "scale with alap",
      "portfolio",
      "macos",
      "react 19",
      "vite",
      "zustand",
      "window manager",
      "dock",
    ],
  },
  {
    id: "proj-vibe44",
    appId: "safari",
    title: "Vibe44 Marketing & MCP",
    subtitle: "Serverless MCP server with JSON-RPC 2.0 & webhook fulfillment",
    category: "Projects",
    icon: Sparkles,
    color: "bg-indigo-600 text-white",
    tags: ["MCP", "JSON-RPC 2.0", "Next.js 16", "Creem"],
    keywords: [
      "vibe44",
      "mcp",
      "json-rpc",
      "serverless",
      "creem",
      "resend",
      "llms.txt",
      "saas",
    ],
  },
  {
    id: "proj-vibe44-demo",
    appId: "safari",
    title: "Vibe44 Next.js Starter Kit",
    subtitle:
      "165k-line Next.js 16 Next.js Starter Kit with Universal Adapter Pattern",
    category: "Projects",
    icon: Layout,
    color: "bg-blue-700 text-white",
    tags: ["Next.js 16", "Postgres", "RLS", "Trigger.dev"],
    keywords: [
      "vibe44 demo",
      "universal adapter",
      "rag",
      "pii",
      "postgres",
      "playwright",
      "vitest",
    ],
  },
  {
    id: "proj-zeroheadache",
    appId: "safari",
    title: "Zero Headache Marketing",
    subtitle: "12-channel inbound AI engine for local service businesses",
    category: "Projects",
    icon: Bot,
    color: "bg-emerald-600 text-white",
    tags: ["Next.js 16", "12 Channels", "ROI Simulator", "YC F26"],
    keywords: [
      "zero headache",
      "ai front desk",
      "inbound",
      "qualification",
      "roi simulator",
      "yc",
    ],
  },
  {
    id: "proj-zeroheadache-app",
    appId: "safari",
    title: "Zero Headache Platform",
    subtitle: "Multi-tenant dashboard with sandboxed AI agents per client",
    category: "Projects",
    icon: Bot,
    color: "bg-teal-600 text-white",
    tags: ["Supabase RLS", "OpenRouter", "LangChain", "MCP"],
    keywords: [
      "zero headache app",
      "multi-tenant",
      "sandboxed agents",
      "openrouter",
      "langchain",
      "dodo",
    ],
  },
  {
    id: "proj-openui",
    appId: "safari",
    title: "OpenUI",
    subtitle:
      "Local-first open-source UI generator & Google Stitch alternative",
    category: "Projects",
    icon: Layout,
    color: "bg-sky-600 text-white",
    tags: ["Next.js 16", "React 19", "Prisma 7", "Local First"],
    keywords: [
      "openui",
      "stitch",
      "local first",
      "prisma 7",
      "react 19",
      "tailwind v4",
      "mit",
    ],
  },
  {
    id: "proj-makemesound",
    appId: "safari",
    title: "Make Me Sound",
    subtitle:
      "Parallel multi-stream engine converting drafts into 105 tone variations",
    category: "Projects",
    icon: MessageSquare,
    color: "bg-amber-600 text-white",
    tags: ["Tone Copilot", "Sub-second", "Multi-Stream"],
    keywords: [
      "make me sound",
      "tone",
      "copilot",
      "sub-second",
      "parallel stream",
      "communication",
    ],
  },
  {
    id: "proj-freecom",
    appId: "safari",
    title: "Freecom AI",
    subtitle:
      "Open-source digital-download eCommerce platform with agent swarm",
    category: "Projects",
    icon: ShoppingBag,
    color: "bg-zinc-800 text-white",
    tags: ["Store Manager Agent", "Agent Swarm", "Digital Commerce"],
    keywords: [
      "freecom",
      "ecommerce",
      "trigger.dev",
      "composio",
      "supabase",
      "agent",
      "digital downloads",
    ],
  },

  // Sections & Resume
  {
    id: "sec-general",
    appId: "settings",
    actionTab: "general",
    title: "About Alap Putatunda",
    subtitle:
      "Founding AI Engineer & Product Builder (Remote / Visa Sponsorship)",
    category: "Sections",
    icon: User,
    color: "bg-blue-600 text-white",
    keywords: [
      "about",
      "alap",
      "putatunda",
      "location",
      "remote",
      "visa",
      "experience",
      "summary",
      "bio",
      "who is alap",
    ],
  },
  {
    id: "sec-experience",
    appId: "settings",
    actionTab: "experience",
    title: "Work Experience Timeline",
    subtitle:
      "Scale with Alap (Founder), Zero Headache (CEO), Pharmison Valentes (CTO)",
    category: "Sections",
    icon: Briefcase,
    color: "bg-emerald-600 text-white",
    keywords: [
      "career",
      "experience",
      "work",
      "founder",
      "ceo",
      "cto",
      "zero headache",
      "scale with alap",
      "pharmison valentes",
      "jobs",
      "history",
    ],
  },
  {
    id: "sec-education",
    appId: "settings",
    actionTab: "education",
    title: "Education & Academic Background",
    subtitle:
      "BCA coursework (JIS College of Engineering) & Krishnagar Collegiate School",
    category: "Sections",
    icon: GraduationCap,
    color: "bg-indigo-600 text-white",
    keywords: [
      "education",
      "degree",
      "bca",
      "jis college",
      "krishnagar collegiate school",
      "science",
      "college",
      "school",
    ],
  },
  {
    id: "sec-recognition",
    appId: "settings",
    actionTab: "recognition",
    title: "Recognition & Awards",
    subtitle:
      "The Founding 500 by Hyperagent (Airtable) — US$20,000 platform credits",
    category: "Sections",
    icon: Award,
    color: "bg-amber-600 text-white",
    keywords: [
      "recognition",
      "awards",
      "founding 500",
      "hyperagent",
      "airtable",
      "credits",
      "achievements",
    ],
  },

  // Contact & External Links
  {
    id: "cnt-email",
    appId: "mail",
    title: "Contact Alap via Email",
    subtitle: "hi@scalewithalap.com — Send direct message or hire inquiry",
    category: "Contact & Links",
    icon: Send,
    color: "bg-sky-500 text-white",
    keywords: [
      "email",
      "send email",
      "contact",
      "hi@scalewithalap.com",
      "hire",
      "consulting",
      "reach out",
    ],
  },
  {
    id: "cnt-github",
    appId: "external",
    url: "https://github.com/scalewithalap",
    title: "GitHub Profile",
    subtitle:
      "github.com/scalewithalap — Open-source repositories & source code",
    category: "Contact & Links",
    icon: Github,
    color: "bg-zinc-900 text-white border border-white/20",
    keywords: ["github", "open source", "git", "repos", "code", "profile"],
  },
];

const getItemRecentIndex = (item: SearchItem, recentAppIds: string[]) => {
  if (!recentAppIds || recentAppIds.length === 0) return 999;

  const rawId = item.id;
  const cleanId = rawId.replace(/^(proj|app)-/, "");
  const folderId = `folder-${cleanId}`;

  for (let i = 0; i < recentAppIds.length; i++) {
    const rId = recentAppIds[i];
    if (
      rId === rawId ||
      rId === cleanId ||
      rId === folderId ||
      rId === item.appId ||
      (cleanId === "scalewithalap" &&
        (rId === "folder-scalewithalap" || rId === "scalewithalap")) ||
      (cleanId === "vibe44" && (rId === "folder-vibe44" || rId === "vibe44")) ||
      (cleanId === "zeroheadache" &&
        (rId === "folder-zeroheadache" || rId === "zeroheadache")) ||
      (cleanId === "openui" && (rId === "folder-openui" || rId === "openui")) ||
      (cleanId === "makemesound" &&
        (rId === "folder-makemesound" || rId === "makemesound")) ||
      (cleanId === "freecom" &&
        (rId === "folder-freecom" || rId === "freecom")) ||
      (cleanId === "soothly-ai" &&
        (rId === "folder-soothly-ai" || rId === "soothly-ai"))
    ) {
      return i;
    }
  }

  return 999;
};

export default function SpotlightSearch() {
  const {
    isSpotlightOpen,
    openSpotlight,
    closeSpotlight,
    toggleSpotlight,
    openApp,
    recentAppIds,
    systemTheme,
  } = useEcosystemStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLight = systemTheme === "light";

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSpotlight();
      } else if (e.key === "Escape" && isSpotlightOpen) {
        e.preventDefault();
        closeSpotlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, toggleSpotlight, closeSpotlight]);

  // Focus input when opened & reset state
  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSpotlightOpen]);

  // Fuzzy filter results
  const filteredResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...SEARCH_ITEMS].sort((a, b) => {
        const rankA = getItemRecentIndex(a, recentAppIds);
        const rankB = getItemRecentIndex(b, recentAppIds);
        if (rankA !== rankB) return rankA - rankB;
        return 0;
      });
    }

    return SEARCH_ITEMS.map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const subtitle = item.subtitle.toLowerCase();
      const category = item.category.toLowerCase();

      if (title.startsWith(q)) score += 100;
      else if (title.includes(q)) score += 50;

      if (subtitle.includes(q)) score += 30;
      if (category.includes(q)) score += 15;

      item.keywords.forEach((kw) => {
        if (kw.toLowerCase().includes(q)) score += 25;
      });

      if (item.tags) {
        item.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(q)) score += 20;
        });
      }

      return { item, score };
    })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((res) => res.item);
  }, [query, recentAppIds]);

  // Keep selected index within bounds when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow key navigation and Enter selection
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length > 0
          ? (prev - 1 + filteredResults.length) % filteredResults.length
          : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    closeSpotlight();
    if (item.appId === "external" && item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      let targetId = item.appId;
      if (item.id.startsWith("proj-")) {
        const cleanId = item.id.replace("proj-", "");
        targetId = `folder-${cleanId}`;
      }
      const targetAppConfig = APPS_CONFIG.find(
        (a) => a.id === targetId || a.id === item.appId,
      );
      const appTitle = targetAppConfig ? targetAppConfig.title : item.title;
      openApp(targetId, item.title || appTitle);
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200 ${
        isLight
          ? "bg-black/25 backdrop-blur-xs"
          : "bg-black/60 backdrop-blur-md"
      }`}
      onClick={closeSpotlight}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col font-sans transition-all border ${
          isLight
            ? "bg-white/95 text-slate-900 border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
            : "bg-[#1e1e1e]/90 text-white border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* Spotlight Input Header */}
        <div
          className={`flex items-center px-4 py-3.5 border-b relative ${isLight ? "border-slate-200" : "border-white/10"}`}
        >
          <Search
            className={`w-5 h-5 shrink-0 mr-3 ${isLight ? "text-slate-400" : "text-white/50"}`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Spotlight Search — search apps, projects, skills, contact..."
            className={`w-full bg-transparent text-[16px] focus:outline-none font-medium tracking-wide ${
              isLight
                ? "text-slate-900 placeholder:text-slate-400"
                : "text-white placeholder:text-white/40"
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className={`p-1 rounded-full transition-colors mr-2 cursor-pointer ${
                isLight
                  ? "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                  : "text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div
            className={`flex items-center space-x-1.5 shrink-0 text-[11px] font-medium ${isLight ? "text-slate-400" : "text-white/40"}`}
          >
            <kbd
              className={`px-1.5 py-0.5 rounded border ${isLight ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-white/10 border-white/10 text-white/60"}`}
            >
              ESC
            </kbd>
            <span>close</span>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-105 overflow-y-auto p-2 space-y-1">
          {!query && (
            <div
              className={`px-3 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${isLight ? "text-blue-600" : "text-blue-400"}`}
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.25 h-3.25" /> Recent Projects & Files
              </span>
            </div>
          )}

          {filteredResults.length === 0 ? (
            <div
              className={`py-12 text-center space-y-1 ${isLight ? "text-slate-500" : "text-white/50"}`}
            >
              <p
                className={`text-[14px] font-medium ${isLight ? "text-slate-800" : "text-white/70"}`}
              >
                No results found for "{query}"
              </p>
              <p
                className={`text-[12px] ${isLight ? "text-slate-400" : "text-white/40"}`}
              >
                Try searching for 'vibe44', 'education', 'skills', or 'email'
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;
              const showAllHeader = !query && index === 6;

              return (
                <React.Fragment key={item.id}>
                  {showAllHeader && (
                    <div
                      className={`px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider border-t mt-2 ${
                        isLight
                          ? "text-slate-400 border-slate-200"
                          : "text-white/40 border-white/10"
                      }`}
                    >
                      Applications & Shortcuts
                    </div>
                  )}

                  <div
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isLight
                          ? "hover:bg-slate-100 text-slate-800"
                          : "hover:bg-white/5 text-white/90"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                      {(() => {
                        let img = item.iconImage;
                        if (item.category === "Projects") {
                          const cleanId = item.id.replace(/^proj-/, "");
                          const proj = PROJECTS_DATA.find(
                            (p) =>
                              p.id === cleanId ||
                              cleanId.includes(p.id) ||
                              p.id.includes(cleanId),
                          );
                          if (proj?.iconImage) {
                            img = proj.iconImage;
                          }
                        }
                        if (!img) {
                          const targetAppConfig = APPS_CONFIG.find(
                            (a) => a.id === item.appId,
                          );
                          img = targetAppConfig?.iconImage;
                        }
                        if (img) {
                          return (
                            <img
                              src={img}
                              alt={item.title}
                              className="w-10 h-10 object-contain drop-shadow-sm shrink-0"
                            />
                          );
                        }
                        return (
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                              item.color ||
                              (isLight
                                ? "bg-slate-100 text-slate-800"
                                : "bg-white/10 text-white")
                            }`}
                          >
                            <Icon className="w-5 h-5" strokeWidth={2} />
                          </div>
                        );
                      })()}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-[14px] truncate">
                            {item.title}
                          </span>
                          {!query && index < 6 ? (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 ${
                                isSelected
                                  ? "bg-white/20 text-white border-white/30"
                                  : isLight
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-blue-500/30 text-blue-300 border-blue-400/30"
                              }`}
                            >
                              <Clock className="w-2.5 h-2.5" /> Recent
                            </span>
                          ) : (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : isLight
                                    ? "bg-slate-100 text-slate-600"
                                    : "bg-white/10 text-white/60"
                              }`}
                            >
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[12px] truncate mt-0.5 ${
                            isSelected
                              ? "text-white/90"
                              : isLight
                                ? "text-slate-500"
                                : "text-white/60"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex items-center space-x-1.5 mt-1.5 flex-wrap gap-y-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] px-1.5 py-0.2 rounded ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : isLight
                                      ? "bg-slate-100 text-slate-600 border border-slate-200"
                                      : "bg-white/5 text-white/50 border border-white/10"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 ml-3 flex items-center text-white/50">
                      {isSelected && (
                        <span className="flex items-center text-[12px] font-medium text-white/90 bg-white/20 px-2 py-1 rounded-lg">
                          Open <CornerDownLeft className="w-3.5 h-3.5 ml-1" />
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div
          className={`border-t px-4 py-2 flex items-center justify-between text-[11px] ${
            isLight
              ? "bg-slate-50 border-slate-200 text-slate-500"
              : "bg-black/30 border-white/10 text-white/40"
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <kbd
                className={`px-1 rounded border ${isLight ? "bg-slate-200 border-slate-300 text-slate-700" : "bg-white/10 border-white/10 text-white/60"}`}
              >
                ↑
              </kbd>
              <kbd
                className={`px-1 rounded border ${isLight ? "bg-slate-200 border-slate-300 text-slate-700" : "bg-white/10 border-white/10 text-white/60"}`}
              >
                ↓
              </kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd
                className={`px-1.5 rounded border ${isLight ? "bg-slate-200 border-slate-300 text-slate-700" : "bg-white/10 border-white/10 text-white/60"}`}
              >
                ↵
              </kbd>
              <span>select</span>
            </span>
          </div>
          <div>
            <span>
              Press{" "}
              <kbd
                className={`px-1.5 py-0.5 rounded border ${isLight ? "bg-slate-200 border-slate-300 text-slate-700" : "bg-white/10 border-white/10 text-white/60"}`}
              >
                ⌘K
              </kbd>{" "}
              anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
