import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useEcosystemStore } from '../store/useEcosystemStore';
import MobileHome from './MobileHome';
import DynamicIsland from './DynamicIsland';
import { APPS_CONFIG } from '../utils/apps';

export default function MobileEnvironment() {
  const { openApps, focusedAppId, closeApp } = useEcosystemStore();
  const focusedApp = openApps.find(a => a.id === focusedAppId && a.isOpen);
  
  const appContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // Handle Swipe up to close
  useEffect(() => {
    if (!focusedApp || !appContainerRef.current) return;

    const el = appContainerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const dy = currentY - touchStartY.current;
      
      // If swiping up from bottom area (home bar indicator area)
      // For simplicity, we just detect an upward swipe from the bottom 10%
      if (touchStartY.current > window.innerHeight * 0.9 && dy < -50) {
        // Trigger close animation
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: -100,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            closeApp(focusedApp.id);
          }
        });
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [focusedApp, closeApp]);

  // Entrance animation for opening an app
  useEffect(() => {
    if (focusedApp && appContainerRef.current) {
      gsap.fromTo(appContainerRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }, [focusedApp?.id]);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-black text-white selection:bg-blue-500/30 font-sans">
      {/* Background Wallpaper */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-indigo-900 via-slate-900 to-black z-0"
        style={{
          // Apple iOS 17 Style Wallpaper
          backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <DynamicIsland />
      <MobileHome />

      {/* Active App Overlay */}
      {focusedApp && (
        <div 
          ref={appContainerRef}
          className="absolute inset-0 z-40 bg-black overflow-hidden flex flex-col"
        >
          {/* iOS Top spacing for island */}
          <div className="h-12 w-full shrink-0 bg-zinc-950/90" />
          
          <div className="flex-1 overflow-hidden relative">
            {APPS_CONFIG.map(config => {
              if (config.id === focusedApp.id) {
                const AppComponent = config.component;
                return (
                  <Suspense key={config.id} fallback={<div className="h-full w-full bg-zinc-900" />}>
                    <AppComponent />
                  </Suspense>
                );
              }
              return null;
            })}
          </div>

          {/* Home Bar Indicator */}
          <div className="h-6 w-full flex items-center justify-center shrink-0 bg-black">
            <div className="w-1/3 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
