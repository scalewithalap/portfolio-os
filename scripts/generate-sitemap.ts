/**
 * @file scripts/generate-sitemap.ts
 * @description Dynamic XML Sitemap Generator for scalewithalap.com.
 *
 * Responsibilities:
 * - Dynamically extracts all projects and routes from data/projectsData.ts.
 * - Formats valid XML schema conformant with sitemaps.org standard.
 * - Updates lastmod with current ISO date and sets canonical priorities.
 * - Automatically outputs to public/sitemap.xml (and dist/sitemap.xml if dist exists).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS_DATA } from "../data/projectsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const BASE_URL = "https://scalewithalap.com";

// Map project IDs to their canonical route slugs in sitemap
const PROJECT_SLUG_MAP: Record<string, string> = {
  "zeroheadache-app": "zeroheadache-platform",
  "soothly-ai": "soothly",
};

export function generateSitemapXML(): string {
  const today = new Date().toISOString().split("T")[0];

  const entries: {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
    comment?: string;
  }[] = [
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
      comment: "Homepage / Main Desktop Portfolio OS",
    },
  ];

  PROJECTS_DATA.forEach((project, idx) => {
    const slug = PROJECT_SLUG_MAP[project.id] || project.id;
    const isLive = project.badge === "Shipped & Live" || project.badge === "Shipped & Open Source";
    const priority = isLive ? "0.9" : "0.8";

    entries.push({
      loc: `${BASE_URL}/projects/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority,
      comment: `Project ${idx + 1}: ${project.title}`,
    });
  });

  const xmlContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...entries.flatMap((entry) => [
      ...(entry.comment ? [`  <!-- ${entry.comment} -->`] : []),
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
    ]),
    '</urlset>',
    '',
  ].join('\n');

  return xmlContent;
}

export function writeSitemap(): void {
  const xml = generateSitemapXML();

  // Write to public/sitemap.xml
  const publicDir = path.resolve(rootDir, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicSitemapPath = path.resolve(publicDir, "sitemap.xml");
  fs.writeFileSync(publicSitemapPath, xml, "utf-8");
  console.log(`[sitemap] Successfully generated dynamic sitemap at ${publicSitemapPath}`);

  // Write to dist/sitemap.xml if dist directory exists
  const distDir = path.resolve(rootDir, "dist");
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.resolve(distDir, "sitemap.xml");
    fs.writeFileSync(distSitemapPath, xml, "utf-8");
    console.log(`[sitemap] Synchronized sitemap to ${distSitemapPath}`);
  }
}

// Auto-run when executed directly via tsx/node
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  writeSitemap();
}
