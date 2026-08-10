# Graph Report - .  (2026-08-10)

## Corpus Check
- 82 files · ~97,251 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 196 nodes · 394 edges · 10 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Desktop & Tablet Environment Views
- Build Tooling & Dev Dependencies
- App Root & Navigation Routing
- Portfolio Case Studies & Bio Apps
- Ecosystem Store & Dock Management
- TypeScript Config & Compiler Specs
- Core Dependencies & UI Motion Libraries
- Error Boundary & Exception Handler
- Desktop Window Geometry & Frame Manager

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 63 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 10 edges
4. `getScaledGain()` - 10 edges
5. `ErrorBoundary` - 7 edges
6. `LazyImage()` - 7 edges
7. `APPS_CONFIG` - 7 edges
8. `playTrashWhooshSound()` - 7 edges
9. `PROJECTS_DATA` - 6 edges
10. `getProjectCoverImage()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AboutApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/AboutApp.tsx → store/useEcosystemStore.ts
- `PhotosApp()` --calls--> `useEcosystemStore`  [EXTRACTED]
  apps/PhotosApp.tsx → store/useEcosystemStore.ts
- `DesktopEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  desktop/DesktopEnvironment.tsx → store/useEcosystemStore.ts
- `MobileEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  mobile/MobileEnvironment.tsx → store/useEcosystemStore.ts
- `TabletEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  tablet/TabletEnvironment.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "Desktop & Tablet Environment Views"
Cohesion: 0.10
Nodes (21): DesktopEnv, TabletEnv, StaticHeroText(), ContextMenu(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), AppConfig (+13 more)

### Community 1 - "Build Tooling & Dev Dependencies"
Cohesion: 0.07
Nodes (26): vite, devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript (+18 more)

### Community 2 - "App Root & Navigation Routing"
Cohesion: 0.13
Nodes (16): App(), MobileEnv, EMAILS, MailApp(), ResumeApp(), OUTPUT_LINES, TerminalApp(), SEOHead() (+8 more)

### Community 3 - "Portfolio Case Studies & Bio Apps"
Cohesion: 0.13
Nodes (17): AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, SafariApp(), TiltProjectCard(), SingleProjectApp() (+9 more)

### Community 4 - "Ecosystem Store & Dock Management"
Cohesion: 0.20
Nodes (20): TrashApp(), DesktopDock(), ContextMenuState, EcosystemState, Environment, getDefaultWindowGeometry(), INITIAL_TRASH_ITEMS, ToastMessage (+12 more)

### Community 5 - "TypeScript Config & Compiler Specs"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 6 - "Core Dependencies & UI Motion Libraries"
Cohesion: 0.11
Nodes (19): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+11 more)

### Community 7 - "Error Boundary & Exception Handler"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 8 - "Desktop Window Geometry & Frame Manager"
Cohesion: 0.38
Nodes (5): DesktopWindowManager(), WindowFrame(), WindowFrameProps, AppWindow, SnapPreviewTarget

## Knowledge Gaps
- **63 isolated node(s):** `TABS`, `EMAILS`, `ScreenshotPhoto`, `SCREENSHOT_PHOTOS`, `SingleProjectAppProps` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `App Root & Navigation Routing` to `Desktop & Tablet Environment Views`, `Desktop Window Geometry & Frame Manager`, `Portfolio Case Studies & Bio Apps`, `Ecosystem Store & Dock Management`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Dependencies & UI Motion Libraries` to `Build Tooling & Dev Dependencies`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `ErrorBoundary` connect `Error Boundary & Exception Handler` to `App Root & Navigation Routing`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `TABS`, `EMAILS`, `ScreenshotPhoto` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Desktop & Tablet Environment Views` be split into smaller, more focused modules?**
  _Cohesion score 0.10384068278805121 - nodes in this community are weakly interconnected._
- **Should `Build Tooling & Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `App Root & Navigation Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._