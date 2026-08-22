# Graph Report - scalewithalap  (2026-08-22)

## Corpus Check
- 88 files · ~102,836 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 247 nodes · 461 edges · 24 communities (11 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Desktop Shell & Window Manager
- Application Registry & Case Studies
- System Store & Audio Synthesis
- Spotlight & Control Overlays
- SEO & Social Sharing
- Mobile Environment & Lock Screen
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 66 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 11 edges
4. `getScaledGain()` - 11 edges
5. `PROJECTS_DATA` - 8 edges
6. `scripts` - 8 edges
7. `ErrorBoundary` - 7 edges
8. `playTrashWhooshSound()` - 7 edges
9. `LazyImage()` - 7 edges
10. `APPS_CONFIG` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Static JSON-LD Schemas` --semantically_similar_to--> `SEOHead()`  [INFERRED] [semantically similar]
  index.html → components/common/SEOHead.tsx
- `Projects Manifest Table` --references--> `PROJECTS_DATA`  [EXTRACTED]
  README.md → data/projectsData.ts
- `DesktopEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  desktop/DesktopEnvironment.tsx → store/useEcosystemStore.ts
- `TabletEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  tablet/TabletEnvironment.tsx → store/useEcosystemStore.ts
- `MobileEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  mobile/MobileEnvironment.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scale with Alap Production Projects** — data_projectsdata_portfolio_os, data_projectsdata_vibe44, data_projectsdata_zeroheadache, data_projectsdata_openui, data_projectsdata_makemesound, data_projectsdata_freecom, data_projectsdata_soothly_ai [EXTRACTED 1.00]

## Communities (24 total, 13 thin omitted)

### Community 0 - "Desktop Shell & Window Manager"
Cohesion: 0.12
Nodes (20): BOOT_MESSAGES, SplashScreen(), StaticHeroText(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), APPS_CONFIG, DESKTOP_ITEMS (+12 more)

### Community 1 - "Application Registry & Case Studies"
Cohesion: 0.08
Nodes (18): App(), DesktopEnv, MobileEnv, SpotlightSearch, TabletEnv, ToastContainer, ErrorBoundary, Props (+10 more)

### Community 2 - "System Store & Audio Synthesis"
Cohesion: 0.11
Nodes (22): AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, ResumeApp(), SafariApp(), TiltProjectCard() (+14 more)

### Community 3 - "Spotlight & Control Overlays"
Cohesion: 0.07
Nodes (28): vite, devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 4 - "SEO & Social Sharing"
Cohesion: 0.22
Nodes (20): Alap Putatunda High-Resolution Portrait, EMAILS, MailApp(), TrashApp(), DesktopDock(), IOSLockScreen(), IOSLockScreenProps, useEcosystemStore (+12 more)

### Community 5 - "Mobile Environment & Lock Screen"
Cohesion: 0.11
Nodes (17): OUTPUT_LINES, TerminalApp(), ContextMenu(), WindowFrame(), WindowFrameProps, AppWindow, ContextMenuState, EcosystemState (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (19): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (9): Interactive Developer Terminal Simulator, Dynamic SEO & Social Metadata Engine, OpenUI, Portfolio OS, Vibe44 Marketing & MCP Server, Zero Headache Marketing Site, Scale with Alap Social Preview (og-image.webp), Complete LLM System Reference (/llms-full.txt) (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.31
Nodes (7): __dirname, __filename, generateSitemapXML(), PROJECT_SLUG_MAP, rootDir, writeSitemap(), sitemapPlugin()

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (3): Alap Putatunda (Biography & Experience), Resume & Career History, Alap Putatunda Resume Document (PDF)

## Knowledge Gaps
- **98 isolated node(s):** `DesktopItem`, `ContextMenuState`, `EcosystemState`, `Environment`, `ToastMessage` (+93 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `SEO & Social Sharing` to `Desktop Shell & Window Manager`, `Application Registry & Case Studies`, `System Store & Audio Synthesis`, `Mobile Environment & Lock Screen`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 7` to `Spotlight & Control Overlays`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `DesktopItem`, `ContextMenuState`, `EcosystemState` to the rest of the system?**
  _98 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Desktop Shell & Window Manager` be split into smaller, more focused modules?**
  _Cohesion score 0.11942959001782531 - nodes in this community are weakly interconnected._
- **Should `Application Registry & Case Studies` be split into smaller, more focused modules?**
  _Cohesion score 0.08064516129032258 - nodes in this community are weakly interconnected._
- **Should `System Store & Audio Synthesis` be split into smaller, more focused modules?**
  _Cohesion score 0.10967741935483871 - nodes in this community are weakly interconnected._
- **Should `Spotlight & Control Overlays` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._