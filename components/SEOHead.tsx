import React, { useEffect } from "react";
import { useEcosystemStore } from "../store/useEcosystemStore";
import { PROJECTS_DATA } from "../data/projectsData";

export default function SEOHead() {
  const { openApps, focusedAppId } = useEcosystemStore();

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Determine current view details based on active/focused app
    let title = "Scale with Alap - Founding AI Engineer";
    let description =
      "Interactive macOS-style Portfolio OS built by Alap Putatunda.";
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
      title = "About Alap Putatunda - Founding AI Engineer";
      description =
        "Alap Putatunda is a Founding AI Engineer with 6+ years experience taking AI products from empty repo to production. Recipient of Hyperagent Founding 500.";
    } else if (focusedAppId === "resume") {
      title = "Resume - Alap Putatunda | Founding AI Engineer";
      description =
        "Official Resume of Alap Putatunda - Founding AI Engineer, CEO of Zero Headache, and creator of Vibe44 & OpenUI.";
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
      "Alap Putatunda, Founding AI Engineer, Full-stack AI-native Developer, React 19, Next.js 16, TypeScript, Multi-Agent Orchestration, Model Context Protocol, LLM RAG, Voice AI, Supabase, PostgreSQL, Zero Headache, Vibe44, OpenUI, Make Me Sound, Soothly AI, Freecom AI, Hyperagent Founding 500",
    );

    // Open Graph
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:type", activeProjectId ? "article" : "website", true);

    // Twitter Card
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);

    // JSON-LD Structured Data Schema Construction
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://scalewithalap.com/#person",
      name: "Alap Putatunda",
      jobTitle: "Founding AI Engineer & Full-Stack AI Developer",
      url: "https://scalewithalap.com",
      email: "mailto:hi@scalewithalap.com",
      image: "https://scalewithalap.com/images/alap.webp",
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
        "https://hyperagent.com/s/6YBNB4VIO26vErBhadK36w",
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
        "Interactive macOS-style Portfolio OS built by Alap Putatunda.",
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
          keywords: proj.tags.join(", "),
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
