import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useEcosystemStore } from '../store/useEcosystemStore';
import { Battery, Wifi } from 'lucide-react';

export default function DynamicIsland() {
  const islandRef = useRef<HTMLDivElement>(null);
  const { openApps, focusedAppId } = useEcosystemStore();
  const [time, setTime] = useState(new Date());
  
  const focusedApp = openApps.find(a => a.id === focusedAppId && a.isOpen);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).replace(' AM', '').replace(' PM', '');
  };

  useEffect(() => {
    if (!islandRef.current) return;
    
    if (focusedApp) {
      // Expanded state for active app
      gsap.to(islandRef.current, {
        width: 140,
        height: 32,
        borderRadius: 16,
        duration: 0.5,
        ease: 'elastic.out(1, 0.7)'
      });
    } else {
      // Resting state
      gsap.to(islandRef.current, {
        width: 100,
        height: 28,
        borderRadius: 14,
        duration: 0.4,
        ease: 'power3.inOut'
      });
    }
  }, [focusedApp]);

  return (
    <div className="absolute top-0 w-full z-50 pointer-events-none flex justify-between items-center px-6 pt-2">
      {/* Time */}
      <div className="text-[13px] font-semibold tracking-tight w-16 text-center">
        {formatTime(time)}
      </div>

      {/* Island */}
      <div 
        ref={islandRef}
        className="bg-black text-white rounded-[14px] flex items-center justify-center overflow-hidden px-3 shadow-2xl"
        style={{ width: 100, height: 28 }}
      >
        <div className="flex w-full items-center justify-between opacity-100 transition-opacity">
          {focusedApp ? (
            <>
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wide truncate ml-2 text-white/90">
                {focusedApp.title}
              </span>
            </>
          ) : (
            <div className="flex w-full justify-between items-center px-1">
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          )}
        </div>
      </div>

      {/* Status Icons */}
      <div className="flex items-center space-x-1.5 w-16 justify-end">
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={16} strokeWidth={2} />
      </div>
    </div>
  );
}
