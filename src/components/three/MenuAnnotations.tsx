'use client';
import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

const sections = [
  { id: 'about', label: 'About', position: [1.3, 0.8, 0.5] as [number, number, number] },
  { id: 'skills', label: 'Skills', position: [-1.4, 0.5, 0.8] as [number, number, number] },
  { id: 'projects', label: 'Projects', position: [0.5, -1.3, 1.1] as [number, number, number] },
  { id: 'timeline', label: 'Timeline', position: [-0.9, -1.1, -1.2] as [number, number, number] },
  { id: 'certifications', label: 'Certs', position: [1.1, 0, -1.4] as [number, number, number] },
  { id: 'contact', label: 'Contact', position: [0, 1.5, -0.5] as [number, number, number] },
];

export function MenuAnnotations({ is3DMode }: { is3DMode: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Clean up cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'none'; // custom cursor might be 'none' normally
    };
  }, []);

  if (!is3DMode) return null;

  const handleClick = (id: string) => {
    const target = document.querySelector(`#${id}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {sections.map((section) => (
        <group key={section.id} position={section.position}>
          {/* A small glowing marker point */}
          <mesh 
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(section.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredId(null);
              document.body.style.cursor = 'none'; // Revert back to custom cursor
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(section.id);
            }}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={hoveredId === section.id ? '#00f2ff' : '#ffffff'} />
            
            {hoveredId === section.id && (
              <pointLight color="#00f2ff" intensity={2} distance={1} />
            )}

            <Html distanceFactor={4} position={[0, 0.2, 0]} center zIndexRange={[100, 0]}>
              <div 
                className={`px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md glass text-xs uppercase tracking-widest font-display whitespace-nowrap cursor-pointer transition-all duration-300 pointer-events-auto ${
                  hoveredId === section.id 
                    ? 'bg-white/10 text-neon-blue shadow-[0_0_15px_rgba(0,242,255,0.4)] scale-110' 
                    : 'bg-dark-bg/50 text-white hover:bg-white/10'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(section.id);
                }}
                onPointerOver={() => {
                  setHoveredId(section.id);
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  setHoveredId(null);
                  document.body.style.cursor = 'none';
                }}
              >
                {section.label}
              </div>
            </Html>
          </mesh>
        </group>
      ))}
    </>
  );
}
