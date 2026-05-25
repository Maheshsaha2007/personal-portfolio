'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './SmoothScrollProvider';

const GSAPContext = createContext<typeof gsap | null>(null);

export const useGSAPEngine = () => useContext(GSAPContext);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const lenis = useSmoothScroll();

  useEffect(() => {
    // Register scrolltrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Sync GSAP ScrollTrigger with Lenis scroll
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);

      // Tell ScrollTrigger to use Lenis values
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? lenis.scrollTo(value!) : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? 'transform' : 'fixed',
      });

      // Refresh triggers after resize
      ScrollTrigger.addEventListener('refresh', () => lenis.resize());
      ScrollTrigger.defaults({ scroller: document.body });
    }

    return () => {
      // Cleanup all registered ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

  return <GSAPContext.Provider value={gsap}>{children}</GSAPContext.Provider>;
}
