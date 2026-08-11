# Graph Report - scalewithalap  (2026-08-12)

## Corpus Check
- 39 files · ~107,228 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 116 nodes · 109 edges · 6 communities detected
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `getAudioContext()` - 12 edges
2. `getScaledGain()` - 11 edges
3. `playTrashWhooshSound()` - 6 edges
4. `ErrorBoundary` - 5 edges
5. `resetHideTimer()` - 3 edges
6. `startHideTimer()` - 3 edges
7. `handleMouseMoveGlobal()` - 3 edges
8. `startAnimationLoop()` - 3 edges
9. `playWindowOpenSound()` - 3 edges
10. `playWindowCloseSound()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `handleEmptyTrash()` --calls--> `playTrashWhooshSound()`  [INFERRED]
  apps\TrashApp.tsx → utils\soundEffects.ts
- `handleSingleDelete()` --calls--> `playTrashWhooshSound()`  [INFERRED]
  apps\TrashApp.tsx → utils\soundEffects.ts
- `handleDrop()` --calls--> `playTrashWhooshSound()`  [INFERRED]
  apps\TrashApp.tsx → utils\soundEffects.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.4
Nodes (12): getAudioContext(), getScaledGain(), playCopySound(), playDockLaunchSound(), playLockUnlockSound(), playSpotlightSound(), playThemeToggleSound(), playToastSound() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.32
Nodes (4): handleDrop(), handleEmptyTrash(), handleSingleDelete(), playTrashWhooshSound()

### Community 2 - "Community 2"
Cohesion: 0.52
Nodes (6): handleMouseLeave(), handleMouseMove(), handleMouseMoveGlobal(), resetHideTimer(), startAnimationLoop(), startHideTimer()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (1): ErrorBoundary

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (2): getDefaultPosition(), handleMouseDown()

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (2): handleMouseLeave(), handleMouseMove()

## Knowledge Gaps
- **Thin community `Community 3`** (6 nodes): `ErrorBoundary`, `.componentDidCatch()`, `.constructor()`, `.getDerivedStateFromError()`, `.render()`, `ErrorBoundary.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (5 nodes): `getDefaultPosition()`, `handleGlobalClick()`, `handleMouseDown()`, `handleOpenItem()`, `DesktopFolders.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (4 nodes): `handleMouseLeave()`, `handleMouseMove()`, `updateCachedPositions()`, `HeroHoverText.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `playTrashWhooshSound()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `getAudioContext()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `getScaledGain()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `playTrashWhooshSound()` (e.g. with `handleEmptyTrash()` and `handleSingleDelete()`) actually correct?**
  _`playTrashWhooshSound()` has 3 INFERRED edges - model-reasoned connections that need verification._