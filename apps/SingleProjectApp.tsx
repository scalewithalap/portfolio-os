/**
 * @file apps/SingleProjectApp.tsx
 * @description Dynamic Case Study Renderer Component for Portfolio Projects.
 *
 * Responsibilities:
 * - Accepts a `projectId` prop (e.g. "scalewithalap", "vibe44", "openui") and dynamically renders its complete deep-dive case study.
 * - Displays project hero banners, key engineering metrics, tech stack badges, architecture highlights, and full Markdown documentation.
 * - Provides interactive CTA buttons for launching live web app demos and opening GitHub source code repositories.
 */

import { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Layers,
  ShieldCheck,
  Cpu,
  Code2,
  Globe,
  Share2,
  Link2,
  Linkedin,
  Twitter,
  Mail,
  Facebook,
  Send,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  Project,
  PROJECTS_DATA,
  getProjectCoverImage,
} from "../data/projectsData";
import { useEcosystemStore } from "../store/useEcosystemStore";
import LazyImage from "../components/common/LazyImage";

interface SingleProjectAppProps {
  projectId: string;
}

export default function SingleProjectApp({ projectId }: SingleProjectAppProps) {
  const { openApp, systemTheme, showToast } = useEcosystemStore();
  const isLight = systemTheme === "light";
  const project: Project =
    PROJECTS_DATA.find((p) => p.id === projectId) || PROJECTS_DATA[0];
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [flashingPlatform, setFlashingPlatform] = useState<string | null>(null);
  const shareContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isShareOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        shareContainerRef.current &&
        !shareContainerRef.current.contains(event.target as Node)
      ) {
        setIsShareOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isShareOpen]);

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    showToast(`Copied ${project.title} code snippet!`, "copy");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyProjectUrl = () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://scalewithalap.com";
    const projectUrl = `${origin}/projects/${project.id}`;
    navigator.clipboard.writeText(projectUrl);
    setCopiedUrl(true);
    showToast(`Copied project URL (${project.title}) to clipboard!`, "copy");
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleShareSocial = (platform: string) => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://scalewithalap.com";
    const rawUrl = `${origin}/projects/${project.id}`;
    const shareUrl = encodeURIComponent(rawUrl);
    const shareTitle = `${project.title} - ${project.tagline}`;
    const encodedTitle = encodeURIComponent(shareTitle);

    setFlashingPlatform(platform);

    setTimeout(() => {
      setFlashingPlatform(null);
      setIsShareOpen(false);

      let url = "";
      switch (platform) {
        case "LinkedIn":
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
          break;
        case "Twitter / X":
          url = `https://x.com/intent/post?text=${encodedTitle}&url=${shareUrl}`;
          break;
        case "Facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
          break;
        case "Reddit":
          url = `https://www.reddit.com/submit?url=${shareUrl}&title=${encodedTitle}`;
          break;
        case "WhatsApp":
          url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${rawUrl}`)}`;
          break;
        case "Telegram":
          url = `https://t.me/share/url?url=${shareUrl}&text=${encodedTitle}`;
          break;
        case "Email":
          window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`Check out ${project.title}: ${rawUrl}`)}`;
          showToast(`Opened email client for ${project.title}`, "info");
          return;
      }

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }

      showToast(`Sharing ${project.title} on ${platform}`, "info");
    }, 180);
  };

  return (
    <div
      className={`flex flex-col h-full w-full max-w-full font-sans overflow-hidden select-none transition-colors duration-200 ${
        isLight ? "bg-slate-100 text-slate-900" : "bg-[#1e1e24] text-white"
      }`}
    >
      {/* Window Secondary Header */}
      <div
        className={`h-12 backdrop-blur-xl border-b px-2.5 md:px-4 flex items-center justify-between shrink-0 transition-colors relative z-30 min-w-0 flex-nowrap ${
          isLight
            ? "bg-slate-200/90 border-slate-300 text-slate-800"
            : "bg-[#282830]/90 border-white/10 text-white"
        }`}
      >
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 mr-2">
          {project.iconImage ? (
            <img
              src={project.iconImage}
              alt={project.title}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-full shadow-xs shrink-0"
            />
          ) : (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs font-bold text-xs shrink-0">
              {project.title.substring(0, 1)}
            </div>
          )}
          <div className="flex items-center min-w-0 truncate">
            <span
              className={`text-xs sm:text-sm md:text-base font-semibold truncate leading-tight ${isLight ? "text-slate-900" : "text-white"}`}
              title={project.title}
            >
              {project.title}
            </span>
            <button
              onClick={handleCopyProjectUrl}
              className={`text-xs ml-2 hidden lg:inline-flex items-center space-x-1 px-2 py-1.5 leading-none rounded-md transition-colors cursor-pointer shrink-0 ${
                isLight
                  ? "bg-slate-300 hover:bg-slate-350 text-slate-900 font-mono"
                  : "bg-white/10 hover:bg-white/20 text-white/90 font-mono"
              }`}
              title="Click to copy shareable project URL"
            >
              <span>scalewithalap.com/projects/{project.id}</span>
              <Copy className="w-3 h-3 opacity-80 ml-1" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          {/* Share Button & Popover */}
          <div ref={shareContainerRef} className="relative">
            <button
              onClick={() => setIsShareOpen(!isShareOpen)}
              className={`p-1.5 md:px-2.5 md:py-1.5 text-xs font-medium rounded-lg flex items-center md:space-x-1.5 transition-colors cursor-pointer active:scale-95 ${
                isShareOpen
                  ? "bg-blue-600 text-white shadow-xs"
                  : isLight
                    ? "bg-slate-300/80 hover:bg-slate-300 text-slate-800"
                    : "bg-white/10 hover:bg-white/20 text-white/90"
              }`}
              title="Share project"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>

            {/* Share Popover Menu */}
            {isShareOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsShareOpen(false)}
                />
                <div
                  className={`absolute right-0 top-full mt-1.5 w-64 rounded-xl border p-3 shadow-2xl z-50 space-y-1 animate-slideDown ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-800"
                      : "bg-[#282830] border-white/15 text-white"
                  }`}
                >
                  <div
                    className={`text-xs font-semibold px-1 pb-1.75 flex items-center justify-between border-b ${isLight ? "border-slate-200 text-slate-600" : "text-white/60 border-white/10"}`}
                  >
                    <span>Share this Project</span>
                  </div>

                  <button
                    onClick={handleCopyProjectUrl}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer active:scale-95 ${
                      copiedUrl
                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                        : isLight
                          ? "hover:bg-slate-100 text-slate-800"
                          : "hover:bg-white/10 text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {copiedUrl ? (
                        <Check className="w-4 h-4 text-emerald-500 animate-fadeIn" />
                      ) : (
                        <Link2 className="w-4 h-4 text-blue-500" />
                      )}
                      <span
                        className={
                          copiedUrl ? "text-emerald-500 font-semibold" : ""
                        }
                      >
                        {copiedUrl ? "Copied URL!" : "Copy Project URL"}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleShareSocial("LinkedIn")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "LinkedIn"
                        ? "bg-blue-600 text-white scale-95 shadow-md ring-2 ring-blue-400/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-blue-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-blue-900/40 text-white"
                    }`}
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>Share on LinkedIn</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("Twitter / X")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "Twitter / X"
                        ? "bg-sky-500 text-white scale-95 shadow-md ring-2 ring-sky-300/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-sky-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-sky-900/40 text-white"
                    }`}
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    <span>Share on Twitter / X</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("Facebook")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "Facebook"
                        ? "bg-blue-500 text-white scale-95 shadow-md ring-2 ring-blue-300/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-blue-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-blue-900/40 text-white"
                    }`}
                  >
                    <Facebook className="w-4 h-4 text-blue-500" />
                    <span>Share on Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("Reddit")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "Reddit"
                        ? "bg-orange-500 text-white scale-95 shadow-md ring-2 ring-orange-300/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-orange-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-orange-900/40 text-white"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-orange-500" />
                    <span>Share on Reddit</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("WhatsApp")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "WhatsApp"
                        ? "bg-green-500 text-white scale-95 shadow-md ring-2 ring-green-300/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-green-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-green-900/40 text-white"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("Telegram")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "Telegram"
                        ? "bg-sky-400 text-white scale-95 shadow-md ring-2 ring-sky-200/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-sky-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-sky-900/40 text-white"
                    }`}
                  >
                    <Send className="w-4 h-4 text-sky-400" />
                    <span>Share on Telegram</span>
                  </button>

                  <button
                    onClick={() => handleShareSocial("Email")}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      flashingPlatform === "Email"
                        ? "bg-emerald-600 text-white scale-95 shadow-md ring-2 ring-emerald-400/50"
                        : isLight
                          ? "hover:bg-slate-100 active:bg-emerald-100 text-slate-800"
                          : "hover:bg-white/10 active:bg-emerald-900/40 text-white"
                    }`}
                  >
                    <Mail className="w-4 h-4 text-emerald-500" />
                    <span>Share via Email</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-lg hidden md:flex items-center space-x-1.5 transition-colors ${
                isLight
                  ? "bg-slate-300/80 hover:bg-slate-300 text-slate-800"
                  : "bg-white/10 hover:bg-white/20 text-white/90"
              }`}
              title="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg hidden md:flex items-center space-x-1 shadow-md shadow-blue-600/30 transition-all active:scale-95 whitespace-nowrap"
              title="Visit Live Site"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 shrink-0" />
            </a>
          )}

          <button
            onClick={() => openApp("safari", "Safari")}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-lg flex items-center space-x-1 transition-colors active:scale-95 ${
              isLight
                ? "bg-slate-300/80 hover:bg-slate-300 text-slate-800"
                : "bg-white/10 hover:bg-white/20 text-white/80"
            }`}
            title="Browse all projects in Safari"
          >
            <span className="leading-none">All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container - Tabless Continuous Layout */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden max-w-full pb-24 md:pb-24 md:p-4 space-y-6 md:space-y-8 transition-colors ${
          isLight ? "bg-slate-50" : "bg-[#121215]"
        }`}
      >
        <div
          className={`relative md:rounded-[20px] overflow-hidden bg-linear-to-br ${project.color} py-4 px-3 md:p-6 border shadow-inner ${
            isLight ? "border-slate-300/60" : "border-white/15"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/15 via-transparent to-black/50 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Hero Details (Left) */}
            <div className="md:col-span-6">
              <div className="mb-2 md:mb-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg md:rounded-md bg-amber-400 text-slate-950 border border-amber-300 font-extrabold text-[10px] md:text-xs uppercase tracking-wider shadow-md shadow-amber-500/20">
                  {project.badge || project.category}
                </span>
                <span className="px-3 py-1 rounded-xl md:rounded-lg bg-black/40 border border-white/20 text-white/90 text-xs md:text-sm font-medium tracking-wide backdrop-blur-md shadow-xs">
                  {project.tagline}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight md:leading-none mb-1 md:mb-3">
                {project.title}
              </h1>

              <p className="text-white/85 text-sm md:text-base leading-tight md:leading-snug font-normal mb-3.5 md:mb-5 md:pr-12">
                {project.description}
              </p>

              {/* Desktop Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm md:text-base tracking-tight rounded-lg md:rounded-xl flex items-center space-x-1 md:space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="leading-none">Explore Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-black/40 hover:bg-black/60 border border-white/20 text-white font-medium text-sm md:text-base tracking-tight rounded-lg md:rounded-xl flex items-center space-x-1 md:space-x-2 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="leading-none">GitHub Repo</span>
                  </a>
                )}
              </div>

              {/* Skills Badges */}
              {project.skills && project.skills.length > 0 && (
                <div>
                  <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Skills I've Used
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/15 text-[11px] md:text-xs font-medium text-white/90 backdrop-blur-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Integrated Cover Image Mockup (Right) */}
            <div className="md:col-span-6">
              <div className="p-1 md:p-1.5 rounded-[18px] border border-white/20 bg-black/30 backdrop-blur-md shadow-2xl">
                <div className="relative group overflow-hidden rounded-[14px] bg-slate-950">
                  <LazyImage
                    src={getProjectCoverImage(project, systemTheme)}
                    alt={project.title}
                    containerClassName="w-full h-auto bg-slate-950"
                    className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doppelrand Metrics Ribbon Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-1 md:px-0">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-1 rounded-xl md:rounded-[20px] border transition-all ${
                isLight
                  ? "bg-slate-200/60 border-slate-300/70"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div
                className={`rounded-[7px] md:rounded-[15px] p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-inner ${
                  isLight ? "bg-white" : "bg-[#18181d]"
                }`}
              >
                <span
                  className={`text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${
                    isLight ? "text-slate-500" : "text-white/50"
                  }`}
                  title={m.label}
                >
                  {m.label}
                </span>
                <span
                  className="text-md sm:text-2xl font-black mt-1.5 sm:mt-2 font-mono tabular-nums tracking-tight truncate leading-tight"
                  style={{ color: project.accentColor }}
                  title={m.value}
                >
                  {m.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 1: Executive Summary & Architecture */}
        <div
          className={`p-1 md:p-1.5 rounded-xl md:rounded-[22px] border transition-colors shadow-xs ${
            isLight
              ? "bg-slate-200/60 border-slate-300/80"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div
            className={`rounded-lg md:rounded-2xl p-3 md:p-6 space-y-4 md:space-y-6 shadow-inner ${
              isLight ? "bg-white" : "bg-[#18181d]"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 md:w-10 md:h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-500 shrink-0">
                <Layers className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h2
                  className={`text-sm md:text-lg font-bold leading-tight md:leading-none tracking-tight mb-0.5 md:mb-1 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  Executive Summary & Architecture
                </h2>
                <p
                  className={`text-xs md:text-sm leading-tight md:leading-none ${
                    isLight ? "text-slate-800" : "text-white/80"
                  }`}
                >
                  Deep dive into system design & core implementation objectives.
                </p>
              </div>
            </div>

            <p
              className={`text-sm md:text-base leading-tight md:leading-snug ${
                isLight ? "text-slate-700" : "text-white/80"
              }`}
            >
              {project.longDescription}
            </p>

            {/* Highlights Checklist */}
            <div className="space-y-3 pt-1">
              <h3
                className={`text-xs md:text-sm font-bold uppercase tracking-wider ${
                  isLight ? "text-slate-600" : "text-white/60"
                }`}
              >
                Key Architecture Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border transition-colors ${
                      isLight
                        ? "bg-slate-50 border-slate-200/80"
                        : "bg-white/5 border-white/5"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span
                      className={`text-xs md:text-sm font-medium leading-relaxed ${
                        isLight ? "text-slate-800" : "text-white/80"
                      }`}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Core Features */}
        <div
          className={`p-1 md:p-1.5 rounded-xl md:rounded-[22px] border transition-colors shadow-xs ${
            isLight
              ? "bg-slate-200/60 border-slate-300/80"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div
            className={`rounded-lg md:rounded-2xl p-3 md:p-6 space-y-4 md:space-y-6 shadow-inner ${
              isLight ? "bg-white" : "bg-[#18181d]"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 md:w-10 md:h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h2
                  className={`text-sm md:text-lg font-bold leading-tight md:leading-none tracking-tight mb-0.5 md:mb-1 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  Core Features ({project.features.length})
                </h2>
                <p
                  className={`text-xs md:text-sm leading-tight md:leading-none ${
                    isLight ? "text-slate-800" : "text-white/80"
                  }`}
                >
                  Production capabilities and platform modules
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {project.features.map((f, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl p-3.5 md:p-4 shadow-xs space-y-1.5 md:space-y-2 transition-all active:scale-[0.99] ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200/80"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs md:text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{f.title}</span>
                  </div>
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      isLight ? "text-slate-600" : "text-white/70"
                    }`}
                  >
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Technology Stack */}
        <div
          className={`p-1 md:p-1.5 rounded-xl md:rounded-[22px] border transition-colors shadow-xs ${
            isLight
              ? "bg-slate-200/60 border-slate-300/80"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div
            className={`rounded-lg md:rounded-2xl p-3 md:p-6 space-y-4 md:space-y-6 shadow-inner ${
              isLight ? "bg-white" : "bg-[#18181d]"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 md:w-10 md:h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-500 shrink-0">
                <Cpu className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h2
                  className={`text-sm md:text-lg font-bold leading-tight md:leading-none tracking-tight mb-0.5 md:mb-1 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  Technology Stack
                </h2>
                <p
                  className={`text-xs md:text-sm leading-tight md:leading-none ${
                    isLight ? "text-slate-800" : "text-white/80"
                  }`}
                >
                  Frameworks, APIs, databases, and infrastructure tools
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-5">
              {project.techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className={`border rounded-xl p-3.5 md:p-4 shadow-xs space-y-2.5 md:space-y-3 transition-colors ${
                    isLight
                      ? "bg-slate-50/80 border-slate-200/80"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                  <h3
                    className={`text-xs md:text-sm font-bold uppercase tracking-wider ${
                      isLight ? "text-slate-600" : "text-white/60"
                    }`}
                  >
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg border text-xs md:text-sm font-medium ${
                          isLight
                            ? "bg-white border-slate-200 text-slate-800 shadow-2xs"
                            : "bg-white/10 border-white/10 text-white/90"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Implementation Code Snippet (If Exists) */}
        {project.codeSnippet && (
          <div
            className={`p-1 md:p-1.5 rounded-xl md:rounded-[22px] border transition-colors shadow-xs ${
              isLight
                ? "bg-slate-200/60 border-slate-300/80"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div
              className={`rounded-lg md:rounded-2xl p-3 md:p-6 space-y-3 md:space-y-4 shadow-inner ${
                isLight ? "bg-white" : "bg-[#18181d]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 md:w-10 md:h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shrink-0">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h2
                      className={`text-sm md:text-lg font-bold leading-tight md:leading-none tracking-tight mb-0.5 md:mb-1 ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      Implementation Code Snippet
                    </h2>
                    <p
                      className={`text-xs md:text-sm leading-tight md:leading-none ${
                        isLight ? "text-slate-800" : "text-white/80"
                      }`}
                    >
                      Actual core logic extracted from production source code
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-xl p-3.5 md:p-5 shadow-xl space-y-2.5 md:space-y-3 font-mono text-xs md:text-sm relative transition-colors ${
                  isLight
                    ? "bg-slate-900 border-slate-800 text-slate-100"
                    : "bg-[#0d0d11] border-white/10 text-white"
                }`}
              >
                <div className="flex items-center justify-between pb-2.5 md:pb-3 border-b border-white/10 text-slate-400 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>source.{project.codeSnippet.language}</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors cursor-pointer active:scale-95 text-xs"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Copied" : "Copy Snippet"}</span>
                  </button>
                </div>
                <pre className="text-blue-300 overflow-x-auto p-1.5 md:p-2 leading-relaxed text-xs md:text-sm">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Footer Contact CTA Banner */}
        <div
          className={`p-1 md:p-1.5 rounded-xl md:rounded-[22px] border transition-colors shadow-sm ${
            isLight
              ? "bg-slate-200/60 border-blue-200/80"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div
            className={`rounded-lg md:rounded-2xl p-4 md:p-8 text-center space-y-3 md:space-y-4 shadow-inner ${
              isLight
                ? "bg-linear-to-r from-blue-50 to-indigo-50 text-slate-900"
                : "bg-linear-to-r from-blue-950/40 to-slate-900 text-white"
            }`}
          >
            <h3 className="text-sm md:text-lg font-bold leading-tight md:leading-none tracking-tight">
              Interested in building a custom web system or AI pipeline?
            </h3>
            <p
              className={`text-xs md:text-sm leading-tight md:leading-none w-full ${
                isLight ? "text-slate-600" : "text-white/70"
              }`}
            >
              I engineer high-performance web platforms, Next.js starter kits,
              multi-provider LLM integrations, and desktop apps.
            </p>
            <div className="flex justify-center pt-1">
              <button
                onClick={() => openApp("mail", "Contact")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
