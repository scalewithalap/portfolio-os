/**
 * @file store/useEcosystemStore.ts
 * @description Centralized Global State Store Engine built with Zustand & Immer middleware.
 *
 * Responsibilities:
 * - Manages application window lifecycle (open, close, minimize, maximize, bring-to-front focus, 8-axis window positions and dimensions).
 * - Controls ecosystem theme state (light/dark mode toggle) and Web Audio sound feedback triggers.
 * - Handles wallpaper index selection, desktop icons grid sorting, desktop stacks mode toggle, and trash bin items state.
 * - Drives active UI overlay drawers (Control Center, Notification Center, Spotlight Search modal, Context Menu, Shortcuts Overlay, Toast alerts).
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  playWindowOpenSound,
  playWindowCloseSound,
  playWindowMinimizeSound,
  playSpotlightSound,
  playToastSound,
  playCopySound,
  playThemeToggleSound,
} from "../utils/soundEffects";

export type Environment = "macOS" | "iPadOS" | "iOS" | null;

export interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface SnapPreviewTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

export interface WallpaperItem {
  id: string;
  name: string;
  url: string;
  thumb: string;
}

export const WALLPAPERS: WallpaperItem[] = [
  // Row 1 (7 items)
  {
    id: "default-wallpaper",
    name: "Default Wallpaper",
    url: "/images/default-wallpaper.webp",
    thumb: "/images/default-wallpaper-thumb.webp",
  },
  {
    id: "tahoe-wallpaper",
    name: "macOS Tahoe 2026",
    url: "/images/tahoe-wallpaper.webp",
    thumb: "/images/tahoe-wallpaper-thumb.webp",
  },
  {
    id: "man-silhouette",
    name: "Man Silhouette",
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "purple-abstract",
    name: "Purple Abstract",
    url: "https://images.unsplash.com/photo-1687804446680-d90cf8c60713?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1687804446680-d90cf8c60713?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "golden-gate",
    name: "Golden Gate Bridge",
    url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "alpine-sunset",
    name: "Alpine Sunset",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "neon-mesh",
    name: "Neon Mesh",
    url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=50&w=120&auto=format&fit=crop&fm=webp",
  },

  // Row 2 (7 items)
  {
    id: "cosmic-nebula",
    name: "Cosmic Nebula",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "minimal-mountain",
    name: "Minimal Mountain",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "cyberpunk-city",
    name: "Cyberpunk City",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "abstract-glass",
    name: "Abstract Glass",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "blue-lake",
    name: "Blue Lake",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
  {
    id: "moon-in-space",
    name: "Moon in Space",
    url: "https://images.unsplash.com/photo-1459909633680-206dc5c67abb?q=80&w=2500&auto=format&fit=crop&fm=webp",
    thumb:
      "https://images.unsplash.com/photo-1459909633680-206dc5c67abb?q=50&w=120&auto=format&fit=crop&fm=webp",
  },
];

export interface ToastMessage {
  id: string;
  message: string;
  type?: "info" | "success" | "copy";
}

interface ContextMenuState {
  x: number;
  y: number;
}

export interface TrashItem {
  id: string;
  name: string;
  type: string;
  deletedAt?: string;
  iconImage?: string;
}

export const INITIAL_TRASH_ITEMS: TrashItem[] = [
  {
    id: "trimlyst",
    name: "Trimlyst_AI_Mobile_Flutter.zip",
    type: "Deprecated App Project",
    deletedAt: "Just now",
    iconImage: "/icons/folder.webp",
  },
  {
    id: "1",
    name: "Legacy_Monolith_Backend.py",
    type: "Legacy Code",
    deletedAt: "Today, 2:10 PM",
    iconImage: "/icons/text.webp",
  },
  {
    id: "2",
    name: "Unused_Bootstrap_Theme.css",
    type: "Stylesheet",
    deletedAt: "Yesterday, 4:30 PM",
    iconImage: "/icons/text.webp",
  },
  {
    id: "3",
    name: "Deprecated_SQL_Dump_2022.sql",
    type: "Database",
    deletedAt: "Jul 28, 2026",
    iconImage: "/icons/text.webp",
  },
  {
    id: "4",
    name: "Draft_Proposal_v1.docx",
    type: "Document",
    deletedAt: "Jul 24, 2026",
    iconImage: "/icons/text.webp",
  },
];

export interface EcosystemState {
  toasts: ToastMessage[];
  showToast: (message: string, type?: "info" | "success" | "copy") => void;
  removeToast: (id: string) => void;
  activeEnvironment: Environment;
  openApps: AppWindow[];
  focusedAppId: string | null;
  systemTheme: "dark" | "light";
  booting: boolean;
  isSpotlightOpen: boolean;

  // Trash State
  trashItems: TrashItem[];
  emptyTrash: () => void;
  restoreTrashItem: (id: string) => void;
  deleteTrashItemPermanently: (id: string) => void;
  moveToTrash: (item: Partial<TrashItem> & { name: string }) => void;
  resetTrashItems: () => void;

  // Wallpaper
  currentWallpaperIndex: number;
  wallpaper: string;

  // Control Center & Notification Center
  isControlCenterOpen: boolean;
  isNotificationCenterOpen: boolean;

  // About Me Control
  brightness: number; // 0 - 100
  volume: number; // 0 - 100
  isMuted: boolean;

  // Context Menu & Desktop
  contextMenu: ContextMenuState | null;
  desktopItemPositions: Record<string, { x: number; y: number }>;
  snapPreview: SnapPreviewTarget | null;
  recentAppIds: string[];

  // Dock Auto-Hide State
  isDockAutoHideEnabled: boolean;
  toggleDockAutoHide: () => void;

  // Stacks Feature
  isStacksEnabled: boolean;
  expandedStackKind: string | null;
  toggleStacks: () => void;
  toggleExpandStack: (kind: string) => void;
  collapseAllStacks: () => void;

  setEnvironment: (env: Environment) => void;
  finishBoot: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;

  toggleControlCenter: () => void;
  closeControlCenter: () => void;
  toggleNotificationCenter: () => void;
  closeNotificationCenter: () => void;

  setBrightness: (val: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleSystemTheme: () => void;

  setRandomWallpaper: () => void;
  setWallpaperIndex: (index: number) => void;

  openContextMenu: (x: number, y: number) => void;
  closeContextMenu: () => void;

  updateDesktopItemPosition: (id: string, x: number, y: number) => void;
  sortDesktopIcons: () => void;
  setSnapPreview: (target: SnapPreviewTarget | null) => void;

  openApp: (id: string, title: string) => void;
  toggleAppFromDock: (id: string, title: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  minimizeAllApps: () => void;
  maximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

function getDefaultWindowGeometry() {
  const screenW = typeof window !== "undefined" ? window.innerWidth : 1440;
  const screenH = typeof window !== "undefined" ? window.innerHeight : 900;
  const menuH = 28;

  // Target dimensions with screen bounds safety
  const width = Math.min(
    1300,
    Math.max(320, screenW - (screenW < 768 ? 16 : screenW < 1024 ? 32 : 40)),
  );
  const height = Math.min(
    680,
    Math.max(300, screenH - menuH - (screenW < 1024 ? 60 : 80)),
  );

  // Position: Centered cleanly on tablet screens, slightly offset on desktop
  const x =
    screenW < 1024
      ? Math.max(8, (screenW - width) / 2)
      : Math.max(0, Math.min(screenW - width, 135));
  const y =
    screenW < 1024 ? 36 : Math.max(menuH, Math.min(screenH - height, 60));

  return {
    position: { x, y },
    size: { width, height },
  };
}

function getInitialEnvironment(): Environment {
  if (typeof window === "undefined") return "macOS";
  const w = window.innerWidth;
  if (w < 768) return "iOS";
  if (w <= 1024) return "iPadOS";
  return "macOS";
}

export const useEcosystemStore = create<EcosystemState>()(
  immer((set) => ({
    activeEnvironment: getInitialEnvironment(),
    openApps: [],
    focusedAppId: null,
    systemTheme:
      typeof window !== "undefined" && window.innerWidth < 1024
        ? "dark"
        : "light",
    booting: true,
    isSpotlightOpen: false,

    trashItems: INITIAL_TRASH_ITEMS,
    emptyTrash: () =>
      set((state) => {
        state.trashItems = [];
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id,
          message: "Trash emptied successfully! All files cleared.",
          type: "success",
        });
      }),
    restoreTrashItem: (id) =>
      set((state) => {
        const item = state.trashItems.find((i) => i.id === id);
        if (item) {
          state.trashItems = state.trashItems.filter((i) => i.id !== id);
          const toastId =
            Date.now().toString() + Math.random().toString(36).substring(2, 5);
          state.toasts.push({
            id: toastId,
            message: `Restored "${item.name}" to desktop`,
            type: "info",
          });
        }
      }),
    deleteTrashItemPermanently: (id) =>
      set((state) => {
        const item = state.trashItems.find((i) => i.id === id);
        if (item) {
          state.trashItems = state.trashItems.filter((i) => i.id !== id);
          const toastId =
            Date.now().toString() + Math.random().toString(36).substring(2, 5);
          state.toasts.push({
            id: toastId,
            message: `Permanently deleted "${item.name}"`,
            type: "info",
          });
        }
      }),
    moveToTrash: (item) =>
      set((state) => {
        if (
          state.trashItems.some(
            (t) => t.name === item.name || (item.id && t.id === item.id),
          )
        ) {
          return;
        }
        const newItem: TrashItem = {
          id:
            item.id ||
            Date.now().toString() + Math.random().toString(36).substring(2, 5),
          name: item.name,
          type: item.type || "File",
          deletedAt: "Just now",
          iconImage: item.iconImage || "/icons/text.webp",
        };
        state.trashItems.unshift(newItem);
        const toastId =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id: toastId,
          message: `Moved "${item.name}" to Trash`,
          type: "info",
        });
      }),
    resetTrashItems: () =>
      set((state) => {
        state.trashItems = INITIAL_TRASH_ITEMS;
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id,
          message: "Trash items reset to default",
          type: "info",
        });
      }),

    currentWallpaperIndex: 0,
    wallpaper: WALLPAPERS[0].url,

    isControlCenterOpen: false,
    isNotificationCenterOpen: false,

    brightness: 100,
    volume: 100,
    isMuted: false,

    toasts: [],
    showToast: (message, type = "info") =>
      set((state) => {
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({ id, message, type });
        if (type === "copy") {
          playCopySound();
        } else {
          playToastSound();
        }
      }),
    removeToast: (id) =>
      set((state) => {
        state.toasts = state.toasts.filter((t) => t.id !== id);
      }),

    contextMenu: null,
    desktopItemPositions: {},
    snapPreview: null,
    recentAppIds: [],

    isDockAutoHideEnabled: true,
    toggleDockAutoHide: () =>
      set((state) => {
        state.isDockAutoHideEnabled = !state.isDockAutoHideEnabled;
        const msg = state.isDockAutoHideEnabled
          ? "Auto-hide Dock when windows open: ON"
          : "Auto-hide Dock when windows open: OFF";
        state.toasts.push({
          id:
            Date.now().toString() + Math.random().toString(36).substring(2, 5),
          message: msg,
          type: "info",
        });
      }),

    isStacksEnabled: false,
    expandedStackKind: null,

    toggleStacks: () =>
      set((state) => {
        state.isStacksEnabled = !state.isStacksEnabled;
        if (!state.isStacksEnabled) {
          state.expandedStackKind = null;
        }
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id,
          message: state.isStacksEnabled
            ? "Desktop Stacks Enabled"
            : "Desktop Stacks Disabled",
          type: "info",
        });
      }),
    toggleExpandStack: (kind) =>
      set((state) => {
        state.expandedStackKind =
          state.expandedStackKind === kind ? null : kind;
      }),
    collapseAllStacks: () =>
      set((state) => {
        state.expandedStackKind = null;
      }),

    setEnvironment: (env) =>
      set((state) => {
        const prevEnv = state.activeEnvironment;
        state.activeEnvironment = env;
        if (env === "iOS" || env === "iPadOS") {
          state.systemTheme = "dark";
        } else if (
          env === "macOS" &&
          (prevEnv === "iOS" || prevEnv === "iPadOS")
        ) {
          state.systemTheme = "light";
        }
      }),
    finishBoot: () =>
      set((state) => {
        state.booting = false;
      }),
    openSpotlight: () =>
      set((state) => {
        playSpotlightSound();
        state.isSpotlightOpen = true;
        state.isControlCenterOpen = false;
        state.isNotificationCenterOpen = false;
      }),
    closeSpotlight: () =>
      set((state) => {
        state.isSpotlightOpen = false;
      }),
    toggleSpotlight: () =>
      set((state) => {
        playSpotlightSound();
        state.isSpotlightOpen = !state.isSpotlightOpen;
        if (state.isSpotlightOpen) {
          state.isControlCenterOpen = false;
          state.isNotificationCenterOpen = false;
        }
      }),

    toggleControlCenter: () =>
      set((state) => {
        playSpotlightSound();
        state.isControlCenterOpen = !state.isControlCenterOpen;
        if (state.isControlCenterOpen) {
          state.isNotificationCenterOpen = false;
          state.isSpotlightOpen = false;
        }
      }),
    closeControlCenter: () =>
      set((state) => {
        state.isControlCenterOpen = false;
      }),

    toggleNotificationCenter: () =>
      set((state) => {
        playSpotlightSound();
        state.isNotificationCenterOpen = !state.isNotificationCenterOpen;
        if (state.isNotificationCenterOpen) {
          state.isControlCenterOpen = false;
          state.isSpotlightOpen = false;
        }
      }),
    closeNotificationCenter: () =>
      set((state) => {
        state.isNotificationCenterOpen = false;
      }),

    setBrightness: (val) =>
      set((state) => {
        state.brightness = Math.max(15, Math.min(100, val));
      }),
    setVolume: (val) =>
      set((state) => {
        state.volume = Math.max(0, Math.min(100, val));
        if (val > 0) state.isMuted = false;
      }),
    toggleMute: () =>
      set((state) => {
        state.isMuted = !state.isMuted;
      }),
    toggleSystemTheme: () =>
      set((state) => {
        state.systemTheme = state.systemTheme === "dark" ? "light" : "dark";
        playThemeToggleSound();
      }),

    setRandomWallpaper: () =>
      set((state) => {
        const isMobileOrTablet =
          state.activeEnvironment === "iOS" ||
          state.activeEnvironment === "iPadOS" ||
          (typeof window !== "undefined" && window.innerWidth <= 1024);

        const pool = isMobileOrTablet
          ? WALLPAPERS.filter((w) => w.id !== "default-wallpaper")
          : WALLPAPERS;

        if (pool.length <= 1) return;
        let randomWp = pool[Math.floor(Math.random() * pool.length)];
        while (randomWp.url === state.wallpaper && pool.length > 1) {
          randomWp = pool[Math.floor(Math.random() * pool.length)];
        }
        const targetIndex = WALLPAPERS.findIndex((w) => w.id === randomWp.id);
        state.currentWallpaperIndex = targetIndex !== -1 ? targetIndex : 0;
        state.wallpaper = randomWp.url;
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id,
          message: `Wallpaper set to ${randomWp.name}`,
          type: "info",
        });
      }),
    setWallpaperIndex: (index) =>
      set((state) => {
        state.currentWallpaperIndex = index % WALLPAPERS.length;
        const wp = WALLPAPERS[state.currentWallpaperIndex];
        state.wallpaper = wp.url;
        const id =
          Date.now().toString() + Math.random().toString(36).substring(2, 5);
        state.toasts.push({
          id,
          message: `Wallpaper set to ${wp.name}`,
          type: "info",
        });
      }),

    openContextMenu: (x, y) =>
      set((state) => {
        state.contextMenu = { x, y };
        state.isControlCenterOpen = false;
        state.isNotificationCenterOpen = false;
      }),
    closeContextMenu: () =>
      set((state) => {
        state.contextMenu = null;
      }),

    updateDesktopItemPosition: (id, x, y) =>
      set((state) => {
        state.desktopItemPositions[id] = { x, y };
      }),
    sortDesktopIcons: () =>
      set((state) => {
        state.desktopItemPositions = {};
      }),
    setSnapPreview: (target) =>
      set((state) => {
        state.snapPreview = target;
      }),
    openApp: (id, title) =>
      set((state) => {
        const targetId = id === "settings" ? "about" : id;
        const targetTitle = targetId === "about" ? "About Me" : title;

        const app = state.openApps.find((a) => a.id === targetId);
        const maxZ = state.openApps.reduce(
          (max, a) => Math.max(max, a.zIndex),
          0,
        );

        if (app) {
          if (!app.isOpen || app.isMinimized) {
            playWindowOpenSound();
          }
          app.isOpen = true;
          app.isMinimized = false;
          app.title = targetTitle;
          app.zIndex = maxZ + 1;
        } else {
          playWindowOpenSound();
          const { size, position } = getDefaultWindowGeometry();
          state.openApps.push({
            id: targetId,
            title: targetTitle,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            position,
            size,
          });
        }
        state.focusedAppId = targetId;
        state.recentAppIds = [
          targetId,
          ...state.recentAppIds.filter((x) => x !== targetId),
        ];
      }),
    toggleAppFromDock: (id, title) =>
      set((state) => {
        const targetId = id === "settings" ? "about" : id;
        const app = state.openApps.find((a) => a.id === targetId);
        const maxZ = state.openApps.reduce(
          (max, a) => Math.max(max, a.zIndex),
          0,
        );

        if (
          state.focusedAppId === targetId &&
          app?.isOpen &&
          !app.isMinimized
        ) {
          playWindowMinimizeSound();
          app.isMinimized = true;
          state.focusedAppId = null;
        } else {
          playWindowOpenSound();
          if (app) {
            app.isOpen = true;
            app.isMinimized = false;
            app.zIndex = maxZ + 1;
          } else {
            const { size, position } = getDefaultWindowGeometry();
            state.openApps.push({
              id: targetId,
              title,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              zIndex: maxZ + 1,
              position,
              size,
            });
          }
          state.focusedAppId = targetId;
          state.recentAppIds = [
            targetId,
            ...state.recentAppIds.filter((x) => x !== targetId),
          ];
        }
      }),
    closeApp: (id) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app && app.isOpen) {
          playWindowCloseSound();
          app.isOpen = false;
        }
        state.recentAppIds = state.recentAppIds.filter((x) => x !== id);
        if (state.focusedAppId === id) {
          state.focusedAppId = state.recentAppIds[0] || null;
        }
      }),
    minimizeApp: (id) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app && !app.isMinimized) {
          playWindowMinimizeSound();
          app.isMinimized = true;
        }
        if (state.focusedAppId === id) state.focusedAppId = null;
      }),
    minimizeAllApps: () =>
      set((state) => {
        const hasUnminimized = state.openApps.some(
          (a) => a.isOpen && !a.isMinimized,
        );
        state.openApps.forEach((app) => {
          if (app.isOpen) {
            app.isMinimized = hasUnminimized;
          }
        });
        if (hasUnminimized) {
          state.focusedAppId = null;
        }
      }),
    maximizeApp: (id) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app) {
          app.isMaximized = !app.isMaximized;
          const maxZ = state.openApps.reduce(
            (max, b) => Math.max(max, b.zIndex),
            0,
          );
          app.zIndex = maxZ + 1;
        }
        state.focusedAppId = id;
        state.recentAppIds = [
          id,
          ...state.recentAppIds.filter((x) => x !== id),
        ];
      }),
    focusApp: (id) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app && app.isOpen && !app.isMinimized) {
          const maxZ = state.openApps.reduce(
            (max, b) => Math.max(max, b.zIndex),
            0,
          );
          if (app.zIndex < maxZ) {
            app.zIndex = maxZ + 1;
          }
        }
        state.focusedAppId = id;
        state.recentAppIds = [
          id,
          ...state.recentAppIds.filter((x) => x !== id),
        ];
      }),
    updateWindowPosition: (id, x, y) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app) {
          app.position = { x, y };
        }
      }),
    updateWindowSize: (id, width, height) =>
      set((state) => {
        const app = state.openApps.find((a) => a.id === id);
        if (app) {
          app.size = { width, height };
        }
      }),
  })),
);
