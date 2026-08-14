/**
 * @file config/apps.config.ts
 * @description Central Application Registry & Dynamic Module Component Factory for Portfolio OS.
 *
 * Responsibilities:
 * - Defines the master `APPS_CONFIG` registry array for all 13 application windows (About, Safari, Resume, Terminal, Photos, Mail, Trash, and 9 project case study folders).
 * - Utilizes React.lazy code-splitting to isolate application modules into distinct JS chunks.
 * - Employs a higher-order component factory (`createProjectApp`) to dynamically map project folders (`folder-vibe44`, `folder-openui`, etc.) to SingleProjectApp with props, eliminating boilerplate wrapper files.
 */

import React, { lazy } from "react";
import {
  Settings,
  Terminal,
  Compass,
  Mail,
  Image,
  Trash2,
  FileText,
  Folder,
  LucideIcon,
} from "lucide-react";

export interface AppConfig {
  id: string;
  title: string;
  icon?: LucideIcon;
  iconImage?: string;
  color?: string;
  component: React.LazyExoticComponent<any>;
}

// Factory helper to map project folders directly to SingleProjectApp without boilerplate wrapper files
const createProjectApp = (projectId: string) =>
  lazy(() =>
    import("../apps/SingleProjectApp").then((mod) => ({
      default: (props: any) =>
        React.createElement(mod.default, { projectId, ...props }),
    })),
  );

export const APPS_CONFIG: AppConfig[] = [
  {
    id: "about",
    title: "About Me",
    iconImage: "/icons/finder.webp",
    icon: Settings,
    color: "bg-zinc-700",
    component: lazy(() => import("../apps/AboutApp")),
  },
  {
    id: "safari",
    title: "Safari",
    iconImage: "/icons/safari.webp",
    icon: Compass,
    color: "bg-blue-500",
    component: lazy(() => import("../apps/SafariApp")),
  },
  {
    id: "photos",
    title: "Photos",
    iconImage: "/icons/photos.webp",
    icon: Image,
    color: "bg-amber-500",
    component: lazy(() => import("../apps/PhotosApp")),
  },
  {
    id: "mail",
    title: "Contact",
    iconImage: "/icons/contact.webp",
    icon: Mail,
    color: "bg-sky-400",
    component: lazy(() => import("../apps/MailApp")),
  },
  {
    id: "terminal",
    title: "Terminal",
    iconImage: "/icons/terminal.webp",
    icon: Terminal,
    color: "bg-black",
    component: lazy(() => import("../apps/TerminalApp")),
  },
  {
    id: "resume",
    title: "Resume",
    iconImage: "/icons/pdf.webp",
    icon: FileText,
    color: "bg-red-600",
    component: lazy(() => import("../apps/ResumeApp")),
  },
  {
    id: "trash",
    title: "Trash",
    iconImage: "/icons/trash.webp",
    icon: Trash2,
    color: "bg-zinc-800",
    component: lazy(() => import("../apps/TrashApp")),
  },
  // Project Folders (Mapped directly to SingleProjectApp)
  {
    id: "folder-scalewithalap",
    title: "Scale with Alap",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("scalewithalap"),
  },
  {
    id: "folder-vibe44",
    title: "Vibe44 Marketing & MCP",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("vibe44"),
  },
  {
    id: "folder-vibe44-demo",
    title: "Vibe44 Next.js Starter Kit Demo",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("vibe44-demo"),
  },
  {
    id: "folder-openui",
    title: "OpenUI",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("openui"),
  },
  {
    id: "folder-zeroheadache",
    title: "Zero Headache Marketing",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("zeroheadache"),
  },
  {
    id: "folder-zeroheadache-app",
    title: "Zero Headache Platform",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("zeroheadache-app"),
  },
  {
    id: "folder-makemesound",
    title: "Make Me Sound",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("makemesound"),
  },
  {
    id: "folder-freecom",
    title: "Freecom AI Store",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("freecom"),
  },
  {
    id: "folder-soothly-ai",
    title: "Soothly AI",
    iconImage: "/icons/folder.webp",
    icon: Folder,
    component: createProjectApp("soothly-ai"),
  },
];
