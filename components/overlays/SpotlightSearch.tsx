/**
 * @file components/overlays/SpotlightSearch.tsx
 * @description macOS Spotlight Global Search Overlay Component.
 *
 * Responsibilities:
 * - Triggered via `Cmd/Ctrl + K` or by clicking search icons in menu bar / desktop home.
 * - Searches across system applications, portfolio project case studies, biography sections, social media links, and technical skills with instant keyword matching.
 * - Supports keyboard navigation (Up/Down arrow keys to highlight, Enter to launch) and recency-based result sorting.
 */

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
  Linkedin,
  Twitter,
  AtSign,
  Youtube,
  Instagram,
  Facebook,
  Sparkles,
  Send,
  CornerDownLeft,
  X,
  Clock,
  AppWindow,
  Folder,
  Layers,
} from "lucide-react";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import { APPS_CONFIG } from "../../config/apps.config";
import { PROJECTS_DATA } from "../../data/projectsData";

export interface SearchItem {
  id: string;
  appId: string;
  title: string;
  subtitle: string;
  category: "Application" | "Project" | "Section" | "Contact";
  icon: React.ElementType;
  color?: string;
  tags?: string[];
  keywords: string[];
  url?: string;
  actionTab?: string;
  iconImage?: string;
}

function CategoryIcon({
  category,
  className = "w-2.5 h-2.5",
}: {
  category: string;
  className?: string;
}) {
  switch (category) {
    case "Application":
      return <AppWindow className={className} />;
    case "Project":
      return <Folder className={className} />;
    case "Section":
      return <Layers className={className} />;
    case "Contact":
      return <Send className={className} />;
    default:
      return <AppWindow className={className} />;
  }
}

const SEARCH_ITEMS: SearchItem[] = [
  // Applications
  {
    id: "app-about",
    appId: "about",
    title: "About Me",
    subtitle: "About Alap, Work Experience, Education & Recognition",
    category: "Application",
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
    category: "Application",
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
    category: "Application",
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
    category: "Application",
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

  // Projects (derived dynamically from PROJECTS_DATA)
  ...PROJECTS_DATA.map((p) => ({
    id: `proj-${p.id}`,
    appId: `folder-${p.id}`,
    title: p.title,
    subtitle: p.tagline || p.description,
    category: "Project" as const,
    icon: Sparkles,
    color: "bg-blue-600 text-white",
    tags: (p.skills || []).slice(0, 4),
    keywords: [
      p.title.toLowerCase(),
      p.id,
      ...(p.skills || []).map((s) => s.toLowerCase()),
    ],
  })),

  // Section & Resume
  {
    id: "sec-general",
    appId: "about",
    actionTab: "general",
    title: "About Alap Putatunda",
    subtitle:
      "Full-Stack AI Engineer | AI-Native Product/Software Development",
    category: "Section",
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
    appId: "about",
    actionTab: "experience",
    title: "Work Experience Timeline",
    subtitle:
      "Scale with Alap (Feb 2025 – Present), Zero Headache (CEO), Pharmison Valentes (Former CTO)",
    category: "Section",
    icon: Briefcase,
    color: "bg-emerald-600 text-white",
    keywords: [
      "career",
      "experience",
      "work",
      "engineer",
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
    category: "Section",
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
    category: "Section",
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
    category: "Contact",
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
    category: "Contact",
    icon: Github,
    color: "bg-zinc-900 text-white border border-white/20",
    keywords: ["github", "open source", "git", "repos", "code", "profile"],
  },
  {
    id: "cnt-linkedin",
    appId: "external",
    url: "https://linkedin.com/in/scalewithalap",
    title: "LinkedIn Profile",
    subtitle:
      "linkedin.com/in/scalewithalap — Professional experience & connections",
    category: "Contact",
    icon: Linkedin,
    color: "bg-blue-600 text-white",
    keywords: [
      "linkedin",
      "career",
      "experience",
      "profile",
      "connect",
      "hire",
    ],
  },
  {
    id: "cnt-x",
    appId: "external",
    url: "https://x.com/scalewithalap",
    title: "X / Twitter Profile",
    subtitle: "x.com/scalewithalap — AI engineering updates & posts",
    category: "Contact",
    icon: Twitter,
    color: "bg-black text-white border border-white/20",
    keywords: ["x", "twitter", "social", "updates", "posts"],
  },
  {
    id: "cnt-threads",
    appId: "external",
    url: "https://www.threads.com/@scalewithalap",
    title: "Threads Profile",
    subtitle: "threads.com/@scalewithalap — Microblogging & AI insights",
    category: "Contact",
    icon: AtSign,
    color: "bg-zinc-800 text-white",
    keywords: ["threads", "meta", "microblogging", "social"],
  },
  {
    id: "cnt-youtube",
    appId: "external",
    url: "https://www.youtube.com/@scalewithalap",
    title: "YouTube Channel",
    subtitle: "youtube.com/@scalewithalap — Video demos & AI build tutorials",
    category: "Contact",
    icon: Youtube,
    color: "bg-red-600 text-white",
    keywords: ["youtube", "video", "channel", "tutorials", "demos"],
  },
  {
    id: "cnt-instagram",
    appId: "external",
    url: "https://www.instagram.com/scalewithalap",
    title: "Instagram Profile",
    subtitle:
      "instagram.com/scalewithalap — Visual updates & behind the scenes",
    category: "Contact",
    icon: Instagram,
    color: "bg-pink-600 text-white",
    keywords: ["instagram", "photos", "visuals", "social"],
  },
  {
    id: "cnt-facebook",
    appId: "external",
    url: "https://www.facebook.com/scalewithalap",
    title: "Facebook Page",
    subtitle: "facebook.com/scalewithalap — Community page & announcements",
    category: "Contact",
    icon: Facebook,
    color: "bg-blue-700 text-white",
    keywords: ["facebook", "fb", "page", "social"],
  },
];

const getItemRecentIndex = (item: SearchItem, recentAppIds: string[]) => {
  if (!recentAppIds || recentAppIds.length === 0) return 999;

  const rawId = item.id;
  const cleanId = rawId.replace(/^(proj|app|sec|cnt)-/, "");
  const folderId = `folder-${cleanId}`;

  for (let i = 0; i < recentAppIds.length; i++) {
    const rId = recentAppIds[i];
    if (
      rId === rawId ||
      rId === cleanId ||
      rId === folderId ||
      rId === item.appId
    ) {
      return i;
    }
  }

  return 999;
};

export default function SpotlightSearch() {
  const {
    isSpotlightOpen,
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
      className={`fixed inset-0 z-100 flex items-start justify-center pt-0 md:pt-[12.5vh] px-0 md:px-4 animate-in fade-in duration-200 ${
        isLight
          ? "bg-black/25 backdrop-blur-xs"
          : "bg-black/60 backdrop-blur-md"
      }`}
      onClick={closeSpotlight}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full h-full md:h-auto max-w-none md:max-w-2xl rounded-none md:rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col font-sans transition-all border-0 md:border ${
          isLight
            ? "bg-white/95 text-slate-900 border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
            : "bg-[#1e1e1e]/90 text-white border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* Spotlight Input Header */}
        <div
          className={`flex items-center px-4 py-3.5 border-b relative shrink-0 ${isLight ? "border-slate-200" : "border-white/10"}`}
        >
          <Search
            className={`w-4 h-4 md:w-5 md:h-5 shrink-0 mr-2 md:mr-3 ${isLight ? "text-slate-500" : "text-white/60"}`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Spotlight Search — search apps, projects, skills, experience, etc."
            className={`w-full bg-transparent text-sm md:text-[16px] focus:outline-none font-medium tracking-wide ${
              isLight
                ? "text-slate-900 placeholder:text-slate-500"
                : "text-white placeholder:text-white/60"
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
          {/* Mobile & Tablet Close Button */}
          <button
            onClick={closeSpotlight}
            className={`md:hidden p-1.25 rounded-lg shrink-0 ml-1 transition-colors cursor-pointer ${
              isLight
                ? "bg-slate-200 text-slate-900"
                : "bg-white/20 text-white/90"
            }`}
          >
            <X className="w-4.5 h-4.5" strokeWidth={2.5} />
          </button>
          {/* Desktop ESC hint */}
          <div
            className={`hidden md:flex items-center space-x-1.5 shrink-0 text-[11px] font-medium ${isLight ? "text-slate-400" : "text-white/40"}`}
          >
            <kbd
              className={`px-1.5 py-0.5 rounded border ${isLight ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-white/10 border-white/10 text-white/60"}`}
            >
              ESC
            </kbd>
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 md:max-h-105 overflow-y-auto p-2 space-y-1">
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
                No results found for {query}!
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
                    className={`flex items-center justify-between p-1.75 md:p-3 rounded-xl cursor-pointer transition-colors ${
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
                        if (item.category === "Project") {
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
                              className={`text-[10px] leading-none px-2 py-1 rounded-full font-semibold border flex items-center gap-1 ${
                                isSelected
                                  ? "bg-white/20 text-white border-white/30"
                                  : isLight
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-blue-500/30 text-blue-300 border-blue-400/30"
                              }`}
                            >
                              <CategoryIcon category={item.category} />{" "}
                              {item.category}
                            </span>
                          ) : (
                            <span
                              className={`text-[10px] leading-none px-2 py-1 flex items-center gap-1 rounded-full font-medium ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : isLight
                                    ? "bg-slate-100 text-slate-600"
                                    : "bg-white/10 text-white/60"
                              }`}
                            >
                              <CategoryIcon category={item.category} />{" "}
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs leading-3.5 md:leading-tight md:truncate mt-0.5 ${
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
                                className={`text-[10px] px-1.25 py-0.2 rounded ${
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

                    <div className="shrink-0 ml-3 hidden md:flex items-center text-white/50">
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
          className={`border-t px-4 py-2 hidden md:flex items-center justify-between text-[11px] ${
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
                ⌘ + K
              </kbd>{" "}
              to open this search box
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
