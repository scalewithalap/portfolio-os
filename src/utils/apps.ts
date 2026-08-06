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
} from "lucide-react";

export interface AppConfig {
  id: string;
  title: string;
  icon?: any;
  iconImage?: string;
  color?: string;
  component: React.LazyExoticComponent<any>;
}

export const APPS_CONFIG: AppConfig[] = [
  {
    id: "about",
    title: "About Me",
    iconImage: "/images/finder.png",
    icon: Settings,
    color: "bg-zinc-700",
    component: lazy(() => import("../apps/AboutApp")),
  },
  {
    id: "safari",
    title: "Safari",
    iconImage: "/images/safari.png",
    icon: Compass,
    color: "bg-blue-500",
    component: lazy(() => import("../apps/SafariApp")),
  },
  {
    id: "photos",
    title: "Photos",
    iconImage: "/images/photos.png",
    icon: Image,
    color: "bg-amber-500",
    component: lazy(() => import("../apps/PhotosApp")),
  },
  {
    id: "mail",
    title: "Contact",
    iconImage: "/images/contact.png",
    icon: Mail,
    color: "bg-sky-400",
    component: lazy(() => import("../apps/MailApp")),
  },
  {
    id: "terminal",
    title: "Terminal",
    iconImage: "/images/terminal.png",
    icon: Terminal,
    color: "bg-black",
    component: lazy(() => import("../apps/TerminalApp")),
  },
  {
    id: "resume",
    title: "Resume",
    iconImage: "/images/pdf.png",
    icon: FileText,
    color: "bg-red-600",
    component: lazy(() => import("../apps/ResumeApp")),
  },
  {
    id: "trash",
    title: "Trash",
    iconImage: "/images/trash.png",
    icon: Trash2,
    color: "bg-zinc-800",
    component: lazy(() => import("../apps/TrashApp")),
  },
  // Project Folders
  {
    id: "folder-scalewithalap",
    title: "Scale with Alap",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/ScaleWithAlapApp")),
  },
  {
    id: "folder-vibe44",
    title: "Vibe44 Marketing & MCP",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/Vibe44App")),
  },
  {
    id: "folder-vibe44-demo",
    title: "Vibe44 Next.js Starter Kit Demo",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/Vibe44DemoApp")),
  },
  {
    id: "folder-openui",
    title: "OpenUI",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/OpenUIApp")),
  },
  {
    id: "folder-zeroheadache",
    title: "Zero Headache Marketing",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/ZeroHeadacheApp")),
  },
  {
    id: "folder-zeroheadache-app",
    title: "Zero Headache Platform",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/ZeroHeadachePlatformApp")),
  },
  {
    id: "folder-makemesound",
    title: "Make Me Sound",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/MakeMeSoundApp")),
  },
  {
    id: "folder-freecom",
    title: "Freecom AI Store",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/FreecomApp")),
  },
  {
    id: "folder-soothly-ai",
    title: "Soothly AI",
    iconImage: "/images/folder.png",
    icon: Folder,
    component: lazy(() => import("../apps/projects/SoothlyApp")),
  },
];
