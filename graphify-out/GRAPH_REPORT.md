# Graph Report - scalewithalap  (2026-08-20)

## Corpus Check
- 88 files · ~100,308 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 222 nodes · 449 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 1,200 input · 450 output

## Community Hubs (Navigation)
- Desktop Applications & Utilities
- Shell Overlays & Boot Experience
- Build Tooling & Dev Dependencies
- Profile & Media Apps
- Tri-Platform Environment Shell
- TypeScript & Compiler Config
- Desktop Dock & Workspace System
- Animation & Runtime Dependencies
- Error Boundary & Resilience Layer
- Sitemap & SEO Automation
- Web Application HTML Entrypoint
- Portfolio Documentation & Overview

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 66 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 11 edges
4. `getScaledGain()` - 11 edges
5. `scripts` - 8 edges
6. `ErrorBoundary` - 7 edges
7. `LazyImage()` - 7 edges
8. `playTrashWhooshSound()` - 7 edges
9. `APPS_CONFIG` - 7 edges
10. `PROJECTS_DATA` - 7 edges

## Surprising Connections (you probably didn't know these)
- `DesktopEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  desktop/DesktopEnvironment.tsx → store/useEcosystemStore.ts
- `MobileEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  mobile/MobileEnvironment.tsx → store/useEcosystemStore.ts
- `TabletEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  tablet/TabletEnvironment.tsx → store/useEcosystemStore.ts
- `AboutApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/AboutApp.tsx → store/useEcosystemStore.ts
- `PhotosApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/PhotosApp.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Apple Tri-Platform Ecosystem (macOS, iPadOS, iOS)** — tablet_tabletenvironment, mobile_mobileenvironment [EXTRACTED 1.00]

## Communities (12 total, 2 thin omitted)

### Community 0 - "Desktop Applications & Utilities"
Cohesion: 0.10
Nodes (24): ToastContainer, EMAILS, MailApp(), OUTPUT_LINES, TerminalApp(), ToastContainer(), ToastItem(), ContextMenu() (+16 more)

### Community 1 - "Shell Overlays & Boot Experience"
Cohesion: 0.14
Nodes (18): BOOT_MESSAGES, SplashScreen(), StaticHeroText(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), APPS_CONFIG, DesktopItem (+10 more)

### Community 2 - "Build Tooling & Dev Dependencies"
Cohesion: 0.07
Nodes (28): vite, devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 3 - "Profile & Media Apps"
Cohesion: 0.11
Nodes (19): Alap Putatunda High-Resolution Portrait, AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, ResumeApp(), SafariApp() (+11 more)

### Community 4 - "Tri-Platform Environment Shell"
Cohesion: 0.12
Nodes (15): App(), DesktopEnv, MobileEnv, SpotlightSearch, TabletEnv, SEOHead(), getItemRecentIndex(), SEARCH_ITEMS (+7 more)

### Community 5 - "TypeScript & Compiler Config"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 6 - "Desktop Dock & Workspace System"
Cohesion: 0.26
Nodes (16): TrashApp(), AppConfig, DesktopDock(), DESKTOP_ITEMS, getAudioContext(), getScaledGain(), playCopySound(), playDockLaunchSound() (+8 more)

### Community 7 - "Animation & Runtime Dependencies"
Cohesion: 0.11
Nodes (19): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+11 more)

### Community 8 - "Error Boundary & Resilience Layer"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 9 - "Sitemap & SEO Automation"
Cohesion: 0.31
Nodes (7): __dirname, __filename, generateSitemapXML(), PROJECT_SLUG_MAP, rootDir, writeSitemap(), sitemapPlugin()

## Knowledge Gaps
- **77 isolated node(s):** `DesktopItem`, `Props`, `State`, `SearchItem`, `ScreenshotPhoto` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `Desktop Applications & Utilities` to `Shell Overlays & Boot Experience`, `Profile & Media Apps`, `Tri-Platform Environment Shell`, `Desktop Dock & Workspace System`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `ErrorBoundary` connect `Error Boundary & Resilience Layer` to `Tri-Platform Environment Shell`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Animation & Runtime Dependencies` to `Build Tooling & Dev Dependencies`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `DesktopItem`, `Props`, `State` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Desktop Applications & Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.10483870967741936 - nodes in this community are weakly interconnected._
- **Should `Shell Overlays & Boot Experience` be split into smaller, more focused modules?**
  _Cohesion score 0.135632183908046 - nodes in this community are weakly interconnected._
- **Should `Build Tooling & Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._