/**
 * @file components/common/LazyImage.tsx
 * @description Optimized IntersectionObserver Progressive Image Component.
 *
 * Responsibilities:
 * - Deferred loading of images until they enter the browser viewport using IntersectionObserver API.
 * - Shows an animated skeleton pulse placeholder during image fetching.
 * - Provides graceful fallback image handling when network errors occur.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  placeholderColor?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc,
  placeholderColor,
  ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Viewport
        rootMargin: '100px 0px', // Pre-load when within 100px of viewport
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Extract rounded classes from className (e.g. rounded-full, rounded-xl) to apply to wrapper
  const roundedClass = className.match(/rounded(-[a-z0-9]+)?/g)?.join(' ') || '';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        isLoaded ? 'bg-transparent' : 'bg-slate-200/50 dark:bg-zinc-800/50'
      } ${roundedClass} ${containerClassName}`}
    >
      {/* Skeleton / Loader Placeholder while image is loading or not in view */}
      {(!isInView || !isLoaded) && !hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-slate-200/80 dark:bg-zinc-900/60 animate-shimmer z-10 ${roundedClass}`}>
          <Loader2 className="w-4 h-4 text-blue-500/80 animate-spin" />
        </div>
      )}

      {/* Fallback view if image fails to load */}
      {hasError ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 p-2 text-center text-xs ${roundedClass}`}>
          <ImageIcon className="w-6 h-6 mb-1 opacity-50 text-blue-500" />
          <span className="text-[10px] opacity-70 line-clamp-1">{alt || 'Image'}</span>
        </div>
      ) : (
        /* Actual Image element loaded only when intersected */
        isInView && (
          <img
            src={hasError && fallbackSrc ? fallbackSrc : src}
            alt={alt}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`transition-opacity duration-500 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
        )
      )}
    </div>
  );
};

export default LazyImage;
