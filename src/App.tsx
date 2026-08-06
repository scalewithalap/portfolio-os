import { useEffect, Suspense, lazy } from 'react';
import { useEcosystemStore } from './store/useEcosystemStore';
import SpotlightSearch from './components/SpotlightSearch';
import ToastContainer from './components/ToastContainer';
import ErrorBoundary from './components/ErrorBoundary';
import SEOHead from './components/SEOHead';
import { getAppInfoByProjectId } from './data/projectsData';

const DesktopEnv = lazy(() => import('./desktop/DesktopEnvironment'));
const MobileEnv = lazy(() => import('./mobile/MobileEnvironment'));

export default function App() {
  const { activeEnvironment, setEnvironment, openApp } = useEcosystemStore();

  useEffect(() => {
    // Initial user agent & viewport environment detection on mount
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    setEnvironment(isMobile ? 'iOS' : 'macOS');

    // Deep-link route parser for /projects/:id, ?project=:id, ?app=:id, or #project-:id
    const handleInitialDeepLink = () => {
      if (typeof window === "undefined") return;
      const pathname = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      let projectSlug = "";
      if (pathname.includes("/projects/")) {
        projectSlug = pathname.split("/projects/")[1]?.split("/")[0] || "";
      } else if (search.has("project")) {
        projectSlug = search.get("project") || "";
      } else if (search.has("app")) {
        projectSlug = search.get("app") || "";
      } else if (hash.includes("project-")) {
        projectSlug = hash.replace("#project-", "");
      } else if (hash.includes("projects/")) {
        projectSlug = hash.split("projects/")[1] || "";
      }

      if (projectSlug) {
        const cleanSlug = projectSlug.replace(/^folder-/, "");
        const appInfo = getAppInfoByProjectId(cleanSlug);
        if (appInfo) {
          setTimeout(() => {
            openApp(appInfo.appId, appInfo.title);
          }, 350);
        }
      }
    };

    handleInitialDeepLink();
  }, [setEnvironment, openApp]);

  if (!activeEnvironment) {
    return <div className="h-screen w-screen bg-black" />;
  }

  return (
    <>
      <SEOHead />
      <ErrorBoundary fallbackTitle="Portfolio OS Failed to Load">
        <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
          {activeEnvironment === 'macOS' ? <DesktopEnv /> : <MobileEnv />}
        </Suspense>
      </ErrorBoundary>
      <SpotlightSearch />
      <ToastContainer />
    </>
  );
}
