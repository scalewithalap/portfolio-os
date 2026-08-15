# Graph Report - scalewithalap  (2026-08-15)

## Corpus Check
- 88 files · ~100,308 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 221 nodes · 448 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 1,200 input · 450 output

## Community Hubs (Navigation)
- macOS Desktop Shell & Window Management
- macOS Desktop Shell & Window Management
- Architecture Cluster 2
- macOS Desktop Shell & Window Management
- macOS Desktop Shell & Window Management
- macOS Desktop Shell & Window Management
- Architecture Cluster 6
- Architecture Cluster 7
- Portfolio Applications & Interactive Demos
- Architecture Cluster 9
- Architecture Cluster 10

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 66 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 11 edges
4. `getScaledGain()` - 11 edges
5. `scripts` - 8 edges
6. `ErrorBoundary` - 7 edges
7. `LazyImage()` - 7 edges
8. `APPS_CONFIG` - 7 edges
9. `PROJECTS_DATA` - 7 edges
10. `playTrashWhooshSound()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/AboutApp.tsx → store/useEcosystemStore.ts
- `PhotosApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/PhotosApp.tsx → store/useEcosystemStore.ts
- `ResumeApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/ResumeApp.tsx → store/useEcosystemStore.ts
- `TerminalApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/TerminalApp.tsx → store/useEcosystemStore.ts
- `ToastItem()` --calls--> `useEcosystemStore`  [EXTRACTED]
  components/common/ToastContainer.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Apple Tri-Platform Ecosystem (macOS, iPadOS, iOS)** — desktop_desktopenvironment, tablet_tabletenvironment, mobile_mobileenvironment [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "macOS Desktop Shell & Window Management"
Cohesion: 0.11
Nodes (22): BOOT_MESSAGES, SplashScreen(), StaticHeroText(), ContextMenu(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), AppConfig (+14 more)

### Community 1 - "macOS Desktop Shell & Window Management"
Cohesion: 0.09
Nodes (16): App(), DesktopEnv, MobileEnv, SpotlightSearch, TabletEnv, ToastContainer, ErrorBoundary, Props (+8 more)

### Community 2 - "Architecture Cluster 2"
Cohesion: 0.07
Nodes (28): vite, devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 3 - "macOS Desktop Shell & Window Management"
Cohesion: 0.11
Nodes (20): AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, ResumeApp(), SafariApp(), TiltProjectCard() (+12 more)

### Community 4 - "macOS Desktop Shell & Window Management"
Cohesion: 0.22
Nodes (20): Alap Putatunda High-Resolution Portrait, EMAILS, MailApp(), TrashApp(), DesktopDock(), IOSLockScreen(), IOSLockScreenProps, useEcosystemStore (+12 more)

### Community 5 - "macOS Desktop Shell & Window Management"
Cohesion: 0.12
Nodes (16): OUTPUT_LINES, TerminalApp(), DesktopWindowManager(), WindowFrame(), WindowFrameProps, AppWindow, ContextMenuState, EcosystemState (+8 more)

### Community 6 - "Architecture Cluster 6"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 7 - "Architecture Cluster 7"
Cohesion: 0.11
Nodes (19): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+11 more)

### Community 8 - "Portfolio Applications & Interactive Demos"
Cohesion: 0.31
Nodes (7): __dirname, __filename, generateSitemapXML(), PROJECT_SLUG_MAP, rootDir, writeSitemap(), sitemapPlugin()

## Knowledge Gaps
- **77 isolated node(s):** `TABS`, `EMAILS`, `ScreenshotPhoto`, `SCREENSHOT_PHOTOS`, `SingleProjectAppProps` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `macOS Desktop Shell & Window Management` to `macOS Desktop Shell & Window Management`, `macOS Desktop Shell & Window Management`, `macOS Desktop Shell & Window Management`, `macOS Desktop Shell & Window Management`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Architecture Cluster 7` to `Architecture Cluster 2`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `TABS`, `EMAILS`, `ScreenshotPhoto` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `macOS Desktop Shell & Window Management` be split into smaller, more focused modules?**
  _Cohesion score 0.112375533428165 - nodes in this community are weakly interconnected._
- **Should `macOS Desktop Shell & Window Management` be split into smaller, more focused modules?**
  _Cohesion score 0.08735632183908046 - nodes in this community are weakly interconnected._
- **Should `Architecture Cluster 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `macOS Desktop Shell & Window Management` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._