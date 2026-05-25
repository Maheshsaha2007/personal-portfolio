import React from 'react';
import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import '@/app/globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { FloatingNav } from '@/components/layout/FloatingNav';
import { SocialDock } from '@/components/layout/SocialDock';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { PERSONAL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`,
  description: PERSONAL_INFO.bio,
  authors: [{ name: PERSONAL_INFO.name }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-dark-bg text-zinc-100 min-h-screen">
        <SmoothScrollProvider>
          <GSAPProvider>
            {/* Custom high-aesthetic interactive cursor */}
            <CustomCursor />

            {/* Floating pill navigation pill-bar */}
            <FloatingNav />

            {/* Left fixed magnification social vertical bar */}
            <SocialDock />

            {/* Top linear progress bar synced to scroll */}
            <ScrollProgress />

            {/* Content pages */}
            {children}
          </GSAPProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
