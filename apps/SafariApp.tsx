/**
 * @file apps/SafariApp.tsx
 * @description Simulated macOS Safari Browser Window Component.
 *
 * Responsibilities:
 * - Recreates a simulated web browser UI complete with URL address bar, back/forward navigation history, reload animation, and tab toggles.
 * - Displays a grid/list catalog of all 9 portfolio project case studies with search filtering and category tags.
 * - Allows opening dedicated project windows or launching live project URLs in external browser tabs.
 */

import React, { useState, useMemo, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Search,
  ExternalLink,
  Github,
  Sparkles,
  Grid,
  List,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  Project,
  PROJECTS_DATA,
  getProjectCoverImage,
} from "../data/projectsData";
import { useEcosystemStore } from "../store/useEcosystemStore";
import LazyImage from "../components/common/LazyImage";

function TiltProjectCard({
  project,
  isLight,
  openApp,
}: {
  key?: React.Key;
  project: Project;
  isLight: boolean;
  openApp: (id: string, title: string) => void;
  setSelectedProject: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  );
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
    );
    setGlareStyle({
      opacity: 0.15,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: transform.includes("scale3d(1, 1, 1)")
          ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.08s ease-out",
      }}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        isLight
          ? "bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-blue-500/50"
          : "bg-[#111115] border-white/10 shadow-2xl hover:border-blue-500/40 hover:shadow-blue-500/10"
      }`}
    >
      {/* Outer Core Shell */}
      <div className="relative flex flex-col overflow-hidden h-full">
        {/* Dynamic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[1.125rem]"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.8), transparent 60%)`,
          }}
        />

        {/* Cover Image */}
        <div className="relative w-full h-auto overflow-hidden bg-slate-950/80 border-b border-white/10">
          <LazyImage
            src={getProjectCoverImage(project, isLight ? "light" : "dark")}
            alt={project.title}
            containerClassName="w-full h-auto"
            className="w-full h-auto block object-contain"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Project Icon Floating Over Image */}
          {project.iconImage && (
            <div className="absolute top-3 right-3 backdrop-blur-md rounded-full shadow-lg z-10">
              <img
                src={project.iconImage}
                alt={project.title}
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Category Tag & Action */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide ${
                  project.badge.includes("Under Development")
                    ? isLight
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-amber-500/15 border-amber-500/30 text-amber-300"
                    : project.badge.includes("Open Source")
                      ? isLight
                        ? "bg-purple-50 border-purple-300 text-purple-800"
                        : "bg-purple-500/15 border-purple-500/30 text-purple-300"
                      : isLight
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                }`}
              >
                {project.badge || project.category}
              </span>
              <a
                href={project.demoUrl || `https://${project.url}`}
                target="_blank"
                rel="noreferrer"
                className={`p-1.5 rounded-lg transition-colors ${
                  isLight
                    ? "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                    : "text-white/40 hover:text-white hover:bg-white/10"
                }`}
                title="Open External Site"
              >
                {project.demoUrl ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <Github className="w-4 h-4" />
                )}
              </a>
            </div>

            {/* Title */}
            <h3
              className={`text-lg font-bold tracking-tight group-hover:text-blue-500 transition-colors ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`text-xs font-medium mb-3 ${isLight ? "text-slate-500" : "text-white/50"}`}
            >
              {project.tagline}
            </p>

            {/* Description */}
            <p
              className={`text-xs leading-relaxed line-clamp-3 ${
                isLight ? "text-slate-600" : "text-white/80"
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Metrics Row with Tabular Numbers */}
          <div
            className={`grid grid-cols-2 gap-2 py-2 border-y text-[11px] ${
              isLight ? "border-slate-200" : "border-white/5"
            }`}
          >
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-2 text-center ${
                  isLight ? "bg-slate-100" : "bg-white/5"
                }`}
              >
                <span
                  className={`text-[9px] block uppercase font-medium tracking-wider ${isLight ? "text-slate-400" : "text-white/40"}`}
                >
                  {m.label}
                </span>
                <span
                  className={`font-bold mt-0.5 block font-mono ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.skills || []).slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-md border text-[10px] ${
                  isLight
                    ? "bg-slate-100 border-slate-200 text-slate-700"
                    : "bg-white/5 border-white/5 text-white/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer Buttons with Nested Button-in-Button Icon Physics */}
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => openApp(`folder-${project.id}`, project.title)}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-between transition-all active:scale-95 shadow-md shadow-blue-600/20 cursor-pointer group/btn"
            >
              <span>Open Folder</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SafariApp() {
  const { openApp, systemTheme } = useEcosystemStore();
  const isLight = systemTheme === "light";
  const [selectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy] = useState<"latest" | "category" | "techStack">("latest");
  const setSelectedProject = (project: Project | null) => {
    if (project) {
      openApp(`folder-${project.id}`, project.title);
    }
  };
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort projects by category, search, and sort option
  const filteredProjects = useMemo(() => {
    const list = PROJECTS_DATA.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "ai" &&
          (p.category === "AI Agents" ||
            p.category === "Open Source" ||
            p.category === "Next.js Starter Kit"));

      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.skills || []).some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });

    const sorted = [...list];
    if (sortBy === "category") {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "techStack") {
      sorted.sort(
        (a, b) =>
          (b.skills || []).length - (a.skills || []).length ||
          a.title.localeCompare(b.title),
      );
    }
    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredProject = PROJECTS_DATA[0]; // Vibe44

  return (
    <div
      className={`flex flex-col h-full w-full font-sans overflow-hidden select-none transition-colors duration-200 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#1e1e24] text-white"
      }`}
    >
      {/* Safari Navigation Bar */}
      <div
        className={`h-12 border-b px-3 flex items-center justify-between shrink-0 z-20 transition-colors ${
          isLight
            ? "bg-slate-200/90 border-slate-300 text-slate-800"
            : "bg-[#282830] border-white/10 text-white"
        }`}
      >
        {/* Nav Buttons */}
        <div
          className={`flex items-center space-x-2 ${isLight ? "text-slate-600" : "text-white/50"}`}
        >
          <button
            className={`p-1 rounded-md transition-colors cursor-pointer ${isLight ? "hover:bg-slate-300 hover:text-slate-900" : "hover:bg-white/10 hover:text-white"}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className={`p-1 rounded-md transition-colors cursor-pointer ${isLight ? "hover:bg-slate-300 hover:text-slate-900" : "hover:bg-white/10 hover:text-white"}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            className={`p-1 rounded-md transition-colors cursor-pointer ml-1 ${isLight ? "hover:bg-slate-300 hover:text-slate-900" : "hover:bg-white/10 hover:text-white"}`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address & Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div
            className={`w-full h-8 rounded-lg border px-3 flex items-center space-x-2 shadow-inner focus-within:border-blue-500/80 transition-all ${
              isLight
                ? "bg-white border-slate-300 text-slate-800"
                : "bg-[#18181d] border-white/10 text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span
              className={`text-xs font-medium select-all ${isLight ? "text-slate-800" : "text-white/90"}`}
            >
              https://scalewithalap.com/projects
            </span>
            <div
              className={`h-3 w-px ml-1 mr-2.5 ${isLight ? "bg-slate-300" : "bg-white/20"}`}
            />
            <Search
              className={`w-3.5 h-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-white/40"}`}
            />
            <input
              type="text"
              placeholder="Search products, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent text-xs focus:outline-none ${
                isLight
                  ? "text-slate-900 placeholder:text-slate-400"
                  : "text-white placeholder:text-white/40"
              }`}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div
          className={`flex items-center space-x-1 p-1 rounded-lg border ${
            isLight
              ? "bg-slate-300/50 border-slate-300"
              : "bg-black/30 border-white/10"
          }`}
        >
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded-md transition-colors ${
              viewMode === "grid"
                ? isLight
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white/20 text-white"
                : isLight
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-white/50 hover:text-white"
            }`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-md transition-colors ${
              viewMode === "list"
                ? isLight
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white/20 text-white"
                : isLight
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-white/50 hover:text-white"
            }`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Safari Body (Sidebar + Content Area) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Apple macOS Sidebar */}
        <div
          className={`w-56 border-r p-4 shrink-0 flex-col justify-between hidden md:flex transition-colors ${
            isLight
              ? "bg-slate-100/80 border-slate-200"
              : "bg-[#18181d] border-white/10"
          }`}
        >
          <div className="space-y-6">
            {/* Quick Links */}
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 ${
                  isLight ? "text-slate-400" : "text-white/40"
                }`}
              >
                Quick Access
              </span>
              <div className="mt-2 space-y-1">
                <button
                  onClick={() => openApp("resume", "My Resume")}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isLight
                      ? "text-slate-700 hover:bg-slate-200"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>My Resume</span>
                </button>
                <button
                  onClick={() => openApp("mail", "Contact")}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isLight
                      ? "text-slate-700 hover:bg-slate-200"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hire / Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div
            className={`border rounded-xl p-3 text-xs ${
              isLight
                ? "bg-white border-slate-200 text-slate-600"
                : "bg-white/5 border-white/5 text-white/60"
            }`}
          >
            <span
              className={`font-semibold block ${isLight ? "text-slate-900" : "text-white"}`}
            >
              Alap Putatunda
            </span>
            <span>Founding AI Engineer</span>
          </div>
        </div>

        {/* Main Content Scroll Area */}
        <div
          className={`flex-1 overflow-y-auto p-6 md:p-8 space-y-8 transition-colors ${
            isLight ? "bg-slate-100/40" : "bg-[#121215]"
          }`}
        >
          {/* Featured Hero Banner */}
          {selectedCategory === "all" && !searchQuery && (
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-fuchsia-900 via-indigo-900 to-slate-900 border border-white/15 shadow-2xl p-6 sm:p-8">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Featured Flagship Architecture</span>
                  </div>

                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {featuredProject.title}
                  </h2>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {featuredProject.description}
                  </p>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => openApp("folder-vibe44", "Vibe44 AI Kit")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                    >
                      <span>Open Vibe44 Folder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedProject(featuredProject)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all"
                    >
                      View Architecture Sheet
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
                  {featuredProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-black/40 border border-white/10 rounded-xl p-3 backdrop-blur-md text-center"
                    >
                      <span className="text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                        {m.label}
                      </span>
                      <span className="text-lg font-bold text-fuchsia-300 mt-0.5 block">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section Heading */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div>
              <h1
                className={`text-xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}
              >
                Products & Repositories
              </h1>
              <p
                className={`text-xs mt-0.5 ${isLight ? "text-slate-500" : "text-white/50"}`}
              >
                Showing {filteredProjects.length} engineering applications
              </p>
            </div>
          </div>

          {/* Grid / List Layout */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <TiltProjectCard
                  key={project.id}
                  project={project}
                  isLight={isLight}
                  openApp={openApp}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isLight
                      ? "bg-white border-slate-200/80 hover:border-blue-400"
                      : "bg-[#18181d] border-white/10 hover:border-blue-500/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative shrink-0">
                      <LazyImage
                        src={getProjectCoverImage(
                          project,
                          isLight ? "light" : "dark",
                        )}
                        alt={project.title}
                        containerClassName="w-14 h-14 rounded-xl shrink-0 overflow-hidden shadow-md"
                        className="w-14 h-14 object-cover"
                      />
                      {project.iconImage && (
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-lg bg-black/80 border border-white/20 shadow-md z-10 flex items-center justify-center">
                          <img
                            src={project.iconImage}
                            alt={project.title}
                            className="w-4 h-4 object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3
                          className={`font-bold text-base ${isLight ? "text-slate-900" : "text-white"}`}
                        >
                          {project.title}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            project.badge.includes("Under Development")
                              ? isLight
                                ? "bg-amber-50 border-amber-300 text-amber-800"
                                : "bg-amber-500/15 border-amber-500/30 text-amber-300"
                              : project.badge.includes("Open Source")
                                ? isLight
                                  ? "bg-purple-50 border-purple-300 text-purple-800"
                                  : "bg-purple-500/15 border-purple-500/30 text-purple-300"
                                : isLight
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                  : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                          }`}
                        >
                          {project.badge || project.category}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 max-w-2xl ${isLight ? "text-slate-600" : "text-white/70"}`}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() =>
                        openApp(`folder-${project.id}`, project.title)
                      }
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 transition-all"
                    >
                      <span>Open Folder</span>
                    </button>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        isLight
                          ? "bg-slate-200/80 hover:bg-slate-300 text-slate-800"
                          : "bg-white/10 hover:bg-white/20 text-white/80"
                      }`}
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
