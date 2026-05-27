'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { FloatingOrb } from './FloatingOrb';
import { ParticleField } from './ParticleField';
import { FloatingShapes } from './FloatingShapes';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface HeroSceneProps {
  is3DMode?: boolean;
}

export function HeroScene({ is3DMode = false }: HeroSceneProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`absolute inset-0 w-full h-full z-0 bg-dark-bg overflow-hidden transition-all duration-700 ${is3DMode ? 'z-50 pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Background Radial Light spotlight overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-purple/5 rounded-full blur-[120px]" />

      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-dark-bg text-xs uppercase tracking-widest text-zinc-600 font-display">
          Initializing 3D Matrix...
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={isMobile ? [1, 1] : [1, 2]} // Cap device pixel ratio on mobile
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          <ambientLight intensity={0.4} />
          
          {/* Key lights colors */}
          <directionalLight position={[5, 5, 2]} intensity={1.5} color="#00f2ff" />
          <directionalLight position={[-5, -5, 2]} intensity={1} color="#8b5cf6" />
          <pointLight position={[0, 4, 3]} intensity={1.2} />

          {/* Central main glass orb element */}
          <FloatingOrb is3DMode={is3DMode} />

          {/* Interactive background particle system */}
          <ParticleField count={isMobile ? 400 : 1500} />

          {/* Floating surrounding geometric accents (hide in 3D mode so orb is clear) */}
          {!isMobile && !is3DMode && <FloatingShapes />}

          {/* Environmental reflection texture */}
          <Environment preset="night" />

          {/* Add OrbitControls for user interaction when in 3D Menu mode */}
          {is3DMode && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={true}
              autoRotateSpeed={1}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}
export default HeroScene;
