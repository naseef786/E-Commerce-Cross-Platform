import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInfiniteScrollOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom hook for infinite scrolling
 * @param callback function to call when reaching the bottom
 * @param options intersection observer options
 */
export function useInfiniteScroll<T extends HTMLElement>(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
): RefObject<T> {
  const targetRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { root: options.root || null, rootMargin: options.rootMargin || "0px", threshold: options.threshold || 0.1 }
    );

    const el = targetRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.root, options.rootMargin, options.threshold]);

  // When bottom element becomes visible
  useEffect(() => {
    if (isIntersecting) callback();
  }, [isIntersecting, callback]);

  return  targetRef;
}
