# Graph Report - scalewithalap  (2026-08-22)

## Corpus Check
- 267 files · ~25,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 259 nodes · 474 edges · 25 communities (12 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.9)
- Token cost: 1,200 input · 800 output

## Community Hubs (Navigation)
- Desktop OS & Window Architecture
- Desktop OS & Window Architecture
- AI Products & Case Studies
- Desktop OS & Window Architecture
- SEO, Metadata & Discovery
- Desktop OS & Window Architecture
- gsap Ecosystem
- DOM Ecosystem
- Desktop OS & Window Architecture
- AI Products & Case Studies
- AI Products & Case Studies
- Profile, Resume & Experience
- Profile, Resume & Experience
- AI Products & Case Studies
- Desktop OS & Window Architecture
- AI Products & Case Studies
- AI Products & Case Studies
- SEO, Metadata & Discovery
- Portfolio OS Index Entry Ecosystem
- Web Application HTML Entrypoint Ecosystem
- Complete LLM System Reference (/llms-full.txt) Ecosystem
- AI Context Index (/llms.txt) Ecosystem
- Profile, Resume & Experience
- Profile, Resume & Experience
- Portfolio OS Readme Ecosystem

## God Nodes (most connected - your core abstractions)
1. `useEcosystemStore` - 66 edges
2. `compilerOptions` - 17 edges
3. `getAudioContext()` - 11 edges
4. `getScaledGain()` - 11 edges
5. `Alap Putatunda` - 11 edges
6. `PROJECTS_DATA` - 8 edges
7. `scripts` - 8 edges
8. `ErrorBoundary` - 7 edges
9. `LazyImage()` - 7 edges
10. `playTrashWhooshSound()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `SEOHead()` --semantically_similar_to--> `Static JSON-LD Schemas`  [INFERRED] [semantically similar]
  components/common/SEOHead.tsx → index.html
- `PROJECTS_DATA` --references--> `Projects Manifest Table`  [EXTRACTED]
  data/projectsData.ts → README.md
- `DesktopEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  desktop/DesktopEnvironment.tsx → store/useEcosystemStore.ts
- `MobileEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  mobile/MobileEnvironment.tsx → store/useEcosystemStore.ts
- `TabletEnvironment()` --calls--> `useEcosystemStore`  [EXTRACTED]
  tablet/TabletEnvironment.tsx → store/useEcosystemStore.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Alap AI Product Suite** — portfolio_os, vibe44_mcp_server, vibe44_engine, openui, zeroheadache_platform, makemesound, freecom_ai, soothly_ai [INFERRED 0.85]

## Communities (25 total, 13 thin omitted)

### Community 0 - "Desktop OS & Window Architecture"
Cohesion: 0.12
Nodes (19): BOOT_MESSAGES, SplashScreen(), StaticHeroText(), ContextMenu(), ControlCenter(), NotificationCenter(), ShortcutsHintOverlay(), AppConfig (+11 more)

### Community 1 - "Desktop OS & Window Architecture"
Cohesion: 0.08
Nodes (18): App(), DesktopEnv, MobileEnv, SpotlightSearch, TabletEnv, ToastContainer, ErrorBoundary, Props (+10 more)

### Community 2 - "AI Products & Case Studies"
Cohesion: 0.11
Nodes (20): AboutApp(), TABS, PhotosApp(), SCREENSHOT_PHOTOS, ScreenshotPhoto, ResumeApp(), SafariApp(), TiltProjectCard() (+12 more)

### Community 3 - "Desktop OS & Window Architecture"
Cohesion: 0.21
Nodes (22): Alap Putatunda High-Resolution Portrait, TrashApp(), DesktopDock(), DESKTOP_ITEMS, DesktopItem, DesktopProjects(), STACK_KINDS, IOSLockScreen() (+14 more)

### Community 4 - "SEO, Metadata & Discovery"
Cohesion: 0.08
Nodes (25): devDependencies, tailwindcss, tsx, @types/node, @types/react, @types/react-dom, typescript, name (+17 more)

### Community 5 - "Desktop OS & Window Architecture"
Cohesion: 0.10
Nodes (18): EMAILS, MailApp(), OUTPUT_LINES, TerminalApp(), DesktopWindowManager(), WindowFrame(), WindowFrameProps, AppWindow (+10 more)

### Community 6 - "gsap Ecosystem"
Cohesion: 0.09
Nodes (22): gsap, immer, lucide-react, motion, dependencies, gsap, immer, lucide-react (+14 more)

### Community 7 - "DOM Ecosystem"
Cohesion: 0.10
Nodes (20): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+12 more)

### Community 8 - "Desktop OS & Window Architecture"
Cohesion: 0.20
Nodes (12): Alap Putatunda, Freecom AI, Hyperagent Founding 500 Award, Make Me Sound, OpenUI, Pharmison Valentes Pharma, Portfolio OS, Soothly AI (+4 more)

### Community 9 - "AI Products & Case Studies"
Cohesion: 0.22
Nodes (9): Interactive Developer Terminal Simulator, Dynamic SEO & Social Metadata Engine, OpenUI, Portfolio OS, Vibe44 Marketing & MCP Server, Zero Headache Marketing Site, Scale with Alap Social Preview (og-image.webp), Complete LLM System Reference (/llms-full.txt) (+1 more)

### Community 10 - "AI Products & Case Studies"
Cohesion: 0.31
Nodes (7): __dirname, __filename, generateSitemapXML(), PROJECT_SLUG_MAP, rootDir, writeSitemap(), sitemapPlugin()

### Community 11 - "Profile, Resume & Experience"
Cohesion: 0.67
Nodes (3): Alap Putatunda (Biography & Experience), Resume & Career History, Alap Putatunda Resume Document (PDF)

## Knowledge Gaps
- **105 isolated node(s):** `DesktopItem`, `Props`, `State`, `SearchItem`, `ScreenshotPhoto` (+100 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useEcosystemStore` connect `Desktop OS & Window Architecture` to `Desktop OS & Window Architecture`, `Desktop OS & Window Architecture`, `AI Products & Case Studies`, `Desktop OS & Window Architecture`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `dependencies` connect `gsap Ecosystem` to `SEO, Metadata & Discovery`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `DesktopItem`, `Props`, `State` to the rest of the system?**
  _105 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Desktop OS & Window Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Should `Desktop OS & Window Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.08064516129032258 - nodes in this community are weakly interconnected._
- **Should `AI Products & Case Studies` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._
- **Should `SEO, Metadata & Discovery` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._