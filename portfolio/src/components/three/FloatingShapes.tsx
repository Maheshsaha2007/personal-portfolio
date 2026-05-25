'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapeItem {
  position: [number, number, number];
  scale: number;
  speed: number;
  type: 'torus' | 'icosahedron' | 'octahedron';
  color: string;
}

export function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  // Memoize shapes details (avoid garbage collection hits)
  const items: ShapeItem[] = useMemo(() => [
    { position: [-3.2, 1.8, -2], scale: 0.45, speed: 0.6, type: 'torus', color: '#00f2ff' },
    { position: [3.5, 2.2, -1.5], scale: 0.5, speed: 0.8, type: 'icosahedron', color: '#8b5cf6' },
    { position: [-4, -2, -3], scale: 0.6, speed: 0.4, type: 'octahedron', color: '#ec4899' },
    { position: [2.8, -1.8, -2.5], scale: 0.4, speed: 0.7, type: 'torus', color: '#00f2ff' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow structural drift
    groupRef.current.children.forEach((child, i) => {
      const item = items[i];
      if (!child) return;
      child.rotation.x = time * 0.2 * item.speed;
      child.rotation.y = time * 0.15 * item.speed;
      child.position.y = item.position[1] + Math.sin(time * 1.2 + i) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.position} scale={item.scale}>
          {item.type === 'torus' && <torusGeometry args={[0.8, 0.24, 16, 100]} />}
          {item.type === 'icosahedron' && <icosahedronGeometry args={[0.9, 0]} />}
          {item.type === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
          
          <meshPhysicalMaterial
            transparent
            opacity={0.16}
            roughness={0.1}
            transmission={0.6}
            thickness={1.2}
            color={item.color}
            emissive={item.color}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
