import { useEffect, Suspense, lazy } from 'react';
import { useEcosystemStore } from './store/useEcosystemStore';
import SpotlightSearch from './components/SpotlightSearch';
import ToastContainer from './components/ToastContainer';
import ErrorBoundary from './components/ErrorBoundary';
import SEOHead from './components/SEOHead';
import { getAppInfoByProjectId } from './data/projectsData';

const DesktopEnv = lazy(() => import('./desktop/DesktopEnvironment'));
const TabletEnv = lazy(() => import('./tablet/TabletEnvironment'));
const MobileEnv = lazy(() => import('./mobile/MobileEnvironment'));

export default function App() {
  const { activeEnvironment, setEnvironment, openApp } = useEcosystemStore();

  useEffect(() => {
    // Initial viewport & device environment detection
    const detectEnvironment = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setEnvironment('iOS');
      } else if (w <= 1024) {
        setEnvironment('iPadOS');
      } else {
        setEnvironment('macOS');
      }
    };

    detectEnvironment();

    const handleResize = () => {
      detectEnvironment();
    };

    window.addEventListener('resize', handleResize);

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setEnvironment, openApp]);

  if (!activeEnvironment) {
    return <div className="h-screen w-screen bg-black" />;
  }

  return (
    <>
      <SEOHead />
      <ErrorBoundary fallbackTitle="Portfolio OS Failed to Load">
        <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
          {activeEnvironment === 'macOS' && <DesktopEnv />}
          {activeEnvironment === 'iPadOS' && <TabletEnv />}
          {activeEnvironment === 'iOS' && <MobileEnv />}
        </Suspense>
      </ErrorBoundary>
      <SpotlightSearch />
      <ToastContainer />
    </>
  );
}
