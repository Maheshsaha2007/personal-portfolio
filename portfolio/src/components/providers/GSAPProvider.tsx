'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GSAPContext = createContext<typeof gsap | null>(null);

export const useGSAPEngine = () => useContext(GSAPContext);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <GSAPContext.Provider value={gsap}>{children}</GSAPContext.Provider>;
}
