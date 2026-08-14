# Graph Report - .  (2026-08-15)

## Corpus Check
- 88 files · ~102,744 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 229 nodes · 444 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.9)
- Token cost: 1,200 input · 800 output

## Community Hubs (Navigation)
- System UI & Overlays
- Application Router & Environments
- Mail & Trash Utilities
- Dev Dependencies & Tooling
- Animation & State Libraries
- TypeScript Compiler Config
- Terminal & Window Management
- AI Product Case Studies
- About & Media Apps
- Error Boundary Resilience
- Dynamic Sitemap & Automation

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 65 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 11 edges
4. `getScaledGain()` - 11 edges
5. `Alap Putatunda Profile & Experience` - 9 edges
6. `scripts` - 8 edges
7. `ErrorBoundary` - 7 edges
8. `LazyImage()` - 7 edges
9. `APPS_CONFIG` - 7 edges
10. `PROJECTS_DATA` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/AboutApp.tsx → store/useEcosystemStore.ts
- `PhotosApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/PhotosApp.tsx → store/useEcosystemStore.ts
- `ResumeApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/ResumeApp.tsx → store/useEcosystemStore.ts
- `TerminalApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/TerminalApp.tsx → store/useEcosystemStore.ts
- `DesktopEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  desktop/DesktopEnvironment.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "System UI & Overlays"
Cohesion: 0.12
Nodes (20): BOOT_MESSAGES, SplashScreen(), StaticHeroText(), ContextMenu(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), AppConfig (+12 more)

### Community 1 - "Application Router & Environments"
Cohesion: 0.10
Nodes (20): App(), DesktopEnv, MobileEnv, SpotlightSearch, TabletEnv, SafariApp(), TiltProjectCard(), SingleProjectApp() (+12 more)

### Community 2 - "Mail & Trash Utilities"
Cohesion: 0.19
Nodes (22): ToastContainer, EMAILS, MailApp(), TrashApp(), ToastContainer(), ToastItem(), DesktopDock(), IOSLockScreen() (+14 more)

### Community 3 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (25): devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript, name (+17 more)

### Community 4 - "Animation & State Libraries"
Cohesion: 0.09
Nodes (22): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+14 more)

### Community 5 - "TypeScript Compiler Config"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 6 - "Terminal & Window Management"
Cohesion: 0.13
Nodes (15): OUTPUT_LINES, TerminalApp(), DesktopWindowManager(), WindowFrame(), WindowFrameProps, AppWindow, ContextMenuState, EcosystemState (+7 more)

### Community 7 - "AI Product Case Studies"
Cohesion: 0.12
Nodes (16): Freecom AI Digital eCommerce Platform, Make Me Sound 105-Tone Transformation Copilot, OpenUI Local-First UI Generator, Soothly AI 8-Agent Revenue Operations, Vibe44 Next.js 16 Starter Kit Engine, Vibe44 Marketing & MCP Server, Zero Headache Marketing Inbound Engine, Zero Headache Multi-Tenant Agent Platform (+8 more)

### Community 8 - "About & Media Apps"
Cohesion: 0.21
Nodes (8): AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, ResumeApp(), LazyImage(), LazyImageProps

### Community 9 - "Error Boundary Resilience"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 10 - "Dynamic Sitemap & Automation"
Cohesion: 0.31
Nodes (7): __dirname, __filename, generateSitemapXML(), PROJECT_SLUG_MAP, rootDir, writeSitemap(), sitemapPlugin()

## Knowledge Gaps
- **85 isolated node(s):** `TABS`, `EMAILS`, `ScreenshotPhoto`, `SCREENSHOT_PHOTOS`, `SingleProjectAppProps` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `Mail & Trash Utilities` to `About & Media Apps`, `Application Router & Environments`, `Terminal & Window Management`, `System UI & Overlays`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `ErrorBoundary` connect `Error Boundary Resilience` to `Application Router & Environments`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Animation & State Libraries` to `Dev Dependencies & Tooling`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `TABS`, `EMAILS`, `ScreenshotPhoto` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `System UI & Overlays` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Should `Application Router & Environments` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._