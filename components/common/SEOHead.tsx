/**
 * @file components/common/SEOHead.tsx
 * @description Dynamic SEO Meta Tag & JSON-LD Structured Data Injector Component.
 *
 * Responsibilities:
 * - Dynamically updates document.title, meta description, and OpenGraph/Twitter social cards based on active focused window.
 * - Injects Google rich result JSON-LD structured schema script (Person schema, WebSite schema).
 * - Manages canonical URLs dynamically for search engine indexation.
 */

import { useEffect } from "react";
import { useEcosystemStore } from "../../store/useEcosystemStore";
import { PROJECTS_DATA } from "../../data/projectsData";

export default function SEOHead() {
  const { openApps, focusedAppId } = useEcosystemStore();

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Determine current view details based on active/focused app
    let title = "Scale with Alap — Full-Stack AI Engineer";
    let description =
      "Interactive macOS-style Portfolio by Alap Putatunda — Full-Stack AI Engineer & AI-Native Product Builder. Explore projects, engineering architecture, and resume.";
    let canonicalUrl = "https://scalewithalap.com/";
    let activeProjectId: string | null = null;

    if (focusedAppId && focusedAppId.startsWith("folder-")) {
      const slug = focusedAppId.replace(/^folder-/, "");
      const matchedProject = PROJECTS_DATA.find(
        (p) => p.id === slug || slug.includes(p.id) || p.id.includes(slug),
      );
      if (matchedProject) {
        activeProjectId = matchedProject.id;
        title = `${matchedProject.title} - ${matchedProject.tagline} | Scale with Alap`;
        description = `${matchedProject.description} Architecture highlights, metrics, and implementation code.`;
        canonicalUrl = `https://scalewithalap.com/projects/${matchedProject.id}`;
      }
    } else if (focusedAppId === "about") {
      title = "About Alap Putatunda — Full-Stack AI Engineer";
      description =
        "Alap Putatunda is a Full-Stack AI Engineer and technical founder specializing in multi-agent systems, AI SaaS, MCP servers, and LLM orchestration. Recipient of Hyperagent Founding 500.";
    } else if (focusedAppId === "resume") {
      title = "Resume — Alap Putatunda | Full-Stack AI Engineer";
      description =
        "Official Resume of Alap Putatunda — Full-Stack AI Engineer, Co-founder & CEO of Zero Headache, and creator of Vibe44 & OpenUI.";
    }

    // Update document title
    document.title = title;

    // Helper to update meta tag content
    const updateMeta = (
      nameOrProperty: string,
      value: string,
      isProperty = false,
    ) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    // Helper to update canonical link
    let canonicalLink = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Standard Meta Tags
    updateMeta("description", description);
    updateMeta("author", "Alap Putatunda");
    updateMeta(
      "keywords",
      "Alap Putatunda, Full-Stack AI Engineer, AI-Native Product/Software Development, React 19, Next.js 16, TypeScript, Multi-Agent Orchestration, Model Context Protocol, LLM RAG, Voice AI, Supabase, PostgreSQL, Zero Headache, Vibe44, OpenUI, Make Me Sound, Soothly AI, Freecom AI, Hyperagent Founding 500",
    );

    // Open Graph
    updateMeta("og:site_name", "Scale with Alap", true);
    updateMeta("og:locale", "en_US", true);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:type", activeProjectId ? "article" : "website", true);
    updateMeta(
      "og:image",
      "https://scalewithalap.com/images/og-image.webp",
      true,
    );
    updateMeta(
      "og:image:secure_url",
      "https://scalewithalap.com/images/og-image.webp",
      true,
    );
    updateMeta("og:image:type", "image/webp", true);
    updateMeta("og:image:width", "1200", true);
    updateMeta("og:image:height", "630", true);
    updateMeta(
      "og:image:alt",
      "Scale with Alap | Full-Stack AI Engineer & AI-Native Product Builder",
      true,
    );

    // Twitter Card
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:site", "@scalewithalap");
    updateMeta("twitter:creator", "@scalewithalap");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta(
      "twitter:image",
      "https://scalewithalap.com/images/og-image.webp",
    );
    updateMeta(
      "twitter:image:src",
      "https://scalewithalap.com/images/og-image.webp",
    );
    updateMeta("twitter:image:alt", "Scale with Alap — Full-Stack AI Engineer");

    // JSON-LD Structured Data Schema Construction
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://scalewithalap.com/#person",
      name: "Alap Putatunda",
      jobTitle:
        "Full-Stack AI Engineer | AI-Native Product/Software Development",
      url: "https://scalewithalap.com",
      email: "mailto:hi@scalewithalap.com",
      image: "https://scalewithalap.com/images/og-image.webp",
      knowsAbout: [
        "Artificial Intelligence",
        "Multi-Agent Orchestration",
        "Model Context Protocol (MCP)",
        "Retrieval-Augmented Generation (RAG)",
        "LLM Infrastructure",
        "Voice AI",
        "React 19",
        "Next.js 16",
        "TypeScript",
        "Python",
        "Supabase",
        "PostgreSQL",
        "Inngest",
        "Zustand",
        "Web Audio API",
      ],
      sameAs: [
        "https://github.com/scalewithalap",
        "https://linkedin.com/in/scalewithalap",
        "https://x.com/scalewithalap",
        "https://www.threads.com/@scalewithalap",
        "https://www.youtube.com/@scalewithalap",
        "https://www.instagram.com/scalewithalap",
        "https://www.facebook.com/scalewithalap",
      ],
      award:
        "Selected for 'The Founding 500' by Hyperagent (by Airtable) — June 2026",
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://scalewithalap.com/#website",
      url: "https://scalewithalap.com/",
      name: "Scale with Alap",
      description:
        "Interactive macOS-style Portfolio by Alap Putatunda — Full-Stack AI Engineer & AI-Native Product Builder. Explore projects, engineering architecture, and resume.",
      image: "https://scalewithalap.com/images/og-image.webp",
      publisher: {
        "@id": "https://scalewithalap.com/#person",
      },
    };

    const profilePageSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://scalewithalap.com/#profilepage",
      url: canonicalUrl,
      name: title,
      description: description,
      primaryImageOfPage: "https://scalewithalap.com/images/og-image.webp",
      mainEntity: {
        "@id": "https://scalewithalap.com/#person",
      },
    };

    let graphSchemas: any[] = [personSchema, websiteSchema, profilePageSchema];

    if (activeProjectId) {
      const proj = PROJECTS_DATA.find((p) => p.id === activeProjectId);
      if (proj) {
        const softwareSchema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: proj.title,
          description: proj.description,
          applicationCategory: proj.category,
          operatingSystem: "Web",
          url: `https://scalewithalap.com/projects/${proj.id}`,
          author: {
            "@id": "https://scalewithalap.com/#person",
          },
          keywords: (proj.skills || []).join(", "),
        };

        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://scalewithalap.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: "https://scalewithalap.com/projects/",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: proj.title,
              item: `https://scalewithalap.com/projects/${proj.id}`,
            },
          ],
        };

        graphSchemas.push(softwareSchema, breadcrumbSchema);
      }
    }

    // Inject or update JSON-LD script tag in head
    let scriptTag = document.querySelector(
      "script[id='dynamic-json-ld']",
    ) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "dynamic-json-ld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graphSchemas,
    });
  }, [openApps, focusedAppId]);

  return null;
}
